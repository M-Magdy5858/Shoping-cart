import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiCallService } from '../services/api-call.service';
import { Product } from './../interfaces/product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private apiCallService: ApiCallService
  ) {}

  details:Product={
    createdAt: ' ',
    name: ' ',
    image: '--',
    description: '',
    rate: 0,
    count: 0,
    price: '00.00',
    reviews: [''],
    id: '',
    cartCount:0,
    getTotal(): number {
      return this.cartCount * +this.price;
    },
  };

  ngOnInit(): void {
    const id:string = this.route.snapshot.params['id'];
    this.apiCallService.getProductDetails(id).subscribe((val:any)=>this.details=val)    
  }


}
