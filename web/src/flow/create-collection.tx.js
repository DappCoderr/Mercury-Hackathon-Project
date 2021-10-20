export const CREATE_COLLECTION = `
  import CaryptoContract from 0xCarypto

  transaction{
    prepare(signer:AuthAccount) {
      let partStorage <- CaryptoContract.createEmptyPartStorage()
      signer.save<@CaryptoContract.PartStorage>(<-partStorage, to: /storage/PartStoragePath)
      signer.link<&{CaryptoContract.PartReceiver}>(/public/PartStoragePublicPath, target: /storage/PartStoragePath)
      log("Partstorage added in your account")
    }
  }
`;
