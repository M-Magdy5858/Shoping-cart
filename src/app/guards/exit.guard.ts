import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { LeaveService } from '../services/leave.service';

@Injectable({
  providedIn: 'root',
})
export class ExitGuard implements CanDeactivate<unknown> {
  constructor(private leaveService: LeaveService) {}

  canLeave: boolean = true;

  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {

    this.leaveService.leaveRegisterValue.subscribe(
      (val) => (this.canLeave = val)
    );

    if (!this.canLeave) {
      if (!confirm('Leave and Discard inputs')) {
        return false;
      }
    }
    this.leaveService.setLeaveRegisterValue(true);
    return true;
  }
}
