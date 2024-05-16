import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupSigninCommonComponent } from './signup-signin-common.component';

describe('SignupSigninCommonComponent', () => {
  let component: SignupSigninCommonComponent;
  let fixture: ComponentFixture<SignupSigninCommonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignupSigninCommonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignupSigninCommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
