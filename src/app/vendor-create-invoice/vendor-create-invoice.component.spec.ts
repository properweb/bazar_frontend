import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorCreateInvoiceComponent } from './vendor-create-invoice.component';

describe('VendorCreateInvoiceComponent', () => {
  let component: VendorCreateInvoiceComponent;
  let fixture: ComponentFixture<VendorCreateInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorCreateInvoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorCreateInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
