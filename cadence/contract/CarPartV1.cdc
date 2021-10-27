pub contract CarPartV1 {
  access(self) var partData: {UInt64: Data}

  pub var nextpartID: UInt64
  pub var totalParts: UInt64

  pub let CollectionStoragePath: StoragePath
  pub let CollectionPublicPath: PublicPath
  pub let AdminStoragePath: StoragePath

  pub struct Data {
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
    pub let data: Data

    init(dataID: UInt64) {
      pre {
        CarPartV1.partData[dataID] != nil : "Could not create engine: data does not exist."
      }
      let engine = CarPartV1.partData[dataID]!
      CarPartV1.totalParts = CarPartV1.totalParts + 1
      self.id = CarPartV1.totalParts
      self.data = Data(dataID: dataID, name: engine.name, efficiency: engine.efficiency, hp: engine.hp, url: engine.url, type: engine.url)
    }
  }

  pub resource interface CollectionPublic {
    pub fun deposit(token: @Engine)
    pub fun getIDs(): [UInt64]
    pub fun listEngines(): {UInt64: Data}
  }

  pub resource interface Provider {
    pub fun withdraw(withdrawID: UInt64): @Engine
  }

  pub resource interface Receiver{
    pub fun deposit(token: @Engine)
  }

  pub resource Collection: CollectionPublic, Provider, Receiver {
    pub var ownedEngines: @{UInt64: Engine}

    pub fun withdraw(withdrawID: UInt64): @Engine {
      let token <- self.ownedEngines.remove(key: withdrawID)
        ?? panic("Could not withdraw engine: engine does not exist in collection")
      return <-token
    }

    pub fun deposit(token: @Engine) {
      let oldToken <- self.ownedEngines[token.id] <- token
      destroy oldToken
    }

    pub fun getIDs(): [UInt64] {
      return self.ownedEngines.keys
    }

    pub fun listEngines(): {UInt64: Data} {
      var engineData: {UInt64:Data} = {}
      for key in self.ownedEngines.keys {
        let el = &self.ownedEngines[key] as &Engine
        engineData.insert(key: el.id, el.data)
      }
      return engineData
    }

    destroy() {
      destroy self.ownedEngines
    }

    init() {
      self.ownedEngines <- {}
    }
  }

  pub fun createEmptyCollection(): @Collection {
    return <-create self.Collection()
  }


  pub resource Admin {
    pub fun createData(name: String, efficiency:UInt64, url:String, hp:UInt64, type:String): UInt64 {
      pre {
        name.length > 0 : "Could not create data: name is required."
      }
      let newEngineID = CarPartV1.nextpartID
      CarPartV1.partData[newEngineID] = Data(dataID: newEngineID, name: name, efficiency: efficiency, hp: hp, url: url, type: type)
      CarPartV1.nextpartID = CarPartV1.nextpartID + 1
      return newEngineID
    }

    pub fun destroyData(engineID: UInt64) {
      pre {
        CarPartV1.partData[engineID] != nil : "Could not delete data: data does not exist."
      }
      CarPartV1.partData.remove(key: engineID)
    }
  }

  pub fun mintEngine(dataID: UInt64): @Engine {
    pre {
      self.partData[dataID] != nil : "Could not mint engine: engine with given ID does not exist."
    }
    return <- create Engine(dataID: dataID)
  }

  pub fun listDatas(): {UInt64: Data} {
    return self.partData
  }


  init() {
    self.partData = {}
    self.totalParts = 0
    self.nextpartID = 1
    self.CollectionStoragePath = /storage/CarPartV1Collection
    self.CollectionPublicPath = /public/CarPartV1CollectionPublic
    self.AdminStoragePath = /storage/CarPartV1Admin
    self.account.save<@Admin>(<- create Admin(), to: self.AdminStoragePath)
  }
}