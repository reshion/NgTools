import { ContentChildren, Directive, ElementRef, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output, QueryList } from '@angular/core';
import { Subscription } from 'rxjs';
import { DomNavigatorItemDirective } from './dom-navigator-item.directive';
import { DomNavigatorService } from './dom-navigator.service';

@Directive({
  selector: '[rsDomNavigator]'
})
export class DomNavigatorDirective implements OnInit, OnDestroy
{
  @ContentChildren(DomNavigatorItemDirective) domNavigatorItems: QueryList<DomNavigatorItemDirective>;
  @ContentChildren(DomNavigatorItemDirective, { read: ElementRef }) domNavigatorItems2: QueryList<ElementRef>;
  @Input('active') active: any;
  @Input('identifier') identifier: any;
  @Output('onNavigate') onNavigate: EventEmitter<any> = new EventEmitter();

  private focused = false;
  private subscriptions = new Subscription();
  private timestamp: number

  constructor(private el: ElementRef, private domNavigatorService: DomNavigatorService)
  {

  }

  ngOnInit()
  {
    const date = new Date();
    this.timestamp = date.getTime();

    const s1 = this.domNavigatorService.focusSwitched$.subscribe(x =>
    {
      this.focused = x === this.timestamp ? true : false;
    })

    this.subscriptions.add(s1);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event)
  {
    console.log('onResize')
    this.domNavigatorService.resize = true;
  }

  @HostListener('click', ['$event'])
  onClick(event)
  {
    this.domNavigatorService.switchFocus = this.timestamp;

  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent)
  {
    event.preventDefault();
    event.stopPropagation();
    if (!this.focused) return;
    if (!this.active) return;
    let next;
    next = this.next(this.active, event.key);
    this.onNavigate.emit(next);
  }



  next(active, direction)
  {
    const current = this.domNavigatorItems.find(x => this.domNavigatorService.getValueByPath(this.identifier, x.item) === this.domNavigatorService.getValueByPath(this.identifier, active));
    let next;
    let nearest = -1;
    this.domNavigatorItems.forEach((value) =>
    {
      switch (direction)
      {
        case 'ArrowUp':
          if (current.domRectWithMargin.top === value.domRectWithMargin.bottom)
          {
            let that = Math.abs(current.domRectWithMargin.right - value.domRectWithMargin.right)
            if (nearest === -1 || nearest >= that)
            {
              nearest = that;
              next = value.item;
            }
          }
          break;
        case 'ArrowDown':
          if (current.domRectWithMargin.bottom === value.domRectWithMargin.top)
          {
            let that = Math.abs(current.domRectWithMargin.right - value.domRectWithMargin.right)
            if (nearest === -1 || nearest >= that)
            {
              nearest = that;
              next = value.item;
            }
          }
          break;
        case 'ArrowRight':
          if (current.domRectWithMargin.right === value.domRectWithMargin.left)
          {
            if (current.domRectWithMargin.top === value.domRectWithMargin.top)
            {
              next = value.item;
            }
          }
          break;

        case 'ArrowLeft':

          if (current.domRectWithMargin.left === value.domRectWithMargin.right)
          {
            if (current.domRectWithMargin.top === value.domRectWithMargin.top)
            {
              next = value.item;
            }
          }
          break;
      }

    })
    return next ? next : active;
  }

  ngOnDestroy(): void
  {
    this.subscriptions.unsubscribe();
  }

}
