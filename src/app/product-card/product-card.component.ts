import { VariableBinding } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CounterService } from '../services/counter.service';
import { Product } from './../interfaces/product';
import {
  addToWishlist,
  removeFromWishlist,
} from '../store/wishlist/wishlist.action';
@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  @Input() product: Product = {
    createdAt: ' ',
    name: ' ',
    image: '--',
    description: '',
    rate: 0,
    count: 0,
    price: '00.00',
    reviews: [''],
    id: '',
    cartCount: 0,
    getTotal(): number {
      return this.cartCount * +this.price;
    },
  };
  isAdded: Boolean = false;
  isLimmitReached: Boolean = false;
  inWish: Boolean = false;

  constructor(
    private router: Router,
    private counterService: CounterService,
    private store: Store<any>
  ) {}

  getNumberInCart() {
    // get the number of purchased items for the product
    this.counterService.cartList.subscribe((list: Array<Product>) => {
      list.forEach((item: Product) => {
        if (this.product.id == item.id) {
          this.product.cartCount = item.cartCount;
        }
      });
    });
  }

  // check if product reached limit of purchase
  checkLimmit() {
    if (this.product.count == this.product.cartCount) {
      this.isLimmitReached = true;
    }
  }

  // navigate to Details page when clicking any where on card
  showDetails(e: any) {
    // Guard clause for the buttons
    if (
      e.target.nodeName == 'BUTTON' ||
      e.target.parentElement.nodeName == 'BUTTON'
    )
      return;

    this.router.navigate(['/product-details', this.product.id]);
  }

  addProduct() {
    // Guard clause if out of stock or reached limmit of number in stock
    if (!this.product.count || this.isLimmitReached) return;

    // I - case of already added product object
    if (this.isAdded) {
      this.counterService.increaseCount(this.product.id);
      this.getNumberInCart();
      this.checkLimmit();
    } else {
      // II- case of new Product object
      this.product.cartCount += 1;
      this.counterService.addToCart(this.product);
    }
    this.isAdded = true;
  }
  starClick() {
    if (this.inWish) {
      this.store.dispatch(removeFromWishlist({ id: this.product.id }));
      this.inWish = false;
    } else {
      this.store.dispatch(addToWishlist(this.product));
      this.inWish = true;
    }
  }
  ngOnInit(): void {
    this.isAdded = this.counterService.check(this.product);
    this.getNumberInCart();
    this.checkLimmit();

    this.store.select('wishlist').subscribe((list) => {
      this.inWish = list.some((item: any) => {
        return item.id == this.product.id;
        // if (
        //   list.some((item: any) => {
        //     return item.id == this.product.id;
        //   })
        // ) {
        //   this.inWish = true;
        // }
      });
    });
  }
}
