import { Component, OnInit } from '@angular/core';
import { DomNavigatorService } from 'projects/tools/src/lib/dom-navigator/dom-navigator.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit
{
  items = []
  items2 = []
  active: any;
  active2: any;
  domNavigatorService: DomNavigatorService;

  constructor(private dns: DomNavigatorService)
  {
    this.domNavigatorService = dns;
  }

  ngOnInit()
  {
    for (let i = 0; i < 50; i++)
    {
      this.items.push({
        id: i,
        name: 'Person ' + i,
      })
      this.items2.push({
        path: {
          id: i,
        },
        name: 'Person ' + i,
      })
    }
    window['AppComponent'] = this;
  }

  onSelect(item)
  {
    this.active = item;
  }
  onSelect2(item)
  {
    this.active2 = item;
  }

}
