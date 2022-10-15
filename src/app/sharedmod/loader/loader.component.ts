import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {
  
  constructor(private loaderService:LoaderService) { }
  hide:boolean=true;

  ngOnInit(): void {
    this.loaderService.isLoadedValue.subscribe(val=> this.hide=val)
    // this.loaderService.setLoadedValue()
  }

}