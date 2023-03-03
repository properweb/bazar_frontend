import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorAutomations4Component } from './vendor-automations4.component';

describe('VendorAutomations4Component', () => {
  let component: VendorAutomations4Component;
  let fixture: ComponentFixture<VendorAutomations4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorAutomations4Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorAutomations4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
