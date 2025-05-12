import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentKataCardComponent } from './student-kata-card.component';

describe('StudentKataCardComponent', () => {
  let component: StudentKataCardComponent;
  let fixture: ComponentFixture<StudentKataCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentKataCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentKataCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
