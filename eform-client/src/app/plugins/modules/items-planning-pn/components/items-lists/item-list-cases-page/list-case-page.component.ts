import {Component, OnInit} from '@angular/core';
import {SharedPnService} from '../../../../shared/services';
import {ActivatedRoute} from '@angular/router';
import {PageSettingsModel} from '../../../../../../common/models/settings';
import {ItemsListCasePnModel} from '../../../models/list/items-list-case-pn.model';
import {ItemsPlanningPnCasesService} from '../../../services/items-planning-pn-cases.service';
import {ItemListCasesPnRequestModel} from '../../../models/list/item-list-cases-pn-request.model';

@Component({
  selector: 'app-items-planning-pn-list-case-page',
  templateUrl: './list-case-page.component.html',
  styleUrls: ['./list-case-page.component.scss']
})

export class ListCasePageComponent implements OnInit {
  localPageSettings: PageSettingsModel = new PageSettingsModel();
  listCaseRequestModel: ItemListCasesPnRequestModel = new ItemListCasesPnRequestModel();
  casesModel: ItemsListCasePnModel = new ItemsListCasePnModel();
  spinnerStatus = false;
  id: number;

  constructor(private activateRoute: ActivatedRoute,
              private sharedPnService: SharedPnService,
              private itemsPlanningPnCasesService: ItemsPlanningPnCasesService) {
    const activatedRouteSub = this.activateRoute.params.subscribe(params => {
      this.id = +params['id'];
    });
  }

  ngOnInit(): void {
    this.getLocalPageSettings();
  }

  getLocalPageSettings() {
    this.localPageSettings = this.sharedPnService.getLocalPageSettings
    ('itemsPlanningPnSettings', 'ItemListCases').settings;
    this.getAllInitialData();
  }

  updateLocalPageSettings() {
    this.sharedPnService.updateLocalPageSettings
    ('itemsPlanningPnSettings', this.localPageSettings, 'ItemListCases');
    this.getAllCases();
  }

  getAllInitialData() {
    this.getAllCases();
  }

  getAllCases() {
    this.spinnerStatus = true;
    this.listCaseRequestModel.isSortDsc = this.localPageSettings.isSortDsc;
    this.listCaseRequestModel.sort = this.localPageSettings.sort;
    this.listCaseRequestModel.pageSize = this.localPageSettings.pageSize;
    this.listCaseRequestModel.listId = this.id;
    this.itemsPlanningPnCasesService.getAllCases(this.listCaseRequestModel).subscribe((data) => {
      if (data && data.success) {
        this.casesModel = data.model;
      } this.spinnerStatus = false;
    });
  }

  sortTable(sort: string) {
    if (this.localPageSettings.sort === sort) {
      this.localPageSettings.isSortDsc = !this.localPageSettings.isSortDsc;
    } else {
      this.localPageSettings.isSortDsc = false;
      this.localPageSettings.sort = sort;
    }
    this.updateLocalPageSettings();
  }

  changePage(e: any) {
    if (e || e === 0) {
      this.listCaseRequestModel.offset = e;
      if (e === 0) {
        this.listCaseRequestModel.pageIndex = 0;
      } else {
        this.listCaseRequestModel.pageIndex
          = Math.floor(e / this.listCaseRequestModel.pageSize);
      }
      this.getAllCases();
    }
  }
}
