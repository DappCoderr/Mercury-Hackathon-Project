import CarPart from 0xe49c60ae5eb5e80c

transaction(name: String, efficiency:UInt64, url:String, hp:UInt64, type:String) {

    var adminRef: &CarPart.Admin

    prepare(signer:AuthAccount){
        self.adminRef = signer.borrow<&CarPart.Admin>(from: CarPart.AdminStoragePath) ?? panic("Could not borrow admin ref")
    }
    execute{
        self.adminRef.createEngine(name: name, efficiency:efficiency, url:url, hp:hp, type:type)
    }
}