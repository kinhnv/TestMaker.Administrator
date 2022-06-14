import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { TableConfig } from '..';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input()
  config!: TableConfig;
  source: any = [];

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    if (this.config && this.config.url) {
      this.httpClient.get(this.config.url)
        .subscribe(source => {
          this.source = source;
        });
    }
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

  get displayedColumns(){
    return this.config.columns.map(c => c.property);
  }
}
