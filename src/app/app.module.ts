import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { CalendarComponent } from './calendar/calendar.component';

registerLocaleData(localePt, 'pt-BR');

@NgModule({
  declarations: [
    AppComponent,
    ButtonsComponent,
    CalendarComponent
   ],
  imports: [
    BrowserModule
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR', // Defina o idioma padrão
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
