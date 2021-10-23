export const CHECK_COLLECTION = `
  import CarPart from 0xCarypto

  pub fun main(addr: Address): Bool {
    let ref = getAccount(addr).getCapability<&{CarPart.PartReceiver}>(/public/PartStoragePath).check()
    return ref
  }
`;
