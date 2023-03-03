import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorFaqComponent } from './vendor-faq.component';

describe('VendorFaqComponent', () => {
  let component: VendorFaqComponent;
  let fixture: ComponentFixture<VendorFaqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorFaqComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorFaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
