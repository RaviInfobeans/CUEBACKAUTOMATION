const {expect} = require('@playwright/test');
const now = new Date().toLocaleDateString();
const { timeout } = require('../playwright.config')

class EditPage{
    constructor(page){
        this.page = page
        this.EditPage = page.locator("a[class='Navbar__NavItem-sc-bpaubx-9 ewPMTf'] p[class='typography__Body-sc-1rnknoa-5 cTmoDC']")
        this.allMemories = page.getByText('All memories')
        this.publishMemories = page.locator('div').filter({ hasText: /^Published$/ })
        this.draftMemories = page.getByText('Drafts')
        this.collaborationMemories = page.locator('div').filter({ hasText: /^Collaborations$/ })
        this.recentlyDeleted = page.getByText('Recently Deleted')
        this.NewCollection = page.locator('div').filter({ hasText: /^New collection$/ })
        this.createCollection = page.getByText('New collection')
        this.generateName = page.getByText('Generate name')
        this.collectionNameField = page.locator(".styled__Input-sc-18y1sfc-9.jDvvcT.ph-no-capture")
        this.backCTA = page.getByRole('button', { name: 'Back' })
        this.createCollectionCTA = page.locator("//span[normalize-space()='Create collection']")
        this.options = page.locator(".styled__DotsContainer-sc-18y1sfc-60.itZIbF")
        this.deleteCTA = page.locator(".typography__Body-sc-1rnknoa-5.styled__DeleteMemoryText-sc-1oqy9zo-29.cTmoDC.CFYXg")

    }

    async CollectionCreate(){
        await expect(this.EditPage).toBeVisible();                  //Validating Edit CTA is present.
        await this.EditPage.click();                                //Clicking on Edit CTA>
        await this.page.waitForTimeout(2000);                       //Waiting for 2 seconds.
        await expect.soft(this.allMemories).toBeVisible();          //Validating default collection.
        await expect.soft(this.publishMemories).toBeVisible();      //Validating default collection.
        await expect.soft(this.draftMemories).toBeVisible();        //Validating default collection.
        // await expect.soft(this.collaborationMemories).toBeVisible({ timeout: 10000 }); // Increasing timeout to 10 seconds //Validating default collection.
        await expect.soft(this.recentlyDeleted).toBeVisible();      //Validating default collection.
        await expect(this.NewCollection).toBeVisible();             //Validating New collection CTA is present.
        await this.NewCollection.click();                           //Clicking on New Collection CTA.
        await this.generateName.click();                            //Generating collection name.
        await this.generateName.click();                            //Generating collection name.
        await this.backCTA.click();                                 //Clicking on Back CTA.
        await this.NewCollection.click();                           //Clicking on New Collection CTA.
        await this.generateName.click();                            //Clicking on generate name field.
        await this.collectionNameField.fill("Collection created on " + now)     //Entering collection name with current date.
        await this.page.waitForTimeout(2000);                       //Waiting for 2 seconds.
        await this.createCollectionCTA.click();                     //Clicking on Create Collection CTA.
        await this.options.click();                                 //Clicking on 3 dots on Manage collection page.
        // Deleting Collection
        await this.deleteCTA.click();                               //Deleting the collection.
    }


}
module.exports = {EditPage}