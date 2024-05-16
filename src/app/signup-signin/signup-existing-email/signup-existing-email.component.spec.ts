import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupExistingEmailComponent } from './signup-existing-email.component';

describe('SignupExistingEmailComponent', () => {
  let component: SignupExistingEmailComponent;
  let fixture: ComponentFixture<SignupExistingEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignupExistingEmailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignupExistingEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
