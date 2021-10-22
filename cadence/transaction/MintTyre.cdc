import CarPart from 0x01

transaction(recipient:Address, name:String weight:UInt64, type:String) {

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
        self.minter.mintTyre(recipient: receiver, name: name, weight: weight, type: type)
    }
}