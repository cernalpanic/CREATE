import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateKataDialogComponent } from './create-kata-dialog.component';

describe('CreateKataDialogComponent', () => {
  let component: CreateKataDialogComponent;
  let fixture: ComponentFixture<CreateKataDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateKataDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateKataDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
