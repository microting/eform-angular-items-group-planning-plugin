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
  it('should create a new list', async () => {
    await (await itemsGroupPlanningListPage.listCreateBtn()).click();
    await $('#spinner-animation').waitForDisplayed({
      timeout: 90000,
      reverse: true,
    });
    const listData = {
      name: 'Test list',
      template: 'Number 1',
      description: 'Description',
      repeatEvery: '1',
      repeatType: 'Dag',
      repeatUntil: { month: 5, day: 15, year: 2020 },
    };
    await itemsGroupPlanningModalPage.createList(listData);
  });
  it('should change all fields after edit', async () => {
    const spinnerAnimation = await $('#spinner-animation');
    await spinnerAnimation.waitForDisplayed({
      timeout: 90000,
      reverse: true,
    });
    let listRowObject = await itemsGroupPlanningListPage.getLastListRowObject();
    const listData = {
      name: 'Test list 2',
      description: 'Description 2',
      repeatEvery: '2',
      repeatType: 'Uge',
      repeatUntil: { month: 5, day: 15, year: 2023 },
    };
    await listRowObject.edit(listData);
    // Check that list is edited successfully in table
    listRowObject = await itemsGroupPlanningListPage.getLastListRowObject();
    expect(listRowObject.name, 'Name in table is incorrect').equal(
      listData.name
    );
    expect(
      listRowObject.description,
      'Description in table is incorrect'
    ).equal(listData.description);
    expect(listRowObject.repeatEvery, 'Saved Repeat Every is incorrect').equal(
      listData.repeatEvery
    );
    expect(listRowObject.repeatUntil, 'Saved Repeat Until is incorrect').equal(
      `${listData.repeatUntil.day}.0${listData.repeatUntil.month}.${listData.repeatUntil.year}`
    );
    expect(listRowObject.repeatType, 'Saved Repeat Type is incorrect').eq(
      listData.repeatType
    );

    // Check that all list fields are saved
    await listRowObject.openEditModal();
    const value = await (
      await itemsGroupPlanningModalPage.editListSelector()
    ).$('.ng-value');
    expect(await value.getText(), 'Saved Template is incorrect').eq('Number 1');
    await listRowObject.closeEditModal(true);
    await listRowObject.delete();
  });
});
