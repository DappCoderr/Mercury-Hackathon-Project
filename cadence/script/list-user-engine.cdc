import CarPartV1 from 0xac07e3a9cadab655

pub fun main(addr: Address): {UInt64: CarPartV1.Data} {
  let account = getAccount(addr)
  let ref = account.getCapability<&{CarPartV1.CollectionPublic}>(CarPartV1.CollectionPublicPath)
              .borrow() ?? panic("Cannot borrow reference")
  let engine = ref.listEngines()
  return engine
}