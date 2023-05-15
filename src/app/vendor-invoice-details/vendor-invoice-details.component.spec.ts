import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorInvoiceDetailsComponent } from './vendor-invoice-details.component';

describe('VendorInvoiceDetailsComponent', () => {
  let component: VendorInvoiceDetailsComponent;
  let fixture: ComponentFixture<VendorInvoiceDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorInvoiceDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorInvoiceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
