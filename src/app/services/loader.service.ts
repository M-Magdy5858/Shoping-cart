import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private isLoaded = new BehaviorSubject(true);

  isLoadedValue = this.isLoaded.asObservable();
  constructor() {}

  setLoadedValue(val: boolean) {
    this.isLoaded.next(val);
  }
}
