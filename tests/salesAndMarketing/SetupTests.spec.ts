import { expect, Page, test } from "@playwright/test";
import LoginBL from '../../businessLayer/login/Login.BL';
import CommonBL from '../../businessLayer/common/common.BL';
import RandomHelper from '../../businessLayer/util/helper';
import SalesAndMarketingBL from "../../businessLayer/SalesAndMarketing/Setup.BL";
test.describe("Sales And Marketing Setup Tests", () => {
    let page: Page;
    let loginBL: LoginBL;
    let comBL: CommonBL;
    let helper: RandomHelper;
    let setupBL: SalesAndMarketingBL;
    test.beforeEach(async ({ browser }) => {
        page = await browser.newPage();
        loginBL = new LoginBL(page);
        comBL = new CommonBL(page);
        helper = new RandomHelper();
        setupBL = new SalesAndMarketingBL(page);
        await loginBL.DoLoginWithHskp1();
    })
    test.afterEach(async ({ browser }) => {
        await page.close();
    })

    test("TC0022 -SalesAndMarketing_Setup_AddCompanyCategoryCode_ShouldBePersisted", async () => {

        await comBL.NavigateTo_SalesAndMarketing_Setup();
        await setupBL.AddCompanyCategoryCodeAndValidate();
    });

    test("TC0023 -SalesAndMarketing_Setup_AddDuplicateCompanyCategoryCode_ShouldThrowErrorMessage", async () => {

        await comBL.NavigateTo_SalesAndMarketing_Setup();
        await setupBL.AddDupilcateCompanyCategoryCodeAndValidate();
    });

    test("TC0024 -SalesAndMarketing_Setup_DeleteCompanyCategoryCodeThatAlreadyInUse_ShouldNotAllowToDelete", async () => {

        await setupBL.DeleteCompanyCategoryCodeThatAlreadyInUse();
    });

    test("TC0025 -SalesAndMarketing_Setup_AddReasonsForStay_ShouldBePersisted", async () => {
        await comBL.NavigateTo_SalesAndMarketing_Setup();
        await setupBL.AddReasonForStayAndValidate();
    });

    test("TC0026 -SalesAndMarketing_Setup_AddDuplicateReasonforStay_ShouldThrowErrorMessage", async () => {
        await comBL.NavigateTo_SalesAndMarketing_Setup();
        await setupBL.AddDupilcateReasonForStayAndValidate();
    });

    test("TC0027 -SalesAndMarketing_Setup_AddMarketSegment_ShouldBePersisted", async () => {
        await comBL.NavigateTo_SalesAndMarketing_Setup();
        await setupBL.AddMarketSegmentAndValidate();
    });

    test("TC0028 -SalesAndMarketing_Setup_AddDuplicateMarketSegment_ShouldThrowErrorMessage", async () => {
        await comBL.NavigateTo_SalesAndMarketing_Setup();
        await setupBL.AddDupilcateMargetSegmentAndValidate();
    });

    test("TC0029 -SalesAndMarketing_Setup_AddReferralCodes_ShouldBePersisted", async () => {
        await comBL.NavigateTo_SalesAndMarketing_Setup();
        await setupBL.AddReferralCodeAndValidate();
    });

    test("TC0030 -SalesAndMarketing_Setup_AddDuplicateReferralCodes_ShouldThrowErrorMessage", async () => {
        await comBL.NavigateTo_SalesAndMarketing_Setup();
        await setupBL.AddDupilcateReferralCodeAndValidate();
    });

});