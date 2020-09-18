import { AfterViewInit, ChangeDetectorRef, Directive, ElementRef, HostListener, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DomNavigatorService } from './dom-navigator.service';

@Directive({
  selector: '[rsDomNavigatorItem]',
  exportAs: 'navItem'
})
export class DomNavigatorItemDirective implements AfterViewInit, OnDestroy
{

  @Input('item') item: any;
  public domRect;
  public domRectWithMargin;
  private subscriptions = new Subscription();

  constructor(private el: ElementRef, private changeDetectorRef: ChangeDetectorRef, private domNavigatorService: DomNavigatorService)
  {

  }

  ngAfterViewInit()
  {
    const s1 = this.domNavigatorService.resized$.subscribe(() => this.setDomRect());
    setTimeout(() =>
    {
      this.setDomRect();
    }, 100)
    this.changeDetectorRef.detectChanges();
    this.subscriptions.add(s1);
  }

  setDomRect()
  {
    this.domRect = this.getBoundingClientRect(this.el.nativeElement);
    this.domRectWithMargin = this.calcBoundingClientRectMargin(this.el.nativeElement);
  }

  calcBoundingClientRectMargin(element)
  {
    const style = element.currentStyle || window.getComputedStyle(element);
    const mt = style.marginTop ? parseInt(style.marginTop) : 0;
    const mr = style.marginRight ? parseInt(style.marginRight) : 0;
    const mb = style.marginBottom ? parseInt(style.marginBottom) : 0;
    const ml = style.marginLeft ? parseInt(style.marginLeft) : 0;

    return {
      top: parseFloat(this.domRect.top) - mt,
      right: parseFloat(this.domRect.right) + mr,
      bottom: parseFloat(this.domRect.bottom) + mb,
      left: parseFloat(this.domRect.left) - ml,
    }
  }

  getBoundingClientRect(element)
  {

    var rect = element.getBoundingClientRect();
    return {
      top: rect.top.toFixed(2),
      right: rect.right.toFixed(2),
      bottom: rect.bottom.toFixed(2),
      left: rect.left.toFixed(2),
      width: rect.width.toFixed(2),
      height: rect.height.toFixed(2),
      x: rect.x.toFixed(2),
      y: rect.y.toFixed(2)
    } as DOMRect;;
  }

  ngOnDestroy(): void
  {
    this.subscriptions.unsubscribe();

  }
}
