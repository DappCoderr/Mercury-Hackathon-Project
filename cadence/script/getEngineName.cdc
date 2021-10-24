import CarPart from 0x7896d69e23dd95a4

pub fun main(engineID:UInt64): String {
  let engineName = CarPart.getEngineName(EngineID: engineID)
  return engineName
}