import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MContentComponent } from './m-content.component';

describe('MContentComponent', () => {
  let component: MContentComponent;
  let fixture: ComponentFixture<MContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
