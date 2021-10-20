export const CHECK_COLLECTION = `
  import CaryptoContract from 0xCarypto

  pub fun main(addr: Address): Bool {
    let ref = getAccount(addr).getCapability<&{CaryptoContract.CollectionPublic}>(CaryptoContract.CollectionPublicPath).check()
    return ref
  }
`;
