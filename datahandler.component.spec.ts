import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatahandlerComponent } from './datahandler.component';

describe('DatahandlerComponent', () => {
  let component: DatahandlerComponent;
  let fixture: ComponentFixture<DatahandlerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatahandlerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatahandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
