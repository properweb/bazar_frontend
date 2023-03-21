import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkEditProductsComponent } from './bulk-edit-products.component';

describe('BulkEditProductsComponent', () => {
  let component: BulkEditProductsComponent;
  let fixture: ComponentFixture<BulkEditProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BulkEditProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkEditProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
