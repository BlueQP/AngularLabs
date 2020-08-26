import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { AuthService } from "../services/authentication/auth.service";
import { first } from "rxjs/operators";
import { UserHelper } from "../helpers/userHelper.helper";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  public user: User = new User();

  public errorMessageClass = "hidden";
  private ERROR_MESSAGE_CLASS_SHOW_VALUE = "show";
  private ERROR_MESSAGE_CLASS_HIDE_VALUE = "hidden";

  constructor(private router: Router, private authService: AuthService, private userHelper:UserHelper) { }

  ngOnInit(): void {
  }

  loginSubmit(): void{
    var loginUser = null;
     this.authService.authenticate(this.user).pipe(first()).subscribe(
       data => {
         if (data.userLogin.status){
          this.errorMessageClass = this.ERROR_MESSAGE_CLASS_HIDE_VALUE;
          this.userHelper.refreashSession();
          this.router.navigateByUrl('/');
         }
         else {
          this.errorMessageClass = this.ERROR_MESSAGE_CLASS_SHOW_VALUE;
         }
       }
     );
  }
}
