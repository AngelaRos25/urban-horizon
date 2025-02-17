import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

// interface
import { AddUser, Login, User } from '../../modelli/interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private urlUser = 'https://gorest.co.in/public/v2/users';
  logged: boolean = true;


  constructor(private http: HttpClient, private router: Router) { }

  // login
  loginUser(login: Login): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${login.token}`)
    return this.http.get(this.urlUser, { headers })
  }


  // get token
  getToken(): string | null {
    const apiData = localStorage.getItem('ApiData');
    return apiData ? JSON.parse(apiData).token : null;
  }

  // save
  saveToken(login: Login, userId: number): void {
    const loginData = { token: login.token, id: userId, name: login.name, email: login.email }

    localStorage.setItem('ApiData', JSON.stringify(loginData))
  }

  // logout
  logout() {
    this.logged = false;
    localStorage.removeItem('ApiData');
    this.router.navigate(['login'])
  }

  // get user list
  getUserIndex(pageIndex: number, pageSize: number): Observable<User> {
    return this.http.get<User>(`${this.urlUser}?page=${pageIndex}&per_page=${pageSize}`)
  }

  // add user
  AddUser(user: AddUser) {
    return this.http.post(this.urlUser, user)
  }

  // delete
  deleteUserById(idUser: number): Observable<User[]> {
    return this.http.delete<User[]>(`${this.urlUser}/${idUser}`)
  }

  // get user details by id
  getUserId(idUser: number) {
    return this.http.get(`${this.urlUser}/${idUser}`)
  }
}



