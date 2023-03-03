import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorEditPromotionsComponent } from './vendor-edit-promotions.component';

describe('VendorEditPromotionsComponent', () => {
  let component: VendorEditPromotionsComponent;
  let fixture: ComponentFixture<VendorEditPromotionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorEditPromotionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorEditPromotionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
