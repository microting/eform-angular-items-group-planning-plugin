import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { debounceTime, switchMap } from 'rxjs/operators';
import { ItemsGroupPlanningPnListsService } from '../../../../services';
import {
  ItemsListPnCreateModel,
  ItemsListPnItemModel,
} from '../../../../models';
import { TemplateListModel, TemplateRequestModel } from 'src/app/common/models';
import { Location } from '@angular/common';
import { AuthService, EFormService } from 'src/app/common/services';
import { format, set } from 'date-fns';

@Component({
  selector: 'app-items-group-planning-pn-items-list-create',
  templateUrl: './items-list-create.component.html',
  styleUrls: ['./items-list-create.component.scss'],
})
export class ItemsListCreateComponent implements OnInit {
  @ViewChild('frame', { static: false }) frame;
  @ViewChild('unitImportModal', { static: false }) importUnitModal;
  @Output() listCreated: EventEmitter<void> = new EventEmitter<void>();
  newListModel: ItemsListPnCreateModel = new ItemsListPnCreateModel();
  templateRequestModel: TemplateRequestModel = new TemplateRequestModel();
  templatesModel: TemplateListModel = new TemplateListModel();
  typeahead = new EventEmitter<string>();

  get userClaims() {
    return this.authService.userClaims;
  }
  constructor(
    private itemsGroupPlanningPnListsService: ItemsGroupPlanningPnListsService,
    private authService: AuthService,
    private eFormService: EFormService,
    private cd: ChangeDetectorRef,
    private location: Location
  ) {
    this.typeahead
      .pipe(
        debounceTime(200),
        switchMap((term) => {
          this.templateRequestModel.nameFilter = term;
          return this.eFormService.getAll(this.templateRequestModel);
        })
      )
      .subscribe((items) => {
        this.templatesModel = items.model;
        this.cd.markForCheck();
      });
  }

  ngOnInit() {
    // this.loadAllSites();
  }

  goBack() {
    this.location.back();
  }

  createItemsList() {
    this.itemsGroupPlanningPnListsService
      .createList(this.newListModel)
      .subscribe((data) => {
        if (data && data.success) {
          this.listCreated.emit();
          // this.submitDeployment();
          this.newListModel = new ItemsListPnCreateModel();
          this.location.back();
        }
      });
  }

  show() {
    this.frame.show();
  }
  showImportModal() {
    this.importUnitModal.show();
  }

  addNewItem() {
    const newItem = new ItemsListPnItemModel();
    // set corresponding id
    if (!this.newListModel.items.length) {
      newItem.id = this.newListModel.items.length;
    } else {
      newItem.id =
        this.newListModel.items[this.newListModel.items.length - 1].id + 1;
    }
    this.newListModel.items.push(newItem);
  }

  removeItem(id: number) {
    this.newListModel.items = this.newListModel.items.filter(
      (x) => x.id !== id
    );
  }

  updateRepeatUntil(e: any) {
    let date = new Date(e);
    date = set(date, {
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    });
    this.newListModel.repeatUntil = format(
      date,
      `yyyy-MM-dd'T'HH:mm:ss.SSS'Z'`
    );
  }
}
