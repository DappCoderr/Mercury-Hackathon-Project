import CarPart from 0xe49c60ae5eb5e80c


pub fun main(addr: Address): {UInt64: CarPart.EngineData} {
  let account = getAccount(addr)
  let ref = account.getCapability<&{CarPart.CollectionPublic}>(CarPart.CollectionPublicPath)
              .borrow() ?? panic("Cannot borrow reference")
  let engine = ref.listEngines()
  return engine
}