import loginPage from '../../Page objects/Login.page';
import itemsGroupPlanningListPage from '../../Page objects/ItemsGroupPlanning/ItemsGroupPlanningList.page';
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
    const countBeforeDelete = await itemsGroupPlanningListPage.rowNum();
    const listRowObject = await itemsGroupPlanningListPage.getLastListRowObject();
    await listRowObject.delete();
    expect(countBeforeDelete - 1, 'List is not deleted').eq(
      await itemsGroupPlanningListPage.rowNum()
    );
  });
});
