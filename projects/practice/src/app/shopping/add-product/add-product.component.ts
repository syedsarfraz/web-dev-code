import { ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { autoId } from '../../auto-id';
import { ModelDirective } from '../../app-model.directive';
import { API_BASE } from '../api-base.token';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product-list/product-list.component';

@Component({
  templateUrl: './add-product.component.html',
  standalone: true,
  imports: [ModelDirective],
})
export class AddProductComponent {
  apiBase = inject(API_BASE);
  router = inject(Router);
  route = inject(ActivatedRoute);

  mode: 'edit' | undefined = this.route.snapshot.data['mode'];

  oldProduct!: Product;

  // cdr = inject(ChangeDetectorRef)

  productName = signal('');

  variants = signal<{ id: string; name: string }[]>([]);

  productVariants = signal<
    {
      id: string;
      quantity: string;
      price: string;
      variantMap: Record<string, string>;
    }[]
  >([]);

  constructor() {
    this.addProductRow();

    if (this.mode === 'edit') {
      const id = this.route.snapshot.paramMap.get('id')!;
      this.updateProductData(id);
    }
  }

  async updateProductData(id: string) {
    const res = await fetch(
      `${this.apiBase}/products/${id}?_embed=productVariants`
    );
    if (res.status === 404) return console.log('not-found');

    if (!res.ok) return console.log('unknown error');

    const product: Product = await res.json();
    this.oldProduct = product;

    this.productName.set(product.name);

    this.variants.set(
      Object.keys(product.productVariants[0].variantMap).map((key) => ({
        id: autoId(),
        name: key,
      }))
    );

    this.productVariants.set(
      product.productVariants.map(({ id, price, quantity, variantMap }) => {
        return {
          id,
          price: price.toString(),
          quantity: quantity.toString(),
          variantMap: this.variants().reduce((map, variant) => {
            map[variant.id] = variantMap[variant.name];
            return map;
          }, {} as Record<string, string>),
        };
      })
    );

    // this.cdr.detectChanges()
  }

  addVariant() {
    const id = autoId();
    this.variants.update((variants) => variants.concat({ id, name: '' }));

    this.productVariants.update((productVariants) =>
      productVariants.map((product) => ({
        ...product,
        variantMap: { ...product.variantMap, [id]: '' },
      }))
    );
  }
  removeVariant(index: number) {
    const item = this.variants()[index];
    this.variants.update((variants) => {
      variants.splice(index, 1);
      return variants.slice(); // copy an array
    });

    this.productVariants.update((productVariants) =>
      productVariants.map((product) => {
        delete product.variantMap[item.id];
        return {
          ...product,
          variantMap: { ...product.variantMap },
        };
      })
    );
  }

  addProductRow() {
    this.productVariants.update((productVariants) => {
      return productVariants.concat({
        id: autoId(),
        quantity: '',
        price: '',
        variantMap: this.variants().reduce((map, variant) => {
          map[variant.id] = '';
          return map;
        }, {} as Record<string, string>),
      });
    });
  }

  removeProductRow(index: number) {
    this.productVariants.update((productVariants) => {
      productVariants.splice(index, 1);
      return productVariants.slice();
    });
  }

  async saveProduct() {
    if (this.mode === 'edit') return this.editProduct();
    return this.addProduct();
  }

  async addProduct() {
    const product = { name: this.productName() };
    const productVariants = this.productVariants().map((productVariant) => {
      return {
        ...productVariant,
        price: Number(productVariant.price),
        quantity: Number(productVariant.quantity),
        variantMap: this.variants().reduce((map, variant) => {
          map[variant.name] = productVariant.variantMap[variant.id];
          return map;
        }, {} as Record<string, string>),
      };
    });

    const res = await fetch(`${this.apiBase}/products`, {
      method: 'POST',
      body: JSON.stringify(product),
    });
    if (res.ok) {
      const productData: { id: string } = await res.json();

      for (let { id, ...productVariant } of productVariants) {
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

  async editProduct() {
    const promises: Promise<unknown>[] = []

    promises.push(fetch(`${this.apiBase}/products/${this.oldProduct.id}`, {
      method: 'PUT',
      body: JSON.stringify({ name: this.productName() }),
    }));

    const oldPvIds = this.oldProduct.productVariants.map((pv) => pv.id);
    const currentPvIds = this.productVariants().map((pv) => pv.id);
    const productVariantMap = this.productVariants().reduce(
      (map, { id, ...pv }) => {
        map[id] = {
          ...pv,
          productId: this.oldProduct.id,
          price: Number(pv.price),
          quantity: Number(pv.quantity),
          variantMap: this.variants().reduce((map, variant) => {
            map[variant.name] = pv.variantMap[variant.id];
            return map;
          }, {} as Record<string, string>),
        };
        return map;
      },
      {} as Record<string, Omit<Product['productVariants'][0], 'id'>>
    );

    const pvIdsMap = {
      create: [] as string[],
      update: [] as string[],
      remove: [] as string[],
    };

    oldPvIds.concat(currentPvIds).forEach((id) => {
      if (oldPvIds.includes(id) && currentPvIds.includes(id))
        pvIdsMap.update.includes(id) || pvIdsMap.update.push(id);
      else if (!oldPvIds.includes(id) && currentPvIds.includes(id))
        pvIdsMap.create.push(id);
      else if (oldPvIds.includes(id) && !currentPvIds.includes(id))
        pvIdsMap.remove.push(id);
    });

    for (const rmId of pvIdsMap.remove) {
      promises.push(fetch(`${this.apiBase}/productVariants/${rmId}`, { method: 'DELETE' }));
    }
    for (const createId of pvIdsMap.create) {
      promises.push(fetch(`${this.apiBase}/productVariants`, {
        method: 'POST',
        body: JSON.stringify(productVariantMap[createId]),
      }));
    }
    for (const updateId of pvIdsMap.update) {
      promises.push(fetch(`${this.apiBase}/productVariants/${updateId}`, {
        method: 'PUT',
        body: JSON.stringify(productVariantMap[updateId]),
      }));
    }

    await Promise.all(promises)

    alert('Product updated')

    this.router.navigate(['shopping', 'products'])
  }
}
