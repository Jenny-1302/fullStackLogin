import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserI } from '../models/user';
import { JwtResponseI } from '../models/jwt-response';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject} from 'rxjs';


@Injectable()
export class AuthService {
  AUTH_SERVER: string = 'http://localhost:3000'
  authSubject = new BehaviorSubject(false);
  private token: string = '';
  constructor(private httpClient: HttpClient) { }

  register(user: UserI): Observable<JwtResponseI> {
    return this.httpClient.post<JwtResponseI>(`${this.AUTH_SERVER}/register`, user).pipe(tap(
      (res: JwtResponseI) =>{
        if(res){
          //Guardar token
          this.saveToken(res.dataUser.accessToken, res.dataUser.expiresIn)

        }
      }
    ))
  }

  login(user: UserI): Observable<JwtResponseI> {
    return this.httpClient.post<JwtResponseI>(`${this.AUTH_SERVER}/login`, user).pipe(tap(
      (res: JwtResponseI) =>{
        if(res){
          //Guardar token
          this.saveToken(res.dataUser.accessToken, res.dataUser.expiresIn)
          
        }
      }
    ))
  }

  logout(): void{
    this.token = '';
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("Expires_In");
  }

  private saveToken(token: string, expiresIn: string): void{
    localStorage.setItem("ACCESS_TOKEN", token);
    localStorage.setItem("Expires_In", expiresIn);
    this.token = token;
  }

  private getToken(): string{
   if (!this.token) {
    const token = localStorage.getItem("ACCESS_TOKEN");
    if (token !== null) {
      this.token = token;
    }
  }
    return this.token;
  }

  getUsers(): Observable<UserI[]>{
    return this.httpClient.get<UserI[]>(`${this.AUTH_SERVER}/users`);
  }
}
