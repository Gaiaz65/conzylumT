import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs';

import { AuthData } from '../models/response-data.model';

export interface LoginResponseData {
  username?: string;
  access_token: string;
  token_type: string;
  expiration?: Date;
}

@Injectable()
export class AuthService {
  public isAuth = false;

  constructor(private http: HttpClient, private router: Router) {}

  login(authData: AuthData) {
    const body = JSON.stringify({
      username: authData.username,
      password: authData.password,
    });

    const httpHeaders = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http
      .post('https://dummyjson.com/auth/login', body, httpHeaders)
      .pipe(
        map((userToken) => {
          this.isAuth = true;
          this.router.navigate(['/products']);
          this.handleAuthentication(userToken);
        })
      );
  }

  handleAuthentication(userData: object) {
    localStorage.setItem('userData', JSON.stringify(userData));
  }

  autoLogin() {
    const currentUser = localStorage.getItem('userData');

    if (!currentUser) {
      return;
    }

    if (this.router.url === '/auth') {
      this.router.navigate(['/products']);
    }
    this.isAuth = true;
  }

  logOut() {
    localStorage.removeItem('userData');
    this.isAuth = false;
  }

  authCheck() {
    return localStorage.getItem('userData');
  }
}
