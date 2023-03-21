import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorAutomations3Component } from './vendor-automations3.component';

describe('VendorAutomations3Component', () => {
  let component: VendorAutomations3Component;
  let fixture: ComponentFixture<VendorAutomations3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorAutomations3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorAutomations3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
