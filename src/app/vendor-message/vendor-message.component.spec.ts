import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorMessageComponent } from './vendor-message.component';

describe('VendorMessageComponent', () => {
  let component: VendorMessageComponent;
  let fixture: ComponentFixture<VendorMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
