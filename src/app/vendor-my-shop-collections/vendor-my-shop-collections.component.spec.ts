import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorMyShopCollectionsComponent } from './vendor-my-shop-collections.component';

describe('VendorMyShopCollectionsComponent', () => {
  let component: VendorMyShopCollectionsComponent;
  let fixture: ComponentFixture<VendorMyShopCollectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorMyShopCollectionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorMyShopCollectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
