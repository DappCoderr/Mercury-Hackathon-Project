import CarPart from 0xe49c60ae5eb5e80c

transaction(name: String, url:String, type:String) {

    var adminRef: &CarPart.Admin

    prepare(signer:AuthAccount){
        self.adminRef = signer.borrow<&CarPart.Admin>(from: CarPart.AdminStoragePath) ?? panic("Could not borrow admin ref")
    }
    execute{
        self.adminRef.createTyre(name: name, url:url, type:type)
    }
}