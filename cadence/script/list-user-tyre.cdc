import CarPartV3 from 0x8b7cf187194b75df

pub fun main(addr: Address): {UInt64: CarPartV3.TyreData} {
  let account = getAccount(addr)
  let ref = account.getCapability<&{CarPartV3.CollectionPublic}>(CarPartV3.CollectionPublicPath)
              .borrow() ?? panic("Cannot borrow reference")
  let tyre = ref.listTyres()
  return tyre
}