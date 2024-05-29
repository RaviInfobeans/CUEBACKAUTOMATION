const { expect } = require("@playwright/test")
const { timeout } = require('../playwright.config');

class PublicURL{
    constructor(page){
        this.page = page
        this.message = page.getByText("Sorry 😔 we couldn’t find what you were looking for.");
        this.home = page.locator("a[href='/']");
        
    }
    async goTo(){
        await this.page.goto("https://www.mystoriesmatter.com/admin/approve-memories");
    }
    
    async verification(){
        await this.page.waitForTimeout(3000); 
        expect.soft(this.message).toBeVisible();
        this.home.click();
    }

    async HomePage(){
        await this.page.waitForTimeout(3000); 
        await this.page.goto("https://www.mystoriesmatter.com/memories/recent");
        await this.page.waitForTimeout(3000)
    }


}
module.exports = {PublicURL};