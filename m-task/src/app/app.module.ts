import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Pipe, PipeTransform } from '@angular/core';

import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TaskListComponent } from './dashboard/tasks-list/tasks-list.component';
import { NavbarComponent } from './dashboard/navbar/navbar.component';

import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';

import { CommonModule, formatDate } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateEditModalComponent } from './dashboard/tasks-list/create-edit-task/modal.component';
import { MatDialogRef } from '@angular/material/dialog';

import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TooltipModule } from 'ng2-tooltip-directive';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularMaterialModule } from './angular-material/angular-material.module';

@Pipe({
  name: 'amountConverter'
})

export class AmountConverterPipe implements PipeTransform {

  transform(value: number | string, locale?: string): string {
    return new Intl.NumberFormat(locale, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      style: "currency",
      currency: "ARS",
      currencyDisplay: "code"
    }).format(Number(value));
  }

}

@Pipe({
  name: 'currencyDateFormat'
})
export class CurrencyDateFormat implements PipeTransform{
  transform(value: string, currency: string): string {
      if (currency == 'es'){
          return formatDate(value , 'dd-MM-yyyy hh:mm:ss','en-US')
      }else{
          return formatDate(value , 'MM-dd-yyyy hh:mm:ss','en-US')
      }
  }
}

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    TaskListComponent,
    NavbarComponent,
    CreateEditModalComponent,
    AmountConverterPipe,
    CurrencyDateFormat,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    TooltipModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularMaterialModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
    BrowserAnimationsModule,
    NgbModule,
    FontAwesomeModule,
  ],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },
    CreateEditModalComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

