import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorMyShopVideos2Component } from './vendor-my-shop-videos2.component';

describe('VendorMyShopVideos2Component', () => {
  let component: VendorMyShopVideos2Component;
  let fixture: ComponentFixture<VendorMyShopVideos2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorMyShopVideos2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorMyShopVideos2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
