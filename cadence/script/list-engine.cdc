import CarPartV3 from 0x8b7cf187194b75df

pub fun main(): {UInt64: CarPartV3.EngineData} {
  let engine = CarPartV3.listEngine()
  return engine
}