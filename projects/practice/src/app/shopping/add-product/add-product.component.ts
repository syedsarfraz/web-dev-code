import { Component } from '@angular/core';
import { autoId } from '../../auto-id';
import { ModelDirective } from '../../app-model.directive';

@Component({
  templateUrl: './add-product.component.html',
  standalone: true,
  imports: [ModelDirective],
})
export class AddProductComponent {
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

  saveProduct() {
    console.log(this.productVariants);
  }
}
