import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorCustomers2Component } from './vendor-customers2.component';

describe('VendorCustomers2Component', () => {
  let component: VendorCustomers2Component;
  let fixture: ComponentFixture<VendorCustomers2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorCustomers2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorCustomers2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
