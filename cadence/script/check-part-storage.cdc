import CarPart from 0x7896d69e23dd95a4
  
  pub fun main(addr: Address): Bool {
    let ref = getAccount(addr).getCapability<&{CarPart.PartReceiver}>(/public/PartStoragePath).check()
    return ref
  }