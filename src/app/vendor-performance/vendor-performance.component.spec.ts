import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorPerformanceComponent } from './vendor-performance.component';

describe('VendorPerformanceComponent', () => {
  let component: VendorPerformanceComponent;
  let fixture: ComponentFixture<VendorPerformanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorPerformanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
