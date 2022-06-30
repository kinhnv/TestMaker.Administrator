import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { TableConfig, TableConfigCloumn } from '..';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input()
  config!: TableConfig<any>;
  source: any = [];

  constructor(private httpClient: HttpClient, private router: Router) { }

  ngOnInit() {
    if (this.config && this.config.recycleBinConfig && this.config.recycleBinConfig.enable) {
      var deleteOrRestoreColumn: TableConfigCloumn<any> = {
        property: 'deleteOrRestoreColumn',
        text: this.isInRecycleBin ? 'icon_restore_from_trash' : 'icon_delete',
        title: '',
        width: '24px',
        event: ($event: any, item: any) => {
          if (this.isInRecycleBin) {

          }
          else {
            if (this.config.recycleBinConfig?.deleteEvent) {
              this.config.recycleBinConfig?.deleteEvent($event, item).subscribe(() => {
                this.getSource();
              });
            }
          }
        }
      }
      this.config.columns.push(deleteOrRestoreColumn);

      var recycleBinOrListButton = {
        title: this.isInRecycleBin ? 'icon_list' : 'icon_delete',
        event: ($event: any) => {
          var url = location.href;
          if (this.isInRecycleBin) {
            this.addParamToQuery('isDeleted', true);
          }
          else {
            this.removeParamToQuery('isDeleted', true);
          }
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
              this.router.navigate([this.router.url]);
          });
        }
      }

      this.config.buttons.push(recycleBinOrListButton)
    }

    this.getSource();
  }

  getSource() {
    if (this.config && this.config.url) {
      return this.httpClient.get(`${this.config.url}${new URL(location.href.replace('#/', '')).search}`)
        .subscribe(source => {
          this.source = source;
        });
    }

    return of(null);
  }

  fillValue(text: string, item: any) {
    for (const key in item) {
      if (Object.prototype.hasOwnProperty.call(item, key)) {
        const element = item[key];
        text = text.replace(`[${key}]`, element);
      }
    }
    return text;
  }

  getUrlFromLink(link: string): string {
    return new URL(link).pathname;
  }

  get displayedColumns() {
    return this.config.columns.map(c => c.property);
  }

  get isInRecycleBin() {
    return location.href.indexOf('isDeleted=true') >= 0
  }

  addParamToQuery(key: string, value: any) {
    location.href = location.href.replace(`?${key}=${value}`, '').replace(`&${key}=${value}`, '');
  }

  removeParamToQuery(key: string, value: any) {
    location.href = `${location.href}${location.href.indexOf('?') >= 0 ? '&' : '?'}${key}=${value}`;
  }
}
