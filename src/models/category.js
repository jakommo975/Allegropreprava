export class Category {
    constructor(id, name=null, isChecking=false, exists=true, checked=false){
        this.id = id;
        this.name = name;
        this.isChecking = isChecking;
        this.exists = exists;
        this.checked = checked;
    }
}