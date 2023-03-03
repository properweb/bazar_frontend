import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsOUseComponent } from './terms-o-use.component';

describe('TermsOUseComponent', () => {
  let component: TermsOUseComponent;
  let fixture: ComponentFixture<TermsOUseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TermsOUseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsOUseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
