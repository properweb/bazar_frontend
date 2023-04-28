import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorOrderIssuesComponent } from './vendor-order-issues.component';

describe('VendorOrderIssuesComponent', () => {
  let component: VendorOrderIssuesComponent;
  let fixture: ComponentFixture<VendorOrderIssuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorOrderIssuesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorOrderIssuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
