import { expect, Page, test } from "@playwright/test";
import LoginBL from '../../businessLayer/login/Login.BL';
import CommonBL from '../../businessLayer/common/common.BL';
import RandomHelper from '../../businessLayer/util/helper';
import MaintenanceSetupBL from '../../businessLayer/maintenance/Maintenance_setup.BL';
test.describe("Maintenance Setup Tests", () => {
    let page: Page;
    let loginBL: LoginBL;
    let comBL: CommonBL;
    let helper: RandomHelper;
    let setupBL: MaintenanceSetupBL;
    test.beforeEach(async ({ browser }) => {
        page = await browser.newPage();
        loginBL = new LoginBL(page);
        comBL = new CommonBL(page);
        helper = new RandomHelper();
        setupBL = new MaintenanceSetupBL(page);
        await loginBL.DoLoginWithHsk();
    })

    test.afterEach(async ({ browser }) => {
        await page.close();
    })

    test("TC0048 -Maintenance_AddNewCommonArea_shouldBePersisted", async () => {

        await comBL.NavigateTo_Maintenance_Setup_Maintenance();
       let secCode= await setupBL.AddCommonAreaAndValidate();
       await setupBL.DeleteCommonArea(secCode);
    });

    test("TC0049 -Maintenance_AddDuplicateCommonArea_shouldNotAllow", async () => {

        await comBL.NavigateTo_Maintenance_Setup_Maintenance();
       await setupBL.AddDuplicateSCoomonAreaAndValidate();
    });

    test("TC0050 -Maintenance_DeleteCommonAreaThatAlreadyInUse_ShouldNotAllowToDelete", async () => {

       await setupBL.DeleteCommonAreaThatAlreadyInUseAndValidate();
    });

    test("TC0051 -Maintenance_AddWorkOrderItem_ShouldBePersisted", async () => {

        await comBL.NavigateTo_Maintenance_Setup_Maintenance();
       let woCode= await setupBL.AddWorkOrderItemAndValidate();
       await setupBL.DeleteWorkOrderItem(woCode);
    });

    test("TC0052 -Maintenance_AddDuplicateWorkOrderItem_ShouldThrowErrorMessage", async () => {

        await comBL.NavigateTo_Maintenance_Setup_Maintenance();
        await setupBL.AddDuplicateWorkOrderItemAndValidate();
    });

    test("TC0053 -Maintenance_DeleteWorkOrderThatAlreadyInUse_ShouldNotAllowToDelete", async () => {

        await setupBL.DeleteWorkOrderThatAlreadyInUseAndValidate();
     });

     test("TC0054 -Maintenance_AddPreventativeMaintItem_ItemShouldPersist", async () => {

        await comBL.NavigateTo_Maintenance_Setup_Maintenance();
       let pmiCode= await setupBL.AddNewPreventativeMaintItemANdValidate();
       await setupBL.DeletePreventativeMaintenanceItem(pmiCode);
    });

    test("TC0055 -Maintenance_AddDuplicatePreventativeMaintItem_ShouldThrowErrorMessage", async () => {

        await comBL.NavigateTo_Maintenance_Setup_Maintenance();
        await setupBL.AddDuplicatePreventativeMaintenanceItemAndValidate();
    });

    //Assign Preventative Item
    test("TC0056 -Maintenance_AssignPreventativeItem_assignPreventativeItemToRoomType", async () => {

        await comBL.NavigateTo_Maintenance_Setup_AssignPreventativeItem();
        await setupBL.AssingPreventativeItemToRoomType();
    });

    //Warranty Item
    // test("TC0057 -Maintenance_WarrantyItem_AddWarrantyItem_ItemShouldBePersisted", async () => {

    //     await comBL.NavigateTo_Maintenance_Setup_WarrantyItem();
    //    let code= await setupBL.AddNewWarrantyItemAndValidate();
    //    await setupBL.DeleteWarrantyItem(code);
    // });

})
