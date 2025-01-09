import { Component, inject, signal, viewChild } from '@angular/core';
import { ModelDirective } from '../../../../practice/src/app/app-model.directive';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ExtractFromQuery, 
  JsonDB,
  NetworkError,
  ResponseError,
} from '../shared/json-db-adaptor';
import { autoId } from '../utils/auto-id';


interface Product {
  id: string;
  name: string;
  image: string; // Optional image field to store base64 string
}

interface ProductVariant {
  id: string;
  quantity: number;
  price: number;
  variantMap: Record<string, string>;
  productId: string;
}

@Component({
  templateUrl: './add-product.component.html',
  standalone: true,
  imports: [ModelDirective],
})
export class AddProductComponent {
  jsonDB = inject(JsonDB);
  productsCollection = this.jsonDB.collection<Product>('products');
  productVariantsCollection = this.jsonDB.collection<ProductVariant>('productVariants');
  router = inject(Router);
  route = inject(ActivatedRoute);

  placeholderImage = 'data:image/webp;base64,UklGRvwBAABXRUJQVlA4IPABAADQKACdASosASwBPpFIokwlpKOiIvMImLASCWlu4XShG/OIASOSoKjh043cAWAsBYCwFgLAWAsBYCwFgLAWAsBYCwFgLAWAsBYCwFgLAWAsBYCwFZrkpCKAwAgAsBYB4gbPe6pg7lDuRJ1frraP+UKY2kMPAryMvVKXyCo4cG2edJ7VgWwGmRpjXbn6/gg3ywjzMa5s0Zg43cAPXDAJ4F+bAZhXyQU1lu0aXFadcERy/oNOAB8HbX3ctu4AsA56J9dNs3db9S7KaX3hO3YuAjWM+stajNAqRL5BUJZfZf99EDkAnJDWInCiwVYyZkolEoXgALAWAq8zfUWjuxJTScN/XBgCaU2u4Ar7eBRlTjlfCJPoKDwUfE5N043cAWAsBYCwFgLAWAsBYCwFgLAWAsBYCwFgLAWAsBYCwFgLAWAsBYCwFgLAWAsBYCwFgLAVYAD+/ylAAAAS9V/Vk0ZPxZUCNppPJKh7pLkt/4RS0P0bqRzLQH6vyPdD13yrm6MQzR8dOFbcFMXavgW6+PEnL0dNkbAt70AGU2yrda/zDi1AKzZll5WAveEc+61qyJyZDlhMgHcc3Tk3KGqn228cxZr1xDeHmLCxkH1Txvtid5+ApSb/hxZmRN27FtZOArGVRast3K06HzSPi2EJ4AAAAAAA';
  image = signal(''); 

  productCollectionEmbedded = this.productsCollection.embed<{ productVariants: ProductVariant[]; }>('productVariants');
  mode: 'edit' | undefined = this.route.snapshot.data['mode'];
  oldProduct!: ExtractFromQuery<typeof this.productCollectionEmbedded>;

  productName = signal('');
  variants = signal<{ id: string; name: string }[]>([]);
  productVariants = signal<{ id: string; quantity: string; price: string; variantMap: Record<string, string>; }[]>([]);

  constructor() {
    this.addProductRow();

    if (this.mode === 'edit') {
      const id = this.route.snapshot.paramMap.get('id')!;
      this.updateProductData(id);
    }
  }

  onFile(e: Event) {
    const file = (e.target as HTMLInputElement).files![0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const url = reader.result as string;
      this.image.set(url); 
    };
    reader.readAsDataURL(file);
  }

  onResetFile(file: HTMLInputElement) {
    this.image.set('');
    file.value = '';
  }

  async updateProductData(id: string) {
    const product = await this.productCollectionEmbedded.get(id).catch((e: unknown) => {
      if (e instanceof NetworkError) console.log('network error');
      else if (e instanceof ResponseError) console.log('not-found');
    });

    if (!product) return;

    this.oldProduct = product;
    this.productName.set(product.name);
    if (product.image) {
      this.image.set(product.image); 
    }

    this.variants.set(Object.keys(product.productVariants[0].variantMap).map((key) => ({ id: autoId(), name: key })));

    this.productVariants.set(product.productVariants.map(({ id, price, quantity, variantMap }) => {
      return {
        id,
        price: price.toString(),
        quantity: quantity.toString(),
        variantMap: this.variants().reduce((map, variant) => {
          map[variant.id] = variantMap[variant.name];
          return map;
        }, {} as Record<string, string>),
      };
    }));
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
      return variants.slice(); 
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
    const product = {
      name: this.productName(),
      image: this.image() 
    };

    const productVariants = this.productVariants().map((productVariant) => ({
      ...productVariant,
      price: Number(productVariant.price),
      quantity: Number(productVariant.quantity),
      variantMap: this.variants().reduce((map, variant) => {
        map[variant.name] = productVariant.variantMap[variant.id];
        return map;
      }, {} as Record<string, string>),
    }));

    const productData = await this.productsCollection.create(product).catch((e) => {
      if (e instanceof NetworkError) console.log('network error');
    });
    if (!productData) return;

    for (const { id, ...productVariant } of productVariants) {
      await this.productVariantsCollection.create({
        ...productVariant,
        productId: productData.id,
      });
      if (id === productVariants[productVariants.length - 1].id) {
        console.log('Product added successfully!');
        this.router.navigate(['products']);
      }
    }
  }

  async editProduct() {
    const updatedProductData = {
      name: this.productName(),
      image: this.image(), 
    };

    const promises: Promise<unknown>[] = [];
    promises.push(this.productsCollection.update(this.oldProduct.id, updatedProductData));

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
      {} as Record<string, Omit<ProductVariant, 'id'>>
    );

    const pvIdsMap = { create: [] as string[], update: [] as string[], remove: [] as string[] };

    oldPvIds.concat(currentPvIds).forEach((id) => {
      if (oldPvIds.includes(id) && currentPvIds.includes(id))
        pvIdsMap.update.includes(id) || pvIdsMap.update.push(id);
      else if (!oldPvIds.includes(id) && currentPvIds.includes(id))
        pvIdsMap.create.push(id);
      else if (oldPvIds.includes(id) && !currentPvIds.includes(id))
        pvIdsMap.remove.push(id);
    });

    for (const rmId of pvIdsMap.remove) {
      promises.push(this.productVariantsCollection.remove(rmId));
    }
    for (const createId of pvIdsMap.create) {
      promises.push(this.productVariantsCollection.create(productVariantMap[createId]));
    }
    for (const updateId of pvIdsMap.update) {
      promises.push(this.productVariantsCollection.update(updateId, productVariantMap[updateId]));
    }

    await Promise.all(promises);
    console.log('Product updated');
    this.router.navigate(['products']);
  }
}


