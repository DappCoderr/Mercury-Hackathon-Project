import CarPart from 0x4570bb54bb566433

pub fun main(address: Address): Int {
    let account = getAccount(address)

    let collectionRef = account.getCapability(/public/PartStoragePath)

    let receiverRef = collectionRef.borrow<&{CarPart.PartReceiver}>()
        ?? panic("Could not borrow account receiver reference")
    // log("Account holds NFTs")
    return receiverRef.getIDs().length
}