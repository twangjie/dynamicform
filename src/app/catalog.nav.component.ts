import {Component, OnInit, ViewChild} from '@angular/core';
import {ConfigService} from './config.service';

@Component({
  selector: 'app-catalog-nav',
  templateUrl: './catalog.nav.component.html',
  styleUrls: ['./catalog.nav.component.scss']
})
export class CatalogNavComponent implements OnInit {

  catalogs = ['全部配置项'];

  constructor(private configService: ConfigService) {

    const configs = configService.configFields;

    const arr = configs.filter(item => item.catalog !== undefined)
      .map(item => item.catalog.name).filter((v, i, a) => a.indexOf(v) === i);

    this.catalogs.push(...arr);
  }

  ngOnInit(): void {

  }

  onClick(item): void {
    console.log(item);
    if (item === '全部配置项') {
      item = undefined;
    }
    this.configService.announceCatalogClicked(item);
  }
}
