import CarPartV3 from 0x8b7cf187194b75df

transaction(id1: UInt64, id2: UInt64, id3: UInt64) {
  let receiverReference: &CarPartV3.Collection{CarPartV3.Receiver}

  prepare(acct: AuthAccount) {
    self.receiverReference = acct.borrow<&CarPartV3.Collection>(from: CarPartV3.CollectionStoragePath)?? panic("Cannot borrow")

  }

  execute {
    let newEngine <- CarPartV3.mintEngine(dataID:id1)
    self.receiverReference.depositEngine(token: <-newEngine)

    let newBody <- CarPartV3.mintBody(dataID:id2)
    self.receiverReference.depositBody(token: <-newBody)

    let newTyre <- CarPartV3.mintTyre(dataID:id3)
    self.receiverReference.depositTyre(token: <-newTyre)
  }
}