import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLeftSidebarComponent } from './user-left-sidebar.component';

describe('UserLeftSidebarComponent', () => {
  let component: UserLeftSidebarComponent;
  let fixture: ComponentFixture<UserLeftSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserLeftSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserLeftSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
