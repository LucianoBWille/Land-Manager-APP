import { Component, Injectable, OnInit } from '@angular/core';
import { catchError, finalize, of } from 'rxjs';
import { UserListResponse, User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
@Injectable({
  providedIn: 'root'
})
export class UserListComponent implements OnInit {
  apiResponse: User[] | undefined;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  public loadUsers() {
    this.userService
      .getUsers()
      .pipe(
        catchError((error) => {
          console.log(error);
          alert('Falha ao obter a lista de usuários');
          return of([]);
        }),
        finalize(() => {})
      )
      .subscribe((res: User[]) => {
        console.log('resposta =>', res);
        this.apiResponse = res;
      });
  }

  public deleteUser(id: string) {
    this.userService
      .delete(id)
      .pipe(
        catchError((error) => {
          console.log(error);
          alert('Falha ao deletar o usuário');
          return of([]);
        }),
        finalize(() => {})
      )
      .subscribe((res: any) => {
        console.log('resposta =>', res);
        this.loadUsers();
      });
  }
}
