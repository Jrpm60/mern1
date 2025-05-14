const { ShoppingCart } = require('./shoppingCart');


describe('Test Shopping cart', ()=> {

    test('getItemCount', () => {
        const cart = new ShoppingCart("Euro")

        expect(cart.getItemCount()).toBe(0);

        cart.addItem({id:1, nombre: "camiseta", precio:2.99, cantidad: 1})
        expect(cart.getItemCount()).toBe(1);

        cart.addItem({id:2, nombre: "pantalon", precio:3.99, cantidad: 1})
        expect(cart.getItemCount()).toBe(2);

        const items = cart.getItems();
        expect(items.length).toBe(2);

        cart.clearCart();
        expect(cart.getItemCount()).toBe(0);

    });

})