const now = new Date().toLocaleDateString();
const {expect} = require('@playwright/test');
const path = require('path');

class Friends{
    constructor(page){
        this.page = page
        this.TimelineCTA = page.locator("button[placeholder='Timeline']");
        this.TimelineOption = page.locator("div[role='option']");
        this.filter = page.locator(".styled__StyledButton-sc-1edb4g-3.iEKTuO.styled__FilterButton-sc-vkrwzg-8.cwrGap");
        this.allFriends = page.getByText('All my friends');
        this.publicFilter = page.getByText('Public');
        this.applyCTA = page.getByRole('button', { name: 'Apply' })
        this.friendsMemory = page.locator('[class="MemoryCard__MemoryCardContainer-sc-zejshx-0 bzBPsf"]').first();
        this.commentBox = page.locator('div').filter({ hasText: /^Post comment$/ }).nth(1);
        this.comment = page.getByPlaceholder('What are your thoughts on');
        this.postComment = page.locator('div').filter({ hasText: /^Post comment$/ }).first();
        this.validateComment = page.getByText('Comment during smoke testing!');
        this.backCTA = page.getByTestId('expanded-back-button');


    }
    
    async FriendComment(){
        await this.TimelineCTA.click();
        await this.TimelineOption.click();
        await expect.soft(this.filter).toBeVisible();
        await this.filter.click()
        await expect.soft(this.allFriends).toBeVisible();
        await expect.soft(this.publicFilter).toBeVisible();
        // await this.allFriends.click();
        await this.applyCTA.click();
        await this.page.waitForTimeout(3000);
        await this.friendsMemory.click();
        await this.commentBox.click();
        await this.comment.fill('Comment during smoke testing! Memory is visible to friends.');
        await this.page.waitForTimeout(5000);
        await this.postComment.click();
        await expect.soft(this.validateComment).toBeVisible();
        await this.backCTA.click();
    }
}
module.exports = {Friends};