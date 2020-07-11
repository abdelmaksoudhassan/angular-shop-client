import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpParams } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

@Injectable({providedIn:"root"})
export class authInterceptor implements HttpInterceptor {

    constructor(private AuthService:AuthService){}

  intercept(req: HttpRequest<any>, next: HttpHandler){
      let modifiedRequest
      this.AuthService.user.subscribe(x=>{
          if(x){
            modifiedRequest = req.clone({
                params:new HttpParams().set('auth',x.idToken)
            })
          }else{
              modifiedRequest = req.clone()
          }
        })
        return next.handle(modifiedRequest)
  }
}