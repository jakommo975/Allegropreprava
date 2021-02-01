export default class Item {
    constructor(id, x, y, w, h){
        this.id = id;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.imgUrl = null;
        this.type = null;
        this.subCategory = null;
        this.products = [];
        this.productsOrientation = null;
        this.i = id;
        this.serverId = null;
        this.categories = [];
        this.categoriesName = null;
        this.filters = null;
        this.bannerCategory = null;
    }
}


