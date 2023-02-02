import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorsRegistrationComponent } from './vendors-registration.component';

describe('VendorsRegistrationComponent', () => {
  let component: VendorsRegistrationComponent;
  let fixture: ComponentFixture<VendorsRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorsRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorsRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
