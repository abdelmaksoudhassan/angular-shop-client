import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators'
import { throwError, BehaviorSubject } from 'rxjs';
import { UserResponse } from '../models/user-response.model';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User>(null)

  constructor(private http:HttpClient,private router:Router) { }

  public signUp(email:string,password:string){
    return this.http.post<UserResponse>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD0AxJkojKixJDPTvDoFFs0WoBaEZccy6s',
      { email,password,returnSecureToken:true }
    ).pipe(
      catchError(res=>this.handleError(res)),
      tap(res=>{
        this.handleUser(res)
      }))
  }

  public logIn(email:string,password:string){
    return this.http.post(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD0AxJkojKixJDPTvDoFFs0WoBaEZccy6s',
      { email,password,returnSecureToken:true }
    ).pipe(catchError(res=>this.handleError(res)),
    tap(res=>{
      this.handleUser(res)
    }))
  }

  public logOut(){
    this.removeUser()
    const x = this.router.url
    if(x == '/check-out'){
      this.router.navigate([''])
    }
  }

  public autoLogin(){
    var user = JSON.parse(localStorage.getItem('normal_user'))
    if(!user) {
      return null
    }
    if(new Date().getTime() >= +user.expDate){
      this.removeUser()
    }else{
      this.user.next(user)
    }
  }

  private handleUser(res){
    let expDate = new Date().getTime() + +res.expiresIn*1000
    var user = new User(res.email,res.localId,res.idToken,expDate)
    this.user.next(user)
    localStorage.setItem('normal_user', JSON.stringify(user))

    const returnURL = localStorage.getItem('returnURL')
    this.router.navigateByUrl(returnURL)
  }

  private removeUser(){
    this.user.next(null)
    localStorage.removeItem('normal_user')
  }

  private handleError(errorMsg:HttpErrorResponse){
    let resData:string = 'Unknown Error !'
      if(!errorMsg.error || !errorMsg.error.error){
        return resData
      }
      switch(errorMsg.error.error.message){
        case('EMAIL_EXISTS'):{
          resData = 'The email address is already in use by another account.'
          break;
        }
        case('OPERATION_NOT_ALLOWED'):{
          resData = 'Password sign-in is disabled for this project.'
          break;
        }
        case('TOO_MANY_ATTEMPTS_TRY_LATER'):{
          resData = 'We have blocked all requests from this device due to unusual activity. Try again later.'
          break
        }
        case('EMAIL_NOT_FOUND'):{
          resData = 'There is no user record corresponding to this identifier. The user may have been deleted.'
          break
        }
        case('INVALID_PASSWORD'):{
          resData = 'The password is invalid or the user does not have a password.'
          break
        }
        case('USER_DISABLED'):{
          resData = 'The user account has been disabled by an administrator.'
          break
        }
        default:{
          resData = 'An Internal Error Occured, Please Try Again'
          break
        }
      }
      return throwError(resData)
  }
}