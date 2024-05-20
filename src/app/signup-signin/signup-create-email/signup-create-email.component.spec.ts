import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupCreateEmailComponent } from './signup-create-email.component';

describe('SignupCreateEmailComponent', () => {
  let component: SignupCreateEmailComponent;
  let fixture: ComponentFixture<SignupCreateEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignupCreateEmailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignupCreateEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
