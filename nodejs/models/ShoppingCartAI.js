class ShoppingCart {
    items = [];
    currency;
  
    constructor(currency = 'EUR') {
      this.currency = currency;
    }
  
    addItem(item) {
      this.items.push(item);
    }
  
    removeItem(id) {
      this.items = this.items.filter(item => item.id !== id);
    }
  
    clearCart() {
      this.items = [];
    }
  
    getTotal() {
      return this.items.reduce((sum, item) => sum + item.price, 0);
    }
  
    formatTotal() {
      const total = this.getTotal();
      return new Intl.NumberFormat('es-ES', { style: 'currency', currency: this.currency }).format(total);
    }
  
    getItems() {
      return [...this.items]; // Return a copy to avoid external modification
    }
  
    getItemCount() {
      return this.items.length;
    }
  }
  
  class Item {
    id;
    name;
    price;
  
    constructor(id, name, price) {
      this.id = id;
      this.name = name;
      this.price = price;
    }
  }
  
  // Ejemplo de uso:
  const cart = new ShoppingCart('USD');
  const item1 = new Item('prod1', 'Camiseta', 25.99);
  const item2 = new Item('prod2', 'Pantalón', 49.50);
  
  cart.addItem(item1);
  cart.addItem(item2);
  
  console.log('Items en el carrito:', cart.getItems());
  console.log('Número de items:', cart.getItemCount());
  console.log('Total sin formato:', cart.getTotal());
  console.log('Total formateado:', cart.formatTotal());
  
  cart.removeItem('prod1');
  console.log('Items después de eliminar uno:', cart.getItems());
  console.log('Total después de eliminar:', cart.formatTotal());
  
  cart.clearCart();
  console.log('Carrito después de limpiar:', cart.getItems());