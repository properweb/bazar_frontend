import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMyOrdersComponent } from './user-my-orders.component';

describe('UserMyOrdersComponent', () => {
  let component: UserMyOrdersComponent;
  let fixture: ComponentFixture<UserMyOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserMyOrdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMyOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
