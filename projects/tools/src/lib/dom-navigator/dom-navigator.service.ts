import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DomNavigatorService
{

  private switchFocus$: Subject<any> = new Subject();
  private resize$: Subject<any> = new Subject();

  constructor()
  {
    window['DomNavigatorService'] = this;
  }

  public get focusSwitched$(): Observable<any>
  {
    return this.switchFocus$;
  }

  public set switchFocus(x: any)
  {
    this.switchFocus$.next(x);
  }

  public get resized$(): Observable<void>
  {
    return this.resize$;
  }

  public set resize(x: any)
  {
    this.resize$.next(x);
  }

  public getValueByPath(path, obj: any)
  {
    const properties = Array.isArray(path) ? path : path.split('.');
    return properties.reduce((prev, curr) => prev && prev[curr], obj);
  }


}
