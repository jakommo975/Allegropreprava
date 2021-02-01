export default class Product {
    constructor(id, imgUrl=null, name=null, price=null, purchasesCount=null, isChecking=false, exists=true, checked=false){
        this.id = id;
        this.imgUrl = imgUrl;
        this.name = name;
        this.price = price;
        this.purchasesCount = purchasesCount;
        this.isChecking = isChecking;
        this.exists = exists;
        this.checked = checked;
    }
}