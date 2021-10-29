import CarPartV3 from 0x8b7cf187194b75df

  pub fun main(addr: Address): Bool {
    let ref = getAccount(addr).getCapability<&{CarPartV3.CollectionPublic}>(CarPartV3.CollectionPublicPath).check()
    return ref
  }