import CarPartV3 from 0x8b7cf187194b75df

pub fun main(addr: Address): {UInt64: CarPartV3.EngineData} {
  let account = getAccount(addr)
  let ref = account.getCapability<&{CarPartV3.CollectionPublic}>(CarPartV3.CollectionPublicPath)
              .borrow() ?? panic("Cannot borrow reference")
  let engine = ref.listEngines()
  return engine
}