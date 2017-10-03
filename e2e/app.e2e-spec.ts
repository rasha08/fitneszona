import { Fitneszona.RsPage } from './app.po';

describe('fitneszona.rs App', () => {
  let page: Fitneszona.RsPage;

  beforeEach(() => {
    page = new Fitneszona.RsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
