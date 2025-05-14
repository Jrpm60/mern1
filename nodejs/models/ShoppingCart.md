
+---------------------+
|    ShoppingCart     |
+---------------------+
| - items: Item[]     |
| + currency: string  |
+------------------------------------+
| +addItem(item: Item): void         |
| +removeItem(id: string): void      |
| +clearCart(): void                 |
| +getTotal(): number                |
| +formatTotal(): string             |
| +getItems(): Item[]                |
| +getItemCount(): number            |
+------------------------------------+

         ▲
         |
         | contains
         |
+---------------------+
|        Item         |
+---------------------+
| - id: string        |
| - name: string      |
| - price: number     |
| - quantity: number  |
+---------------------+
