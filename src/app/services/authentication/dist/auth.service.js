"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthService = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var operators_1 = require("rxjs/operators");
var rxjs_1 = require("rxjs");
var AuthService = /** @class */ (function () {
    function AuthService(httpClient, router) {
        this.httpClient = httpClient;
        this.router = router;
        this.SERVER_URL = "http://localhost:3000";
        this.API_URL_PATH = "/API";
        this.AUTH_URL_PATH = "/auth";
        this.AUTH_URL = this.SERVER_URL + this.API_URL_PATH + this.AUTH_URL_PATH;
        this.HTTP_OPTIONS = {
            headers: new http_1.HttpHeaders({ 'Content-Type': 'application/json' })
        };
        this.userSubject = new rxjs_1.BehaviorSubject(JSON.parse(sessionStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
    }
    Object.defineProperty(AuthService.prototype, "getUser", {
        get: function () {
            return this.userSubject.value;
        },
        enumerable: false,
        configurable: true
    });
    AuthService.prototype.authenticate = function (userInfo) {
        var _this = this;
        return this.httpClient.post(this.AUTH_URL, userInfo, this.HTTP_OPTIONS).pipe(operators_1.map(function (userLogin) {
            console.log("testing info - posted: " + userInfo);
            console.log("testing info - login response: " + userLogin);
            userLogin.user.password = "********";
            if (userLogin.ok) {
                if (userLogin.user.valid) {
                    sessionStorage.setItem("user", JSON.stringify(userLogin.user));
                    _this.userSubject.next(userLogin.user);
                    userLogin.status = true;
                }
                else {
                    userLogin.errorMessage = "your account is banned";
                }
            }
            else {
                userLogin.errorMessage = "invalid log in credentials";
            }
            return { userLogin: userLogin };
        }));
    };
    AuthService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
