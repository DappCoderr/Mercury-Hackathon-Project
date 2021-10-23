export const CREATE_COLLECTION = `
  import CarPart from 0xCarypto

  transaction{
    prepare(signer:AuthAccount) {
      let partStorage <- CarPart.createEmptyPartStorage()
      signer.save<@CarPart.PartStorage>(<-partStorage, to: /storage/PartStoragePath)
      signer.link<&{CarPart.PartReceiver}>(/public/PartStoragePath, target:/storage/PartStoragePath)
      //log("Partstorage added in account")
    }
  }
`;
