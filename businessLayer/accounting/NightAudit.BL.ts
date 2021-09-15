import ReservationPage from '../../pages/frontOffice/Reservation.page';
import NightAuditPage from '../../pages/accounting/NightAudit.page';
import CommanPage from '../../pages/common/Common.page';
import CommonBL from '../common/Common.BL';
import ReservationBL from '../frontOffice/Rservation.BL';
import { Page } from "playwright";
import test, { expect } from '@playwright/test';
import moment from 'moment';

import { keyboard, Key } from '@nut-tree/nut-js'

export default class NightAuditBL {
    private page: Page;
    private resPO: ReservationPage;
    private comPO: CommanPage;
    private comBL: CommonBL;
    private auditPO: NightAuditPage;
    private resBL: ReservationBL;
    constructor(page: Page) {
        this.page = page;
        this.resPO = new ReservationPage(page);
        this.comPO = new CommanPage(page);
        this.comBL = new CommonBL(page);
        this.auditPO = new NightAuditPage(page);
        this.resBL = new ReservationBL(page);
        keyboard.config.autoDelayMs = 1000;
    }

    CheckOutDueOuts = async () => {
        let dueOutCount = await this.auditPO.dueOutCountElm();
        let dueOuttxt = await dueOutCount.innerText();
        let totalDueOuts = parseInt(dueOuttxt.split(' ')[0]);
        if(totalDueOuts>0){
            let dueOutBtn = await this.auditPO.dueOutBtnElm();
            await dueOutBtn.click();
            await this.comPO.WaitForPageLoad();
        }
        while (totalDueOuts > 0) {
           
            let rows = await this.page.$$('.row-container');
            if(rows.length==0)
            break;
            let cells = await rows[0].$$('.row-cell');
            await cells[0].dblclick();
            await this.comPO.WaitForPageLoad();

            await this.CheckOutReservation();
            await this.comPO.WaitForPageLoad();

            await keyboard.pressKey(Key.Escape);
            await this.comPO.WaitForPageLoad();
        }
    }

    CheckOutReservation = async () => {
        let balance = await (await this.comPO.folioBalanceElm()).inputValue();
        let amount = balance.replace("(", "-").replace(")", "").replace("$", "");
        let foliobalance = parseFloat(amount);
        let acctCode = await this.comPO.folioAcctCodeElm();
        let folioamountInput = await this.comPO.folioamountInput();
        let saveBtn = await this.comPO.folioSaveBtn();
        if (foliobalance > 0) {

            await acctCode.selectOption("number:57");
            await this.comPO.WaitForPageLoad();
            await folioamountInput.fill(foliobalance.toString());

            await saveBtn.click();
            await this.comPO.WaitForPageLoad();

            let modelTitle = await this.page.$("h3:has-text('Change')");
            if (modelTitle != null) {
                let amountInput = await this.page.$("#txtPayCalcAmountReceived");
                await amountInput.fill(foliobalance.toString());
                await this.page.keyboard.press("Tab");
                let submitBtn = await this.page.$('button[data-ng-click="submit(true)"]');
                await submitBtn.click();
                await this.comPO.WaitForPageLoad();
            }
        }
        else if (foliobalance < 0) {
            await acctCode.selectOption("number:61");
            await folioamountInput.fill((-(foliobalance)).toString());
            await saveBtn.click();
            await this.comPO.WaitForPageLoad();
            let errorMsg=await this.comPO.GetErrorMessage();
            if(errorMsg!=null){
                if(errorMsg.includes("Amount Exceeds Refund Limit")){
                    await this.page.waitForTimeout(3000);
                    await acctCode.selectOption("number:151"); //tips
                    await folioamountInput.fill((-(foliobalance)).toString());
                    await saveBtn.click();
                    await this.comPO.WaitForPageLoad();
                }
            }

        }

        let modelTitle = await this.comPO.IsModelPopupExist();
        if (modelTitle != null) {
            if (modelTitle.includes('City Ledger Only Accepts Room And Tax Postings')) {
                let cancelBtn = await this.page.$('button:has-text("OK")');
                await cancelBtn.click();
                await this.comPO.WaitForPageLoad();
                let errorMsg=await this.comPO.GetErrorMessage();
                if(errorMsg!=null){
                    if(errorMsg.includes("Amount Exceeds Refund Limit")){
                        await this.page.waitForTimeout(3000);
                        await acctCode.selectOption("number:151"); //tips
                        await folioamountInput.fill((-(foliobalance)).toString());
                        await saveBtn.click();
                        await this.comPO.WaitForPageLoad();
                    }
                }
            }
        }

        await this.page.evaluate(() => window.scrollTo(0, 0));
        await this.page.waitForTimeout(1000);
        let toolbox = await this.comPO.toolboxBtn();
        
        await toolbox.hover({ force: true, position: { x: 3, y: 3 } });
        let checkInBtn = await this.comPO.checkoutBtn();
        await checkInBtn.click();
        await this.comPO.WaitForPageLoad();

        do {
            let modelTitle = await this.comPO.IsModelPopupExist();
            if (modelTitle == null)
                break;

            if (modelTitle.includes("Reservation is not due out until")) {
                let okBtn = await this.page.$('button:has-text("OK")');
                await okBtn.click();
                await this.comPO.WaitForPageLoad();
            }

            if (modelTitle.includes("No Room & Tax Has been posted for Late Checkout")) {
                let okBtn = await this.page.$('button:has-text("Yes")');
                await okBtn.click();
                await this.comPO.WaitForPageLoad();
            }

            if (modelTitle.includes("Reservation Arrived Today. Should Charges Be Posted?")) {
                let okBtn = await this.page.$('button:has-text("No")');
                await okBtn.click();
                await this.comPO.WaitForPageLoad();
            }
            if (modelTitle.includes("Early Check Out Reason")) {
                let input = await this.page.$('.bootbox-input-text');
                await input.fill("Cleanup");

                let okBtn = await this.page.$('button:has-text("OK")');
                await okBtn.click();
                await this.comPO.WaitForPageLoad();
            }

        } while (true)

        modelTitle = await this.comPO.IsModelPopupExist();
        if (modelTitle != null) {
            if (modelTitle.includes("Early Check Out Reason")) {
                let input = await this.page.$('.bootbox-input-text');
                await input.fill("Cleanup");

                let okBtn = await this.page.$('button:has-text("OK")');
                await okBtn.click();
                await this.comPO.WaitForPageLoad();
            }
        }
    }

