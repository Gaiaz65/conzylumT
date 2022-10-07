import { AuthData } from '../models/response-data.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

export interface LoginResponseData {
  username?: string;
  access_token: string;
  token_type: string;
  expiration?: Date;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isAuth = false;

  constructor(private http: HttpClient, private router: Router) {}


  login(authData: AuthData) {
    const userData$ = new Observable((observer) => {
      fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: authData.username,
          password: authData.password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          observer.next(data);
          this.isAuth = true;
          this.router.navigate(['/products']);
          observer.complete();
        })
        .catch((err) => observer.error(err));
    });
    return userData$;
  }

  handleAuthentication(userData: any) {
   localStorage.setItem('userData', JSON.stringify(userData));
  }

  autoLogin() {
    const currentUser = localStorage.getItem('userData')

    if (!currentUser) {
      return;
    }
    this.router.navigate(['/products']);
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

