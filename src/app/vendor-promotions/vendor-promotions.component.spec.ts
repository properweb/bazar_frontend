import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorPromotionsComponent } from './vendor-promotions.component';

describe('VendorPromotionsComponent', () => {
  let component: VendorPromotionsComponent;
  let fixture: ComponentFixture<VendorPromotionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorPromotionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorPromotionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
