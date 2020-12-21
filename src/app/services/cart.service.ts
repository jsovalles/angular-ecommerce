import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {


  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);

  constructor() { }

  addToCart(cartItem: CartItem) {

    //checks if the item is already in the cart
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem = undefined;

    if (this.cartItems.length > 0) {
      //find the item in the cart based on its id
      existingCartItem = this.cartItems.find(item => item.id === cartItem.id);
      console.log(existingCartItem);
    }

    //checks if we found the item
    alreadyExistsInCart = (existingCartItem != undefined);

    //condition for existing or not existing item
    if (alreadyExistsInCart) {
      existingCartItem.quantity++;
    } else {
      this.cartItems.push(cartItem);
    }

    this.computeCartTotals();

  }

  deleteFromCart(cartItem: CartItem) {
    
    cartItem.quantity--;

    if(cartItem.quantity === 0){
      this.removeFromCart(cartItem);
    }else{
      this.computeCartTotals();
    }

  }

  removeFromCart(cartItem: CartItem) {
    
    //get index of item in the cartItem array
    const index = this.cartItems.findIndex(item => item.id == cartItem.id)

    //if its found we remove the item from the cart
    if(index > -1){
      this.cartItems.splice(index,1);
      this.computeCartTotals();
    }

  }

  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let item of this.cartItems){
      totalPriceValue += item.quantity * item.unitPrice;
      totalQuantityValue += item.quantity;
    }

    //publish the new values for price and quantity on the cart status
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
  }
}
