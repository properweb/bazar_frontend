import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountSeeing2Component } from './account-seeing2.component';

describe('AccountSeeing2Component', () => {
  let component: AccountSeeing2Component;
  let fixture: ComponentFixture<AccountSeeing2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountSeeing2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountSeeing2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
