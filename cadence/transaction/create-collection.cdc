import CarPartV3 from 0x8b7cf187194b75df

transaction {
  prepare(signer: AuthAccount) {
    let collection <- CarPartV3.createEmptyCollection()
    signer.save<@CarPartV3.Collection>(<-collection, to: CarPartV3.CollectionStoragePath)
    signer.link<&{CarPartV3.CollectionPublic}>(CarPartV3.CollectionPublicPath, target: CarPartV3.CollectionStoragePath)
  }
}