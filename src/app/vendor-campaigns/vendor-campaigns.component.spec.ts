import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorCampaignsComponent } from './vendor-campaigns.component';

describe('VendorCampaignsComponent', () => {
  let component: VendorCampaignsComponent;
  let fixture: ComponentFixture<VendorCampaignsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorCampaignsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorCampaignsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
