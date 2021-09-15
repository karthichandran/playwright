import { expect, Page, test } from "@playwright/test";
import LoginBL from '../../businessLayer/login/Login.BL';
import CommonBL from '../../businessLayer/common/common.BL';
import RandomHelper from '../../businessLayer/util/helper';
import WorkOrderBL from '../../businessLayer/maintenance/WorkOrder.BL';
test.describe("Maintenance Work order Tests", () => {
    let page: Page;
    let loginBL: LoginBL;
    let comBL: CommonBL;
    let helper: RandomHelper;
    let woBL: WorkOrderBL;
    test.beforeEach(async ({ browser }) => {
        page = await browser.newPage();
        loginBL = new LoginBL(page);
        comBL = new CommonBL(page);
        helper = new RandomHelper();
        woBL = new WorkOrderBL(page);
        await loginBL.DoLoginWithHsk();
    })

    test.afterEach(async ({ browser }) => {
        await page.close();
    })

    test("TC0058 -WorkOrder_AddNewWorkOrderForRoom_ShouldBePersisted", async () => {

        await comBL.NavigateTo_Maintenance_WorkOrders_NewWorkOrder();
        await woBL.AddNewWorkOrderForRoomAndValidate();
        await woBL.CompleteWorkOrder();
      
    });

    test("TC0059 -WorkOrder_AddNewWorkOrderForCommonArea_ShouldBePersisted", async () => {

        await comBL.NavigateTo_Maintenance_WorkOrders_NewWorkOrder();
        await woBL.AddNewWorkOrderForCommonAreaAndValidate();
        await woBL.CompleteWorkOrder();
    });

    test("TC0060 -WorkOrder_SearchByPendingWorkerOrder_ShouldShowOnlyPendingWorkOrders", async () => {

        await comBL.NavigateTo_Maintenance_WorkOrders_Search();      
        await woBL.SearchByPendingWorkOrdersAndValidate();
    });

    test("TC0061 -WorkOrder_SearchByCompletedWorkerOrder_ShouldShowOnlyCompletedWorkOrders", async () => {

        await comBL.NavigateTo_Maintenance_WorkOrders_Search();      
        await woBL.SearchByCompletedWorkOrdersAndValidate();
    });
})