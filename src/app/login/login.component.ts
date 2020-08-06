import { Component, OnInit } from '@angular/core';
import { LoginInfo } from '../models/loginInfo.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  email:string = "";
  password:string = "";

  demoLogin1:LoginInfo = {email: "1@t.c", password: "1"};
  demoLogin2:LoginInfo = {email: "2@t.c", password: "2"};
  demoLogin3:LoginInfo = {email: "3@t.c", password: "3"};

  demoUsers = [this.demoLogin1, this.demoLogin2, this.demoLogin3];

  errorMessageClass = "hidden";
  ERROR_MESSAGE_CLASS_SHOW_VALUE = "show";

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  loginSubmit(): void{
    var loginUser = null;
    loginUser = this.demoUsers.find(u => u.email == this.email);
    if (loginUser!=null) {
      if (loginUser.password == this.password){
        this.router.navigateByUrl('/account');
      }
    }
    this.errorMessageClass = this.ERROR_MESSAGE_CLASS_SHOW_VALUE;
  }
}
