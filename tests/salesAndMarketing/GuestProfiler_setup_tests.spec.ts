import { expect, Page, test } from "@playwright/test";
import LoginBL from '../../businessLayer/login/Login.BL';
import CommonBL from '../../businessLayer/common/common.BL';
import RandomHelper from '../../businessLayer/util/helper';
import GuestProfilerSetupBL from "../../businessLayer/salesAndMarketing/GuestProfiler_setup.BL";
test.describe("Sales And Marketing Guest Profiler Setup Tests", () => {
    let page: Page;
    let loginBL: LoginBL;
    let comBL: CommonBL;
    let helper: RandomHelper;
    let setupBL: GuestProfilerSetupBL;
    test.beforeEach(async ({ browser }) => {
        page = await browser.newPage();
        loginBL = new LoginBL(page);
        comBL = new CommonBL(page);
        helper = new RandomHelper();
        setupBL = new GuestProfilerSetupBL(page);
        await loginBL.DoLoginWithParthi();
    })
    test.afterEach(async ({ browser }) => {
        await page.close();
    })
    test("TC0031 -S&M_GuestProfiler_Setup_MailingList_DML_EachOperationShouldPersist", async () => {
        await comBL.NavigateTo_SalesAndMarketing_Guest_Setup();
        let mailItem=await setupBL.AddMailingList();
        await setupBL.NewMailItemShouldBeAvailableInGuestProfiler(mailItem);
        await comBL.NavigateTo_SalesAndMarketing_Guest_Setup();
       await setupBL.deleteMailingItem(mailItem);
    });

    test("TC0032 -S&M_GuestProfiler_Setup_MailingList_AddDuplicateMailingList_ShouldNotAllow(", async () => {
        await comBL.NavigateTo_SalesAndMarketing_Guest_Setup();
        await setupBL.AddDuplicateMailingListAndValidate();
    });

    test("TC0033 -S&M_GuestProfiler_Setup_GuestType_DML_EachOperationShouldPersist", async () => {
        await comBL.NavigateTo_SalesAndMarketing_Guest_Setup();
        let guetsType=await setupBL.AddGuetsType();
        await setupBL.NewGuestTypeShouldBeAvailableInGuestProfiler(guetsType);
        await comBL.NavigateTo_SalesAndMarketing_Guest_Setup();
       await setupBL.deleteGuestType(guetsType);
    });

    test("TC0034 -S&M_GuestProfiler_Setup_GuestType_AddDuplicateGuest_ShouldNotAllow", async () => {
        await comBL.NavigateTo_SalesAndMarketing_Guest_Setup();
        await setupBL.AddDuplicateGuestTypeAndValidate();
        
    });

    test("TC0035 -S&M_GuestProfiler_AddNewGuestProfile_NewAccountShouldBePersisted_AndValidateCreatedGuestInfoInMarketingPage", async () => {
        await comBL.NavigateTo_SalesAndMarketing_GuestProfiler_GuestProfiler();
        await setupBL.AddGuestProfileAndValidate();        
    });

});