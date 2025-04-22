import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InnerKataComponent } from './inner-kata.component';

describe('InnerKataComponent', () => {
  let component: InnerKataComponent;
  let fixture: ComponentFixture<InnerKataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InnerKataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InnerKataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
