import LoginPage from '../../pages/login/Login.page';
import CommanPage from '../../pages/common/common.page';
import * as loginDetails from '../../LoginDetails.json';

import { Page } from "playwright";

export default class LoginBL {
    private page: Page;
    private loginPO: LoginPage;
    private comPO:CommanPage;
    
    constructor(page: Page) {
        this.page = page;
       this.loginPO=new LoginPage(page);
        this.comPO=new CommanPage(page);
    }

    DoLogin=async ()=>{
        await  this.page.goto(loginDetails.loginUrl);

        await (await this.loginPO.propertyInputElm()).fill(loginDetails.Property);
        await (await this.loginPO.userNameInpuElm()).fill(loginDetails.User);
        await (await this.loginPO.passwordInpuElm()).fill(loginDetails.Password);
        await (await this.loginPO.submitElm()).click();
        await this.page.waitForLoadState("networkidle", { timeout: 90000 });

    };

    DoLoginWithHsk=async ()=>{
        await  this.page.goto(loginDetails.loginUrl);

        await (await this.loginPO.propertyInputElm()).fill(loginDetails.Property);
        await (await this.loginPO.userNameInpuElm()).fill(loginDetails.hsk.User);
        await (await this.loginPO.passwordInpuElm()).fill(loginDetails.hsk.Password);
        await (await this.loginPO.submitElm()).click();
        await this.page.waitForLoadState("networkidle", { timeout: 90000 });

    };
    DoLoginWithHskp1=async ()=>{
        await  this.page.goto(loginDetails.loginUrl);

        await (await this.loginPO.propertyInputElm()).fill(loginDetails.Property);
        await (await this.loginPO.userNameInpuElm()).fill(loginDetails.hskp1.User);
        await (await this.loginPO.passwordInpuElm()).fill(loginDetails.hskp1.Password);
        await (await this.loginPO.submitElm()).click();
        await this.page.waitForLoadState("networkidle", { timeout: 90000 });

    };
    DoLoginWithHb123=async ()=>{
        await  this.page.goto(loginDetails.loginUrl);

        await (await this.loginPO.propertyInputElm()).fill(loginDetails.Property);
        await (await this.loginPO.userNameInpuElm()).fill(loginDetails.hb123.User);
        await (await this.loginPO.passwordInpuElm()).fill(loginDetails.hb123.Password);
        await (await this.loginPO.submitElm()).click();
        await this.page.waitForLoadState("networkidle", { timeout: 90000 });

    };
    DoLoginWithParthi=async ()=>{
        await  this.page.goto(loginDetails.loginUrl);

        await (await this.loginPO.propertyInputElm()).fill(loginDetails.Property);
        await (await this.loginPO.userNameInpuElm()).fill(loginDetails.parthi.User);
        await (await this.loginPO.passwordInpuElm()).fill(loginDetails.parthi.Password);
        await (await this.loginPO.submitElm()).click();
        await this.page.waitForLoadState("networkidle", { timeout: 90000 });

    };
}