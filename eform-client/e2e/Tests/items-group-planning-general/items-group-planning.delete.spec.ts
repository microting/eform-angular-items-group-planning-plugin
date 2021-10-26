import loginPage from '../../Page objects/Login.page';
import itemsGroupPlanningListPage, {
  ListRowObject,
} from '../../Page objects/ItemsGroupPlanning/ItemsGroupPlanningList.page';
import itemsGroupPlanningModalPage from '../../Page objects/ItemsGroupPlanning/ItemsGroupPlanningModal.page';

const expect = require('chai').expect;

describe('Items group planning actions', function () {
  before(async () => {
    await loginPage.open('/auth');
    await loginPage.login();
    await itemsGroupPlanningListPage.goToListsPage();
  });
  it('should should create List', async () => {
    const spinnerAnimation = await $('#spinner-animation');
    await (await itemsGroupPlanningListPage.listCreateBtn()).click();
    await spinnerAnimation.waitForDisplayed({ timeout: 90000, reverse: true });
    const listData = {
      name: 'Test list',
      template: 'Number 1',
      description: 'Description',
      repeatEvery: '1',
      repeatType: '1',
      repeatUntil: { month: 5, day: 15, year: 2020 },
    };
    await itemsGroupPlanningModalPage.createList(listData);
    await spinnerAnimation.waitForDisplayed({ timeout: 90000, reverse: true });
  });
  it('should delete existing list', async () => {
    const spinnerAnimation = await $('#spinner-animation');
    spinnerAnimation.waitForDisplayed({ timeout: 90000, reverse: true });
    let listRowObject = await new ListRowObject().getRow(
      await itemsGroupPlanningListPage.rowNum()
    );
    await listRowObject.clickDeleteList();
    await (await itemsGroupPlanningModalPage.listDeleteDeleteBtn()).click();
    spinnerAnimation.waitForDisplayed({ timeout: 90000, reverse: true });
    listRowObject = await new ListRowObject().getRow(1);
    expect(listRowObject.id === null, 'List is not deleted');
  });
});
