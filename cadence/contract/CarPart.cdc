pub contract CarPart {

  pub var totalEngineSupply: UInt64
  pub var totalBodySupply: UInt64
  pub var totalTyreSupply: UInt64

  pub var nextEngineID: UInt64
  pub var nextBodyID: UInt64
  pub var nextTyreID: UInt64

  pub var EngineDatas: @{UInt64: Engine}
  pub var BodyDatas: @{UInt64: Body}
  pub var TyreDatas: @{UInt64: Tyre}

  pub event ContractInitialized()
  pub event WithdrawEngine(id: UInt64, from: Address?)
  pub event WithdrawBody(id: UInt64, from: Address?)
  pub event WithdrawTyre(id: UInt64, from: Address?)
  pub event DepositEngine(id: UInt64, to: Address?)
  pub event DepositBody(id: UInt64, to: Address?)
  pub event DepositTyre(id: UInt64, to: Address?)
  pub event NewCarPartCreated()

  pub resource Engine {
        pub let id: UInt64
        pub let name: String
        pub let hp: UInt64
        pub let type: String

        init(name:String, hp: UInt64, type:String) {
            self.id = CarPart.nextEngineID
            self.name = name
            self.hp = hp
            self.type = type
            CarPart.nextEngineID = CarPart.nextEngineID + 1 as UInt64
            emit NewCarPartCreated()
        }
    }

    pub resource Body {
        pub let id: UInt64
        pub let name: String
        pub let type: String

        init(name:String, type:String) {
            self.id = CarPart.nextBodyID
            self.name = name
            self.type = type
            CarPart.nextBodyID = CarPart.nextBodyID + 1 as UInt64
            emit NewCarPartCreated()
        }
    }


    pub resource Tyre {
        pub let id: UInt64
        pub let name: String
        pub let weight: UInt64
        pub let type: String

        init(name:String, weight:UInt64, type:String) {
            self.id = CarPart.nextTyreID
            self.name = name
            self.weight = weight
            self.type = type
            CarPart.nextTyreID = CarPart.nextTyreID + 1 as UInt64
            emit NewCarPartCreated()
        }
    }

    pub resource interface StoragePublic {
        pub fun depositEngine(token: @Engine)
        pub fun depositBody(token: @Body)
        pub fun depositTyre(token: @Tyre)
        pub fun getIDs(): [UInt64]
        pub fun borrowNFT(id: UInt64): &Engine
        pub fun borrowEnginetype(): [String]
        pub fun borrowEngineIDs(): [UInt64]
        pub fun borrowEngineKeys(): [&CarPart.Engine]
    }

    pub resource interface PartReceiver {
        pub fun depositEngine(token: @Engine)
        pub fun depositBody(token: @Body)
        pub fun depositTyre(token: @Tyre)
    }

    pub resource interface PartProvider {
        pub fun withdrawEngine(withdrawID:UInt64): @Engine
        pub fun withdrawBody(withdrawID:UInt64): @Body
        pub fun withdrawTyre(withdrawID:UInt64): @Tyre
    }

 pub resource PartStorage: StoragePublic, PartProvider, PartReceiver {

    pub var ownedEngines: @{UInt64: Engine}
    pub var ownedBodys: @{UInt64: Body}
    pub var ownedTyres: @{UInt64: Tyre}

    init() {
        self.ownedEngines <- {}
        self.ownedBodys <- {}
        self.ownedTyres <- {}
    }

    pub fun withdrawEngine(withdrawID: UInt64): @Engine {
        let token <- self.ownedEngines.remove(key: withdrawID) ?? panic("missing Engine")
        emit WithdrawEngine(id: token.id, from: self.owner?.address)
        return <- token
    }

    pub fun withdrawBody(withdrawID: UInt64): @Body {
        let token <- self.ownedBodys.remove(key: withdrawID) ?? panic("missing Body")
        emit WithdrawBody(id: token.id, from: self.owner?.address)
        return <- token
    }

    pub fun withdrawTyre(withdrawID: UInt64): @Tyre {
        let token <- self.ownedTyres.remove(key: withdrawID) ?? panic("missing Tyre")
        emit WithdrawTyre(id: token.id, from: self.owner?.address)
        return <- token
    }

    pub fun depositEngine(token: @Engine) {
        let newToken <- token as @CarPart.Engine
        let id: UInt64 = newToken.id
        let oldToken <- self.ownedEngines[id] <- newToken
        emit DepositEngine(id: id, to: self.owner?.address)
        destroy oldToken
    }

    pub fun depositBody(token: @Body) {
        let newToken <- token as @CarPart.Body
        let id: UInt64 = newToken.id
        let oldToken <- self.ownedBodys[id] <- newToken
        emit DepositBody(id: id, to: self.owner?.address)
        destroy oldToken
    }

    pub fun depositTyre(token: @Tyre) {
        let newToken <- token as @CarPart.Tyre
        let id: UInt64 = newToken.id
        let oldToken <- self.ownedTyres[id] <- newToken
        emit DepositTyre(id: id, to: self.owner?.address)
        destroy oldToken
    }

    pub fun getIDs(): [UInt64] {
        return self.ownedEngines.keys
    }

    pub fun borrowNFT(id: UInt64): &Engine {
        return &self.ownedEngines[id] as &Engine
    }

    pub fun borrowEnginetype(): [String] {
        let value: [String]  = []
        for key in self.ownedEngines.keys {
            let ref =  &self.ownedEngines[key] as auth & Engine
            let ref2 = ref as &CarPart.Engine
            let ref3 = ref2.id
            value.append(CarPart.getEnginetype(EngineID: ref3)!)
        }
        return value
    }

    pub fun borrowEngineKeys(): [&CarPart.Engine] {
        let value: [&CarPart.Engine]  = []
        for key in self.ownedEngines.keys {
            let ref =  &self.ownedEngines[key] as auth & Engine
            let ref2 = ref as &CarPart.Engine
            value.append(ref2)
        }
        return value
    }

    pub fun borrowEngineIDs(): [UInt64] {
        let value: [UInt64] = []
            for key in self.ownedEngines.keys {
                let ref = &self.ownedEngines[key] as auth &Engine
                let ref2 = ref as &CarPart.Engine
                let ref3 = ref2.id
                value.append(ref3)
            }
            return value
    }

    destroy() {
        destroy self.ownedEngines
        destroy self.ownedBodys
        destroy self.ownedTyres
    }
 }

    pub fun getEnginetype(EngineID: UInt64): String? {
        return self.EngineDatas[EngineID]?.type
    }

    pub fun getEngineName(EngineID: UInt64): String? {
        return self.EngineDatas[EngineID]?.name
    }

    pub fun getBodyName(BodyID: UInt64): String? {
        return self.BodyDatas[BodyID]?.name
    }

    pub fun getTyreName(TyreID: UInt64): String? {
        return self.TyreDatas[TyreID]?.name
    }

    pub fun getEngineHP(EngineID: UInt64): UInt64? {
        return self.EngineDatas[EngineID]?.hp
    }

    pub fun createEmptyPartStorage(): @PartStorage {
        return <- create CarPart.PartStorage()
    }

    pub resource Admin {

        pub fun mintEngine(recipient: &{CarPart.PartReceiver}, name:String, hp:UInt64, type:String) {
			var newNFT <- create Engine(name:name, hp:hp, type:type)
			var address = recipient.depositEngine(token: <-newNFT)
            CarPart.totalEngineSupply = CarPart.totalEngineSupply + 1 as UInt64
		}

        pub fun mintBody(recipient: &{CarPart.PartReceiver}, name:String, type:String) {
			var newNFT <- create Body(name:name, type:type)
			var address = recipient.depositBody(token: <-newNFT)
            CarPart.totalBodySupply = CarPart.totalBodySupply + 1 as UInt64
		}

        pub fun mintTyre(recipient: &{CarPart.PartReceiver}, name:String, weight:UInt64, type:String) {
			var newNFT <- create Tyre(name:name, weight:weight, type:type)
			var address = recipient.depositTyre(token: <-newNFT)
            CarPart.totalTyreSupply = CarPart.totalTyreSupply + 1 as UInt64
		}
    }

    init(){
        self.totalEngineSupply = 0 as UInt64
        self.totalBodySupply = 0 as UInt64
        self.totalTyreSupply = 0 as UInt64
        self.nextEngineID = 1 as UInt64
        self.nextBodyID = 1 as UInt64
        self.nextTyreID = 1 as UInt64
        self.EngineDatas <- {}
        self.BodyDatas <- {}
        self.TyreDatas <- {}
        //self.account.save(<-create PartStorage(), to: /storage/PartStoragePath)
        self.account.save(<-create Admin(), to: /storage/Admin)
        //self.account.link<&{CarPart.PartReceiver}>(/public/PartStoragePath, target:/storage/PartStoragePath)
        emit ContractInitialized()
    }
}