import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyViewComponent } from './agency-view.component';

describe('AgencyViewComponent', () => {
  let component: AgencyViewComponent;
  let fixture: ComponentFixture<AgencyViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgencyViewComponent]
    });
    fixture = TestBed.createComponent(AgencyViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
