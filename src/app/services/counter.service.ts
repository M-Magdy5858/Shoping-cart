import { VariableBinding } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from './../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class CounterService {
  private cart = new BehaviorSubject([] as Array<Product>); // array of products objects in cart
  private count = new BehaviorSubject(0 as number); // count of all products in cart

  cartList = this.cart.asObservable();

  navCount = this.count.asObservable();

  constructor() {}

  addToCart(item: Product) {
    const updated = [...this.cart.value, item];
    this.cart.next(updated);
    this.updateCount();
  }

  removeFromCart(id: string) {
    this.cart.value.forEach((item, i) => {
      if (id == item.id) this.cart.value.splice(i, 1);
    });
    this.updateCount();
  }

  // check if product object is already in array
  check(product: Product): Boolean {
    let isFound = this.cart.value.some((item) => {
      return product.id === item.id;
    });
    return isFound;
  }

  increaseCount(id: any) {
    this.cart.value.filter((item) => {
      if (item.id == id) {
        item.cartCount += 1;
      }
    });
    this.updateCount();
  }
  decreaseCount(id: any) {
    this.cart.value.forEach((item, i) => {
      if (item.id == id) {
        if (item.cartCount == 1) {
          this.cart.value.splice(i, 1);
        } else {
          item.cartCount -= 1;
        }
      }
    });
    this.updateCount();
  }

  // Re-calculate the sum of every product-cartCount-property to get total number in cart
  updateCount(): void {
    let total: number = 0;

    this.cart.value.forEach((item) => {
      total += item.cartCount;
    });
    this.count.next(total);
  }
}
