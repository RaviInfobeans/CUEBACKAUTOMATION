const {expect} = require('@playwright/test');
const now = new Date().toLocaleDateString();


class NewCTA{
    constructor(page){
        this.page = page
        this.New = page.locator("//span[contains(text(),'New memory')]")
        this.titleField = page.locator("#memory-title")
        this.editorField = page.locator(".tiptap.ProseMirror")
        this.publishCTA = page.locator("#msm-publish-button")
        this.backCTA = page.getByRole('button', { name: 'Back' })
        this.friendsOption = page.locator("button[aria-label='Timeframe']")
        this.allFriends = page.getByText("All Friends")
    }

    async MemoryFromNewCTA(){
        await expect.soft(this.New).toBeVisible();               //Validating NEW CTA is present.
        await this.New.click();                             //Clicking on New CTA.
        await this.page.waitForSelector("#memory-title");               //Waiting for 5 seconds
        await this.titleField.fill("Created memory from NEW CTA during Smoke testing on " + now);   //Entering title.
        await this.editorField.fill("Test content for memory created via New CTA");                 //Entering content.
        await this.page.waitForTimeout(5000);              //Waiting for 5 seconds
        await this.publishCTA.click();                      //Clicking on Publish CTA.
        // await expect.soft(this.page.locator(".typography__LargeTitle-sc-1rnknoa-0.kzPyHe.ph-no-capture")).toContainText("Created memory from NEW CTA during Smoke testing on");  ////Validing same title as entered after memory is published.
        // await this.backCTA.click();                         //Clicking on Back CTA on memory detail page.

    }

    async MemorySharedWithFriends(){
        await this.New.click();                            
        await this.page.waitForSelector("#memory-title");              
        await this.titleField.fill("A memory shared with All Friends during Smoke testing on " + now);   //Entering title.
        await this.editorField.fill("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.");                 //Entering content.
        await this.friendsOption.click();
        await this.page.waitForSelector("#memory-title");
        await this.allFriends.click();
        await this.page.waitForTimeout(3000);               //Waiting for 3 seconds
        await this.publishCTA.click();                      //Clicking on Publish CTA.
        // await expect.soft(this.page.locator(".typography__LargeTitle-sc-1rnknoa-0.kzPyHe.ph-no-capture")).toContainText("A memory shared with All Friends during Smoke testing");  ////Validing same title as entered after memory is published.
        // await this.backCTA.click();                         //Clicking on Back CTA on memory detail page.

    }

}
module.exports = {NewCTA}