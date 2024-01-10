import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSuccessComponent } from './card-success.component';

describe('CardSuccessComponent', () => {
  let component: CardSuccessComponent;
  let fixture: ComponentFixture<CardSuccessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardSuccessComponent]
    });
    fixture = TestBed.createComponent(CardSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
