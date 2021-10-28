import itemsPlanningModalPage, {
  ListObject,
} from './ItemsGroupPlanningModal.page';
import { PageWithNavbarPage } from '../PageWithNavbar.page';
import {
  generateRandmString,
  getRandomInt,
  selectDateOnDatePicker,
} from '../../Helpers/helper-functions';
import itemsGroupPlanningModalPage from './ItemsGroupPlanningModal.page';

export class ItemsGroupPlanningListPage extends PageWithNavbarPage {
  constructor() {
    super();
  }

  public async rowNum(): Promise<number> {
    await browser.pause(500);
    return (await $$('#tableBody > tr')).length;
  }

  public async idTableHeader() {
    const ele = await $('#idTableHeader');
    await ele.waitForDisplayed({ timeout: 40000 });
    await ele.waitForClickable({ timeout: 40000 });
    return ele;
  }

  public async nameTableHeader() {
    const ele = await $('#nameTableHeader');
    await ele.waitForDisplayed({ timeout: 40000 });
    await ele.waitForClickable({ timeout: 40000 });
    return ele;
  }

  public async descriptionTableHeader() {
    const ele = await $('#descriptionTableHeader');
    await ele.waitForDisplayed({ timeout: 40000 });
    await ele.waitForClickable({ timeout: 40000 });
    return ele;
  }

  public async itemPlanningButton() {
    const ele = await $('#items-group-planning-pn');
    await ele.waitForDisplayed({ timeout: 20000 });
    await ele.waitForClickable({ timeout: 20000 });
    return ele;
  }

  public async listCreateBtn() {
    const ele = await $('#listCreateBtn');
    await ele.waitForDisplayed({ timeout: 20000 });
    await ele.waitForClickable({ timeout: 20000 });
    return ele;
  }

  public async listsButton() {
    const ele = await $('#items-group-planning-pn-lists');
    await ele.waitForDisplayed({ timeout: 20000 });
    await ele.waitForClickable({ timeout: 20000 });
    return ele;
  }

  public async goToListsPage() {
    await (await this.itemPlanningButton()).click();
    await (await this.listsButton()).click();
    await (await this.listCreateBtn()).waitForClickable({ timeout: 40000 });
  }

  public async createDummyLists(templateName: string) {
    for (let i = 0; i < 3; i++) {
      const listData = {
        name: generateRandmString(),
        template: templateName,
        description: generateRandmString(),
        repeatEvery: getRandomInt(1, 27),
        repeatType: 'Dag',
        repeatUntil: { month: 5, day: 15, year: 2020 },
      };
      await (await this.listCreateBtn()).click();
      await itemsPlanningModalPage.createList(listData);
      await $('#spinner-animation').waitForDisplayed({
        timeout: 90000,
        reverse: true,
      });
    }
  }

  public async clearTable() {
    const rowCount = await itemsPlanningListPage.rowNum();
    for (let i = 1; i <= rowCount; i++) {
      await (await this.getFirstListRowObject()).delete();
    }
  }

  public async getFirstListRowObject(): Promise<ListRowObject> {
    return await new ListRowObject().getRow(1);
  }

  public async getLastListRowObject(): Promise<ListRowObject> {
    return await new ListRowObject().getRow(await this.rowNum());
  }
}

const itemsPlanningListPage = new ItemsGroupPlanningListPage();
export default itemsPlanningListPage;

export class ListRowObject {
  constructor() {}

  public id: number;
  public name: string;
  public description: string;
  public repeatType: string;
  public repeatEvery: string;
  public dayOfWeek: string;
  public dayOfMonth: string;
  public repeatUntil: string;
  public updateBtn: WebdriverIO.Element;
  public deleteBtn: WebdriverIO.Element;

