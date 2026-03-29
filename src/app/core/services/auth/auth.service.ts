import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly httpClient = inject(HttpClient)
  private readonly router = inject(Router)


  signUp(data:any):Observable<any>{
    return this.httpClient.post(environment.baseUrl+'users/signup',data)
  }

  signIn(data:any):Observable<any>{
    return this.httpClient.post(environment.baseUrl+'users/signin',data)
  }

  logOut(){
    // navigate to log in page
    this.router.navigate(['/login'])

    // remove token
    localStorage.removeItem('token')
  }
}
