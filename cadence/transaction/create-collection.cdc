import CarPartV1 from 0xac07e3a9cadab655

transaction {
  prepare(signer: AuthAccount) {
    let collection <- CarPartV1.createEmptyCollection()
    signer.save<@CarPartV1.Collection>(<-collection, to: CarPartV1.CollectionStoragePath)
    signer.link<&{CarPartV1.CollectionPublic}>(CarPartV1.CollectionPublicPath, target: CarPartV1.CollectionStoragePath)
  }
}