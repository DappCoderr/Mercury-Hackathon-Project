import CarPart from 0xe49c60ae5eb5e80c


pub fun main(addr: Address): {UInt64: CarPart.TyreData} {
  let account = getAccount(addr)
  let ref = account.getCapability<&{CarPart.CollectionPublic}>(CarPart.CollectionPublicPath)
              .borrow() ?? panic("Cannot borrow reference")
  let tyre = ref.listTyres()
  return tyre
}