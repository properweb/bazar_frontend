import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorAutomationsEditComponent } from './vendor-automations-edit.component';

describe('VendorAutomationsEditComponent', () => {
  let component: VendorAutomationsEditComponent;
  let fixture: ComponentFixture<VendorAutomationsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorAutomationsEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorAutomationsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
