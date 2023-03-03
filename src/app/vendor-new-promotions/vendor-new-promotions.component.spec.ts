import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorNewPromotionsComponent } from './vendor-new-promotions.component';

describe('VendorNewPromotionsComponent', () => {
  let component: VendorNewPromotionsComponent;
  let fixture: ComponentFixture<VendorNewPromotionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorNewPromotionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorNewPromotionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
