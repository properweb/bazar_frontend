import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductWordpressComponent } from './product-wordpress.component';

describe('ProductWordpressComponent', () => {
  let component: ProductWordpressComponent;
  let fixture: ComponentFixture<ProductWordpressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductWordpressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductWordpressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
