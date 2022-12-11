import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/private/user/user.service';
import { User, SingleUserResponse } from 'src/app/private/user/user.model';
import { catchError, finalize, of } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  state: string = 'new';

  form: FormGroup;

  user: User | undefined;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      name: this.formBuilder.control(''),
      email: this.formBuilder.control(''),
      password: this.formBuilder.control(''),
    });
  }

  get title() {
    if (this.state === 'new') return 'New user';
    if (this.state === 'edit') return 'Edit user';
    return 'User';
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      console.log(params);

      if (!params['id']) {
        this.state = 'new';
      } else {
        this.userService
          .getUser(params['id'])
          .pipe(
            catchError((error) => {
              console.log(error);
              throw new Error(error);
            })
          )
          .subscribe((res: User) => {
            this.user = res;
            this.state = 'edit';
            this.updateForm(this.user);
          });
      }
    });
  }

  updateForm(user: User) {
    this.form.controls['name'].setValue(user.name);
    this.form.controls['email'].setValue(user.email);
    this.form.controls['password'].setValue(user.password);
  }

  saveOrUpdate() {
    const u = new User();
    u.name = this.form.value.name;
    u.email = this.form.value.email;
    u.password = this.form.value.password;

    if (this.user) u.id = this.user.id;

    this.userService
      .createOrUpdate(u)
      .pipe(
        catchError((err) => {
          console.log(err);
          alert('Falha ao salvar o usuário');
          throw new Error(err);
        }),
        finalize(() => {})
      )
      .subscribe((res) => {
        console.log(res);
        alert('Usuário salvo com sucesso');
        this.router.navigateByUrl('/app/user');
      });
  }
}