import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginRegisterModalComponent } from './login-register-modal.component';

describe('LoginRegisterModalComponent', () => {
  let component: LoginRegisterModalComponent;
  let fixture: ComponentFixture<LoginRegisterModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginRegisterModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginRegisterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
