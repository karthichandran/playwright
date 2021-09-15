import CommanPage from '../../pages/common/Common.page';
import CommonBL from '../common/Common.BL';
import { Page } from "playwright";
import { expect } from '@playwright/test';
import CashieringGuestAccountPage from '../../pages/frontOffice/Cashiering_GuestAccount.page';
import ReservationBL from './Rservation.BL';
import NightAuditBL from '../Accounting/NightAudit.BL';
import RandomHelper from '../util/Helper';
const _moment = require('moment');
import { keyboard, Key } from '@nut-tree/nut-js'

export default class CashieringGuestAccountBL {
    private page: Page;
    private comPO: CommanPage;
    private comBL: CommonBL;
    private guestPO: CashieringGuestAccountPage;
    private resBL:ReservationBL;
    private auditBL:NightAuditBL;
    private helper: RandomHelper;
    constructor(page: Page) {
        this.page = page;
        this.comPO = new CommanPage(page);
        this.comBL = new CommonBL(page);
        this.guestPO = new CashieringGuestAccountPage(page);
        this.resBL=new ReservationBL(page);
        this.auditBL=new NightAuditBL(page);
        this.helper = new RandomHelper();
        keyboard.config.autoDelayMs = 1000;
    }

    CheckoutAllInHouseGuest = async () => {
        await this.comBL.NavigateToCashieringGuestAccount();
        let inHouseGuestBnt = await this.guestPO.inHouseToolBtn();
        await inHouseGuestBnt.click();
        await this.comPO.WaitForPageLoad();
        let rows = await this.guestPO.inHouseGuestGridRows();
        if(rows.length==0)
        return;
        do {
            let cells = await rows[0].$$('.ngCell');
            await cells[0].click();

            await this.comPO.WaitForPageLoad();
            let viewBtn = await this.guestPO.viewFolioBtn();
            await viewBtn.click();
            await this.comPO.WaitForPageLoad();
            await this.auditBL.CheckOutReservation();
            await this.comPO.WaitForPageLoad();
            await keyboard.pressKey(Key.Escape);
            await this.comPO.WaitForPageLoad();

            inHouseGuestBnt = await this.guestPO.inHouseToolBtn();
            await inHouseGuestBnt.click();
            await this.comPO.WaitForPageLoad();
            rows = await this.guestPO.inHouseGuestGridRows();

            if(rows.length==0)
            break;
        } while (true)

    }
}