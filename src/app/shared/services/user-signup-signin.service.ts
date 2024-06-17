import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserSignupSigninService {

  private apiUrl = 'https://f27a-2405-201-2019-f006-14f0-e97e-3a8d-4a02.ngrok-free.app';

  constructor(private http: HttpClient) { }

  public register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/sign_up`, userData, {
      headers: new HttpHeaders(),
      observe: 'response'
    });
  }

  public userEmailPresent(email: string): Observable<any> {
    console.log('email', email)
    return this.http.get(`${this.apiUrl}/auth/check_email_present?email=${email}`);
  }

  public login(loginData:any): Observable<HttpResponse<Object>> {
    return this.http.post<Object>(`${this.apiUrl}/auth/sign_in`, loginData, {
      headers: new HttpHeaders(),
      observe: 'response'
    });
  }

  public getUserDetails(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/get_user_info?user_id=${userId}`);
  }


  public signout(userId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/auth/sign_out?user_id=${userId}`);
  }
}
