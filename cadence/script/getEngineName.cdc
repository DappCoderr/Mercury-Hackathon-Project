<<<<<<< HEAD
import CarPart from 0x7896d69e23dd95a4

pub fun main(engineID:UInt64): String {
  let engineName = CarPart.getEngineName(EngineID: engineID)
  return engineName
=======
import CarPart from 0x01

pub fun main(engineID:UInt64) {
  let engineName = CarPart.getEngineName(EngineID: engineID)
  log(engineName)
>>>>>>> 6d990f56a6c659da75f2b10e85c9d0af52fc9784
}