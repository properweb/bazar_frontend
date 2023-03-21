import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorInvoicingComponent } from './vendor-invoicing.component';

describe('VendorInvoicingComponent', () => {
  let component: VendorInvoicingComponent;
  let fixture: ComponentFixture<VendorInvoicingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorInvoicingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorInvoicingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
