import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDeletionComponent } from './event-deletion.component';

describe('EventDeletionComponent', () => {
  let component: EventDeletionComponent;
  let fixture: ComponentFixture<EventDeletionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventDeletionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDeletionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
