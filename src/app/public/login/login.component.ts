import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { catchError, finalize } from 'rxjs';

interface LoginResponse {
  // token: string;
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  submitted = false;
  loading = false;
  form: FormGroup;

  message: string | undefined = undefined;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      username: this.formBuilder.control('eve.holt@reqres.in', [
        Validators.required,
        // Validators.email,
      ]),
      password: this.formBuilder.control('', [
        Validators.required,
        Validators.minLength(4),
      ]),
    });
  }

  ngOnInit(): void {}

  public onSubmit = () => {
    this.message = undefined;
    this.submitted = true;

    if (this.form.invalid) return;

    console.log('onSubmit');
    console.log(this.form.valid);
    console.log(this.form.value.username);
    console.log(this.form);

    this.loading = true;

    this.loginService
      .login(this.form.value.username, this.form.value.password)
      .pipe(
        catchError((err) => {
          console.log(err);
          this.message = err.error.error.toString();
          return err;
        }),
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe((res: LoginResponse) => {
        console.log(res);
        localStorage.setItem('token', JSON.stringify(res));
        this.loginService.currentTokenValue = JSON.stringify(res);
        this.router.navigate(['/app']);
      });
  };
}
