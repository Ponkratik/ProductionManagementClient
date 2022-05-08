import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanWorkerListComponent } from './plan-worker-list.component';

describe('PlanWorkerListComponent', () => {
  let component: PlanWorkerListComponent;
  let fixture: ComponentFixture<PlanWorkerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanWorkerListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanWorkerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
