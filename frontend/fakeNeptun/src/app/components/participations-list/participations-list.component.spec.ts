import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipationsListComponent } from './participations-list.component';

describe('ParticipationsListComponent', () => {
  let component: ParticipationsListComponent;
  let fixture: ComponentFixture<ParticipationsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParticipationsListComponent]
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
