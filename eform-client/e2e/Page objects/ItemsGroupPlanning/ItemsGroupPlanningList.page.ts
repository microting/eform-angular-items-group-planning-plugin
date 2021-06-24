import Page from '../Page';
import itemsPlanningModalPage from './ItemsGroupPlanningModal.page';
import { PageWithNavbarPage } from '../PageWithNavbar.page';
import { Guid } from 'guid-typescript';
import XMLForEformFractions from '../../Constants/XMLForEformFractions';

export class ItemsGroupPlanningListPage extends PageWithNavbarPage {
  constructor() {
    super();
  }

  public rowNum(): number {
    browser.pause(500);
    return $$('#tableBody > tr').length;
  }

  public get idTableHeader() {
    const ele = $('#idTableHeader');
    ele.waitForDisplayed({ timeout: 40000 });
    ele.waitForClickable({ timeout: 40000 });
    return ele;
  }

  public get nameTableHeader() {
    const ele = $('#nameTableHeader');
    ele.waitForDisplayed({ timeout: 40000 });
    ele.waitForClickable({ timeout: 40000 });
    return ele;
  }

  public get descriptionTableHeader() {
    const ele = $('#descriptionTableHeader');
    ele.waitForDisplayed({ timeout: 40000 });
    ele.waitForClickable({ timeout: 40000 });
    return ele;
  }

  public get newEformBtn() {
    $('#newEFormBtn').waitForDisplayed({ timeout: 20000 });
    $('#newEFormBtn').waitForClickable({ timeout: 20000 });
    return $('#newEFormBtn');
  }
  public get xmlTextArea() {
    $('#eFormXml').waitForDisplayed({ timeout: 20000 });
    $('#eFormXml').waitForClickable({ timeout: 20000 });
    return $('#eFormXml');
  }
  public get createEformBtn() {
    $('#createEformBtn').waitForDisplayed({ timeout: 20000 });
    $('#createEformBtn').waitForClickable({ timeout: 20000 });
    return $('#createEformBtn');
  }
  public get createEformTagSelector() {
    $('#createEFormMultiSelector').waitForDisplayed({ timeout: 20000 });
    $('#createEFormMultiSelector').waitForClickable({ timeout: 20000 });
    return $('#createEFormMultiSelector');
  }
  public get createEformNewTagInput() {
    $('#addTagInput').waitForDisplayed({ timeout: 20000 });
    $('#addTagInput').waitForClickable({ timeout: 20000 });
    return $('#addTagInput');
  }
  public clickIdTableHeader() {
    $(`//*[contains(@id, 'idTableHeader')]`).click();
    $('#spinner-animation').waitForDisplayed({ timeout: 90000, reverse: true });
  }

  public clickNameTableHeader() {
    $(`//*[contains(@id, 'nameTableHeader')]`).click();
    $('#spinner-animation').waitForDisplayed({ timeout: 90000, reverse: true });
  }

  public clickDescriptionTableHeader() {
    $(`//*[contains(@id, 'descriptionTableHeader')]`).click();
    $('#spinner-animation').waitForDisplayed({ timeout: 90000, reverse: true });
  }

  public getListValue(selector: any, row: number) {
    if (selector === 'listId') {
      return parseInt(
        $('#tableBody')
          .$(`tr:nth-child(${row})`)
          .$('#' + selector)
          .getText(),
        10
      );
    } else {
      return $('#tableBody')
        .$(`tr:nth-child(${row})`)
        .$('#' + selector)
        .getText();
    }
  }

  public get itemPlanningButton() {
    $('#items-group-planning-pn').waitForDisplayed({ timeout: 20000 });
    $('#items-group-planning-pn').waitForClickable({ timeout: 20000 });
    return $('#items-group-planning-pn');
  }

  public get listCreateBtn() {
    $('#listCreateBtn').waitForDisplayed({ timeout: 20000 });
    $('#listCreateBtn').waitForClickable({ timeout: 20000 });
    return $('#listCreateBtn');
  }

  public get listsButton() {
    $('#items-group-planning-pn-lists').waitForDisplayed({ timeout: 20000 });
    $('#items-group-planning-pn-lists').waitForClickable({ timeout: 20000 });
    return $('#items-group-planning-pn-lists');
  }

