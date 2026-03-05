import { isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { log } from 'node:console';
import { jwtDecode } from "jwt-decode";
import { BlankComponent } from "../../core/layout/blank/blank.component";
import { CreatepostComponent } from "../../shared/components/createpost/createpost.component";
import { SinglePostComponent } from "../../shared/components/single-post/single-post.component";
import { PostsService } from '../../core/services/posts/posts.service';
import { subscribe } from 'node:diagnostics_channel';
import { Ipost } from '../../core/models/Ipost/ipost.interface';

@Component({
  selector: 'app-home',
  imports: [CreatepostComponent, SinglePostComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {

  private readonly platformId = inject(PLATFORM_ID)
  private readonly postsService = inject(PostsService)

 
  postlist: Ipost[] = []


  ngOnInit(): void {
    this.getToken()
    // this.getAllPosts()
  }


  getToken() {
    if (isPlatformBrowser(this.platformId)) {
      let token = localStorage.getItem('token')

      if (token) {
        let decodedToken = jwtDecode(token)
        console.log('Token :', decodedToken)
      }
    }
  }




}
