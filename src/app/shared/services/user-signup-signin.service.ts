import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserSignupSigninService {

  private apiUrl = 'https://3b57-2405-201-2019-f04f-a08a-d95e-46fc-dd1f.ngrok-free.app';

  private secretKey = 'your-secret-key'; // Use a more secure key in production

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
}
