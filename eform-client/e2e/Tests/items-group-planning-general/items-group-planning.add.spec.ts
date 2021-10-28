import loginPage from '../../Page objects/Login.page';
import itemsGroupPlanningListPage, {
  ListRowObject,
} from '../../Page objects/ItemsGroupPlanning/ItemsGroupPlanningList.page';
import itemsGroupPlanningModalPage, {
  ListObject,
} from '../../Page objects/ItemsGroupPlanning/ItemsGroupPlanningModal.page';
import myEformsPage from '../../Page objects/MyEforms.page';

const expect = require('chai').expect;

const newEformLabel = 'Number 1';

describe('Items group planning actions', function () {
  before(async () => {
    await loginPage.open('/auth');
    await loginPage.login();
    await myEformsPage.createNewEform(newEformLabel);
    await itemsGroupPlanningListPage.goToListsPage();
  });
  it('should create list with all fields', async () => {
    const spinnerAnimation = await $('#spinner-animation');
    await (await itemsGroupPlanningListPage.listCreateBtn()).click();
    await spinnerAnimation.waitForDisplayed({ timeout: 90000, reverse: true });
    const listData: ListObject = {
      name: 'Test list',
      template: newEformLabel,
      description: 'Description',
      repeatEvery: '1',
      repeatType: 'Dag',
      repeatUntil: { month: 5, day: 15, year: 2020 },
    };
    await itemsGroupPlanningModalPage.createList(listData);
    // Check that list is created in table
    const listRowObject = await itemsGroupPlanningListPage.getLastListRowObject();
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
    expect(await value.getText(), 'Saved Template is incorrect').eq(
      listData.template
    );
    await listRowObject.closeEditModal(true);
    await listRowObject.delete();
  });
});
