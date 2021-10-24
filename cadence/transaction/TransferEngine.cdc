<<<<<<< HEAD
import CarPart from 0x7896d69e23dd95a4
=======
import CarPart from 0x01
>>>>>>> 6d990f56a6c659da75f2b10e85c9d0af52fc9784

transaction(recipient: Address, withdrawID: UInt64) {

    prepare(signer: AuthAccount) {
        
        let recipient = getAccount(recipient)
        let partStorageRef = signer.borrow<&CarPart.PartStorage>(from: /storage/PartStorage)
            ?? panic("Could not borrow a reference to the owner's collection")

        let depositRef = recipient.getCapability(/public/PartStorage).borrow<&{CarPart.StoragePublic}>()!
        let nft <- partStorageRef.withdrawEngine(withdrawID: withdrawID)

        depositRef.depositEngine(token: <-nft)
    }
}