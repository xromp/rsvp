import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
// User interface
export class User {
  firstName!: String;
  lastName!: String;
  status!: String;
  extraAttendees!: String;
  email!: String;
  reason!: String;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) { }
  // User registration
  register(user: User): Observable<any> {
    return this.http.post(environment.API_URL + '/api/auth/register', user);
  }

  registerGuest(uuid: string, user: User): Observable<any> {
    return this.http.patch(environment.API_URL + `/api/guest/response/${uuid}`, { ...user, confirmedDate: new Date() });
  }

  getGuest(uuid: string): Observable<any> {
    return this.http.get(environment.API_URL + `/api/guest/${uuid}`);
  }

  list(params: any): Observable<any> {
    return this.http.post(environment.API_URL + '/api/guest/list', params);
  }

  // Login
  signin(user: User): Observable<any> {
    return this.http.post<any>(environment.API_URL + '/api/auth/login', user);
  }
  // Access user profile
  profileUser(): Observable<any> {
    return this.http.get(environment.API_URL + '/api/auth/user-profile');
  }
}