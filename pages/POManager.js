const { LoginPage } = require("./LoginPage");
const { EditPage } = require("./EditPage");
const { PromptPage } = require("./PromptPage");
const { TimelinePage } = require("./TimelinePage");
const { NewCTA } = require("./NewCTA");
const { CommentandReply } = require("./CommentandReply").default;
const { Logout } = require("./Logout");
const {Signup} = require("./Signup");
const { PublicURL } = require("./PublicURL");
const { Friends } = require("./Friends");

class POManager{
    constructor(page)
    {
        this.page = page
        this.homePage = new LoginPage(this.page)
        this.timelinePage = new TimelinePage(this.page);
        this.promptPage = new PromptPage(this.page);
        this.editPage = new EditPage(this.page);
        this.newCTA = new NewCTA(this.page);
        this.comment = new CommentandReply(this.page);
        this.logout = new Logout(this.page);
        this.signup = new Signup(this.page)
        this.aMemoryURL = new PublicURL(page);
        this.friends = new Friends(page);
    }

    getLoginPage(){
        return this.homePage;
    }
    
    getTimelinePage(){
        return this.timelinePage;
    }
    
    getPromptPage(){
        return this.promptPage;
    }

    getEditPage(){
        return this.editPage;
    }

    getNewMemoryPage(){
        return this.newCTA;
    }

    getCommentPage(){
        return this.comment;
    }

    getLogoutPage(){
        return this.logout;
    }

    getSignUpPage(){
        return this.signup;
    }

    getApproveMemoryURL(){
        return this.aMemoryURL;
    }

    getFriendsPage(){
        return this.friends;
    }

}
module.exports = {POManager}