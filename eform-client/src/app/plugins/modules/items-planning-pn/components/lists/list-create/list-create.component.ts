import {ChangeDetectorRef, Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {debounceTime, switchMap} from 'rxjs/operators';
import {ItemsPlanningPnListsService} from '../../../services';
import {SiteNameDto} from '../../../../../../common/models/dto';
import {DeployModel} from '../../../../../../common/models/eforms';
import {EFormService} from '../../../../../../common/services/eform';
import {SitesService} from '../../../../../../common/services/advanced';
import {AuthService} from '../../../../../../common/services/auth';
import {ListPnModel} from '../../../models/list';
import {TemplateListModel, TemplateRequestModel} from 'src/app/common/models/eforms';


@Component({
  selector: 'app-items-planning-pn-list-create',
  templateUrl: './list-create.component.html',
  styleUrls: ['./list-create.component.scss']
})
export class ListCreateComponent implements OnInit {
  @ViewChild('frame') frame;
  @Output() onListCreated: EventEmitter<void> = new EventEmitter<void>();
  @Output() onDeploymentFinished: EventEmitter<void> = new EventEmitter<void>();
  spinnerStatus = false;
  newListModel: ListPnModel = new ListPnModel();
  sitesDto: Array<SiteNameDto> = [];
  deployModel: DeployModel = new DeployModel();
  deployViewModel: DeployModel = new DeployModel();
  templateRequestModel: TemplateRequestModel = new TemplateRequestModel();
  templatesModel: TemplateListModel = new TemplateListModel();
  typeahead = new EventEmitter<string>();

  get userClaims() {
    return this.authService.userClaims;
  }
  constructor(private trashInspectionPnListsService: ItemsPlanningPnListsService,
              private sitesService: SitesService,
              private authService: AuthService,
              private eFormService: EFormService,
              private cd: ChangeDetectorRef) {
    this.typeahead
      .pipe(
        debounceTime(200),
        switchMap(term => {
          this.templateRequestModel.nameFilter = term;
          return this.eFormService.getAll(this.templateRequestModel);
        })
      )
      .subscribe(items => {
        this.templatesModel = items.model;
        this.cd.markForCheck();
      });
  }

  ngOnInit() {
    this.loadAllSites();
  }

  createInstallation() {
    // debugger;
    this.spinnerStatus = true;
    this.trashInspectionPnListsService.createList(this.newListModel).subscribe((data) => {
      // debugger;
      if (data && data.success) {
        this.onListCreated.emit();
        // this.submitDeployment();
        this.newListModel = new ListPnModel();
        this.frame.hide();
      } this.spinnerStatus = false;
    });
  }


  loadAllSites() {
    if (this.userClaims.eFormsPairingRead) {
      this.sitesService.getAllSitesForPairing().subscribe(operation => {
        this.spinnerStatus = true;
        if (operation && operation.success) {
          this.sitesDto = operation.model;
        }
        this.spinnerStatus = false;
      });
    }
  }

  show() {
    this.deployModel = new DeployModel();
    this.deployViewModel = new DeployModel();
    this.frame.show();
  }

  onSelectedChanged(e: any) {
    // debugger;
    this.newListModel.eFormId = e.id;
  }
  // submitDeployment() {
  //   this.spinnerStatus = true;
  //   // this.deployModel.id = this.newInstallationModel.id;
  //   this.eFormService.deploySingle(this.deployModel).subscribe(operation => {
  //     if (operation && operation.success) {
  //       this.frame.hide();
  //       this.onDeploymentFinished.emit();
  //     }
  //     this.spinnerStatus = false;
  //   });
  // }
}
