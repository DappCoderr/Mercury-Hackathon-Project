import CarPart from 0xe49c60ae5eb5e80c

transaction(id1: UInt64, id2: UInt64, id3: UInt64) {
  let receiverReference: &CarPart.Collection{CarPart.Receiver}

  prepare(acct: AuthAccount) {
    self.receiverReference = acct.borrow<&CarPart.Collection>(from: CarPart.CollectionStoragePath)?? panic("Cannot borrow")

  }

  execute {
    let newEngine <- CarPart.mintEngine(dataID:id1)
    self.receiverReference.depositEngine(token: <-newEngine)

    let newBody <- CarPart.mintBody(dataID:id2)
    self.receiverReference.depositBody(token: <-newBody)

    let newTyre <- CarPart.mintTyre(dataID:id3)
    self.receiverReference.depositTyre(token: <-newTyre)
  }
}