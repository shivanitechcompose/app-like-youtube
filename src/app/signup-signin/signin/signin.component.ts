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
import { UserSignupSigninService } from '../../shared/services/user-signup-signin.service';

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

  accountNotFound: boolean = false;

  constructor(private fb: FormBuilder, private router: Router, private userSignupSigninService: UserSignupSigninService) {}

  ngOnInit(): void {}

  public goToCreatePassword(): void {
    if (
      !this.signinForm.get('email')?.hasError('required')
    ) {

      this.userSignupSigninService.userEmailPresent(this.signinForm.get('email')?.value).subscribe(
        (response: any) => {
          if(response['data']['email_already_exist']) {
            const userData = {
              signinType: 'signinPassword',
              mainHeader: 'Welcome',
              enteredEmail: this.signinForm.get('email')?.value
            }
      
            this.emitSigninMainHeader.emit(userData);
            console.log("signinForm", this.signinForm?.value)
          } else {
            this.accountNotFound = true;
          }
        },
        error => {
          console.error('User email present error:', error);
        }
      );
    }
  }

  public goToCreateAccount() {
    this.router.navigate(['/user-signup']);
  }
}
