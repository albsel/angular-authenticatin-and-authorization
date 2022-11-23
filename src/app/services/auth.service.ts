import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { JwtHelper, tokenNotExpired } from "angular2-jwt";
import { map } from "rxjs/operators";

@Injectable()
export class AuthService {
  constructor(private http: Http) {}

  login(credentials) {
    return this.http
      .post("/api/authenticate", JSON.stringify(credentials))
      .map((response) => {
        let result = response.json();
        if (result && result.token) {
          let output = localStorage.setItem("token", result.token);
          console.log(output);
          return true;
        }
        return false;
      });
  }

  logout() {
    localStorage.removeItem("token");
  }

  isLoggedIn() {
    return tokenNotExpired();
  }

  get currentUser() {
    let token = localStorage.getItem("token");

    if (!token) return null;

    return new JwtHelper().decodeToken(token);
  }
}
