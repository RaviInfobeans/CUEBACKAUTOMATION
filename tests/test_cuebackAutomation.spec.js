const { test, expect } = require('@playwright/test');
const { timeout } = require('../playwright.config');
const { POManager } = require('../pages/POManager');
let browserContext;         // Declare browserContext outside the test block

let poManager;

test.describe.serial("Smoke Testing", () => {
    test.beforeAll(async ({ browser }) => {
        browserContext = await browser.newContext(); // Assign browser context to the global variable
        const page = await browserContext.newPage();
        test.slow();
        poManager = new POManager(page);
    });

    // Login
    test("Login", async () => {
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();
        await loginPage.Login('ravi701@mailinator.com', 'Rr@778998445665');
    });

    // Memory from Timeline
    test("Timeline", async () => {
        const timelinePage = poManager.getTimelinePage();
        await timelinePage.MemoryFromTimeline();
        await timelinePage.MemoryFromTimelineCues();
    });

    //  Memory from prompt page using a prompt
    test("Prompt", async () => {
    const prompt = poManager.getPromptPage();
    await prompt.MemoryFromPrompt();
    });
    //  Edit Page creating/deleting collection and verifying all default collection
    test("EditPage", async () => {
    const editPage = poManager.getEditPage();
    await editPage.CollectionCreate();
    });
    
    //  Memory from New CTA
    test("MemoryFromNewCTA", async () => {
    const NM = poManager.getNewMemoryPage();
    await NM.MemoryFromNewCTA();
    await NM.MemorySharedWithFriends();
    });

    //  Comment and reply on Memory
    test("Comment", async () => {
    const comment_reply = poManager.getCommentPage();
    await comment_reply.Comment();
    });

    //  Public URL from Normal account
    test("PublicMemoryURL", async () => {
        const publicmemory = poManager.getApproveMemoryURL();
        await publicmemory.goTo();
        await publicmemory.verification();
        await publicmemory.HomePage();
        });

    //  Logout
    test("Logout", async () => {
    const logout = poManager.getLogoutPage();
    await logout.Logout();
    });
    //  Friend Commenting on memory.
    test("FriendsMemory", async () => {
    const lPage = poManager.getLoginPage();
    await lPage.Login("ravi707@mailinator.com","Rr@778998445665")
    const friendsP = poManager.getFriendsPage();
    await friendsP.FriendComment();
    const lOut = poManager.getLogoutPage();
    await lOut.Logout();
    });

    // Signup
    test("Signup", async () => {
    const validSignUp = poManager.getSignUpPage();
    await validSignUp.SignupProcess();
    });

// Close Browser
    test.afterAll(async () => {
    await browserContext.close(); // Close the browser context
    });

});
