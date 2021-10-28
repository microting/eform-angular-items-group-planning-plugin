import Page from '../Page';
import { selectDateOnDatePicker } from '../../Helpers/helper-functions';

export class ItemsGroupPlanningModalPage extends Page {
  constructor() {
    super();
  }

  // Create List
  public async createListItemName() {
    const ele = await $('#createListItemName');
    await ele.waitForDisplayed({ timeout: 40000 });
    return ele;
  }

  public async createListSelector() {
    const ele = await $('#createListSelector');
    await ele.waitForDisplayed({ timeout: 40000 });
    await ele.waitForClickable({ timeout: 40000 });
    return ele;
  }

  public async createListDescription() {
    const ele = await $('#createListDescription');
    await ele.waitForDisplayed({ timeout: 40000 });
    await ele.waitForClickable({ timeout: 40000 });
    return ele;
  }

  public async createRepeatEvery() {
    const ele = await $('#createRepeatEvery');
    await ele.waitForDisplayed({ timeout: 40000 });
    // ele.waitForClickable({ timeout: 40000 });
    return ele;
  }

  public async createRepeatType() {
    const ele = await $('#createRepeatType');
    await ele.waitForDisplayed({ timeout: 40000 });
    return ele;
  }

  public async createDayOfWeek() {
    const ele = await $('#createDayOfWeek');
    await ele.waitForDisplayed({ timeout: 40000 });
    return ele;
  }

  public async createDayOfMonth() {
    const ele = await $('#createDayOfMonth');
    await ele.waitForDisplayed({ timeout: 40000 });
    return ele;
  }

  public async createRepeatUntil() {
    const ele = await $('#createRepeatUntil');
    await ele.waitForDisplayed({ timeout: 40000 });
    // ele.waitForClickable({ timeout: 40000 });
    return ele;
  }

  public async listCreateSaveBtn() {
    const ele = await $('#listCreateSaveBtn');
    await ele.waitForDisplayed({ timeout: 40000 });
    await ele.waitForClickable({ timeout: 40000 });
    return ele;
  }

  public async listCreateCancelBtn() {
    const ele = await $('#listCreateCancelBtn');
    await ele.waitForDisplayed({ timeout: 40000 });
    await ele.waitForClickable({ timeout: 40000 });
    return ele;
  }

  // Edit page elements
  public async editListItemName() {
    const ele = await $('#editListItemName');
    await ele.waitForDisplayed({ timeout: 40000 });
    await ele.waitForClickable({ timeout: 40000 });
    return ele;
  }

  public async editListSelector() {
    const ele = await $('#editListSelector');
    await ele.waitForDisplayed({ timeout: 40000 });
    // await ele.waitForClickable({ timeout: 40000 });
    return ele;
  }

  public async editListDescription() {
    const ele = await $('#editListDescription');
    await ele.waitForDisplayed({ timeout: 40000 });
    await ele.waitForClickable({ timeout: 40000 });
    return ele;
  }

  public async editRepeatEvery() {
    const ele = await $('#editRepeatEvery');
    await ele.waitForDisplayed({ timeout: 40000 });
    await ele.waitForClickable({ timeout: 40000 });
    return ele;
  }

  public async editRepeatType() {
    const ele = await $('#editRepeatType');
    await ele.waitForDisplayed({ timeout: 40000 });
    return ele;
  }

  public async editRepeatUntil() {
    const ele = await $('#editRepeatUntil');
    await ele.waitForDisplayed({ timeout: 40000 });
    await ele.waitForClickable({ timeout: 40000 });
    return ele;
  }

  public async listEditSaveBtn() {
    const ele = await $('#listEditSaveBtn');
    await ele.waitForDisplayed({ timeout: 40000 });
    await ele.waitForClickable({ timeout: 40000 });
    return ele;
  }

  public async listEditCancelBtn() {
    const ele = await $('#listEditCancelBtn');
    await ele.waitForDisplayed({ timeout: 40000 });
    await ele.waitForClickable({ timeout: 40000 });
    return ele;
  }

  // Add item elements
  public async addItemBtn() {
    const ele = await $('#addItemBtn');
    await ele.waitForDisplayed({ timeout: 40000 });
    await ele.waitForClickable({ timeout: 40000 });
    return ele;
  }

  // Delete page elements
  public async listDeleteDeleteBtn() {
    const ele = await $('#listDeleteDeleteBtn');
    await ele.waitForDisplayed({ timeout: 40000 });
    await ele.waitForClickable({ timeout: 40000 });
    return ele;
  }

