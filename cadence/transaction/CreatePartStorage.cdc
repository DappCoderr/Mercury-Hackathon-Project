<<<<<<< HEAD
import CarPart from 0x7896d69e23dd95a4
=======
import CarPart from 0x01
>>>>>>> 6d990f56a6c659da75f2b10e85c9d0af52fc9784

transaction{
  prepare(signer:AuthAccount) {
    let partStorage <- CarPart.createEmptyPartStorage()
    signer.save<@CarPart.PartStorage>(<-partStorage, to: /storage/PartStoragePath)
    signer.link<&{CarPart.PartReceiver}>(/public/PartStoragePath, target:/storage/PartStoragePath)
    //log("Partstorage added in account")
  }
}