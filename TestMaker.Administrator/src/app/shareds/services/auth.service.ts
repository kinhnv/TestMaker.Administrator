import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { IToken } from 'src/app/shareds/models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private TOKEN_KEY: string = 'token';

  constructor(private httpClient: HttpClient) {
  }

  login(userName: string, password: string): Observable<boolean> {
    var headers = new HttpHeaders();

    headers = headers.append('Authorization', 'Basic dGVzdHBsYXllcjp0ZXN0cGxheWVy');
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');

    return this.httpClient.post<IToken>('connect/token', `grant_type=password&username=${userName}&password=${password}`, {
      headers: headers
    }).pipe(map(token => {
      token.expries_date = new Date(new Date().getTime() + token.expires_in * 1000);
      if (localStorage) {
        localStorage.setItem(this.TOKEN_KEY, JSON.stringify(token));
        return true;
      }
      else {
        return false;
      }
    }));
  }

  getToken(): Observable<IToken> {
    if (localStorage && localStorage.getItem(this.TOKEN_KEY)) {
      return of(JSON.parse(localStorage.getItem(this.TOKEN_KEY) || ''));
    }
    else {
      return of()
    }
  }
}