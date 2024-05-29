import { expect } from '@playwright/test';

class CommentandReply{
    constructor(page){
        this.page = page
        this.timeline = page.locator("button[placeholder='Timeline']")
        this.recent = page.locator(".styled__StyledViewport-sc-vkrwzg-19")
        this.firstMemory = page.locator("div[data-index='0']")
        this.commentBox = page.locator('div').filter({ hasText: /^Post comment$/ }).nth(1)
        this.commentType = page.getByPlaceholder('What are your thoughts on')
        this.postCommentCTA = page.getByText('Post comment')
        this.userComment = page.getByText('Test comment while smoke testing!')
        this.reply =  page.getByText("Reply")
        this.replyBox = page.getByPlaceholder('What would you like to reply?')
        this.replyCTA = page.locator("div[class='styled__CommentButtonContainer-sc-fb47n7-6 eJqcgf'] span[class='typography__Subhead-sc-1rnknoa-9 lelRsi']")
        this.userReply = page.getByText('Replying to test comment while performing smoke testing!')
        this.backCTA = page.getByRole('button', { name: 'Back' })

    }
    async Comment(){
        await this.timeline.click();
        await this.recent.click();
        await this.firstMemory.click();                     //Clicking on first memory on recent tab.
        await this.page.waitForSelector("textarea[placeholder='What are your thoughts on this memory?']", { timeout: 5000 });
        await this.commentBox.click();                      //Clicking on comment box.
        await this.commentType.fill('Test comment while smoke testing!');       //Entering the comment.
        await this.page.waitForTimeout(5000);
        await this.postCommentCTA.click();                  //Clicking on Post Comment CTA.
        await expect.soft(this.userComment).toBeVisible();  //Validating comment is posted.
        // await this.page.waitForTimeout(5000);              //Waiting for 5 seconds.
        // await this.page.locator("//span[normalize-space()='Reply']").click();                       //Clicking on Reply CTA.
        // await this.replyBox.click();                        // Clicking on reply box.          
        // await this.replyBox.fill('Replying to test comment while performing smoke testing!');  //Replying to comment.
        // await this.replyCTA.click();                        //Posting Reply.
        // await expect.soft(this.userReply).toBeVisible();    //Validating reply is posted.
        await this.backCTA.click();                         //Clicking on Back CTA on memory detail page.
    }
}
export default {CommentandReply}

