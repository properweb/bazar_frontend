import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorOrderPayoutsComponent } from './vendor-order-payouts.component';

describe('VendorOrderPayoutsComponent', () => {
  let component: VendorOrderPayoutsComponent;
  let fixture: ComponentFixture<VendorOrderPayoutsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorOrderPayoutsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorOrderPayoutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
