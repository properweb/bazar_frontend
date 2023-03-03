import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorPerformanceReviewsComponent } from './vendor-performance-reviews.component';

describe('VendorPerformanceReviewsComponent', () => {
  let component: VendorPerformanceReviewsComponent;
  let fixture: ComponentFixture<VendorPerformanceReviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorPerformanceReviewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorPerformanceReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
