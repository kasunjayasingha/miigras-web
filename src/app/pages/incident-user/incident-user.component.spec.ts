import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentUserComponent } from './incident-user.component';

describe('IncidentUserComponent', () => {
  let component: IncidentUserComponent;
  let fixture: ComponentFixture<IncidentUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IncidentUserComponent]
    });
    fixture = TestBed.createComponent(IncidentUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
