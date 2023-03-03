import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorSideMenuComponent } from './vendor-side-menu.component';

describe('VendorSideMenuComponent', () => {
  let component: VendorSideMenuComponent;
  let fixture: ComponentFixture<VendorSideMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorSideMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorSideMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
