


// ye original code yahan se hai //
// import { CommonModule, CurrencyPipe } from '@angular/common';
// import {
//   ChangeDetectionStrategy,
//   Component,
//   EventEmitter,
//   Input,
//   Output,
//   inject,
// } from '@angular/core';
// import { ChangeDetectorRef } from '@angular/core';
// import { JsonDB } from '../shared/json-db-adaptor';
// import { FormsModule } from '@angular/forms';
// import { UserService } from '../shared/user.service';
// // import { RouterLink } from '@angular/router';

// export interface CartItem {
//   id: string;
//   productId: string;
//   productVariantId: string;
//   userId: string;
//   quantity: number
// }

// interface Product {
//     id: string;
//     name: string;
//     image?: string;
// }

// interface ProductVariant {
//     id: string;
//     productId: string;
//     price: number;
//     quantity: number;
//     variantMap: Record<string, string>
// }

// export interface CartItemEmbeded extends CartItem {
//   product: Product
//   productVariant: ProductVariant
// }

// @Component({
//   selector: 'app-cart',
//   standalone: true,
//   imports: [CurrencyPipe, FormsModule, CommonModule],
//   templateUrl: './cart.component.html',
//   changeDetection: ChangeDetectionStrategy.OnPush,
// })

// export class CartComponent {
//   @Input() list: CartItemEmbeded[] = [];
//   @Output() remove = new EventEmitter<string>();
//   userServer = inject(UserService);
//   loading = false;
//   router: any;

  
//   constructor(private jsonDB: JsonDB, private cdr: ChangeDetectorRef) {
//     this.loadCart();
//   }

//   async loadCart() {
//     try {
//       const user = this.userServer.getUser();
//       console.log('Fetched User:', user);

//       const userId = user.id;

//       const cartList: CartItemEmbeded[] = await this.jsonDB
//         .collection<CartItem>('cart')
//         .embed<{product: Product}>('product')
//         .embed<{productVariant: ProductVariant}>('productVariant')
//         .eq('userId', userId)
//         .exec();

//       console.log('Fetched cart items:', cartList);
//       this.list = cartList;
//       console.log('Final cart list:', this.list);

//       this.cdr.detectChanges();
//     } catch (error) {
//       console.error('Error loading cart:', error);
//     }
//   }

//   trackByItemId(index: number, item: CartItemEmbeded) {
//     return item.id; // Return unique ID for each item to improve performance in *ngFor
//   }

//   calculateTotal() {
//     return this.list.reduce(
//       (total, item) => total + item.quantity * item.productVariant.price,
//       0
//     );
//   }

//   async removeItemFromCart(itemId: string) {
//     try {
//       // Remove the item from the local list
//       this.list = this.list.filter((item) => item.id !== itemId);
      
//       // Remove the item from the database as well
//       await this.jsonDB
//         .collection<CartItemEmbeded>('cart')
//         .remove(itemId);

//       console.log(`Item with ID ${itemId} removed from the cart.`);
//     } catch (error) {
//       console.error('Error removing item from cart:', error);
//     }
//   }
//   onCheckout() {
//     console.log('Navigating to checkout page...');
//     this.router.navigate(['/checkout']);
//   }

// }


// copy code hai  //

import { CommonModule, CurrencyPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
} from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { JsonDB } from '../shared/json-db-adaptor';
import { FormsModule } from '@angular/forms';
import { UserService } from '../shared/user.service';
// import { RouterLink } from '@angular/router';

export interface CartItem {
  id: string;
  productId: string;
  productVariantId: string;
  userId: string;
  quantity: number
}

interface Product {
    id: string;
    name: string;
    image?: string;
}

interface ProductVariant {
    id: string;
    productId: string;
    price: number;
    quantity: number;
    variantMap: Record<string, string>
}

export interface CartItemEmbeded extends CartItem {
  product: Product
  productVariant: ProductVariant
}

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe, FormsModule, CommonModule],
  templateUrl: './cart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class CartComponent {
  @Input() list: CartItemEmbeded[] = [];
  @Output() remove = new EventEmitter<string>();
  userServer = inject(UserService);
  loading = false;
  router: any;

  
  constructor(private jsonDB: JsonDB, private cdr: ChangeDetectorRef) {
    this.loadCart();
  }

  async loadCart() {
    try {
      const user = this.userServer.getUser();
      console.log('Fetched User:', user);

      const userId = user.id;

      const cartList: CartItemEmbeded[] = await this.jsonDB
        .collection<CartItem>('cart')
        .embed<{product: Product}>('product')
        .embed<{productVariant: ProductVariant}>('productVariant')
        .eq('userId', userId)
        .exec();

      console.log('Fetched cart items:', cartList);
      this.list = cartList;
      console.log('Final cart list:', this.list);

      this.cdr.detectChanges();
    } catch (error) {
      console.error('Error loading cart:', error);
    }
  }

  trackByItemId(index: number, item: CartItemEmbeded) {
    return item.id; // Return unique ID for each item to improve performance in *ngFor
  }

  calculateTotal() {
    return this.list.reduce(
      (total, item) => total + item.quantity * item.productVariant.price,
      0
    );
  }

  async removeItemFromCart(itemId: string) {
    try {
      // Remove the item from the local list
      this.list = this.list.filter((item) => item.id !== itemId);
      
      // Remove the item from the database as well
      await this.jsonDB
        .collection<CartItemEmbeded>('cart')
        .remove(itemId);

      console.log(`Item with ID ${itemId} removed from the cart.`);
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  }
  onCheckout() {
    console.log('Navigating to checkout page...');
    this.router.navigate(['/checkout']);
  }

}




