import CarPart from 0x7896d69e23dd95a4

transaction(recipient: Address, withdrawID: UInt64) {

    prepare(signer: AuthAccount) {

        let recipient = getAccount(recipient)
        let partStorageRef = signer.borrow<&CarPart.PartStorage>(from: /storage/PartStorage)
            ?? panic("Could not borrow a reference to the owner's collection")

        let depositRef = recipient.getCapability(/public/PartStorage).borrow<&{CarPart.StoragePublic}>()!
        let nft <- partStorageRef.withdrawTyre(withdrawID: withdrawID)

        depositRef.depositTyre(token: <-nft)
    }
}