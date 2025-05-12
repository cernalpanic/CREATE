import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStudentKataComponent } from './edit-student-kata.component';

describe('EditStudentKataComponent', () => {
  let component: EditStudentKataComponent;
  let fixture: ComponentFixture<EditStudentKataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditStudentKataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditStudentKataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
