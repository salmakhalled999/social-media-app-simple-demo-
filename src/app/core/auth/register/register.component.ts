import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { log } from 'console';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private readonly authService = inject(AuthService)
  private readonly router = inject(Router)

  successMsg: string = ''
  errorMsg: string = ''
  isLoading: boolean = false


  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    username: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    dateOfBirth: new FormControl(null, [Validators.required]),
    gender: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#^()_\-+=]).{8,}$/)]),
    rePassword: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#^()_\-+=]).{8,}$/)]),
  }, { validators: this.confirmPassword })





  signUp() {
    if (this.registerForm.valid) {

      this.isLoading = true

      this.authService.signUp(this.registerForm.value).subscribe({
        next: (res) => {
          if (res.success) {
            console.log(res);
            this.isLoading = false

            // handel success message
            this.errorMsg = ''
            this.successMsg = res.message
          }

        },
        error: (err) => {
          console.log(err);
          this.isLoading = false

          // handel error message
          this.successMsg = ''
          this.errorMsg = err.error.message

        },
        complete:() => {
          setTimeout( ()=>
          {
            this.router.navigate(['/login'])
          },1000)
        }
      })
    }
    //  else{ 
    // if button non disabled 
    //   this.registerForm.markAllAsTouched()
    //  } 
  }

  //make a function (Parameter:data type)
  confirmPassword(group: any) {
    //1- emsek password value
    let passwordValue = group.get('password').value

    //2- emsek repassword value
    let rePasswordValue = group.get('rePassword').value

    //3-condition
    if (passwordValue == rePasswordValue) {
      return null;
    }
    else {
      return { mismatch: true }
    }


  }



}

