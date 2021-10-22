import CarPart from 0x01

pub fun main(engineID:UInt64) {
  let engineName = CarPart.getEngineName(EngineID: engineID)
  log(engineName)
}