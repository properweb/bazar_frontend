import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfterLoginLocalBrandsComponent } from './after-login-local-brands.component';

describe('AfterLoginLocalBrandsComponent', () => {
  let component: AfterLoginLocalBrandsComponent;
  let fixture: ComponentFixture<AfterLoginLocalBrandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfterLoginLocalBrandsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AfterLoginLocalBrandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
