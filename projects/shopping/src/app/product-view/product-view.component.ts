// import { CurrencyPipe, NgClass } from '@angular/common';
// import {
//   ChangeDetectionStrategy,
//   Component,
//   computed,
//   inject,
//   signal,
// } from '@angular/core';

// import { ActivatedRoute } from '@angular/router';
// import { ExtractFromQuery, JsonDB } from '../shared/json-db-adaptor';
// import { 
//   Product,
//   ProductVariant,
// } from '../product-list/product-list.component';

// @Component({
//   selector: 'app-product-view',
//   standalone: true,
//   imports: [CurrencyPipe, NgClass],
//   templateUrl: './product-view.component.html',
//   changeDetection: ChangeDetectionStrategy.OnPush,
// })
// export class ProductViewComponent {
//   jsonDB = inject(JsonDB);
//   productsCollectionEmbedded = this.jsonDB
//     .collection<Product>('products')
//     .embed<{ productVariants: ProductVariant[] }>('productVariants');
//   route = inject(ActivatedRoute);

//   id = this.route.snapshot.paramMap.get('id')!;
//   product = signal<ExtractFromQuery<
//     typeof this.productsCollectionEmbedded
//   > | null>(null);

//   matchingProductVariant = computed(() => {
//     return (
//       this.product()?.productVariants.find((productVariant) => {
//         return Object.keys(productVariant.variantMap).every((key) => {
//           return (
//             productVariant.variantMap[key] === this.selectVariantMap()[key]
//           );
//         });
//       }) || null
//     );
//   });

//   price = computed(() => {
//     return this.matchingProductVariant()?.price || 0;
//   });

//   quantity = computed(() => {
//     return this.matchingProductVariant()?.quantity || 0;
//   });

//   variantEntries = computed(() => {
//     if (this.product()) {
//       const map: Record<string, string[]> = {};
//       this.product()?.productVariants.forEach((productVariant) => {
//         Object.entries(productVariant.variantMap).forEach((entry) => {
//           if (map[entry[0]]) {
//             if (!map[entry[0]].includes(entry[1])) map[entry[0]].push(entry[1]);
//           } else {
//             map[entry[0]] = [entry[1]];
//           }
//         });
//       });
//       return Object.entries(map);
//     }
//     return null!;
//   });

//   selectVariantMap = signal<Record<string, string>>({});

//   select(key: string, value: string) {
//     this.selectVariantMap.update((selectVariantMap) => {
//       return { ...selectVariantMap, [key]: value };
//     });
//   }
//   isSelected(key: string, value: string) {
//     return this.selectVariantMap()[key] === value;
//   }

//   constructor() {
//     this.loadProduct(this.id);
//   }

//   async loadProduct(id: string) {
//     this.product.set(await this.productsCollectionEmbedded.get(id));
//     this.selectVariantMap.set(this.product()!.productVariants[0].variantMap);
//   }
// }





import { CurrencyPipe, NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { ExtractFromQuery, JsonDB } from '../shared/json-db-adaptor';
import { Product, ProductVariant } from '../product-list/product-list.component';
import { CartItem } from '../cart/cart.component';
import { UserService } from '../shared/user.service';
// import { CartItem } from '../cart/cart.component';

@Component({
  selector: 'app-product-view',
  standalone: true,
  imports: [CurrencyPipe, NgClass],
  templateUrl: './product-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductViewComponent {
  userService = inject(UserService);
  jsonDB = inject(JsonDB);
  productsCollectionEmbedded = this.jsonDB
    .collection<Product>('products')
    .embed<{ productVariants: ProductVariant[] }>('productVariants');
  route = inject(ActivatedRoute);
  router = inject(Router);

  id = this.route.snapshot.paramMap.get('id')!;
  product = signal<ExtractFromQuery<
    typeof this.productsCollectionEmbedded
  > | null>(null);

  matchingProductVariant = computed(() => {
    return (
      this.product()?.productVariants.find((productVariant) => {
        return Object.keys(productVariant.variantMap).every((key) => {
          return (
            productVariant.variantMap[key] === this.selectVariantMap()[key]
          );
        });
      }) || null
    );
  });

  price = computed(() => {
    return this.matchingProductVariant()?.price || 0;
  });

  quantity = computed(() => {
    return this.matchingProductVariant()?.quantity || 0;
  });

  variantEntries = computed(() => {
    if (this.product()) {
      const map: Record<string, string[]> = {};
      this.product()?.productVariants.forEach((productVariant) => {
        Object.entries(productVariant.variantMap).forEach((entry) => {
          if (map[entry[0]]) {
            if (!map[entry[0]].includes(entry[1])) map[entry[0]].push(entry[1]);
          } else {
            map[entry[0]] = [entry[1]];
          }
        });
      });
      return Object.entries(map);
    }
    return null!;
  });

  selectVariantMap = signal<Record<string, string>>({});

  select(key: string, value: string) {
    this.selectVariantMap.update((selectVariantMap) => {
      return { ...selectVariantMap, [key]: value };
    });
  }
  isSelected(key: string, value: string) {
    return this.selectVariantMap()[key] === value;
  }

  constructor() {
    this.loadProduct(this.id);
  }

  async loadProduct(id: string) {
    this.product.set(await this.productsCollectionEmbedded.get(id));
    this.selectVariantMap.set(this.product()!.productVariants[0].variantMap);
  }



//   async onAddToCart() {
//     if (this.quantity() > 0) {
//       const user = this.userService.getUser();

//       await this.jsonDB
//         .collection<CartItem>('cart').create({ quantity: 1, productId: this.id, userId: user.id, productVariantId: this.matchingProductVariant()!.id, })
//       this.router.navigate(['/cart/']);
//     }
//   }
async onAddToCart() {
  if (this.quantity() > 0) {
    const user = this.userService.getUser();
    const cartCollection = this.jsonDB.collection<CartItem>('cart');

    // Check if the product with the selected variant is already in the cart
    const existingCartItem = await cartCollection
      .eq('productId', this.id)
      .eq('productVariantId', this.matchingProductVariant()!.id)
      .eq('userId', user.id)
      .exec();

    if (existingCartItem.length > 0) {
      // Show alert if product exists in the cart
      alert('This product is already in your cart!');
    } else {
      // Add the product to the cart
      await cartCollection.create({
        quantity: 1,
        productId: this.id,
        userId: user.id,
        productVariantId: this.matchingProductVariant()!.id,
      });
      this.router.navigate(['/cart/']);
    }
  }
}

}