  public goToListsPage() {
    $('#spinner-animation').waitForDisplayed({ timeout: 90000, reverse: true });
    this.itemPlanningButton.click();
    $('#spinner-animation').waitForDisplayed({ timeout: 90000, reverse: true });
    this.listsButton.click();
    $('#spinner-animation').waitForDisplayed({ timeout: 90000, reverse: true });
  }

  public createDummyLists() {
    for (let i = 0; i < 3; i++) {
      this.listCreateBtn.click();
      itemsPlanningModalPage.createListItemName.setValue(
        Guid.create().toString()
      );
      itemsPlanningModalPage.createListDescription.setValue(
        Guid.create().toString()
      );
      $('#spinner-animation').waitForDisplayed({
        timeout: 90000,
        reverse: true,
      });
      itemsPlanningModalPage.createListSelector.addValue('Number 1');
      $('#spinner-animation').waitForDisplayed({
        timeout: 90000,
        reverse: true,
      });
      itemsPlanningModalPage.createListSelectorOption.click();
      itemsPlanningModalPage.createRepeatEvery.setValue(1);
      itemsPlanningModalPage.selectCreateRepeatType(1);
      itemsPlanningModalPage.createRepeatUntil.setValue('5/15/2020');
      itemsPlanningModalPage.listCreateSaveBtn.click();
      $('#spinner-animation').waitForDisplayed({
        timeout: 90000,
        reverse: true,
      });
    }
  }

  public clearTable() {
    const rowCount = itemsPlanningListPage.rowNum();
    for (let i = 1; i <= rowCount; i++) {
      const listRowObject = new ListRowObject(1);
      listRowObject.clickDeleteList();
      itemsPlanningModalPage.listDeleteDeleteBtn.click();
      $('#spinner-animation').waitForDisplayed({
        timeout: 90000,
        reverse: true,
      });
    }
  }
  createNewEform(eFormLabel, newTagsList = [], tagAddedNum = 0) {
    this.newEformBtn.click();
    $('#spinner-animation').waitForDisplayed({ timeout: 90000, reverse: true });
    // Create replaced xml and insert it in textarea
    const xml = XMLForEformFractions.XML.replace('TEST_LABEL', eFormLabel);
    browser.execute(function (xmlText) {
      (<HTMLInputElement>document.getElementById('eFormXml')).value = xmlText;
    }, xml);
    this.xmlTextArea.addValue(' ');
    // Create new tags
    const addedTags: string[] = newTagsList;
    if (newTagsList.length > 0) {
      this.createEformNewTagInput.setValue(newTagsList.join(','));
      $('#spinner-animation').waitForDisplayed({
        timeout: 90000,
        reverse: true,
      });
    }
    // Add existing tags
    const selectedTags: string[] = [];
    if (tagAddedNum > 0) {
      $('#spinner-animation').waitForDisplayed({
        timeout: 90000,
        reverse: true,
      });
      for (let i = 0; i < tagAddedNum; i++) {
        this.createEformTagSelector.click();
        const selectedTag = $('.ng-option:not(.ng-option-selected)');
        selectedTags.push(selectedTag.getText());
        console.log('selectedTags is ' + JSON.stringify(selectedTags));
        selectedTag.click();
        $('#spinner-animation').waitForDisplayed({
          timeout: 90000,
          reverse: true,
        });
      }
    }
    this.createEformBtn.click();
    $('#spinner-animation').waitForDisplayed({ timeout: 90000, reverse: true });
    return { added: addedTags, selected: selectedTags };
  }
}

const itemsPlanningListPage = new ItemsGroupPlanningListPage();
export default itemsPlanningListPage;

export class ListRowObject {
  constructor(rowNumber) {
    if ($$('#listId')[rowNumber - 1]) {
      try {
        this.name = $$('#listName')[rowNumber - 1].getText();
      } catch (e) {}
      try {
        this.description = $$('#listDescription')[rowNumber - 1].getText();
      } catch (e) {}
      try {
        this.updateBtn = $$('#updateListBtn')[rowNumber - 1];
      } catch (e) {}
      try {
        this.deleteBtn = $$('#deleteListBtn')[rowNumber - 1];
      } catch (e) {}
    }
  }

  public id;
  public name;
  public description;
  public updateBtn;
  public deleteBtn;

  public clickDeleteList() {
    this.deleteBtn.click();
    $('#spinner-animation').waitForDisplayed({ timeout: 90000, reverse: true });
  }

  public clickUpdateList() {
    this.updateBtn.click();
    $('#spinner-animation').waitForDisplayed({ timeout: 90000, reverse: true });
  }
}

