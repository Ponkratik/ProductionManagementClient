import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineUpdateComponent } from './machine-update.component';

describe('MachineUpdateComponent', () => {
  let component: MachineUpdateComponent;
  let fixture: ComponentFixture<MachineUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MachineUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MachineUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
