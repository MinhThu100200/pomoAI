describe('launch', () => {
  beforeAll(async () => {
    await device.launchApp({newInstance: true});
    await device.disableSynchronization();
  });

  // beforeEach(async () => {
  //   await device.launchApp();
  //   await device.disableSynchronization(); // tried with and without this line
  // });

  it('should have welcome screen', async () => {
    await expect(element(by.id('id_home_screen'))).toBeVisible();
  });

  // it('should show hello screen after tap', async () => {
  //   await element(by.id('hello_button')).tap();
  //   await expect(element(by.text('Hello!!!'))).toBeVisible();
  // });

  // it('should show world screen after tap', async () => {
  //   await element(by.id('world_button')).tap();
  //   await expect(element(by.text('World!!!'))).toBeVisible();
  // });
});
