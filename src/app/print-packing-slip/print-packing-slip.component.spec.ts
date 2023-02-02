import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintPackingSlipComponent } from './print-packing-slip.component';

describe('PrintPackingSlipComponent', () => {
  let component: PrintPackingSlipComponent;
  let fixture: ComponentFixture<PrintPackingSlipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintPackingSlipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintPackingSlipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
