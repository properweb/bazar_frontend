import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternationalBrandsComponent } from './international-brands.component';

describe('InternationalBrandsComponent', () => {
  let component: InternationalBrandsComponent;
  let fixture: ComponentFixture<InternationalBrandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InternationalBrandsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InternationalBrandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
