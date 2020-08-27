import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from "./models/user.model";
import { UserHelper } from "./helpers/userHelper.helper";
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'week4tut';
  user = null;
  isLoggedIn = false;
  private userSubscription;
  private isLoggedInSubscription;

  constructor(private userHelper:UserHelper, private router: Router){
    
  }

  ngOnInit(){
    this.userSubscription = this.userHelper.getUser().subscribe(user => this.user = user);
    this.isLoggedInSubscription = this.userHelper.getIsUserLoggedIn().subscribe(isLoggedIn => {
        this.isLoggedIn = isLoggedIn;
        console.log(this.isLoggedIn);}
      );
    
  }

  public logOff() {
    sessionStorage.removeItem('user');
    this.userHelper.refreashSession();
    this.router.navigateByUrl('/');
  }

  ngOnDestory(){
    this.userSubscription.unsubsribe();
    this.isLoggedInSubscription.unsubsribe();
  }
}
