import loginPage from '../../Page objects/Login.page';
import itemsGroupPlanningListPage from '../../Page objects/ItemsGroupPlanning/ItemsGroupPlanningList.page';
import {
  generateRandmString,
  testSorting,
} from '../../Helpers/helper-functions';
import myEformsPage from '../../Page objects/MyEforms.page';

const templateName = generateRandmString();

describe('Items group planning lists table sorting', function () {
  before(async () => {
    await loginPage.open('/auth');
    await loginPage.login();
    await myEformsPage.createNewEform(templateName);
    await itemsGroupPlanningListPage.goToListsPage();
  });
  it('should create dummy lists', async () => {
    await itemsGroupPlanningListPage.createDummyLists(templateName);
  });
  it('should be able to sort by ID', async () => {
    await testSorting(
      await itemsGroupPlanningListPage.idTableHeader(),
      '#listId',
      'ID'
    );
  });
  it('should be able to sort by Name', async () => {
    await testSorting(
      await itemsGroupPlanningListPage.nameTableHeader(),
      '#listName',
      'Name'
    );
  });
  it('should be able to sort by Description', async () => {
    await testSorting(
      await itemsGroupPlanningListPage.descriptionTableHeader(),
      '#listDescription',
      'Description'
    );
  });
  it('should clear table', async () => {
    await itemsGroupPlanningListPage.clearTable();
  });
});
