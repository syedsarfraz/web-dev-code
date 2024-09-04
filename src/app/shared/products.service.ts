import { computed, Injectable, signal } from '@angular/core';

class Product {
  id = autoId();

  readonly selected = signal(false);
  readonly qty = signal(1);
  constructor(
    public name: string,
    public price: number,
    public image: string
  ) {}

  toggleSelect() {
    this.selected.set(!this.selected());
  }

  increment() {
    this.qty.set(this.qty() + 1);
  }
  decrement() {
    if (this.qty() > 1) this.qty.set(this.qty() - 1);
  }
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  products: Product[] = []

  readonly selectedProducts = computed(() => {
    return this.products.filter((product) => product.selected());
  });

  calculateTotal = computed(() => {
    return this.selectedProducts().reduce(
      (sum, product) => sum + product.price * product.qty(),
      0
    );
  });

  constructor() {
    this.reset()
  }

  placeOrder() {
    // place order
    this.reset()
    return this.createOrderId()
  }

  private createOrderId() {
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += String.fromCharCode(Math.floor(Math.random() * 26) + 65);
    }
    return code;
    // return Date.now().toString(16);
  }

  private reset() {
    this.products = [
      new Product('Fries', 100, '/assets/French fries image.webp'),
      new Product(
        'Burger',
        200,
        '/assets/Airfryer Chicken Sandwich from YouTube.webp'
      ),
      new Product(
        'Cheese Burger',
        250,
        '/assets/Chicken Cheese Burger Recipe.jpg'
      ),
      new Product('Nuggets', 180, '/assets/Chicken Nuggets Image.jpeg'),
      new Product('Broast Quarter', 200, '/assets/Spicy Broaster Chicken.jpg'),
      new Product('Broast Half', 350, '/assets/Spicy Broaster Chicken.jpg'),
      new Product('Broast Full', 650, '/assets/Spicy Broaster Chicken.jpg'),
    ];
  }
}

let _id = 0;
function autoId() {
  return ++_id;
}
