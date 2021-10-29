import CarPartV3 from 0x8b7cf187194b75df

pub fun main(id:UInt64): String? {
  let name = CarPartV3.getEngineName(id:id)
  return name
}