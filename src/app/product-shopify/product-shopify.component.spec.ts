import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductShopifyComponent } from './product-shopify.component';

describe('ProductShopifyComponent', () => {
  let component: ProductShopifyComponent;
  let fixture: ComponentFixture<ProductShopifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductShopifyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductShopifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
