import CarPartV1 from 0xac07e3a9cadab655

transaction(name: String, efficiency: UInt64, hp: UInt64, url: String, type: String) {

  var adminRef: &CarPartV1.Admin

  prepare(acct: AuthAccount) {
    self.adminRef = acct.borrow<&CarPartV1.Admin>(from: CarPartV1.AdminStoragePath) ?? panic("Cannot borrow admin ref")
  }

  execute {
    self.adminRef.createData(name: name, efficiency: efficiency, hp: hp, url: url, type: type)
  }
}