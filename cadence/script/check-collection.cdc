import CarPart from 0xac07e3a9cadab655

  pub fun main(addr: Address): Bool {
    let ref = getAccount(addr).getCapability<&{CarPart.CollectionPublic}>(CarPart.CollectionPublicPath).check()
    return ref
  }