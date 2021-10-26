import itemsPlanningModalPage from './ItemsGroupPlanningModal.page';
import { PageWithNavbarPage } from '../PageWithNavbar.page';
import {
  generateRandmString,
  getRandomInt,
} from '../../Helpers/helper-functions';

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
        repeatUntil: '5/15/2020',
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
      const listRowObject = await new ListRowObject().getRow(1);
      await listRowObject.clickDeleteList();
      await (await itemsPlanningModalPage.listDeleteDeleteBtn()).click();
      await $('#spinner-animation').waitForDisplayed({
        timeout: 90000,
        reverse: true,
      });
    }
  }
}

const itemsPlanningListPage = new ItemsGroupPlanningListPage();
export default itemsPlanningListPage;

export class ListRowObject {
  constructor() {}

  public id;
  public name;
  public description;
  public updateBtn;
  public deleteBtn;

  async getRow(rowNum: number) {
    if ((await $$('#listId'))[rowNum - 1]) {
      this.name = await (await $$('#listName'))[rowNum - 1].getText();
      try {
        this.description = await (await $$('#listDescription'))[
          rowNum - 1
        ].getText();
      } catch (e) {}
      try {
        this.updateBtn = (await $$('#updateListBtn'))[rowNum - 1];
      } catch (e) {}
      try {
        this.deleteBtn = (await $$('#deleteListBtn'))[rowNum - 1];
      } catch (e) {}
    }
    return this;
  }

  public async clickDeleteList() {
    this.deleteBtn.click();
    await $('#spinner-animation').waitForDisplayed({
      timeout: 90000,
      reverse: true,
    });
  }

  public async clickUpdateList() {
    this.updateBtn.click();
    await $('#spinner-animation').waitForDisplayed({
      timeout: 90000,
      reverse: true,
    });
  }
}
