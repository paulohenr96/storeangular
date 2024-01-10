import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDangerComponent } from './card-danger.component';

describe('CardDangerComponent', () => {
  let component: CardDangerComponent;
  let fixture: ComponentFixture<CardDangerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardDangerComponent]
    });
    fixture = TestBed.createComponent(CardDangerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
