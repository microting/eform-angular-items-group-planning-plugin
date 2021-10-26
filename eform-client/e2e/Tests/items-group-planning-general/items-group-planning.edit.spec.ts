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
      repeatType: '1',
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
    let listRowObject = await new ListRowObject().getRow(
      await itemsGroupPlanningListPage.rowNum()
    );
    await listRowObject.clickUpdateList();
    const listData = {
      name: 'Test list 2',
      template: '',
      description: 'Description 2',
      repeatEvery: '2',
      repeatType: '1',
      repeatUntil: { month: 5, day: 15, year: 2023 },
    };
    await itemsGroupPlanningModalPage.editList(listData);
    // Check that list is edited successfully in table
    listRowObject = await new ListRowObject().getRow(
      await itemsGroupPlanningListPage.rowNum()
    );
    expect(listRowObject.name, 'Name in table is incorrect').equal(
      listData.name
    );
    expect(
      listRowObject.description,
      'Description in table is incorrect'
    ).equal(listData.description);
    // Check that all list fields are saved
    await listRowObject.clickUpdateList();
    expect(
      await (await itemsGroupPlanningModalPage.editListItemName()).getValue(),
      'Saved Name is incorrect'
    ).equal(listData.name);
    expect(
      await (await itemsGroupPlanningModalPage.editListSelector()).getValue(),
      'Saved Template is incorrect'
    ).equal(listData.template);
    expect(
      await (
        await itemsGroupPlanningModalPage.editListDescription()
      ).getValue(),
      'Saved Description is incorrect'
    ).equal(listData.description);
    expect(
      await (await itemsGroupPlanningModalPage.editRepeatEvery()).getValue(),
      'Saved Repeat Every is incorrect'
    ).equal(listData.repeatEvery);
    const repeatUntilSaved = new Date(
      await (await itemsGroupPlanningModalPage.editRepeatUntil()).getValue()
    );
    expect(repeatUntilSaved.getDate(), 'Saved Repeat Until is incorrect').equal(
      listData.repeatUntil.day
    );

    await $('#editRepeatType').click();
    await spinnerAnimation.waitForDisplayed({ timeout: 90000, reverse: true });
    const editRepeatTypeSelected = $$('#editRepeatType .ng-option')[
      listData.repeatType
    ];
    expect(
      editRepeatTypeSelected.getAttribute('class'),
      'Saved Repeat Type is incorrect'
    ).contains('ng-option-selected');

    await (await itemsGroupPlanningModalPage.listEditCancelBtn()).click();
    await spinnerAnimation.waitForDisplayed({ timeout: 90000, reverse: true });
    await listRowObject.clickDeleteList();
    await (await itemsGroupPlanningModalPage.listDeleteDeleteBtn()).click();
    await spinnerAnimation.waitForDisplayed({ timeout: 90000, reverse: true });
  });
});
