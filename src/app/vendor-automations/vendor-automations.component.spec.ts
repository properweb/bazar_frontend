import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorAutomationsComponent } from './vendor-automations.component';

describe('VendorAutomationsComponent', () => {
  let component: VendorAutomationsComponent;
  let fixture: ComponentFixture<VendorAutomationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorAutomationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorAutomationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
