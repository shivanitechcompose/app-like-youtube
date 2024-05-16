import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupBasicInfoComponent } from './signup-basic-info.component';

describe('SignupBasicInfoComponent', () => {
  let component: SignupBasicInfoComponent;
  let fixture: ComponentFixture<SignupBasicInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignupBasicInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignupBasicInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
