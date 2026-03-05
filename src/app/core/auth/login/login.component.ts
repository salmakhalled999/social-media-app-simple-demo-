import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { log } from 'console';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
 private readonly authService = inject(AuthService)
  private readonly router = inject(Router)

  successMsg: string = ''
  errorMsg: string = ''
  isLoading: boolean = false


  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
  })





  signIn() {
    if (this.loginForm.valid) {

      this.isLoading = true

      this.authService.signIn(this.loginForm.value).subscribe({
        next: (res) => {
          if (res.success) {
            // hide loading spinner
            this.isLoading = false

            // show success message
            this.errorMsg = ''
            this.successMsg = res.message
          }

          // save token
          localStorage.setItem( 'token' , res.data.token )

        },
        error: (err) => {
          // console.log(err);
          // hide loading spinner
          this.isLoading = false

          // show error message
          this.successMsg = ''
          this.errorMsg = err.error.message

        },
        complete:() => {
          setTimeout( ()=>
          {
            // if success navegate to home
            this.router.navigate(['/home'])
          },1000)
        }
      })
    }
    //  else{ 
    // if button non disabled 
    //   this.registerForm.markAllAsTouched()
    //  } 
  }

}
