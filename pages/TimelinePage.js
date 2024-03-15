const now = new Date().toLocaleDateString();
const {expect} = require('@playwright/test');
const path = require('path');

class TimelinePage{
    constructor(page)
    {
        this.page = page
        this.addMemory = page.locator(".Column__LineBorder-sc-662pwx-4.cErZwj").last()
        this.titleField = page.locator("#memory-title")
        this.editorField = page.locator(".tiptap.ProseMirror")
        this.publishCTA = page.locator("#msm-publish-button")
        this.backCTA = page.locator("[class='styled__StyledButton-sc-1edb4g-3 dfOfuL']")
        this.TimelineCTA = page.locator("button[placeholder='Timeline']")
        this.TimelineOption = page.locator("div[role='option']")
        this.Cue = page.locator(".Cue__CueContainer-sc-1vnbk6z-0.gFgAKX").last()
        this.NewCTA = page.getByRole('button', { name: 'New memory' }).first()
        this.CuePrompt = page.getByTestId('prompt-wrapper')
        this.title = page.locator(".typography__LargeTitle-sc-1rnknoa-0.kzPyHe.ph-no-capture")
        this.prompt = page.getByRole('link', { name: 'Prompts' })


    }

    async MemoryFromTimeline(){
        await this.addMemory.click();       //Clicking on Add memory CTA on Timeline Page.
        await this.titleField.fill("Created from timeline page during Smoke testing on " + now);        //Entering title with current date.
        await this.editorField.fill("Test content for smoke testing");          //Entering content.
        await this.page.waitForTimeout(5000);        //Waiting for 5 seconds.
        await this.publishCTA.click()       //Clicking on Publish CTA.
        await expect.soft(this.title).toContainText("Created from timeline page during Smoke testing");     // Verify title after publishing.
        await this.backCTA.click();     //Clicking on Back CTA.
    }
    async MemoryFromTimelineCues(){
        await this.TimelineCTA.click();         //Clicking on Timeline Tab from Recent Page.
        await this.TimelineOption.click();      //Clicking on Timeline option to go to Timeline page.
        await expect.soft(this.page).toHaveTitle("Timeline | My Stories Matter");       //Validating user is guided to Timeline page.
        await this.Cue.click();                 //Clicking on last Cue.
        await this.NewCTA.click();              //Clicking on NEW CTA on CUE popup.
        await this.CuePrompt.click();           //Clicking on CUE prompt.
        await expect.soft(this.CuePrompt).toBeVisible();        //Validating Cue prompt on editor.       
        await this.titleField.fill("Created from Cues during Smoke testing on " + now);         //Entering title with current date.   
        await this.editorField.fill("Test content for memory created from cues during smoke testing");      //Entering content.
        await this.page.waitForTimeout(5000);           //Waiting for 5 seconds.
        await this.publishCTA.click();                  //Clicking on Publish CTA.
        await expect.soft(this.title).toContainText("Created from Cues during Smoke testing");              // Verify title after publishing.
        await this.backCTA.click();                     //Clicking on Back CTA.

    }


}
module.exports = {TimelinePage}