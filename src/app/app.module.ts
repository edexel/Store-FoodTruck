import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// services
import { FadeNotificationService } from './services/fade-notification.service';
import { HttpClientService } from './services/http-client.service';
//extern componeneent
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './component/shared/modal/modal.component';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableComponent } from './component/shared/table/table.component';
import { ListToysComponent } from './component/toys/list-toys/list-toys.component';
import { ErrorTailorModule } from '@ngneat/error-tailor';
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { ListFoodtruckComponent } from './component/foodtuck/list-foodtruck/list-foodtruck.component';

@NgModule({
  declarations: [
    AppComponent,
    ModalComponent,
    ListToysComponent,
    TableComponent,
    ListFoodtruckComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ErrorTailorModule.forRoot({
      errors: {
        useValue: {
          required: 'Campo requerido.',
          minlength: ({ requiredLength, actualLength }) =>
            `Expect ${requiredLength} but got ${actualLength}`,
          invalidAddress: (error) => `Address isn't valid`,
        },
      },
    }),
    NgbModule,
    SimpleNotificationsModule.forRoot(),
    BrowserAnimationsModule,
    NgbPaginationModule, NgbAlertModule
  ],
  providers: [HttpClientService, FadeNotificationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
