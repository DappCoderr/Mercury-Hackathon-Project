<<<<<<< HEAD
import CarPart from 0x7896d69e23dd95a4

transaction(recipient:Address, name:String, type:String) {
=======
import CarPart from 0x01

transaction(recipient:Address, name:String type:String) {
>>>>>>> 6d990f56a6c659da75f2b10e85c9d0af52fc9784

    let minter: &CarPart.Admin

    prepare(signer:AuthAccount){


        self.minter = signer.borrow<&CarPart.Admin>(from: /storage/Admin)
            ?? panic("Could not borrow refrence")
    }
    execute{
        let recipient = getAccount(recipient)
        let receiver = recipient
            .getCapability(/public/PartStoragePath)
            .borrow<&{CarPart.PartReceiver}>()
            ?? panic("Could not get receiver reference to the NFT Collection")
        self.minter.mintBody(recipient: receiver, name: name, type: type)
    }
}