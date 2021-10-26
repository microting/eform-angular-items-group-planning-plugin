import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedPnModule } from '../shared/shared-pn.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { EformSharedModule } from 'src/app/common/modules/eform-shared/eform-shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ItemsGroupPlanningPnLayoutComponent } from './layouts';
import { RouterModule } from '@angular/router';
import { ItemsGroupPlanningPnRouting } from './items-group-planning-pn.routing.module';
import {
  ItemsGroupPlanningPnListsService,
  ItemsGroupPlanningPnSettingsService,
  ItemsGroupPlanningPnReportsService,
  ItemsGroupPlanningPnCasesService,
  ItemsGroupPlanningPnUploadedDataService,
} from './services';
import { FileUploadModule } from 'ng2-file-upload';
import {
  OWL_DATE_TIME_FORMATS,
  OwlDateTimeModule,
  OwlMomentDateTimeModule,
} from '@danielmoncada/angular-datetime-picker';
import {
  ItemCaseUploadedDataComponent,
  ItemListCaseColumnsModalComponent,
  ItemsGroupPlanningPnUnitImportComponent,
  ItemsGroupPlanningSettingsComponent,
  ItemsListCreateComponent,
  ListCasePageComponent,
  ListCaseResultPageComponent,
  ListDeleteComponent,
  ListEditComponent,
  ListsPageComponent,
  ReportGeneratorContainerComponent,
  ReportGeneratorFormComponent,
  ReportPreviewTableComponent,
  UploadedDataDeleteComponent,
  UploadedDataPdfComponent,
} from './components';
import { itemsGroupPlanningStoreProviders } from './store-providers.config';
import { MY_MOMENT_FORMATS_FOR_ITEMS_GROUP_PLANNING } from './consts/custom-date-time-adapter';

@NgModule({
  imports: [
    CommonModule,
    SharedPnModule,
    MDBBootstrapModule,
    TranslateModule,
    FormsModule,
    NgSelectModule,
    EformSharedModule,
    FontAwesomeModule,
    RouterModule,
    ItemsGroupPlanningPnRouting,
    ReactiveFormsModule,
    FileUploadModule,
    OwlDateTimeModule,
    OwlMomentDateTimeModule,
  ],
  declarations: [
    ItemsGroupPlanningPnLayoutComponent,
    ItemListCaseColumnsModalComponent,
    ListsPageComponent,
    ListCaseResultPageComponent,
    ItemsListCreateComponent,
    ListCasePageComponent,
    ListEditComponent,
    ListDeleteComponent,
    ItemsGroupPlanningSettingsComponent,
    ReportGeneratorContainerComponent,
    ReportGeneratorFormComponent,
    ReportPreviewTableComponent,
    ItemCaseUploadedDataComponent,
    UploadedDataPdfComponent,
    UploadedDataDeleteComponent,
    ItemsGroupPlanningPnUnitImportComponent,
  ],
  providers: [
    ItemsGroupPlanningPnSettingsService,
    ItemsGroupPlanningPnListsService,
    ItemsGroupPlanningPnReportsService,
    ItemsGroupPlanningPnCasesService,
    ItemsGroupPlanningPnUploadedDataService,
    {
      provide: OWL_DATE_TIME_FORMATS,
      useValue: MY_MOMENT_FORMATS_FOR_ITEMS_GROUP_PLANNING,
    },
    ...itemsGroupPlanningStoreProviders,
  ],
})
export class ItemsGroupPlanningPnModule {}
