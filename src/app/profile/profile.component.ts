import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from "../models/user.model";
import { UserHelper } from "../helpers/userHelper.helper";
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {
  isUserLoggedIn:boolean;
  isUserValid:boolean;
  user:User;
  private userSubscription;
  private isUserValidSubscription;
  private isUserLoggedInSubscription;
  constructor(private userHelper:UserHelper, private router:Router) {
    this.userSubscription = this.userHelper.getUser().subscribe(user => {
      this.user = user;
      
    });
    this.isUserValidSubscription = this.userHelper.getIsUserValid().subscribe(isValid => this.isUserValid = isValid);
    this.isUserLoggedInSubscription = this.userHelper.getIsUserLoggedIn().subscribe(isLoggedIn => {
      this.isUserLoggedIn = isLoggedIn;
      
    });
    this.userHelper.getUser();
    this.userHelper.getIsUserLoggedIn();
    this.userHelper.getIsUserValid();
    console.log("debug: show user subscription: " + this.user);
    console.log("debug: before redirect: " + this.isUserLoggedIn);
    if (!this.isUserLoggedIn){
      console.log("into redirect:" + this.isUserLoggedIn);
      this.router.navigateByUrl('/login');
    }
    
  }

  public saveUser(){
    sessionStorage.setItem('user', JSON.stringify(this.user));
  }

  ngOnInit(): void {
    
    

  }

  ngOnDestory(){
    this.userSubscription.unsubscribe();
    this.isUserValidSubscription.unsubscribe();
    this.isUserLoggedInSubscription.unsubscribe();
  }
}
