import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { API_BASE } from '../api-base.token';

interface ProductVariant {
  id: string;
  color: string;
  price: number;
  quantity: number;
}

interface Product {
  id: string;
  name: string;
  productVariants: ProductVariant[];
}

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [],
  templateUrl: './product-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent {
  apiBase = inject(API_BASE);

  loading = signal(false);
  products = signal<Product[]>([]);
  productVariantSelection = signal<Record<string, string>>({});

  constructor() {
    this.loadProducts();
  }

  getSelectedVariant(product: Product) {
    const selection = this.productVariantSelection();
    const selectedVariantId =
      selection[product.id] ?? product.productVariants[0].id;
    return product.productVariants.find(
      (variant) => variant.id === selectedVariantId
    )!;
  }

  selectVariant(productId: string, variantId: string) {
    this.productVariantSelection.update((selection) => {
      return { ...selection, [productId]: variantId };
    });
  }

  async loadProducts() {
    // fetch(`${this.apiBase}/products?_embed=productVariants`).then((res) => {
    //   res.json().then((data: Product[]) => {

    //   });
    // });

    // fetch(`${this.apiBase}/products?_embed=productVariants`)
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((data: Product[]) => {
    //     this.products = data;
    //   });

    this.loading.set(true);
    const res = await fetch(`${this.apiBase}/products?_embed=productVariants`);
    const data: Product[] = await res.json();
    this.products.set(data);
    this.loading.set(false);
  }
}
