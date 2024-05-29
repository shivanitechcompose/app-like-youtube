import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserSignupSigninService {

  private apiUrl = 'https://4272-182-70-122-144.ngrok-free.app';

  private secretKey = 'your-secret-key'; // Use a more secure key in production

  constructor(private http: HttpClient) { }

  public register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/sign_up`, userData);
  }

  public userEmailPresent(email: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/auth/check_email_present?email=${email}`);
  }

  public login(loginData:any): Observable<HttpResponse<Object>> {
    return this.http.post<Object>(`${this.apiUrl}/auth/sign_in`, loginData, {
      headers: new HttpHeaders(),
      observe: 'response'
    });
  } 
}
