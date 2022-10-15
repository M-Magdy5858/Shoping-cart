import { Component, OnInit } from '@angular/core';
import { CounterService } from '../services/counter.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  products: any = [];

  isEmpty: Boolean = false;   // flag to show empty cart page
  constructor(private counterService: CounterService) {}

  ngOnInit(): void {
    this.counterService.navCount.subscribe((val) => {
      this.isEmpty = !Boolean(val);
    });

    // reset and get the updated list
    this.products = [];
    this.counterService.cartList.subscribe((list) => {
      this.products = list;
    });
  }

  checkLimmit(id: string) {
    let atLimmit = false;
    this.products.forEach((product: any) => {
      if (product.id == id) {
        if (product.count == product.cartCount) {
          atLimmit = true;
        }
      }
    });
    return atLimmit;
  }
  decrease(id: string) {
    this.counterService.decreaseCount(id);
  }

  increase(id: string) {
    // stop when reaching limmit
    if (this.checkLimmit(id)) return;
    this.counterService.increaseCount(id);
  }

  remove(id: any) {
    this.counterService.removeFromCart(id);
  }


  // total cart money
  total(): number {
    let total: number = 0;
    this.products.forEach((product: any) => {
      total += product.getTotal();
    });
    return total;
  }
}
