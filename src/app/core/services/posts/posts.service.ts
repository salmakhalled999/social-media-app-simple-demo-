import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { platformBrowser } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class PostsService {

  private readonly httpClient = inject(HttpClient)
  private readonly platFormId = inject(PLATFORM_ID)
  headerToken:any

  constructor(){
    this.setHeaderToken()
    
  }


  // to organization to code
  setHeaderToken(){
    if(isPlatformBrowser(this.platFormId)){
            this.headerToken =
      {
        headers:{
        authorization:`Bearer ${localStorage.getItem('token')}`
      }
    }
    }
  }

  getAllPosts():Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}posts`, this.headerToken)
  }

  createPost(data:any):Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}posts`, data , this.headerToken)
  }

  getSinglePost(postId:any) :Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}posts/${postId}` , this.headerToken)
  }
}
