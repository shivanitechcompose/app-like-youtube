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
  selector: 'app-signup-password',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    UserSignupSigninComponent],
  templateUrl: './signup-password.component.html',
  styleUrl: './signup-password.component.scss'
})
export class SignupPasswordComponent {

  @Input() public signupForm : FormGroup = this.fb.group({})
  hide = true;

  @Output() public emitMainHeader: EventEmitter<Object> = new EventEmitter();
  passwordIsRequired: boolean = false;
  passwordIncomplete: boolean = false;
  confirmPasswordRequired: boolean = false;
  passwordNotMatched: boolean = false;
  passwordPatternWrong: boolean = false;
  
  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    console.log("signupForm", this.signupForm?.value)
  }

  togglePasswordVisibility(): void {
    this.hide = !this.hide;
  }

  onFormSubmit(event: any) {
    console.log('step1:', event);
  }

  public goToNext(): void {
    console.log("signupForm", this.signupForm?.value);

    const password = this.signupForm.get('password')?.value;

    if(!password) {
      this.passwordIsRequired = true;
    }

    const confirmPassword = this.signupForm.get('confirmPassword')?.value;
    if(this.signupForm.get('password')?.value && !confirmPassword) {
      this.confirmPasswordRequired = true;
    }

    if(password && confirmPassword && this.signupForm.get('password')?.value !== this.signupForm.get('confirmPassword')?.value) {
      this.passwordNotMatched = true;
    } else {
      this.passwordNotMatched = false;
    }

    if(password && confirmPassword && !this.passwordNotMatched && this.signupForm.get('password')?.value?.length < 8) {
      this.passwordIncomplete = true;
    } else {
      this.passwordIncomplete = false;
    }

    if(password && confirmPassword && !this.passwordNotMatched && !this.passwordIncomplete && this.signupForm.get('password')?.hasError('pattern')) {
     this.passwordPatternWrong = true;
    } else {
      this.passwordPatternWrong = false;
    }

    const userData = {
      signupType: 'password',
      mainHeader1: 'Create a strong',
      mainHeader2: 'password',
      subTitle: 'Create a strong password with a mixture of letters, numbers and symbols'
    }

    this.emitMainHeader.emit(userData);
    console.log("signupForm", this.signupForm?.value)
  }

  checkValues() {
    this.passwordIsRequired = false;
    const password = this.signupForm.get('password')?.value;

    if(!password) {
      this.passwordIsRequired = true;
    }

  }

  checkValuesForConfirmPassword(): void {
    this.confirmPasswordRequired = false;
    const confirmPassword = this.signupForm.get('confirmPassword')?.value;

    if(this.signupForm.get('password')?.value && confirmPassword) {
      this.confirmPasswordRequired = false;
    }
  }
}
