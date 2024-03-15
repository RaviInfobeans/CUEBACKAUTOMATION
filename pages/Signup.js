const {expect} = require('@playwright/test');
const now = new Date().toLocaleDateString();
const faker = require('faker');
const fs = require('fs');

class Signup{
    constructor(page){
        this.page = page
        this.loginCTA = page.getByRole('link', {name : 'Login'});
        this.signupLink = page.locator("//a[normalize-space()='Signup']");
        this.firstName = page.locator("input[placeholder='William']");
        this.lastName = page.locator("input[placeholder='Shakespeare']");
        this.emailAddress= page.locator("input[placeholder='bill.shakespeare@example.com']");
        this.birthYear = page.locator("input[placeholder='1564']");
        this.nextCTA = page.locator(".styled__StyledButton-sc-1edb4g-3.bMUkje");
        this.password = page.locator("input[name='password']");
        this.confirmPassword = page.locator("input[name='confirmPassword']");
        this.signupCTA = page.locator("button[class='styled__StyledButton-sc-1edb4g-3 bMUkje styled__SignUpButton-sc-y7fp0t-15 ztqvc'] span[class='typography__Subhead-sc-1rnknoa-9 styled__ButtonItemsWrapper-sc-1edb4g-0 lelRsi cBtMLB']");
        this.confirmation = page.locator(".typography__Title1-sc-1rnknoa-1.styled__StyledTitle1-sc-y7fp0t-38.kdjkVP.bYLCLk");

    }

    async SignupProcess(){
        // Generate random first and last names
        const first_Name = faker.name.firstName();
        const last_Name = faker.name.lastName();
        const email = first_Name+'@mailinator.com'
        //Signup steps
        await this.page.waitForTimeout(2000);
        await this.loginCTA.click();                            //Clicking on Login CTA
        await this.signupLink.click();                          //Clicking on Signup link on Login Page.
        await this.firstName.fill(first_Name);                  //Entering First Name.
        await this.lastName.fill(last_Name);                    //Entering Last Name.
        await this.emailAddress.fill(email);                    //Entering Email Address.
        await this.birthYear.fill('1995')                       // Entering Date of Birth
        await this.nextCTA.click();                             //Clicking on Next CTA
        await this.page.waitForTimeout(3000);                   //Waiting for 5 seconds
        await this.password.fill("Rr@778998445665");            //Entering hardcoded password
        await this.confirmPassword.fill("Rr@778998445665");     // Confirmig Password
        await this.signupCTA.click();                           //Clicking on Signup CTA
        await this.page.waitForTimeout(5000);                   //Waiting for 5 seconds
        await expect.soft(this.confirmation).toBeVisible();     //Signup successfull Validation 
        await expect.soft(this.page.locator(".ph-no-capture")).toHaveText(email); //Validating mail is sent to same email id which was entered.
        console.log("----->>>>>Registered email id: ",email)        //Printing Email id on console.
        // Extracting the email address from the element
        const capturedText = await this.page.$eval(".ph-no-capture", element => element.textContent.trim());
        // Write the registered email address to a file
          fs.appendFileSync('Registered_Emails.txt', capturedText + '\n');
        
      

    }
}
module.exports = {Signup};