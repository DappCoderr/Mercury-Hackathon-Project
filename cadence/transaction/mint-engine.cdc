import CarPartV1 from 0xac07e3a9cadab655

transaction(dataID: UInt64) {
  let receiverReference: &CarPartV1.Collection{CarPartV1.Receiver}

  prepare(acct: AuthAccount) {
    self.receiverReference = acct.borrow<&CarPartV1.Collection>(from: CarPartV1.CollectionStoragePath)?? panic("Cannot borrow")
  }

  execute {
    let newEngine <- CarPartV1.mintEngine(dataID: dataID)
    self.receiverReference.deposit(token: <-newEngine)
  }
}