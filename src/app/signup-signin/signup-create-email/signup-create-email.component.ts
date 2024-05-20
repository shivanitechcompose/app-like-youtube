import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { UserSignupSigninComponent } from '../../shared/components/user-signup-signin/user-signup-signin.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup-create-email',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    UserSignupSigninComponent],
  templateUrl: './signup-create-email.component.html',
  styleUrl: './signup-create-email.component.scss'
})
export class SignupCreateEmailComponent {

  @Input() public signupForm : FormGroup = this.fb.group({})

  @Output() public emitMainHeader: EventEmitter<Object> = new EventEmitter();
  invalidEmail = false;
  
  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    console.log("signupForm", this.signupForm?.value)
  }

  onFormSubmit(event: any) {
    console.log('step1:', event);
  }

  public goToCreatePassword(): void {
    console.log("this.signupForm.value.email.length:", this.signupForm.value.email.length)
    console.log("this.signupForm.value.email.length:", this.signupForm.value.email.length < 6)

    console.log("this.signupForm.value.email.length:", this.signupForm.value.email.length > 30)

    if(this.signupForm.value.email && this.signupForm.value.email.length < 6 || this.signupForm.value.email.value > 30) {
      this.invalidEmail = true;
    }
    
    if(!this.invalidEmail) {
      this.signupForm.value.email = this.signupForm.value.email?.includes("@gmail.com") ? this.signupForm.value.email : this.signupForm.value.email + '@gmail.com'; 
      console.log("signupForm", this.signupForm?.value);
    }

      // if (
      //   !this.signupForm.get('dateOfBirthDay')?.hasError('required') &&
      //   !this.signupForm.get('dateOfBirthMonth')?.hasError('required') &&
      //   !this.signupForm.get('dateOfBirthYear')?.hasError('required') &&
      //   !this.signupForm.get('dateOfBirthYear')?.hasError('pattern') &&
      //   !this.dateOfBirthIncomplete
      // ) {
        const userData = {
          signupType: 'password',
          mainHeader1: 'Create a strong',
          mainHeader2: 'password',
          subTitle: 'Create a strong password with a mixture of letters, numbers and symbols'
        }
  
        this.emitMainHeader.emit(userData);
        console.log("signupForm", this.signupForm?.value)
      // }
  }
}
