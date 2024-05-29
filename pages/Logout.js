class Logout{
    constructor(page){
        this.navbar = page.locator(".Navbar__ProfileToggle-sc-bpaubx-4")
        this.LogoutCTA = page.locator("button[class='Navbar__NavItem-sc-bpaubx-9 Navbar__LogoutButton-sc-bpaubx-10 kwcYSm fDmqZy'] p[class='typography__Body-sc-1rnknoa-5 cTmoDC']")

    }
    async Logout(){
        // await this.page.waitForTimeout(5000);
        await this.navbar.click();                  //Clicking on Navbar.
        await this.LogoutCTA.click();               //Clicking on Logout CTA.
    }
}

module.exports = {Logout};