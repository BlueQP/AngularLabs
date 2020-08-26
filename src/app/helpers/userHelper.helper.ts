import { Injectable } from '@angular/core';
import { User } from "../models/user.model";
import { Observable, Subject } from 'rxjs';

@Injectable()
export class UserHelper{
  public isLoggedIn = false;
  public isUserValid = false;
  public user:User;
  private userObservable = new Subject<User>();
  private isLoggedInObservable = new Subject<boolean>();
  private isUserValidObservable = new Subject<boolean>(); 
  constructor() {
    
  }

  public getUser():Observable<User> {
    var userString = sessionStorage.getItem("user");
    if(userString){
        this.user = JSON.parse(userString);
        this.userObservable.next(this.user);
        this.isLoggedIn = true; 
    }
    else {
        this.isLoggedIn = false;
        this.user = null;
        this.userObservable.next(this.user);
    }
    return this.userObservable.asObservable();
  }

  public getIsUserLoggedIn():Observable<boolean>{
    this.getUser();
    this.isLoggedInObservable.next(this.isLoggedIn);
    return this.isLoggedInObservable.asObservable();
  }

  public getIsUserValid():Observable<boolean>{
    this.getUser();
    if (this.isLoggedIn){
        this.isUserValid = this.user.valid;
    }
    else {
        this.isUserValid = false;
    }
    this.isUserValidObservable.next(this.isUserValid);
    return this.isUserValidObservable.asObservable();
  }

  public refreashSession(){
    this.getUser();
    this.getIsUserLoggedIn();
    this.getIsUserValid();
  }

}
