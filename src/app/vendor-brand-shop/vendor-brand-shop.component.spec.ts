import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorBrandShopComponent } from './vendor-brand-shop.component';

describe('VendorBrandShopComponent', () => {
  let component: VendorBrandShopComponent;
  let fixture: ComponentFixture<VendorBrandShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorBrandShopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorBrandShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
