import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagetasksetsComponent } from './managetasksets.component';

describe('ManagetasksetsComponent', () => {
  let component: ManagetasksetsComponent;
  let fixture: ComponentFixture<ManagetasksetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagetasksetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagetasksetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
