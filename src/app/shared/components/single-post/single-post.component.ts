import { Component, inject, Input, input, OnInit } from '@angular/core';
import { Ipost } from '../../../core/models/Ipost/ipost.interface';
import { PostsService } from '../../../core/services/posts/posts.service';
import { CommentsComponent } from "../comments/comments.component";
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommentsService } from '../../../core/services/comments/comments.service';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-single-post',
  imports: [CommentsComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './single-post.component.html',
  styleUrl: './single-post.component.css',
})
export class SinglePostComponent implements OnInit{
  private readonly postsService = inject(PostsService)
  private readonly commentsService = inject(CommentsService)
  postList: Ipost[] =[]
  commentValue : FormControl = new FormControl(null , [Validators.required])


  ngOnInit():void{
    this.getAllPosts()
  }

  getAllPosts() {
    this.postsService.getAllPosts().subscribe({
      next: (res) => {
        console.log(res)
        if(res.success){
          this.postList = res.data.posts
        }
      },
      error: (err) => {
        console.log(err)
      }
    })
  }


  createComment(e:SubmitEvent , postId:any ){
    e.preventDefault()
    console.log('hello')
    if(this.commentValue.valid){
      let formData = new FormData()

      formData.append('content',this.commentValue.value)

      this.commentsService.createComment(formData,postId).subscribe({
        next:(res)=>{
          console.log(res)
          if(res.success){
            this.commentValue.reset()
          }
        },
        error:(err)=>{
          console.log(err)
        }
      })
    }



  }
}
