import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LargeWidgetComponent } from './large-widget.component';

describe('LargeWidgetComponent', () => {
  let component: LargeWidgetComponent;
  let fixture: ComponentFixture<LargeWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LargeWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LargeWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
