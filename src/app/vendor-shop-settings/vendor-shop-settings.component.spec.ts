import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorShopSettingsComponent } from './vendor-shop-settings.component';

describe('VendorShopSettingsComponent', () => {
  let component: VendorShopSettingsComponent;
  let fixture: ComponentFixture<VendorShopSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorShopSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorShopSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
