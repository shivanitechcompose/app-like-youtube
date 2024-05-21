import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserSigninComponent } from '../../shared/components/user-signin/user-signin.component';

@Component({
  selector: 'app-signin-password',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    UserSigninComponent],
  templateUrl: './signin-password.component.html',
  styleUrl: './signin-password.component.scss'
})
export class SigninPasswordComponent {
  @Input() public signinForm : FormGroup = this.fb.group({})
  hide = true;

  @Output() public emitSigninMainHeader: EventEmitter<Object> = new EventEmitter();
  passwordIsRequired: boolean = false;
  passwordIncomplete: boolean = false;
  confirmPasswordRequired: boolean = false;
  passwordNotMatched: boolean = false;
  passwordPatternWrong: boolean = false;
  
  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    console.log("signinForm", this.signinForm?.value)
  }

  togglePasswordVisibility(): void {
    this.hide = !this.hide;
  }

  public goToNext(): void {
    console.log("signinForm", this.signinForm?.value);

    const password = this.signinForm.get('password')?.value;

    if(!password) {
      this.passwordIsRequired = true;
    }
    console.log("signinForm", this.signinForm?.value)
  }

  checkValues() {
    this.passwordIsRequired = false;
    const password = this.signinForm.get('password')?.value;

    if(!password) {
      this.passwordIsRequired = true;
    }

  }
}
