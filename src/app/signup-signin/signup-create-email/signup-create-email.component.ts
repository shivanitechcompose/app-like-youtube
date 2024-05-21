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

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {}

  public goToCreatePassword(): void {
    this.signupForm.value.email = this.signupForm.value.email?.includes("@gmail.com") ? this.signupForm.value.email : this.signupForm.value.email + '@gmail.com'; 
    
    if (
      !this.signupForm.get('email')?.hasError('required') &&
      !this.signupForm.get('email')?.hasError('pattern') &&
      !this.signupForm.get('email')?.hasError('minlength') &&
      !this.signupForm.get('email')?.hasError('maxlength')
    ) {
      const userData = {
        signupType: 'password',
        mainHeader1: 'Create a strong',
        mainHeader2: 'password',
        subTitle: 'Create a strong password with a mixture of letters, numbers and symbols'
      }

      this.emitMainHeader.emit(userData);
      console.log("signupForm", this.signupForm?.value)
    }
  }
}
