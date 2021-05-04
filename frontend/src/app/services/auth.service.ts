import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Credentials } from '../models/credentials.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiURL;

  private isAuthenticatedSub$ = new BehaviorSubject<boolean>(this.isAuthenticated());
  private isAuthenticated$ = this.isAuthenticatedSub$.asObservable();

  constructor(private http: HttpClient) { }

  login(credentials: Credentials) {
    const myHeaders = new Headers();
    myHeaders.set("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("username", credentials.username);
    urlencoded.append("password", credentials.password);

    var requestOptions: RequestInit = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };

    return fetch(`${this.apiUrl}/login`, requestOptions)
      .then(result => {
        if (result.status == 204) {
          sessionStorage.setItem('credentials', JSON.stringify(credentials));
          this.isAuthenticatedSub$.next(true);
        }
        return result.status;
      });
  }

  logout() {
    return this.http.get(`${this.apiUrl}/logout`).pipe(
      tap(resp => {
        sessionStorage.removeItem('credentials');
        this.isAuthenticatedSub$.next(false);
      })
    );
  }

  getStatus() {
    return this.isAuthenticated$;;
  }

  isAuthenticated() {
    return sessionStorage.getItem('credentials') !== null;
  }

  getCredentials() {
    return JSON.parse(sessionStorage.getItem('credentials')as string);
  }

}
