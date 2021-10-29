import CarPart from 0xe49c60ae5eb5e80c

transaction {
  prepare(signer: AuthAccount) {
    let collection <- CarPart.createEmptyCollection()
    signer.save<@CarPart.Collection>(<-collection, to: CarPart.CollectionStoragePath)
    signer.link<&{CarPart.CollectionPublic}>(CarPart.CollectionPublicPath, target: CarPart.CollectionStoragePath)
  }
}