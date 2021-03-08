import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecurringListComponent } from './recurring-list.component';

describe('RecurringListComponent', () => {
  let component: RecurringListComponent;
  let fixture: ComponentFixture<RecurringListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecurringListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecurringListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
