import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorBazarDirectComponent } from './vendor-bazar-direct.component';

describe('VendorBazarDirectComponent', () => {
  let component: VendorBazarDirectComponent;
  let fixture: ComponentFixture<VendorBazarDirectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorBazarDirectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorBazarDirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
