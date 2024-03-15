const {expect} = require('@playwright/test');
class LoginPage{
    constructor(page)
    {
        this.page = page
        this.loginCTA = page.getByRole('link', {name : 'Login'});
        this.emailField = page.getByPlaceholder("Enter your email...");
        this.passwordField = page.getByPlaceholder("Enter your password...");
        this.loginButton = page.locator("[type$='submit']");
        this.navbar = page.locator(".Navbar__ProfileToggle-sc-bpaubx-4");

    }

    async goTo(){

        await this.page.goto("https://app-qa.mystoriesmatter.com/");       //Opening the URL
    }
    
    async Login(username,password){
        await this.loginCTA.click();                       //Clicking on login CTA on the Homepage
        await this.page.waitForTimeout(5000);              //Waiting for 5 seconds.
        await this.emailField.fill(username);              //Entering First Name.
        await this.passwordField.fill(password);           //Entering Last Name.
        await this.loginButton.click();                    //Clicking on Login CTA
        await this.page.waitForTimeout(5000);  
        await expect.soft(this.page).toHaveTitle("Timeline | My Stories Matter");   //Validating user landed on Timeline Page.
        await this.navbar.click();                         //Closing the left Navbar after login.

    }
}

module.exports = {LoginPage};