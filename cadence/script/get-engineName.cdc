import CarPart from 0xe49c60ae5eb5e80c

pub fun main(id:UInt64): String? {
  let name = CarPart.getEngineName(id:id)
  return name
}