import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorNewCampaignsComponent } from './vendor-new-campaigns.component';

describe('VendorNewCampaignsComponent', () => {
  let component: VendorNewCampaignsComponent;
  let fixture: ComponentFixture<VendorNewCampaignsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorNewCampaignsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorNewCampaignsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
