import CarPartV3 from 0x8b7cf187194b75df

transaction(id: UInt64) {
  let receiverReference: &CarPartV3.Collection{CarPartV3.Receiver}

  prepare(acct: AuthAccount) {
    self.receiverReference = acct.borrow<&CarPartV3.Collection>(from: CarPartV3.CollectionStoragePath)?? panic("Cannot borrow")
  }

  execute {
    let newBody <- CarPartV3.mintBody(dataID:id)
    self.receiverReference.deposit(token: <-newBody)
  }
}