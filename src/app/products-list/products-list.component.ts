import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { ApiCallService } from '../services/api-call.service';
import { Product } from './../interfaces/product';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit {
  productList: Array<any> = [];
  
  constructor(private apiCallService: ApiCallService) {}

  ngOnInit(): void {
    // Pushing products from APi to the list and adding cartCount property and getTotal method to every product
    this.apiCallService.getProducts().subscribe((products: any) => {
      products.forEach((product:Product)=>{
        this.productList.push({...product,...{cartCount:0, getTotal():number{ return (this.cartCount* +this.price)}}})
      })
    });
    

  }

}
