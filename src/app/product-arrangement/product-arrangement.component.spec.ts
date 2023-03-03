import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductArrangementComponent } from './product-arrangement.component';

describe('ProductArrangementComponent', () => {
  let component: ProductArrangementComponent;
  let fixture: ComponentFixture<ProductArrangementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductArrangementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductArrangementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
