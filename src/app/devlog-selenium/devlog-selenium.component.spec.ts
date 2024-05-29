import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevlogSeleniumComponent } from './devlog-selenium.component';

describe('DevlogSeleniumComponent', () => {
  let component: DevlogSeleniumComponent;
  let fixture: ComponentFixture<DevlogSeleniumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevlogSeleniumComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevlogSeleniumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
