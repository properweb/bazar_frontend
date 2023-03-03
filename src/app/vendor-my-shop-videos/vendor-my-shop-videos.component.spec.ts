import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorMyShopVideosComponent } from './vendor-my-shop-videos.component';

describe('VendorMyShopVideosComponent', () => {
  let component: VendorMyShopVideosComponent;
  let fixture: ComponentFixture<VendorMyShopVideosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorMyShopVideosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorMyShopVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
