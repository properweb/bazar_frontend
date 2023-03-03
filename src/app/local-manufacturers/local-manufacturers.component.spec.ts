import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalManufacturersComponent } from './local-manufacturers.component';

describe('LocalManufacturersComponent', () => {
  let component: LocalManufacturersComponent;
  let fixture: ComponentFixture<LocalManufacturersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocalManufacturersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalManufacturersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
