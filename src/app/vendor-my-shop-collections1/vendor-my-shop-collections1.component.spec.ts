import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorMyShopCollections1Component } from './vendor-my-shop-collections1.component';

describe('VendorMyShopCollections1Component', () => {
  let component: VendorMyShopCollections1Component;
  let fixture: ComponentFixture<VendorMyShopCollections1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorMyShopCollections1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorMyShopCollections1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
