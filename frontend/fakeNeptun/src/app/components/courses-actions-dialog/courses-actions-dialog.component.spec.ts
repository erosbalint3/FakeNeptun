import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesActionsDialogComponent } from './courses-actions-dialog.component';

describe('CoursesActionsDialogComponent', () => {
  let component: CoursesActionsDialogComponent;
  let fixture: ComponentFixture<CoursesActionsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursesActionsDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoursesActionsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
