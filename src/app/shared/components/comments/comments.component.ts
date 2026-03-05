import { Component, inject, Input, OnInit } from '@angular/core';
import { CommentsService } from '../../../core/services/comments/comments.service';
import { Icomment } from '../../../core/models/Icomment/icomment.interface';

@Component({
  selector: 'app-comments',
  imports: [],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css',
})
export class CommentsComponent  implements OnInit{
ngOnInit(): void {
  this.getPostComments()
}

private readonly commentsService = inject(CommentsService)
commentList: Icomment[] =[]


@Input({required:true}) postId! :string


getPostComments(){
  this.commentsService.getPostComments(this.postId).subscribe({
    next: (res)=>{
      console.log(res)
      this.commentList = res.data.comments
      
    },
    error: (err)=>{
      console.log(err)
    }
  })
}


}
