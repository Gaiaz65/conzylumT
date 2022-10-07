import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { throws } from 'assert';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading = false;

  constructor(private authServise: AuthService) {}

  ngOnInit(): void {
    this.authServise.autoLogin()
  }

  onSubmit(loginForm: NgForm) {
     this.isLoading = true;
    this.authServise
      .login({
        username: 'kminchelle',
        password: '0lelplR',
      })
      .subscribe((res) => {
        this.authServise.handleAuthentication(res);

        this.isLoading = false;
      });
  }
}

// username: this.loginForm.value.email,
// password: this.loginForm.value.password,
