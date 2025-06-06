import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeKataComponent } from './code-kata.component';

describe('CodeKataComponent', () => {
  let component: CodeKataComponent;
  let fixture: ComponentFixture<CodeKataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodeKataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodeKataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
