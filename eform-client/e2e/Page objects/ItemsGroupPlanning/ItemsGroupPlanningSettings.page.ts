import Page from '../Page';
import myEformsPage from '../MyEforms.page';
import pluginPage from '../Plugin.page';

export class ItemsGroupPlanningSettingsPage extends Page {
  constructor() {
    super();
  }

  public async saveSettingsBtn() {
    return $('#saveBtn');
  }

  public async sdkConnectionString() {
    return $('#sdkConnectionString');
  }

  public async logLevel() {
    return $('#logLevel');
  }

  public async logLimit() {
    return $('#logLimit');
  }

  public async maxParallelism() {
    return $('#maxParallelism');
  }

  public async numberOfWorkers() {
    return $('#numberOfWorkers');
  }

  public async siteIds() {
    return $('#siteIds');
  }

  public async goToSettingsPage() {
    await myEformsPage.Navbar.goToPluginsPage();
    await (await pluginPage.getFirstPluginRowObj()).settingsBtn.click();
    await $('#spinner-animation').waitForDisplayed({
      timeout: 90000,
      reverse: true,
    });
  }

  public async saveSettings(data: any) {
    await (await this.sdkConnectionString()).setValue(data.sdkConnectionString);
    await (await this.logLevel()).setValue(data.logLevel);
    await (await this.logLimit()).setValue(data.logLimit);
    await (await this.maxParallelism()).setValue(data.maxParallelism);
    await (await this.numberOfWorkers()).setValue(data.numberOfWorkers);
    await (await this.siteIds()).setValue(data.siteIds);
    await (await this.saveSettingsBtn()).click();
    await $('#spinner-animation').waitForDisplayed({
      timeout: 90000,
      reverse: true,
    });
  }

  public getSettings() {
    browser.pause(500);
    return new ItemsGroupPlanningSettings();
  }
}

const itemsPlanningSettingsPage = new ItemsGroupPlanningSettingsPage();
export default itemsPlanningSettingsPage;

export class ItemsGroupPlanningSettings {
  constructor() {}

  public sdkConnectionString;
  public logLevel;
  public logLimit;
  public maxParallelism;
  public numberOfWorkers;
  public siteIds;

  async getRow() {
    this.sdkConnectionString = await (
      await itemsPlanningSettingsPage.sdkConnectionString()
    ).getValue();
    this.logLevel = await (
      await itemsPlanningSettingsPage.logLevel()
    ).getValue();
    this.logLimit = await (
      await itemsPlanningSettingsPage.logLimit()
    ).getValue();
    this.maxParallelism = await (
      await itemsPlanningSettingsPage.maxParallelism()
    ).getValue();
    this.numberOfWorkers = await (
      await itemsPlanningSettingsPage.numberOfWorkers()
    ).getValue();
    this.siteIds = await (await itemsPlanningSettingsPage.siteIds()).getValue();
    return this;
  }
}
