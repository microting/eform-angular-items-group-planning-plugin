import loginPage from '../../Page objects/Login.page';
import itemsPlanningSettingsPage from '../../Page objects/ItemsPlanningSettings.page';

const expect = require('chai').expect;

describe('Items planning plugin settings page', function () {
  before(function () {
    loginPage.open('/');
    loginPage.login();
    itemsPlanningSettingsPage.goToSettingsPage();
  });
  it ('save items planning settings', function () {
    browser.pause(2000);
    const settingsData = {
      sdkConnectionString: 'Server=SQLEXPRESS;Database=123_SDK;User ID=sa;Password=Qq1234567$;',
      logLevel: '4',
      logLimit: '25000',
      maxParallelism: '1',
      numberOfWorkers: '1'
    };
    itemsPlanningSettingsPage.saveSettings(settingsData);
    browser.pause(3000);
    // Check that items planning settings saved correctly
    const savedSettings = itemsPlanningSettingsPage.getSettings();
    expect(savedSettings.sdkConnectionString, 'SDK connection string is incorrect').equal(settingsData.sdkConnectionString);
    expect(savedSettings.logLevel, 'Log Level is incorrect').equal(settingsData.logLevel);
    expect(savedSettings.logLimit, 'Log Limit is incorrect').equal(settingsData.logLimit);
    expect(savedSettings.maxParallelism, 'Max parallelism is incorrect').equal(settingsData.maxParallelism);
    expect(savedSettings.numberOfWorkers, 'Number of workers is incorrect').equal(settingsData.numberOfWorkers);
  });
});
