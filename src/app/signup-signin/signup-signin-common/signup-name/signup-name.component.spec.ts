import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupNameComponent } from './signup-name.component';

describe('SignupNameComponent', () => {
  let component: SignupNameComponent;
  let fixture: ComponentFixture<SignupNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignupNameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignupNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
