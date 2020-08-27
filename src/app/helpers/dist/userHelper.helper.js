"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserHelper = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var UserHelper = /** @class */ (function () {
    function UserHelper() {
        this.userObservable = new rxjs_1.Subject();
        this.isLoggedInObservable = new rxjs_1.Subject();
        this.isUserValidObservable = new rxjs_1.Subject();
    }
    UserHelper.prototype.getUser = function () {
        var userString = sessionStorage.getItem("user");
        if (userString) {
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
    };
    UserHelper.prototype.getIsUserLoggedIn = function () {
        this.getUser();
        this.isLoggedInObservable.next(this.isLoggedIn);
        return this.isLoggedInObservable.asObservable();
    };
    UserHelper.prototype.getIsUserValid = function () {
        this.getUser();
        if (this.isLoggedIn) {
            this.isUserValid = this.user.valid;
        }
        else {
            this.isUserValid = false;
        }
        this.isUserValidObservable.next(this.isUserValid);
        return this.isUserValidObservable.asObservable();
    };
    UserHelper.prototype.refreashSession = function () {
        this.getUser();
        this.getIsUserLoggedIn();
        this.getIsUserValid();
    };
    UserHelper = __decorate([
        core_1.Injectable()
    ], UserHelper);
    return UserHelper;
}());
exports.UserHelper = UserHelper;
