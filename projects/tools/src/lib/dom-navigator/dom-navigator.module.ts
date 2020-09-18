import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomNavigatorDirective } from './dom-navigator.directive';
import { DomNavigatorItemDirective } from './dom-navigator-item.directive';



@NgModule({
  declarations: [DomNavigatorDirective, DomNavigatorItemDirective],
  imports: [
    CommonModule
  ],
  exports: [
    DomNavigatorDirective,
    DomNavigatorItemDirective
  ]
})
export class DomNavigatorModule { }
