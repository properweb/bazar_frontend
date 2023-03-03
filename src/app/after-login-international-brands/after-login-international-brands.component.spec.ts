import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfterLoginInternationalBrandsComponent } from './after-login-international-brands.component';

describe('AfterLoginInternationalBrandsComponent', () => {
  let component: AfterLoginInternationalBrandsComponent;
  let fixture: ComponentFixture<AfterLoginInternationalBrandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfterLoginInternationalBrandsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AfterLoginInternationalBrandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
