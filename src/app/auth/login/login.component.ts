import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}

  handleLogin(form: any) {
    console.log(form);
    this.authService.setAuth(true);
    this.router.navigate(['/']);
  }

  ngOnInit(): void {}
}
