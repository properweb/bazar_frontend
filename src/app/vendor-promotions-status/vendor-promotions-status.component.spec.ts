import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorPromotionsStatusComponent } from './vendor-promotions-status.component';

describe('VendorPromotionsStatusComponent', () => {
  let component: VendorPromotionsStatusComponent;
  let fixture: ComponentFixture<VendorPromotionsStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorPromotionsStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorPromotionsStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
