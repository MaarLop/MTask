import { Component, OnInit, Inject } from '@angular/core';
import { faUser, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    public translate: TranslateService,
    @Inject(DOCUMENT) private doc: Document
  ) 
  {
    translate.addLangs(['en', 'es']);
    translate.setDefaultLang('es');
  }
  switchLang(lang: string) {
    this.translate.use(lang);
  }

  
  ngOnInit(): void {  }

}
