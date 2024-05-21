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
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    UserSigninComponent],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {
  @Input() public signinForm : FormGroup = this.fb.group({})
  @Output() public emitSigninMainHeader: EventEmitter<Object> = new EventEmitter();

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {}

  public goToCreatePassword(): void {
    if (
      !this.signinForm.get('email')?.hasError('required')
    ) {
      const userData = {
        signinType: 'signinPassword',
        mainHeader: 'Welcome',
        enteredEmail: this.signinForm.get('email')?.value
      }

      this.emitSigninMainHeader.emit(userData);
      console.log("signinForm", this.signinForm?.value)
    }
  }

  public goToCreateAccount() {
    this.router.navigate(['/user-signup']);
  }
}
