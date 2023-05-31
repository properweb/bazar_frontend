import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorCustomIntegrationComponent } from './vendor-custom-integration.component';

describe('VendorCustomIntegrationComponent', () => {
  let component: VendorCustomIntegrationComponent;
  let fixture: ComponentFixture<VendorCustomIntegrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorCustomIntegrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorCustomIntegrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
