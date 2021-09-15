import { expect, Page, test } from "@playwright/test";
import LoginBL from '../../businessLayer/login/Login.BL';
import CommonBL from '../../businessLayer/common/common.BL';
import RandomHelper from '../../businessLayer/util/helper';
import CashieringGuestAccountBL from    '../../businessLayer/frontOffice/Cashiering_GuestAccount.BL';
test.describe("Cashiering Guest Account Tests", () => {
    let page: Page;
    let loginBL: LoginBL;
    let comBL: CommonBL;
    let helper: RandomHelper;
    let guestBL: CashieringGuestAccountBL;
    test.beforeEach(async ({ browser }) => {
        page = await browser.newPage();
        loginBL = new LoginBL(page);
        comBL = new CommonBL(page);
        helper = new RandomHelper();
        guestBL = new CashieringGuestAccountBL(page);
        await loginBL.DoLoginWithHsk();
    })

    test.afterEach(async ({ browser }) => {
        await page.close();
    })

    test("Clear_All_InHouse_Guest", async () => {      
        await guestBL.CheckoutAllInHouseGuest();      
    });

})
