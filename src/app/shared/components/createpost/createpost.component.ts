import { formatDate } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostsService } from '../../../core/services/posts/posts.service';
import { error } from 'console';

@Component({
  selector: 'app-createpost',
  imports: [ReactiveFormsModule],
  templateUrl: './createpost.component.html',
  styleUrl: './createpost.component.css',
})
export class CreatepostComponent {
  private readonly postsService = inject(PostsService)

  //input value
  postDescription:FormControl = new FormControl(null,[Validators.required])

  //uploaded file
  uploadedFile:any
  prepareUploadedFile(e:Event){
    let input = e.target as HTMLInputElement
    if(input){
      if(input.files){
        this.uploadedFile = input.files[0]
      }
    }
  }


  createPost(e:SubmitEvent){
    e.preventDefault()
    console.log('hello')

    let formData = new FormData //empty containeer
    formData.append('body', this.postDescription.value)
    formData.append('image', this.uploadedFile)


    this.postsService.createPost(formData).subscribe({
      next: (res)=> {
        console.log(res)
      },
      error: (err)=>{
        console.log(err)
      }
    
  })
}
}
