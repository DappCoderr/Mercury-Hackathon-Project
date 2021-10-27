import FungibleToken from "./FungibleToken.cdc"

pub contract DappyContract {
  access(self) var templates: {UInt32: Template}

  pub var nextTemplateID: UInt32
  pub var totalDappies: UInt64

  pub let CollectionStoragePath: StoragePath
  pub let CollectionPublicPath: PublicPath
  pub let AdminStoragePath: StoragePath

  pub struct Template {
    pub let templateID: UInt32
    pub let dna: String
    pub let name: String
    pub let price: UFix64

    init(templateID: UInt32, dna: String, name: String) {
      self.templateID = templateID
      self.dna = dna
      self.name = name
      self.price = self._calculatePrice(dna: dna.length)
    }

    access(self) fun _calculatePrice(dna: Int): UFix64 {
      if dna >= 31 {
        return 21.0
      } else if dna >= 25 {
        return 14.0
      } else {
        return 7.0
      }
    }
  }

  pub resource Dappy {
    pub let id: UInt64
    pub let data: Template

    init(templateID: UInt32) {
      pre {
        DappyContract.templates[templateID] != nil : "Could not create dappy: template does not exist."
      }
      let dappy = DappyContract.templates[templateID]!
      DappyContract.totalDappies = DappyContract.totalDappies + 1
      self.id = DappyContract.totalDappies
      self.data = Template(templateID: templateID, dna: dappy.dna, name: dappy.name)
    }
  }

  pub resource Admin {
    pub fun createTemplate(dna: String, name: String): UInt32 {
      pre {
        dna.length > 0 : "Could not create template: dna is required."
        name.length > 0 : "Could not create template: name is required."
      }
      let newDappyID = DappyContract.nextTemplateID
      DappyContract.templates[newDappyID] = Template(templateID: newDappyID, dna: dna, name: name)
      DappyContract.nextTemplateID = DappyContract.nextTemplateID + 1
      return newDappyID
    }

    pub fun destroyTemplate(dappyID: UInt32) {
      pre {
        DappyContract.templates[dappyID] != nil : "Could not delete template: template does not exist."
      }
      DappyContract.templates.remove(key: dappyID)
    }
  }

  pub resource interface CollectionPublic {
    pub fun deposit(token: @Dappy)
    pub fun getIDs(): [UInt64]
    pub fun listDappies(): {UInt64: Template}
  }

  pub resource interface Provider {
    pub fun withdraw(withdrawID: UInt64): @Dappy
  }

  pub resource interface Receiver{
    pub fun deposit(token: @Dappy)
    pub fun batchDeposit(collection: @Collection)
  }

  pub resource Collection: CollectionPublic, Provider, Receiver {
    pub var ownedDappies: @{UInt64: Dappy}

    pub fun withdraw(withdrawID: UInt64): @Dappy {
      let token <- self.ownedDappies.remove(key: withdrawID)
        ?? panic("Could not withdraw dappy: dappy does not exist in collection")
      return <-token
    }

    pub fun deposit(token: @Dappy) {
      let oldToken <- self.ownedDappies[token.id] <- token
      destroy oldToken
    }

    pub fun batchDeposit(collection: @Collection) {
      let keys = collection.getIDs()
      for key in keys {
        self.deposit(token: <-collection.withdraw(withdrawID: key))
      }
      destroy collection
    }

    pub fun getIDs(): [UInt64] {
      return self.ownedDappies.keys
    }

    pub fun listDappies(): {UInt64: Template} {
      var dappyTemplates: {UInt64:Template} = {}
      for key in self.ownedDappies.keys {
        let el = &self.ownedDappies[key] as &Dappy
        dappyTemplates.insert(key: el.id, el.data)
      }
      return dappyTemplates
    }

    destroy() {
      destroy self.ownedDappies
    }

    init() {
      self.ownedDappies <- {}
    }
  }

  pub fun createEmptyCollection(): @Collection {
    return <-create self.Collection()
  }

  pub fun mintDappy(templateID: UInt32, paymentVault: @FungibleToken.Vault): @Dappy {
    pre {
      self.templates[templateID] != nil : "Could not mint dappy: dappy with given ID does not exist."
      paymentVault.balance >= self.templates[templateID]!.price : "Could not mint dappy: payment balance insufficient."
    }
    destroy paymentVault
    return <- create Dappy(templateID: templateID)
  }

  pub fun listTemplates(): {UInt32: Template} {
    return self.templates
  }


  init() {
    self.templates = {}
    self.totalDappies = 0
    self.nextTemplateID = 1
    self.CollectionStoragePath = /storage/DappyCollection
    self.CollectionPublicPath = /public/DappyCollectionPublic
    self.AdminStoragePath = /storage/DappyAdmin
    self.account.save<@Admin>(<- create Admin(), to: self.AdminStoragePath)
  }

}