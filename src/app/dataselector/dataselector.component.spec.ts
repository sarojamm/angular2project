import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataselectorComponent } from './dataselector.component';

describe('DataselectorComponent', () => {
  let component: DataselectorComponent;
  let fixture: ComponentFixture<DataselectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataselectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataselectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
