import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfterLoginHomeComponent } from './after-login-home.component';

describe('AfterLoginHomeComponent', () => {
  let component: AfterLoginHomeComponent;
  let fixture: ComponentFixture<AfterLoginHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfterLoginHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AfterLoginHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
