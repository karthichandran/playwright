import { Page } from "playwright";

export default class CommanPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    SuperMenuDDLElm = async () => await this.page.$(".menu-dropdown-right");

    superMenuelm = async (menu: string) => await this.page.$("a:has-text('" + menu + "')");

    PrimaryMenu = async (menu: string) => await this.page.$("text=" + menu);

    SecondaryMenu = async (menu: string) =>{ 
       let menuElm= await this.page.$("#ul-sub-nav a:has-text('" + menu + "')");
       return menuElm;
    //    if(menus.length==1)
    //    return menus[0];
    //    else
    //    return menus[1];
    };

    ToastrErrorElm = async () => await this.page.$('.toast-error');

    IsErrorMessageExist = async () => {
        await this.page.isVisible('.toast-error', { timeout: 10000 });
        var errorToast = await this.page.$$('.toast-error');
        if (errorToast.length > 0) {
            await this.page.waitForTimeout(5000);
            return true;
        }
        else {
            return false;
        }
    };

    GetErrorMessage = async () => {
        await this.page.isVisible('.toast-error', { timeout: 10000 });
        var errorToast = await this.page.$$('.toast-error');
        if (errorToast.length > 0) {
            let error = await errorToast[0].innerText();
            return error;
        }
        return null;

    };

    waitForPopupVisible = async () => {
        await this.page.waitForFunction(() => document.getElementsByClassName('modal').length > 3);
    };

    IsModelPopupExist = async () => {
        var modals = await this.page.$$('.modal');
        if (modals.length > 2) {
            let modelHeader = await modals[modals.length - 1].$('.modal-title');
            if (modelHeader != null) {
                var modelTitle = await (await modals[modals.length - 1].$('.modal-title')).innerText();
                return modelTitle;
            } else {

                let bodyHeader = await modals[modals.length - 1].$('.bootbox-body');
                if (bodyHeader != null) {
                    var modelTitle = await bodyHeader.innerText();
                    return modelTitle;
                }
                return null;
            }
        } else
            return null;
    }

    IsLanePopupExist = async () => {
        var modals = await this.page.$$('.modal');
        for(let modal of modals){
            let header=await modal.$('.modal-header');
            if(header ==null)
            continue;

            let tsxt=await header.innerText();
            if(tsxt.includes("Lane Selection")){
                return modal;
            }
        }
        return null;
        // if (modals.length > 2) {
        //     let modelHeader = await modals[modals.length - 1].$('.modal-header');
        //     if (modelHeader != null) {
        //         var modelTitle = await (await modals[modals.length - 1].$('.modal-header')).innerText();
        //         return modelTitle;
        //     }
        //     return null;
        // }
        // else
        //     return null;
    }

    WaitForPageLoad = async () => {
        await this.page.waitForTimeout(1000);
        await this.page.waitForFunction(() => document.getElementsByClassName('block-ui-anim-fade')[0].getAttribute('aria-busy') == "false");
        await this.page.waitForTimeout(1000);
    };

    WaitForselectionOptionsLoaded = async (selector: string) => {
        selector = selector + ".option";
        await this.page.waitForFunction("() => document.querySelectorAll(selector)[0].length>1");
    };

    AuditDateElm = async () => await this.page.$('.menu-item-date');

    overridePwdInputElm = async () => await this.page.$('#overridePwd');
    overridePwdOKbuttonElm = async () => await this.page.$("button:has-text('Ok')");
    calendarDoneBtn = async () => await this.page.$("button:has-text('Done')");

    getSelectedTextFromDDL = async (id: string) => {
        let optonElm = id + " option";
        let options = await this.page.$$(optonElm);
        let selectedValue = await this.page.$eval<string, HTMLSelectElement>(id, el => el.value);
        for (var i = 0; i < options.length; i++) {
            let value = await options[i].getAttribute('value');
            if (value == selectedValue)
                return await options[i].getAttribute('label');
        }
        return null;
    }

    //Creditcard payments

    cardNumberElm = async () => this.page.$("input[data-ng-model='creditCard.models.creditCardNumber']");
    expDateElm = async () => this.page.$("input[data-ng-model='creditCard.models.expirationDate']");
    authCodeElm = async () => this.page.$("input[data-ng-model='creditCard.models.authCode']");
    viewAuthorizationBtn = async () => this.page.$("button[data-ng-click='creditCard.viewCreditCardAuthorizations()']");
    voviceAuthorizationBtn = async () => {
        let elm = await this.page.$("button[data-ng-click='creditCard.models.isOffline = !creditCard.models.isOffline']");
        return elm;
    };
    authorizationBtn = async () => this.page.$("button[data-ng-click='creditCard.process()']");
    creditCardClearBtn = async () => this.page.$("button[data-ng-click='creditCard.clear()']");
    creditCardOkBtn = async () => this.page.$("button[data-ng-click='creditCard.submit()']");
    creditCardCancelBtn = async () => this.page.$("button[data-ng-click='creditCard.cancel()']");

    //Advance Deposist popup
    paymentMethodSelectionADelm = async () => this.page.$("select[ng-model='deposit.paymentCode']");
    depositAmountADelm = async () => this.page.$("input[ng-model='deposit.amount']");
    refNoADelm = async () => this.page.$("input[ng-model='deposit.refNo']");
    postADelm = async () => {
        let elm = await this.page.$$("button[data-ng-click='button.click(modalScope)']");
        return elm[0];
    };

    //Guest folio
    folioBalanceElm = async () => this.page.$("#txtSubFolioDetailBalance");
    folioAcctCodeElm=async () => this.page.$("#cboBAccountCode");
    folioamountInput=async () => this.page.$("#txtBAmount");
    folioSaveBtn=async () => this.page.$("#btnCashieringDetailSave");
    toolboxBtn=async () => this.page.$(".right-menu-box");
    checkoutBtn=async()=>this.page.$("#btnCashieringCheckout");

}