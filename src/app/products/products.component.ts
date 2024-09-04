import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  signal
} from '@angular/core';

interface Product {
  id: number;
  name: string;
  price: number;
}

@Component({
  selector: 'app-products',
  standalone: true,
  templateUrl: './products.component.html',
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent {

  products: Product[] = [
    { id: 1, name: 'Fries', price: 100 },
    { id: 2, name: 'Burger', price: 200 },
    { id: 3, name: 'Cheese Burger', price: 250 },
    { id: 4, name: 'Nuggets', price: 180 },
    { id: 5, name: 'Broast Quarter', price: 200 },
    { id: 6, name: 'Broast Half', price: 350 },
    { id: 7, name: 'Broast Full', price: 650 },
  ];

  // interval = setInterval(() => {
  //   this.products.pop()
  // }, 3000)

  selected = signal<number[]>([]);

  toggleSelectProduct(product: Product) {
    this.selected.update((selected) => {
      const index = selected.indexOf(product.id);
      if (index === -1) selected.push(product.id);
      else selected.splice(index, 1);
      return selected;
    });
  }

  isSelected(product: Product) {
    return this.selected().includes(product.id);
  }

  orderQtyMap = signal<Record<number, number>>({});

  increment(product: Product) {
    this.orderQtyMap.update((map) => {
      if (!map[product.id]) map[product.id] = 1;
      map[product.id]++;
      return map;
    });
  }
  decrement(product: Product) {
    this.orderQtyMap.update((map) => {
      if (!map[product.id]) map[product.id] = 1;
      if (map[product.id] > 1) map[product.id]--;
      return map;
    });
  }

  getQty(product: Product) {
    return this.orderQtyMap()[product.id] || 1;
  }
}
