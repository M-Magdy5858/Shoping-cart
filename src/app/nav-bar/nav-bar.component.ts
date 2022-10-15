import { Component, OnInit } from '@angular/core';
import { CounterService } from '../services/counter.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  cartCount: number = 0;
  constructor(private counterService: CounterService) {}

  ngOnInit(): void {
    this.counterService.navCount.subscribe((val) => {
      this.cartCount = val;
    });
  }
}
