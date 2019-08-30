import {Component, OnInit, ViewChild} from '@angular/core';
import {ItemsListPnItemCaseModel} from '../../../models/list/items-list-case-pn.model';
import {ItemsPlanningPnCasesService, ItemsPlanningPnUploadedDataService} from '../../../services';
import {ItemsListPnCaseResultModel, UploadedDataModel, UploadedDatasModel} from '../../../models/list';

@Component({
  selector: 'app-item-case-uploaded-data',
  templateUrl: './item-case-uploaded-data.component.html',
  styleUrls: ['./item-case-uploaded-data.component.scss']
})
export class ItemCaseUploadedDataComponent implements OnInit {
  @ViewChild('frame') frame;
  @ViewChild('uploadedDataPdfModal') uploadedDataPdfModal;
  @ViewChild('uploadedDataDeleteModal') uploadedDataDeleteModal;
  spinnerStatus = false;
  uploadedDatasModel: UploadedDatasModel = new UploadedDatasModel();
  selectedListCase: ItemsListPnItemCaseModel = new ItemsListPnItemCaseModel();
  selectedListCaseResult: ItemsListPnCaseResultModel = new ItemsListPnCaseResultModel();
  constructor( private itemsPlanningPnCasesService: ItemsPlanningPnCasesService,
               private itemsPlanningPnUploadedDataService: ItemsPlanningPnUploadedDataService) { }

  ngOnInit() {
  }
  show(selectedListCase: ItemsListPnCaseResultModel) {
    this.getSelectedListCase(selectedListCase.id);
  }

  getSelectedListCase(id: number) {
    this.spinnerStatus = true;
    this.itemsPlanningPnCasesService.getSingleCase(id).subscribe((data) => {
      if (data && data.success) {
        this.selectedListCase = data.model;
        this.frame.show(this.selectedListCase);
        this.getAllUploadedData(id);
      }this.spinnerStatus = false;
    });
  }
  getAllUploadedData(itemCaseId: number) {
    this.spinnerStatus = true;
    this.itemsPlanningPnUploadedDataService.getAllUploadedData(itemCaseId).subscribe((data) => {
      if (data && data.success) {
        this.uploadedDatasModel = data.model;
      }this.spinnerStatus = false;
    });
  }
  downloadUploadedDataPdf(fileName: string) {
    // this.itemsPlanningPnUploadedDataService.downloadUploadedDataPdf(fileName);
    debugger;
    window.open('api/template-files/get-pdf/' + fileName);
  }
  showUploadPDFModal() {
    this.uploadedDataPdfModal.show(this.selectedListCase);
  }
  showUploadedDataDeleteModal(uploadedData: UploadedDataModel) {
    this.uploadedDataDeleteModal.show(uploadedData);
  }
}