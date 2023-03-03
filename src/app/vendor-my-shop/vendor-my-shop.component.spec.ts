import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorMyShopComponent } from './vendor-my-shop.component';

describe('VendorMyShopComponent', () => {
  let component: VendorMyShopComponent;
  let fixture: ComponentFixture<VendorMyShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorMyShopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorMyShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
