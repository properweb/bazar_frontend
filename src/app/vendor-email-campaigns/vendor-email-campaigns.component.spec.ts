import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorEmailCampaignsComponent } from './vendor-email-campaigns.component';

describe('VendorEmailCampaignsComponent', () => {
  let component: VendorEmailCampaignsComponent;
  let fixture: ComponentFixture<VendorEmailCampaignsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorEmailCampaignsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorEmailCampaignsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
