import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorDashboardHeaderComponent } from './vendor-dashboard-header.component';

describe('VendorDashboardHeaderComponent', () => {
  let component: VendorDashboardHeaderComponent;
  let fixture: ComponentFixture<VendorDashboardHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorDashboardHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorDashboardHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
