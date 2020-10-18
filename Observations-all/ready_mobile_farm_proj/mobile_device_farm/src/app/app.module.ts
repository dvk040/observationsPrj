import { BrowserModule } from "@angular/platform-browser";
import { ModuleWithProviders, NgModule } from "@angular/core";
import { HttpClientModule , HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { DeviceViewComponent } from "./components/deviceView/device-view.component";
import { NewTestCreateDialog } from "./dialog/newTestCreate/newTestDialog";
import { RegisterDeviceDialog } from "./dialog/registerDevice/registerDevice";

import { DeviceService } from "./services/device.service";
import { StorageService } from "./services/storage.service";
import { ApiService } from "./services/api.service";

import { DeviceDetailsComponent } from "./components/device-details/device-details.component";
import { DeviceDetailViewComponent } from "./components/device-detail-view/device-detail-view.component";
import { DeviceScreenViewComponent } from "./components/device-screen-view/device-screen-view.component";
import { DeviceListViewComponent } from "./components/device-list-view/device-list-view.component";
import { LoaderComponent } from "./components/loader/loader.component";
import { LoadingService } from "./services/loading.service";

import { DeviceListComponent } from "./components/device-list/device-list.component";
import { SocketIoModule, SocketIoConfig } from "ngx-socket-io";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import {
  MAT_LABEL_GLOBAL_OPTIONS,
  MatNativeDateModule,
  MAT_DATE_LOCALE,
} from "@angular/material/core";
import { MatIconRegistry } from "@angular/material/icon";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatBadgeModule } from "@angular/material/badge";
import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatChipsModule } from "@angular/material/chips";
import { MatStepperModule } from "@angular/material/stepper";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatRadioModule } from "@angular/material/radio";
import { MatRippleModule } from "@angular/material/core";
import { MatSelectModule } from "@angular/material/select";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSliderModule } from "@angular/material/slider";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatTreeModule } from "@angular/material/tree";
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';

import { EditRegisterComponent } from './components/edit-register/edit-register.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';

//const config: SocketIoConfig = { url: "http://localhost:4000", options: {} };
const config: SocketIoConfig = {
  url: "http://localhost:4000",
  options: { transports: ["websocket"] },
};


@NgModule({
  declarations: [
    AppComponent,
    DeviceViewComponent,
    DeviceScreenViewComponent,
    DeviceDetailsComponent,
    DeviceListComponent,
    DeviceListViewComponent,
    LoaderComponent,
    DeviceDetailViewComponent,
    NewTestCreateDialog,
    RegisterDeviceDialog,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    ForgotPasswordComponent,
    ChangePasswordComponent,
    ProfileComponent,
    RegisterComponent,
    EditRegisterComponent,
    PagenotfoundComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    SocketIoModule.forRoot(config),
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    MatNativeDateModule,
  ],
  exports: [
    MatAutocompleteModule,
    MatBadgeModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    MatNativeDateModule,
  ],

  providers: [StorageService, ApiService, LoadingService],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(public matIconRegistry: MatIconRegistry) {
    // matIconRegistry.registerFontClassAlias('fontawesome', 'fa');
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AppModule,
      providers: [MatIconRegistry],
    };
  }
}
