import CarPart from 0xe49c60ae5eb5e80c

  pub fun main(addr: Address): Bool {
    let ref = getAccount(addr).getCapability<&{CarPart.CollectionPublic}>(CarPart.CollectionPublicPath).check()
    return ref
  }