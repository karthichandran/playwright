import { Page } from "playwright";

export default class LoginPage {
    private page: Page;
    
    constructor(page: Page) {
        this.page = page;
    }

    propertyInputElm = async () => this.page.$('[placeholder="property"]');
    userNameInpuElm = async () => this.page.$('[placeholder="username"]');
    passwordInpuElm = async () => this.page.$('#inputPassword');
    submitElm = async () => this.page.$('input[type="submit"]');
}