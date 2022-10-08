import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading = false;

  constructor(
    private authServise: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.authServise.autoLogin();
  }

  onSubmit(loginForm: NgForm) {
    this.isLoading = true;
    const username = loginForm.value.username;
    const password = loginForm.value.password;

    this.authServise
      .login({
        username: username,
        password: password,
      })
      .subscribe(() => {
        this.isLoading = false;
        this.snackBar.open('You have sucessfully logged in!', 'Got it');
      },
      error => {
        this.isLoading = false;
        this.snackBar.open(error.error.message, 'Try Again');
      });
  }
}
