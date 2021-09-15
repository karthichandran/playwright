import { expect, Page, test } from "@playwright/test";
import LoginBL from '../../businessLayer/login/Login.BL';
import CommonBL from '../../businessLayer/common/common.BL';
import RandomHelper from '../../businessLayer/util/helper';
import CityLedgerBL from '../../businessLayer/salesAndMarketing/CityLedger.BL';
test.describe("Sales And Marketing City Ledger Tests", () => {
    let page: Page;
    let loginBL: LoginBL;
    let comBL: CommonBL;
    let helper: RandomHelper;
    let cityBL: CityLedgerBL;
    test.beforeEach(async ({ browser }) => {
        page = await browser.newPage();
        loginBL = new LoginBL(page);
        comBL = new CommonBL(page);
        helper = new RandomHelper();
        cityBL = new CityLedgerBL(page);
        await loginBL.DoLogin();
    })
    test.afterEach(async ({ browser }) => {
        await page.close();
    })
    test("TC0036 -CityLedger_DMLCityLedger",async()=>{

        await cityBL.Perform_MDL_operationInCityLedger();
    })

    test("TC0046 -CityLedger_AddDuplicateAccountNumber_ShouldNotBeAllowed",async()=>{

        await cityBL.AddDuplicateCoountNumberAndValidate();
    })
})