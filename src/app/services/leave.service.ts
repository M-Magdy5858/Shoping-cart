import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LeaveService {
  private canLeaveRegister = new BehaviorSubject(true);
  leaveRegisterValue = this.canLeaveRegister.asObservable();
  constructor() {}

  setLeaveRegisterValue(val: boolean) {
    this.canLeaveRegister.next(val);
  }
}
