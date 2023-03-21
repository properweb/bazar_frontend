import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorSellThroughComponent } from './vendor-sell-through.component';

describe('VendorSellThroughComponent', () => {
  let component: VendorSellThroughComponent;
  let fixture: ComponentFixture<VendorSellThroughComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorSellThroughComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorSellThroughComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
