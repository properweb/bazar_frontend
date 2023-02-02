import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorAutomations2Component } from './vendor-automations2.component';

describe('VendorAutomations2Component', () => {
  let component: VendorAutomations2Component;
  let fixture: ComponentFixture<VendorAutomations2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorAutomations2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorAutomations2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
