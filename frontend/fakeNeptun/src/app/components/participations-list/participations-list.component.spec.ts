import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ParticipationsListComponent } from './participations-list.component';

describe('ParticipationsListComponent', () => {
  let component: ParticipationsListComponent;
  let fixture: ComponentFixture<ParticipationsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParticipationsListComponent],
      providers: [
        provideMockStore({
          initialState: { enrollments: { list: [] } }
        }),
        { provide: MAT_DIALOG_DATA, useValue: { courseCode: 'TEST123', startDate: new Date() } }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParticipationsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
