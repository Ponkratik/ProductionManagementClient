import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentUpdateComponent } from './component-update.component';

describe('ComponentUpdateComponent', () => {
  let component: ComponentUpdateComponent;
  let fixture: ComponentFixture<ComponentUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponentUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