    CancelNoShows = async () => {
        let noShowsCount = await this.auditPO.noShowsCountElm();
        let noShowstxt = await noShowsCount.innerText();
        let totalNoSHows = parseInt(noShowstxt.split(' ')[0]);
        if (totalNoSHows == 0)
            return;
        let cancelNoShowsBtn = await this.auditPO.noShowsBtnElm();
        await cancelNoShowsBtn.click();
        await this.comPO.WaitForPageLoad();

        while (totalNoSHows > 0) {
            let rows = await this.page.$$('.row-container');
            if (rows.length==0)
                break;
            let cells = await rows[0].$$('.row-cell');
            await cells[0].dblclick();
            await this.comPO.WaitForPageLoad();

            let modelTitle = await this.comPO.IsModelPopupExist();
            if (modelTitle != null) {
                if (modelTitle.includes("Change of # of Adults may cause Rates to change...")) {
                    let okBtn = await this.page.$('button:has-text("Yes")');
                    await okBtn.click();
                    await this.comPO.WaitForPageLoad();
                }
            }

            modelTitle = await this.comPO.IsModelPopupExist();
            if (modelTitle != null) {
                if (modelTitle.includes("Please Enter the Password to Override the Requirement")) {
                    let inputElm = await this.comPO.overridePwdInputElm();
                    await inputElm.fill("ok");
                    let okButton = await this.comPO.overridePwdOKbuttonElm();
                    await okButton.click();
                    await this.comPO.WaitForPageLoad();
                }
            }

            await this.resBL.CancelReservation();
        }

    }

    OpenTransactionReports = async () => {
        let operatorTransElm = await this.auditPO.transactionReportElm();
        let status = await operatorTransElm.innerText();
        if (status == "PENDING") {
            let operatorTransBtn = await this.auditPO.transactionReportBtn();
            await operatorTransBtn.click();
            await this.comPO.WaitForPageLoad();
            let operatorTransCloseBtn = await this.auditPO.transactionCloseBtn();
            await operatorTransCloseBtn.click();
            await this.comPO.WaitForPageLoad();
        }
    }

    PerformAuditAction = async () => {
        let oneBtn = await this.auditPO.oneButtonAuditElm();
        await oneBtn.click();
        await this.comPO.WaitForPageLoad();
    }
}