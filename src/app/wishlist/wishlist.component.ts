import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from '../interfaces/product';
import { removeFromWishlist } from '../store/wishlist/wishlist.action';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent implements OnInit {
  wishlist: Array<Product> = [];

  constructor(private store: Store<any>) {}

  ngOnInit(): void {
    this.store.select('wishlist').subscribe((res) => (this.wishlist = res));
  }

  removeFromWishlist(id:string){
    this.store.dispatch(removeFromWishlist({id:id}))
  }
}
