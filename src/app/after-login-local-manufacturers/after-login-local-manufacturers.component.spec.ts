import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfterLoginLocalManufacturersComponent } from './after-login-local-manufacturers.component';

describe('AfterLoginLocalManufacturersComponent', () => {
  let component: AfterLoginLocalManufacturersComponent;
  let fixture: ComponentFixture<AfterLoginLocalManufacturersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfterLoginLocalManufacturersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AfterLoginLocalManufacturersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
