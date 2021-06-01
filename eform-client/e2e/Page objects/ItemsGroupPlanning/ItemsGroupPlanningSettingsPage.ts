import Page from '../Page';
import myEformsPage from '../MyEforms.page';
import pluginPage from '../Plugin.page';

export class ItemsGroupPlanningSettingsPage extends Page {
  constructor() {
    super();
  }

  public get saveSettingsBtn() {
    return browser.$('#saveBtn');
  }

  public get sdkConnectionString() {
    return browser.$('#sdkConnectionString');
  }

  public get logLevel() {
    return browser.$('#logLevel');
  }

  public get logLimit() {
    return browser.$('#logLimit');
  }

  public get maxParallelism() {
    return browser.$('#maxParallelism');
  }

  public get numberOfWorkers() {
    return browser.$('#numberOfWorkers');
  }

  public get siteIds() {
    return browser.$('#siteIds');
  }

  public goToSettingsPage() {
    myEformsPage.Navbar.goToPluginsPage();
    pluginPage.getFirstPluginRowObj().settingsBtn.click();
    $('#spinner-animation').waitForDisplayed({ timeout: 90000, reverse: true });
  }

  public saveSettings(data: any) {
    this.sdkConnectionString.setValue(data.sdkConnectionString);
    this.logLevel.setValue(data.logLevel);
    this.logLimit.setValue(data.logLimit);
    this.maxParallelism.setValue(data.maxParallelism);
    this.numberOfWorkers.setValue(data.numberOfWorkers);
    this.siteIds.setValue(data.siteIds);
    this.saveSettingsBtn.click();
    $('#spinner-animation').waitForDisplayed({ timeout: 90000, reverse: true });
  }

  public getSettings() {
    browser.pause(500);
    return new ItemsGroupPlanningSettings();
  }
}

const itemsPlanningSettingsPage = new ItemsGroupPlanningSettingsPage();
export default itemsPlanningSettingsPage;

export class ItemsGroupPlanningSettings {
  constructor() {
    this.sdkConnectionString = itemsPlanningSettingsPage.sdkConnectionString.getValue();
    this.logLevel = itemsPlanningSettingsPage.logLevel.getValue();
    this.logLimit = itemsPlanningSettingsPage.logLimit.getValue();
    this.maxParallelism = itemsPlanningSettingsPage.maxParallelism.getValue();
    this.numberOfWorkers = itemsPlanningSettingsPage.numberOfWorkers.getValue();
    this.siteIds = itemsPlanningSettingsPage.siteIds.getValue();
  }

  public sdkConnectionString;
  public logLevel;
  public logLimit;
  public maxParallelism;
  public numberOfWorkers;
  public siteIds;
}
