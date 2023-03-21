import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorBulkProductsComponent } from './vendor-bulk-products.component';

describe('VendorBulkProductsComponent', () => {
  let component: VendorBulkProductsComponent;
  let fixture: ComponentFixture<VendorBulkProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorBulkProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorBulkProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