  async getRow(rowNum: number) {
    if ((await $$('#listId'))[rowNum - 1]) {
      this.id = +(await (await $$('#listId'))[rowNum - 1].getText());
      this.name = await (await $$('#listName'))[rowNum - 1].getText();
      this.description = await (await $$('#listDescription'))[
        rowNum - 1
      ].getText();
      this.repeatType = await (await $$('#listRepeatType'))[
        rowNum - 1
      ].getText();
      this.repeatEvery = await (await $$('#listRepeatEvery'))[
        rowNum - 1
      ].getText();
      this.dayOfWeek = await (await $$('#listDayOfWeek'))[rowNum - 1].getText();
      this.dayOfMonth = await (await $$('#listDayOfMonth'))[
        rowNum - 1
      ].getText();
      this.repeatUntil = await (
        await $$('#listRepeatUntil')[rowNum - 1]
      ).getText();
      this.updateBtn = (await $$('#updateListBtn'))[rowNum - 1];
      this.deleteBtn = (await $$('#deleteListBtn'))[rowNum - 1];
    }
    return this;
  }

  public async delete(clickCancel = false) {
    await this.openDeleteModal();
    await this.closeDeleteModal(clickCancel);
  }

  public async openDeleteModal() {
    this.deleteBtn.click();
    await (
      await itemsGroupPlanningModalPage.listDeleteCancelBtn()
    ).waitForClickable({ timeout: 40000 });
  }

  public async closeDeleteModal(clickCancel = false) {
    if (clickCancel) {
      await (await itemsGroupPlanningModalPage.listDeleteCancelBtn()).click();
    } else {
      await (await itemsGroupPlanningModalPage.listDeleteDeleteBtn()).click();
    }
    await (await itemsPlanningListPage.listCreateBtn()).waitForClickable({
      timeout: 40000,
    });
  }

  public async edit(data?: ListObject, clickCancel = false) {
    await this.openEditModal(data);
    await this.closeEditModal(clickCancel);
  }

  public async openEditModal(data?: ListObject) {
    await this.updateBtn.click();
    await (
      await itemsGroupPlanningModalPage.listEditCancelBtn()
    ).waitForClickable({ timeout: 40000 });
    if (data) {
      if (data.name) {
        await (await itemsGroupPlanningModalPage.editListItemName()).setValue(
          data.name
        );
      }
      if (data.template) {
        await (
          await (await itemsGroupPlanningModalPage.editListSelector()).$(
            'input'
          )
        ).setValue(data.template);
        const option = await $(`ng-dropdown-panel .ng-option=${data.template}`);
        await option.waitForDisplayed({ timeout: 10000 });
        await option.waitForClickable({ timeout: 10000 });
        await browser.pause(5000);
        await option.click();
      }
      if (data.description) {
        await (
          await itemsGroupPlanningModalPage.editListDescription()
        ).setValue(data.description);
      }
      if (data.repeatEvery) {
        await (await itemsGroupPlanningModalPage.editRepeatEvery()).setValue(
          data.repeatEvery
        );
      }
      if (data.repeatType) {
        await (
          await (await itemsGroupPlanningModalPage.editRepeatType()).$('input')
        ).setValue(data.repeatType);
        const option = await $(`.ng-option=${data.repeatType}`);
        await option.waitForDisplayed({ timeout: 10000 });
        await option.waitForClickable({ timeout: 10000 });
        await browser.pause(5000);
        await option.click();
      }
      if (data.repeatUntil) {
        await (await itemsGroupPlanningModalPage.editRepeatUntil()).click();
        await selectDateOnDatePicker(
          data.repeatUntil.year,
          data.repeatUntil.month,
          data.repeatUntil.day
        );
      }
    }
  }

  public async closeEditModal(clickCancel = false) {
    if (clickCancel) {
      await (await itemsGroupPlanningModalPage.listEditCancelBtn()).click();
    } else {
      await (await itemsGroupPlanningModalPage.listEditSaveBtn()).click();
    }
    await (await itemsPlanningListPage.listCreateBtn()).waitForClickable({
      timeout: 40000,
    });
  }
}
