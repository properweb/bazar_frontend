import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorBazarDirect2Component } from './vendor-bazar-direct2.component';

describe('VendorBazarDirect2Component', () => {
  let component: VendorBazarDirect2Component;
  let fixture: ComponentFixture<VendorBazarDirect2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorBazarDirect2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorBazarDirect2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
