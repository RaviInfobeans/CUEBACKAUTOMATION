const {expect} = require('@playwright/test');
const now = new Date().toLocaleDateString();


class PromptPage{
    constructor(page){
        this.page = page
        this.promptPage = page.getByRole('link', { name: 'Prompts' })
        this.familyPrompt = page.getByRole('link', { name: 'Family 🏡' })
        this.reflectionPrompt = page.getByRole('link', { name: 'Life Reflection 🤔' })
        this.parentPrompt = page.getByRole('link', { name: 'Parents 🤰' })
        // this.prompt = page.getByRole('link', { name: 'When you were younger, what' })
        this.prompt = page.locator('div[class="infinite-scroll-component__outerdiv"] a').nth(0);
        this.promptOnEditor = page.getByTestId('prompt-wrapper')
        this.date = page.locator('#date-input')
        this.click = page.locator('.memoryID__MediaContainer-sc-1k1ymyw-1')
        this.year = page.locator('div').filter({ hasText: /^2023$/ })
        this.month = page.locator('div').filter({ hasText: /^Apr$/ })
        this.dateField = page.locator('div').filter({ hasText: /^4$/ })
        this.afterDateClick = page.getByText('BackChanges savedPublishTitle')
        this.promptwrapper = page.getByTestId('prompt-wrapper')
        this.titleField = page.locator("#memory-title")
        this.editorField = page.locator(".tiptap.ProseMirror")
        this.publishCTA = page.locator("#msm-publish-button")
        this.backCTA = page.locator("[class='styled__StyledButton-sc-1edb4g-3 dfOfuL']")

    }

    async MemoryFromPrompt(){
        await expect.soft(this.promptPage).toBeVisible();             //Validating prompt field is present
        await this.promptPage.click();                                //Clicking on Prompt Page.      
        expect.soft(this.familyPrompt).toBeVisible();                 //Validating Family Prompt section.
        await expect.soft(this.reflectionPrompt).toBeVisible();       //Validating Reflection Prompt section.
        await expect.soft(this.parentPrompt).toBeVisible();           //Validating Parent Prompt section.
        await this.prompt.click();                                    //Clicking on one prompt.
        await expect.soft(this.promptOnEditor).toBeVisible();         //Validating prompt wrapper on memory editor.
        await this.date.click();                                      //Clicking on Date Field on editor.
        await this.click.click();                                      
        // Memory of back date
        await this.date.click();                                      //Selecting DateField.
        await this.year.click();                                      //Selecting Year.
        await this.month.click();                                     //Selecting Month.
        await this.dateField.click();                                 //Selecting Date.
        await this.afterDateClick.click();                            //Confirming Date.
        await this.page.waitForTimeout(5000)                          //Waiting for 5 seconds
        await this.titleField.fill("Created memory while answering a prompt from prompt page during Smoke testing on " + now);
        await this.editorField.fill("Test content for memory created via prompt");      //Content on editor
        await this.page.waitForTimeout(5000);                         //Waiting for 5 seconds.
        await this.publishCTA.click();                                //Clicking on Publish CTA
        await expect.soft(this.page.locator(".typography__LargeTitle-sc-1rnknoa-0.kzPyHe.ph-no-capture")).toContainText("Created memory while answering a prompt from prompt page during Smoke testing on");  //Validing same title as entered after memory is published.
        await this.backCTA.click();                                   //Clicking on Back CTA on memory detail page.

    }
}
module.exports = {PromptPage}