import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { LoaderService } from '../services/loader.service';


@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor(private loaderService:LoaderService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.setLoadedValue(false)

    return next.handle(request).pipe(finalize(()=>{this.loaderService.setLoadedValue(true)}));
    
  }
}
