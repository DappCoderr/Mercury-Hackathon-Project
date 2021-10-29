import CarPart from 0xe49c60ae5eb5e80c

pub fun main(): {UInt64: CarPart.BodyData} {
  let body = CarPart.listBody()
  return body
}