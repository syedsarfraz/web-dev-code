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
  readonly products = [
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

  readonly selectedProducts = computed(() => {
    return this.products.filter((product) => product.selected());
  });

  calculateTotal = computed(() => {
    return this.selectedProducts().reduce(
      (sum, product) => sum + product.price * product.qty(),
      0
    );
  });
}

let _id = 0;
function autoId() {
  return ++_id;
}
