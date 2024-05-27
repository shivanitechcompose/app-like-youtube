import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserSignupSigninService {

  private apiUrl = 'https://3571-182-70-122-144.ngrok-free.app';

  constructor(private http: HttpClient) { }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/sign_up`, userData);
  }

  userEmailPresent(email: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/auth/check_email_present?email=${email}`);
  }

  login(loginData: any) {
    return this.http.post(`${this.apiUrl}/auth/sign_in`, loginData);
  }
}
