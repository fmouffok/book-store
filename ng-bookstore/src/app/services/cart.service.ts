import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() {

  }

  addToCart(cartItem: CartItem) {
    let itemExist: boolean = false;
    let itemCart: CartItem = undefined;
    if (this.cartItems.length > 0) {
      itemCart = this.cartItems.find(tmpItem => cartItem.id === tmpItem.id)
      itemExist = (itemCart != undefined);
    }
    if (itemExist) {
      itemCart.quantity++;
    } else {
      this.cartItems.push(cartItem);
    }

    this.calculateTotalPrice();
  }


  calculateTotalPrice() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let current of this.cartItems) {
      totalPriceValue += current.priceUnit * current.quantity;
      totalQuantityValue += current.quantity;
    }

    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
    
  }

}
