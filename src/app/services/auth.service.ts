import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn= new BehaviorSubject(false);
  isLoggedInValue= this.isLoggedIn.asObservable()
  
  constructor() { }

  setAuth(val : boolean){
    this.isLoggedIn.next(val)
  }
}
