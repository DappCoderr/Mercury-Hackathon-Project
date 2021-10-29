pub contract CarPartV3 {

  pub var engineData: {UInt64: EngineData}
  pub var bodyData: {UInt64: BodyData}
  pub var tyreData: {UInt64: TyreData}

  pub var nextEnginePartID: UInt64
  pub var nextBodyPartID: UInt64
  pub var nextTyrePartID: UInt64

  pub var totalEngineParts: UInt64
  pub var totalBodyParts: UInt64
  pub var totalTyreParts: UInt64

  pub let CollectionStoragePath: StoragePath
  pub let CollectionPublicPath: PublicPath
  pub let AdminStoragePath: StoragePath


  pub struct EngineData {
    pub let dataID: UInt64
    pub let name: String
    pub let efficiency: UInt64
    pub let hp: UInt64
    pub let url: String
    pub let type: String

    init(dataID: UInt64, name: String, efficiency: UInt64, hp: UInt64, url: String, type: String) {
      self.dataID = dataID
      self.name = name
      self.efficiency = efficiency
      self.hp = hp
      self.url = url
      self.type = type
    }
  }

  pub resource Engine {
    pub let id: UInt64
    pub let data: EngineData

    init(dataID: UInt64) {
      pre {
        CarPartV3.engineData[dataID] != nil : "Could not create engine: data does not exist."
      }
      let engine = CarPartV3.engineData[dataID]!
      CarPartV3.totalEngineParts = CarPartV3.totalEngineParts + 1
      self.id = CarPartV3.totalEngineParts
      self.data = EngineData(dataID: dataID, name: engine.name, efficiency: engine.efficiency, hp: engine.hp, url: engine.url, type: engine.url)
    }
  }


  pub struct BodyData {
    pub let dataID: UInt64
    pub let name: String
    pub let url: String
    pub let type: String

    init(dataID: UInt64, name: String, url: String, type: String) {
      self.dataID = dataID
      self.name = name
      self.url = url
      self.type = type
    }
  }

  pub resource Body {
    pub let id: UInt64
    pub let data: BodyData

    init(dataID: UInt64) {
      pre {
        CarPartV3.bodyData[dataID] != nil : "Could not create body: data does not exist."
      }
      let body = CarPartV3.bodyData[dataID]!
      CarPartV3.totalBodyParts = CarPartV3.totalBodyParts + 1
      self.id = CarPartV3.totalBodyParts
      self.data = BodyData(dataID: dataID, name: body.name, url: body.url, type: body.url)
    }
  }


  pub struct TyreData {
    pub let dataID: UInt64
    pub let name: String
    pub let url: String
    pub let type: String

    init(dataID: UInt64, name: String, url: String, type: String) {
      self.dataID = dataID
      self.name = name
      self.url = url
      self.type = type
    }
  }

  pub resource Tyre {
    pub let id: UInt64
    pub let data: TyreData

    init(dataID: UInt64) {
      pre {
        CarPartV3.tyreData[dataID] != nil : "Could not create tyre: data does not exist."
      }
      let tyre = CarPartV3.tyreData[dataID]!
      CarPartV3.totalTyreParts = CarPartV3.totalTyreParts + 1
      self.id = CarPartV3.totalTyreParts
      self.data = TyreData(dataID: dataID, name: tyre.name, url: tyre.url, type: tyre.url)
    }
  }


  pub resource interface CollectionPublic {
    pub fun depositEngine(token: @Engine)
    pub fun depositBody(token: @Body)
    pub fun depositTyre(token: @Tyre)
    pub fun getEngineIDs(): [UInt64]
    pub fun getBodyIDs(): [UInt64]
    pub fun getTyreIDs(): [UInt64]
    pub fun listEngines(): {UInt64: EngineData}
    pub fun listBodys(): {UInt64: BodyData}
    pub fun listTyres(): {UInt64: TyreData}
  }

  pub resource interface Provider {
    pub fun withdrawEngine(withdrawID: UInt64): @Engine
    pub fun withdrawBody(withdrawID: UInt64): @Body
    pub fun withdrawTyre(withdrawID: UInt64): @Tyre
  }

  pub resource interface Receiver{
    pub fun depositEngine(token: @Engine)
    pub fun depositBody(token: @Body)
    pub fun depositTyre(token: @Tyre)
  }

  pub resource Collection: CollectionPublic, Provider, Receiver {
    pub var ownedEngines: @{UInt64: Engine}
    pub var ownedBodys: @{UInt64: Body}
    pub var ownedTyres: @{UInt64: Tyre}

    init() {
      self.ownedEngines <- {}
      self.ownedBodys <- {}
      self.ownedTyres <- {}
    }

    pub fun withdrawEngine(withdrawID: UInt64): @Engine {
      let token <- self.ownedEngines.remove(key: withdrawID)
        ?? panic("Could not withdraw engine: engine does not exist in collection")
      return <-token
    }

    pub fun withdrawBody(withdrawID: UInt64): @Body {
      let token <- self.ownedBodys.remove(key: withdrawID)
        ?? panic("Could not withdraw body: body does not exist in collection")
      return <-token
    }

    pub fun withdrawTyre(withdrawID: UInt64): @Tyre {
      let token <- self.ownedTyres.remove(key: withdrawID)
        ?? panic("Could not withdraw tyre: tyre does not exist in collection")
      return <-token
    }

    pub fun depositEngine(token: @Engine) {
      let oldToken <- self.ownedEngines[token.id] <- token
      destroy oldToken
    }

    pub fun depositBody(token: @Body) {
      let oldToken <- self.ownedBodys[token.id] <- token
      destroy oldToken
    }

    pub fun depositTyre(token: @Tyre) {
      let oldToken <- self.ownedTyres[token.id] <- token
      destroy oldToken
    }

    pub fun getEngineIDs(): [UInt64] {
      return self.ownedEngines.keys
    }

    pub fun getBodyIDs(): [UInt64] {
        return self.ownedBodys.keys
    }

    pub fun getTyreIDs(): [UInt64] {
        return self.ownedTyres.keys
    }

    pub fun listEngines(): {UInt64: EngineData} {
      var engineData: {UInt64:EngineData} = {}
      for key in self.ownedEngines.keys {
        let el = &self.ownedEngines[key] as &Engine
        engineData.insert(key: el.id, el.data)
      }
      return engineData
    }

    pub fun listBodys(): {UInt64: BodyData} {
      var bodyData: {UInt64:BodyData} = {}
      for key in self.ownedBodys.keys {
        let el = &self.ownedBodys[key] as &Body
        bodyData.insert(key: el.id, el.data)
      }
      return bodyData
    }

    pub fun listTyres(): {UInt64: TyreData} {
      var tyreData: {UInt64:TyreData} = {}
      for key in self.ownedTyres.keys {
        let el = &self.ownedTyres[key] as &Tyre
        tyreData.insert(key: el.id, el.data)
      }
      return tyreData
    }

    destroy() {
      destroy self.ownedEngines
      destroy self.ownedBodys
      destroy self.ownedTyres
    }
  }

  pub fun createEmptyCollection(): @Collection {
    return <-create self.Collection()
  }


  pub resource Admin {
    pub fun createEngine(name: String, efficiency:UInt64, url:String, hp:UInt64, type:String): UInt64 {
      pre {
        name.length > 0 : "Could not create engine data: name is required."
      }
      let newEngineID = CarPartV3.nextEnginePartID
      CarPartV3.engineData[newEngineID] = EngineData(dataID: newEngineID, name: name, efficiency: efficiency, hp: hp, url: url, type: type)
      CarPartV3.nextEnginePartID = CarPartV3.nextEnginePartID + 1
      return newEngineID
    }

    pub fun createBody(name: String, url:String, type:String): UInt64 {
      pre {
        name.length > 0 : "Could not create body data: name is required."
      }
      let newBodyID = CarPartV3.nextBodyPartID
      CarPartV3.bodyData[newBodyID] = BodyData(dataID: newBodyID, name: name, url: url, type: type)
      CarPartV3.nextBodyPartID = CarPartV3.nextBodyPartID + 1
      return newBodyID
    }

    pub fun createTyre(name: String, url:String, type:String): UInt64 {
      pre {
        name.length > 0 : "Could not create tyre data: name is required."
      }
      let newTyreID = CarPartV3.nextTyrePartID
      CarPartV3.tyreData[newTyreID] = TyreData(dataID: newTyreID, name: name, url: url, type: type)
      CarPartV3.nextTyrePartID = CarPartV3.nextTyrePartID + 1
      return newTyreID
    }
  }

  pub fun mintEngine(dataID: UInt64): @Engine {
    pre {
      self.engineData[dataID] != nil : "Could not mint engine: engine with given ID does not exist."
    }
    return <- create Engine(dataID: dataID)
  }

  pub fun mintBody(dataID: UInt64): @Body {
    pre {
      self.bodyData[dataID] != nil : "Could not mint body: body with given ID does not exist."
    }
    return <- create Body(dataID: dataID)
  }

  pub fun mintTyre(dataID: UInt64): @Tyre {
    pre {
      self.tyreData[dataID] != nil : "Could not mint tyre: tyre with given ID does not exist."
    }
    return <- create Tyre(dataID: dataID)
  }

  pub fun listEngine(): {UInt64: EngineData} {
    return self.engineData
  }

  pub fun listBody(): {UInt64: BodyData} {
    return self.bodyData
  }

  pub fun listTyre(): {UInt64: TyreData} {
    return  self.tyreData
  }

  init() {
    self.engineData = {}
    self.bodyData = {}
    self.tyreData = {}
    self.totalEngineParts = 0
    self.totalBodyParts = 0
    self.totalTyreParts = 0
    self.nextEnginePartID = 1
    self.nextBodyPartID = 1
    self.nextTyrePartID = 1
    self.CollectionStoragePath = /storage/CarPartV3Collection
    self.CollectionPublicPath = /public/CarPartV3CollectionPublic
    self.AdminStoragePath = /storage/CarPartV3Admin
    self.account.save<@Admin>(<- create Admin(), to: self.AdminStoragePath)
  }
}