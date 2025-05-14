class ShoppingCart {
    constructor (currency) {
        this.items = []
        this.currency = currency;
    }

    getItemCount() {
        return this.items.length;
    }

    addItem(item) {
        this.items.push(item);
    }

    clearCart() {
        this.items=[];
    }

    getItems() {
        return this.items;
    }

}

module.exports = {ShoppingCart};