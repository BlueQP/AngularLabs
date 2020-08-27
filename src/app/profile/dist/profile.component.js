"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProfileComponent = void 0;
var core_1 = require("@angular/core");
var ProfileComponent = /** @class */ (function () {
    function ProfileComponent(userHelper, router) {
        var _this = this;
        this.userHelper = userHelper;
        this.router = router;
        this.userSubscription = this.userHelper.getUser().subscribe(function (user) {
            _this.user = user;
        });
        this.isUserValidSubscription = this.userHelper.getIsUserValid().subscribe(function (isValid) { return _this.isUserValid = isValid; });
        this.isUserLoggedInSubscription = this.userHelper.getIsUserLoggedIn().subscribe(function (isLoggedIn) {
            _this.isUserLoggedIn = isLoggedIn;
        });
        this.userHelper.getUser();
        this.userHelper.getIsUserLoggedIn();
        this.userHelper.getIsUserValid();
        console.log("debug: show user subscription: " + this.user);
        console.log("debug: before redirect: " + this.isUserLoggedIn);
        if (!this.isUserLoggedIn) {
            console.log("into redirect:" + this.isUserLoggedIn);
            this.router.navigateByUrl('/login');
        }
    }
    ProfileComponent.prototype.saveUser = function () {
        sessionStorage.setItem('user', JSON.stringify(this.user));
    };
    ProfileComponent.prototype.ngOnInit = function () {
    };
    ProfileComponent.prototype.ngOnDestory = function () {
        this.userSubscription.unsubscribe();
        this.isUserValidSubscription.unsubscribe();
        this.isUserLoggedInSubscription.unsubscribe();
    };
    ProfileComponent = __decorate([
        core_1.Component({
            selector: 'app-profile',
            templateUrl: './profile.component.html',
            styleUrls: ['./profile.component.sass']
        })
    ], ProfileComponent);
    return ProfileComponent;
}());
exports.ProfileComponent = ProfileComponent;
