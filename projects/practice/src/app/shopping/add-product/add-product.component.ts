import { Component, inject } from '@angular/core';
import { autoId } from '../../auto-id';
import { ModelDirective } from '../../app-model.directive';
import { API_BASE } from '../api-base.token';
import { Router } from '@angular/router';

@Component({
  templateUrl: './add-product.component.html',
  standalone: true,
  imports: [ModelDirective],
})
export class AddProductComponent {
  apiBase = inject(API_BASE);
  router = inject(Router);

  productName = '';

  variants: { id: string; name: string }[] = [];

  productVariants: {
    id: string;
    quantity: string;
    price: string;
    variantMap: Record<string, string>;
  }[] = [];

  constructor() {
    this.addProductRow();
  }

  addVariant() {
    const id = autoId();
    this.variants.push({ id, name: '' });
    this.productVariants.forEach((product) => (product.variantMap[id] = ''));
  }
  removeVariant(index: number) {
    const [item] = this.variants.splice(index, 1);
    this.productVariants.forEach(
      (product) => delete product.variantMap[item.id]
    );
  }

  addProductRow() {
    this.productVariants.push({
      id: autoId(),
      quantity: '',
      price: '',
      variantMap: this.variants.reduce((map, variant) => {
        map[variant.id] = '';
        return map;
      }, {} as Record<string, string>),
    });
  }
  removeProductRow(index: number) {
    this.productVariants.splice(index, 1);
  }

  async saveProduct() {
    const product = { name: this.productName };
    const productVariants = this.productVariants.map(
      (productVariant) => {
        return {
          ...productVariant,
          variantMap: this.variants.reduce((map, variant) => {
            map[variant.name] = productVariant.variantMap[variant.id];
            return map;
          }, {} as Record<string, string>),
        };
      }
    );

    const res = await fetch(`${this.apiBase}/products`, {
      method: 'POST',
      body: JSON.stringify(product),
    });
    if (res.ok) {
      const productData: { id: string } = await res.json();

      for (let {id, ...productVariant} of productVariants) {
        const res = await fetch(`${this.apiBase}/productVariants`, {
          method: 'POST',
          body: JSON.stringify({
            ...productVariant,
            productId: productData.id,
          }),
        });
        if (res.ok) {
          if (id === productVariants[productVariants.length - 1].id) {
            alert('Product added successfully!');
            this.router.navigate(['shopping', 'products']);
          }
        }
      }
    }
  }
}
