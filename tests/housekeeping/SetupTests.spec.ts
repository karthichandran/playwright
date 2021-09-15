import { expect, Page, test } from "@playwright/test";
import LoginBL from '../../businessLayer/login/Login.BL';
import CommonBL from '../../businessLayer/common/common.BL';
import RandomHelper from '../../businessLayer/util/helper';
import HousekeepingSetupBL from '../../businessLayer/housekeeping/Setup.BL';
test.describe("Housekeeping Setup Tests", () => {
    let page: Page;
    let loginBL: LoginBL;
    let comBL: CommonBL;
    let helper: RandomHelper;
    let setupBL: HousekeepingSetupBL;
    test.beforeEach(async ({ browser }) => {
        page = await browser.newPage();
        loginBL = new LoginBL(page);
        comBL = new CommonBL(page);
        helper = new RandomHelper();
        setupBL = new HousekeepingSetupBL(page);
        await loginBL.DoLoginWithHsk();
    })

    test.afterEach(async ({ browser }) => {
        await page.close();
    })


    test("TC0037 -HousekeepingSections_AddNewSection_shouldBePersisted", async () => {

        await comBL.NavigateTo_Housekeeping_Setup_Sections();
       let secCode= await setupBL.AddNewSectionAndValidate();
       await setupBL.DeleteSection(secCode);
    }   );

    test("TC0038 -HousekeepingSections_AddDuplicateSection_shouldNotAllow", async () => {

        await comBL.NavigateTo_Housekeeping_Setup_Sections();
        await setupBL.AddDuplicateSectionAndValidate();      
    });

    test("TC0039 -HousekeepingSections_DeleteSectionThatAlreadyReferrenced_shouldNotAllowToDelete", async () => {

        await comBL.NavigateTo_Housekeeping_Setup_Sections();
        await setupBL.DeleteSectionThatAlreadyReferenced();      
    });

    test("TC0040 -HousekeepingSections_AssignSectionToRooms", async () => {

        await comBL.NavigateTo_Housekeeping_Setup_Sections();
        await setupBL.AssingSectionToRoom();      
    });

    // Supply Usage

    test("TC0041 -Housekeeping_SupplyUsage_AddNewItem", async () => {

        await comBL.NavigateTo_Housekeeping_Setup_SupplyItem();
        let item=await setupBL.AddSupplyItemAndValidate();   
        await setupBL.DeleteSupplyItem(item);   
    });

    test("TC0042 -Housekeeping_SupplyUsage_AddDuplicateItem_ShouldNotAllow", async () => {

        await comBL.NavigateTo_Housekeeping_Setup_SupplyItem();
        await setupBL.AddDuplicateSupplyItemAndValidate();            
    });

    test("TC0043 -Housekeeping_SupplyUsage_assignItemToRoomType_shouldBePersisted", async () => {

        await comBL.NavigateTo_Housekeeping_Setup_SupplyItem();
        await setupBL.AssignItemToRoomTypeAndValidate();            
    });

    //Time Allotment
    test("TC0044 -Housekeeping_TimeAllotment_RoomType_UpdateMinimumMakeAndChangeValue_ShoudBePersisted", async () => {

        await comBL.NavigateTo_Housekeeping_Setup_TimeAllotment();
        await setupBL.UpdateMinimumMakeAndChangeValueAndValidate();            
    });

    test("TC0045 -Housekeeping_TimeAllotment_RoomType_UpdateScheduledService_ShoudBePersisted", async () => {

        await comBL.NavigateTo_Housekeeping_Setup_TimeAllotment();
        await setupBL.UpdateScheduledService();            
    });


})