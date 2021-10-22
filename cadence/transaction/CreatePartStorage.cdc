import CarPart from 0x01

transaction{
  prepare(signer:AuthAccount) {
    let partStorage <- CarPart.createEmptyPartStorage()
    signer.save<@CarPart.PartStorage>(<-partStorage, to: /storage/PartStoragePath)
    signer.link<&{CarPart.PartReceiver}>(/public/PartStoragePath, target:/storage/PartStoragePath)
    //log("Partstorage added in account")
  }
}