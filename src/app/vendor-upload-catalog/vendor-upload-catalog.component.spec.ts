import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorUploadCatalogComponent } from './vendor-upload-catalog.component';

describe('VendorUploadCatalogComponent', () => {
  let component: VendorUploadCatalogComponent;
  let fixture: ComponentFixture<VendorUploadCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorUploadCatalogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorUploadCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
