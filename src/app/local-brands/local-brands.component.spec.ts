import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalBrandsComponent } from './local-brands.component';

describe('LocalBrandsComponent', () => {
  let component: LocalBrandsComponent;
  let fixture: ComponentFixture<LocalBrandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocalBrandsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalBrandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