  public async listDeleteCancelBtn() {
    const ele = await $('#listDeleteCancelBtn');
    await ele.waitForDisplayed({ timeout: 40000 });
    await ele.waitForClickable({ timeout: 40000 });
    return ele;
  }

  public async createList(data: ListObject) {
    const spinnerAnimation = await $('#spinner-animation');
    if (data.name) {
      await (await this.createListItemName()).setValue(data.name);
    }
    if (data.template) {
      await (await (await this.createListSelector()).$('input')).setValue(
        data.template
      );
      const option = await $(`ng-dropdown-panel .ng-option`);
      await option.waitForDisplayed({ timeout: 10000 });
      await option.waitForClickable({ timeout: 10000 });
      await browser.pause(5000);
      await option.click();
      await spinnerAnimation.waitForDisplayed({
        timeout: 90000,
        reverse: true,
      });
    }
    if (data.description) {
      await (await this.createListDescription()).setValue(data.description);
    }
    if (data.repeatEvery) {
      await (await this.createRepeatEvery()).setValue(data.repeatEvery);
    }
    if (data.repeatType) {
      await spinnerAnimation.waitForDisplayed({
        timeout: 90000,
        reverse: true,
      });
      await (await (await this.createRepeatType()).$('input')).setValue(
        data.repeatType
      );
      const option = await $(`ng-dropdown-panel .ng-option`);
      await option.waitForDisplayed({ timeout: 10000 });
      await option.waitForClickable({ timeout: 10000 });
      await browser.pause(5000);
      await option.click();
      await spinnerAnimation.waitForDisplayed({
        timeout: 90000,
        reverse: true,
      });
    }
    if (data.repeatUntil) {
      await (await this.createRepeatUntil()).click();
      await selectDateOnDatePicker(
        data.repeatUntil.year,
        data.repeatUntil.month,
        data.repeatUntil.day
      );
    }
    await (await this.listCreateSaveBtn()).click();
    await spinnerAnimation.waitForDisplayed({ timeout: 90000, reverse: true });
  }

  public async addNewItem() {
    await (await this.addItemBtn()).click();
  }
}

const itemsPlanningModalPage = new ItemsGroupPlanningModalPage();
export default itemsPlanningModalPage;

export class ListItemRowObject {
  constructor() {}

  public element: WebdriverIO.Element;
  public number: string;
  public name: string;
  public description: string;
  public locationCode: string;
  public buildYear: string;
  public type: string;
  public deleteBtn: WebdriverIO.Element;

  async getRow(rowNum: number) {
    this.element = (await $$('app-items-group-planning-pn-add-items'))[
      rowNum - 1
    ];
    if (this.element) {
      this.number = await (await this.element.$('#itemNumber')).getText();
      this.name = await (await this.element.$('#itemName')).getText();
      this.description = await (
        await this.element.$('#itemDescription')
      ).getText();
      this.locationCode = await (
        await this.element.$('#itemLocationCode')
      ).getText();
      this.buildYear = await (await this.element.$('#itemBuildYear')).getText();
      this.type = await (await this.element.$('#itemType')).getText();
      this.deleteBtn = await this.element.$('#deleteItemBtn');
    }
    return this;
  }

  public async deleteItem() {
    await this.deleteBtn.click();
  }

  public async editItem(item?: ListItemObject) {
    if (item) {
      if (item.number && this.number !== item.number) {
        await (await this.element.$('#itemNumber')).setValue(item.number);
      }
      if (item.name && this.name !== item.name) {
        await (await this.element.$('#itemName')).setValue(item.name);
      }
      if (item.description && this.description !== item.description) {
        await (await this.element.$('#itemDescription')).setValue(
          item.description
        );
      }
      if (item.locationCode && this.locationCode !== item.locationCode) {
        await (await this.element.$('#itemLocationCode')).setValue(
          item.locationCode
        );
      }
      if (item.buildYear && this.buildYear !== item.buildYear) {
        await (await this.element.$('#itemBuildYear')).setValue(item.buildYear);
      }
      if (item.type && this.type !== item.type) {
        await (await this.element.$('#itemType')).setValue(item.type);
      }
    }
  }
}

export class ListItemObject {
  public name?: string;
  public description?: string;
  public number?: string;
  public locationCode?: string;
  public buildYear?: string;
  public type?: string;
}

export class ListObject {
  name?: string;
  template?: string;
  description?: string;
  repeatEvery?: string;
  repeatType?: string;
  repeatUntil?: { month: number; day: number; year: number };
}
