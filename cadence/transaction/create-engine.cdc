import CarPartV3 from 0x8b7cf187194b75df

transaction(name: String, efficiency:UInt64, url:String, hp:UInt64, type:String) {

    var adminRef: &CarPartV3.Admin

    prepare(signer:AuthAccount){
        self.adminRef = signer.borrow<&CarPartV3.Admin>(from: CarPartV3.AdminStoragePath) ?? panic("Could not borrow admin ref")
    }
    execute{
        self.adminRef.createEngine(name: name, efficiency:efficiency, url:url, hp:hp, type:type)
    }
}