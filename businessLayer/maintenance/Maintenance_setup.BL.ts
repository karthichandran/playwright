import CommanPage from '../../pages/common/Common.page';
import CommonBL from '../common/Common.BL';
import { Page } from "playwright";
import { test, expect } from '@playwright/test';
import MaintenancePage from '../../pages/maintenance/Maintenance.page';
import RandomHelper from '../util/Helper';
const _moment = require('moment');

export default class MaintenanceSetupBL {
    private page: Page;
    private comPO: CommanPage;
    private comBL: CommonBL;
    private setupPO: MaintenancePage;
    private helper: RandomHelper;
    constructor(page: Page) {
        this.page = page;
        this.comPO = new CommanPage(page);
        this.comBL = new CommonBL(page);
        this.setupPO = new MaintenancePage(page);
        this.helper = new RandomHelper();
    }

    AddCommonAreaAndValidate = async () => {

        let commonAreaGrid = await this.setupPO.commonAreaGrid();

        let headerCells = await commonAreaGrid.$$('.ngHeaderCell');
        await headerCells[0].dblclick();

        let rows = await commonAreaGrid.$$('.ngRow');
        let cells = await rows[0].$$('.ngCell');


        let commonArea = "CA-" + this.helper.Number(999, 100);

        let itrate = 1;
        let isCodeAccepted = false;
        do {
            await cells[0].click();
            await this.page.waitForTimeout(200);
            let cell0 = await cells[0].$('.form-control');
            await cell0.fill(commonArea);
            await this.page.keyboard.press("Tab");
            let error = await this.comPO.GetErrorMessage();
            if (error != null) {
                if (error.includes("No duplicates allowed.")) {
                    commonArea = "CA-" + this.helper.Number(999, 100);
                }
            }
            else {
                isCodeAccepted = true;
                break;
            }
        }
        while (itrate <= 3)

        if (!isCodeAccepted)
            test.skip();

        await cells[1].click();
        await this.page.waitForTimeout(200);
        let cell1 = await cells[1].$('.form-control');
        await cell1.fill(commonArea);
        await this.page.keyboard.press("Tab");

        let saveBtn = await cells[2].$('.glyphicon-floppy-disk');
        await saveBtn.click();
        await this.comPO.WaitForPageLoad();

        let errrorExist = await this.comBL.IsErrorAppeared();
        expect(errrorExist).toBeFalsy();

        await this.page.reload();
        await this.page.waitForTimeout(1000);
        await this.comPO.WaitForPageLoad();

        commonAreaGrid = await this.setupPO.commonAreaGrid();
        rows = await this.comBL.ScrollToRecord(commonAreaGrid, 0, commonArea);
        expect(rows != null).toBeTruthy();
        return commonArea;
    }

    DeleteCommonArea = async (rndCode) => {
        let commonAreaGrid = await this.setupPO.commonAreaGrid();
        let row = await this.comBL.ScrollToRecord(commonAreaGrid, 0, rndCode);
        let cells = await row.$$('.ngCell');
        let removeBtn = await cells[2].$('.icon-remove-sign');
        await removeBtn.click();
        await this.comPO.WaitForPageLoad();
        let errrorExist = await this.comBL.IsErrorAppeared();
        expect(errrorExist).toBeFalsy();

    }


    AddDuplicateSCoomonAreaAndValidate = async () => {
        let commonAreaGrid = await this.setupPO.commonAreaGrid();
        let rows = await commonAreaGrid.$$('.ngRow');
        let cells = await rows[0].$$('.ngCellText');
        let rndCode = await cells[0].innerText();

        let headerCells = await commonAreaGrid.$$('.ngHeaderCell');
        await headerCells[0].dblclick();

        commonAreaGrid = await this.setupPO.commonAreaGrid();
        rows = await commonAreaGrid.$$('.ngRow');
        cells = await rows[0].$$('.ngCell');

        await cells[0].click();
        await this.page.waitForTimeout(500);
        let cell0 = await cells[0].$('.form-control');
        await cell0.fill(rndCode);
        await this.page.keyboard.press("Tab");
        await this.page.waitForTimeout(1000);
        let error = await this.comPO.GetErrorMessage();
        if (error != null) {
            if (!error.includes("No duplicates allowed.")) {
                expect(true).toBeFalsy();
            }
        }
        else
            expect(true).toBeFalsy();

    }

    DeleteCommonAreaThatAlreadyInUseAndValidate = async () => {

        await this.comBL.NavigateTo_Maintenance_WorkOrders_Search();
        let roomElm = await this.setupPO.woRoomNoSelectElm();
        await roomElm.selectOption({ label: "Exclude" });

        let searchBtn = await this.setupPO.searchElm();
        await searchBtn.click();
        await this.comPO.WaitForPageLoad();

        let rows = await this.page.$$('.ngRow');
        if (rows.length == 0) {
            //Create a common area
        }

        let cells = await rows[0].$$('.ngCellText');
        let commonAreaTxt = await cells[0].innerText();

        await this.comBL.NavigateTo_Maintenance_Setup_Maintenance();

        let commonAreaGrid = await this.setupPO.commonAreaGrid();
        let row = await this.comBL.ScrollToRecord(commonAreaGrid, 1, commonAreaTxt);
        cells = await row.$$('.ngCell');
        let removeBtn = await cells[2].$('.icon-remove-sign');
        await removeBtn.click();
        await this.comPO.WaitForPageLoad();
        let errrorExist = await this.comBL.IsErrorAppeared();
        expect(errrorExist).toBeTruthy();
    }

    AddWorkOrderItemAndValidate = async () => {

        let workOrderGrid = await this.setupPO.workOrderItemGrid();

        let headerCells = await workOrderGrid.$$('.ngHeaderCell');
        await headerCells[0].dblclick();

        let rows = await workOrderGrid.$$('.ngRow');
        let cells = await rows[0].$$('.ngCell');


        let workOrder = "WOI-" + this.helper.Number(999, 100);

        let itrate = 1;
        let isCodeAccepted = false;
        do {
            await cells[0].click();
            await this.page.waitForTimeout(200);
            let cell0 = await cells[0].$('.form-control');
            await cell0.fill(workOrder);
            await this.page.keyboard.press("Tab");
            let error = await this.comPO.GetErrorMessage();
            if (error != null) {
                if (error.includes("No duplicates allowed.")) {
                    workOrder = "WOI-" + this.helper.Number(999, 100);
                }
            }
            else {
                isCodeAccepted = true;
                break;
            }
        }
        while (itrate <= 3)

        if (!isCodeAccepted)
            test.skip();

        let saveBtn = await cells[1].$('.glyphicon-floppy-disk');
        await saveBtn.click();
        await this.comPO.WaitForPageLoad();

        let errrorExist = await this.comBL.IsErrorAppeared();
        expect(errrorExist).toBeFalsy();

        await this.page.reload();
        await this.page.waitForTimeout(1000);
        await this.comPO.WaitForPageLoad();

        workOrderGrid = await this.setupPO.workOrderItemGrid();
        rows = await this.comBL.ScrollToRecord(workOrderGrid, 0, workOrder);
        expect(rows != null).toBeTruthy();
        return workOrder;
    }

    DeleteWorkOrderItem = async (rndCode) => {
        let workOrderGrid = await this.setupPO.workOrderItemGrid();
        let row = await this.comBL.ScrollToRecord(workOrderGrid, 0, rndCode);
        let cells = await row.$$('.ngCell');
        let removeBtn = await cells[1].$('.icon-remove-sign');
        await removeBtn.click();
        await this.comPO.WaitForPageLoad();
        let errrorExist = await this.comBL.IsErrorAppeared();
        expect(errrorExist).toBeFalsy();

    }

    AddDuplicateWorkOrderItemAndValidate = async () => {
        let workOrderGrid = await this.setupPO.workOrderItemGrid();
        let rows = await workOrderGrid.$$('.ngRow');
        let cells = await rows[0].$$('.ngCellText');
        let rndCode = await cells[0].innerText();

        let headerCells = await workOrderGrid.$$('.ngHeaderCell');
        await headerCells[0].dblclick();

        workOrderGrid = await this.setupPO.workOrderItemGrid();
        rows = await workOrderGrid.$$('.ngRow');
        cells = await rows[0].$$('.ngCell');

        await cells[0].click();
        await this.page.waitForTimeout(500);
        let cell0 = await cells[0].$('.form-control');
        await cell0.fill(rndCode);
        await this.page.keyboard.press("Tab");
        await this.page.waitForTimeout(1000);
        let saveBtn = await cells[1].$('.glyphicon-floppy-disk');
        await saveBtn.click();
        await this.comPO.WaitForPageLoad();

        let error = await this.comPO.GetErrorMessage();
        if (error != null) {
            if (error.includes("Work Order Item description already exists")) {
                expect(true).toBeTruthy();
            }
        }
        else
            expect(true).toBeFalsy();

    }

    DeleteWorkOrderThatAlreadyInUseAndValidate = async () => {

        await this.comBL.NavigateTo_Maintenance_WorkOrders_Search();
        let roomElm = await this.setupPO.woRoomNoSelectElm();
        await roomElm.selectOption({ label: "Exclude" });

        let searchBtn = await this.setupPO.searchElm();
        await searchBtn.click();
        await this.comPO.WaitForPageLoad();

        let rows = await this.page.$$('.ngRow');
        if (rows.length == 0) {
            //Create a common area
        }

        let cells = await rows[0].$$('.ngCellText');
        let woTxt = await cells[3].innerText();

        await this.comBL.NavigateTo_Maintenance_Setup_Maintenance();

        let woGrid = await this.setupPO.workOrderItemGrid();
        let row = await this.comBL.ScrollToRecord(woGrid, 0, woTxt);
        cells = await row.$$('.ngCell');
        let removeBtn = await cells[1].$('.icon-remove-sign');
        await removeBtn.click();
        await this.comPO.WaitForPageLoad();
        let errrorExist = await this.comBL.IsErrorAppeared();
        expect(errrorExist).toBeTruthy();
    }

    AddNewPreventativeMaintItemANdValidate = async () => {
        let itemGrid = await this.setupPO.preventativeMaintItemGrid();
        let headerCells = await itemGrid.$$('.ngHeaderCell');
        await headerCells[0].dblclick();

        let rows = await itemGrid.$$('.ngRow');
        let cells = await rows[0].$$('.ngCell');


        let item = "PMI-" + this.helper.Number(999, 100);

        let itrate = 1;
        let isCodeAccepted = false;
        do {
            await cells[0].click();
            await this.page.waitForTimeout(200);
            let cell0 = await cells[0].$('.form-control');
            await cell0.fill(item);
            await this.page.keyboard.press("Tab");
            let error = await this.comPO.GetErrorMessage();
            if (error != null) {
                if (error.includes("No duplicates allowed.")) {
                    item = "PMI-" + this.helper.Number(999, 100);
                }
            }
            else {
                isCodeAccepted = true;
                break;
            }
        }
        while (itrate <= 3)

        if (!isCodeAccepted)
            test.skip();



        let saveBtn = await cells[4].$('.glyphicon-floppy-disk');
        await saveBtn.click();
        await this.comPO.WaitForPageLoad();

        let errrorExist = await this.comBL.IsErrorAppeared();
        expect(errrorExist).toBeFalsy();

        await this.page.reload();
        await this.page.waitForTimeout(1000);
        await this.comPO.WaitForPageLoad();

        itemGrid = await this.setupPO.preventativeMaintItemGrid();
        rows = await this.comBL.ScrollToRecord(itemGrid, 0, item);
        expect(rows != null).toBeTruthy();
        return item;
    }

    DeletePreventativeMaintenanceItem = async (rndCode) => {
        let itemGrid = await this.setupPO.preventativeMaintItemGrid();
        let row = await this.comBL.ScrollToRecord(itemGrid, 0, rndCode);
        let cells = await row.$$('.ngCell');
        let removeBtn = await cells[4].$('.icon-remove-sign');
        await removeBtn.click();
        await this.comPO.WaitForPageLoad();
        let errrorExist = await this.comBL.IsErrorAppeared();
        expect(errrorExist).toBeFalsy();

    }

    AddDuplicatePreventativeMaintenanceItemAndValidate = async () => {
        let itemGrid = await this.setupPO.preventativeMaintItemGrid();
        let rows = await itemGrid.$$('.ngRow');
        let cells = await rows[0].$$('.ngCellText');
        let rndCode = await cells[0].innerText();

        let headerCells = await itemGrid.$$('.ngHeaderCell');
        await headerCells[0].dblclick();

        itemGrid = await this.setupPO.preventativeMaintItemGrid();
        rows = await itemGrid.$$('.ngRow');
        cells = await rows[0].$$('.ngCell');

        await cells[0].click();
        await this.page.waitForTimeout(500);
        let cell0 = await cells[0].$('.form-control');
        await cell0.fill(rndCode);
        await this.page.keyboard.press("Tab");

        let error = await this.comPO.GetErrorMessage();
        if (error != null) {
            if (error.includes("No duplicates allowed.")) {
                expect(true).toBeTruthy();
            }
        }
        else
            expect(true).toBeFalsy();

    }

    // Assign preventative Item

    AssingPreventativeItemToRoomType=async()=>{

        let roomTypeGrid= await this.setupPO.roomTypeGrid();
        let prevItemGird=await this.setupPO.preventativeItemAssignGird();

        let roomTypeRows=await roomTypeGrid.$$(".ngRow");
        let selectedRoomTypeInx=0;
        let selectedItem="";
        for(let i=0;i<roomTypeRows.length;i++){
            let cells=await roomTypeRows[i].$$('.ngCell');
            await cells[0].click();
            await this.comPO.WaitForPageLoad();

            let itemRows=await prevItemGird.$$('.ngRow');

           for(let j=0;j<itemRows.length;j++){
               let itemCell=await itemRows[j].$$('.ngCell');
               let checkbox=await itemCell[0].$('.form-control');
              
               if(!(await checkbox.isChecked())){
                   checkbox.click();
                   await this.comPO.WaitForPageLoad();
                   selectedItem=await (await itemCell[1].$('.ngCellText')).innerText();
                   selectedRoomTypeInx=i;

                   let saveBtn=await this.setupPO.preventativeItemAssignSaveBtn();
                   await saveBtn.click();

                   await this.comPO.WaitForPageLoad();

                   let errrorExist = await this.comBL.IsErrorAppeared();
                   expect(errrorExist).toBeFalsy();

                   break;
               }
           }
           if(selectedRoomTypeInx>0)
           break;
        }

        if(selectedRoomTypeInx==0)
        test.skip();

        await this.page.reload();
        await this.page.waitForTimeout(1000);
        await this.comPO.WaitForPageLoad();

        roomTypeGrid= await this.setupPO.roomTypeGrid();
        prevItemGird=await this.setupPO.preventativeItemAssignGird();

        roomTypeRows=await roomTypeGrid.$$(".ngRow");
        let cells=await roomTypeRows[selectedRoomTypeInx].$$('.ngCell');
        await cells[0].click();
        await this.comPO.WaitForPageLoad();

        let itemRows=await prevItemGird.$$('.ngRow');

        for(let j=0;j<itemRows.length;j++){
            let itemCell=await itemRows[j].$$('.ngCell');
            let item=await( await itemCell[1].$('.ngCellText')).innerText();
            if(item!=selectedItem)
            continue;
            let checkbox=await itemCell[0].$('.form-control');
            expect(await checkbox.isChecked()).toBeTruthy();
            await checkbox.click();
            await this.comPO.WaitForPageLoad();
            let saveBtn = await this.setupPO.preventativeItemAssignSaveBtn();
            await saveBtn.click();
            await this.comPO.WaitForPageLoad();
            let errrorExist = await this.comBL.IsErrorAppeared();
            expect(errrorExist).toBeFalsy();
            break;           
        }  
      
    }
        

    //Warranty Item
    AddNewWarrantyItemAndValidate = async () => {
        let warrantyGird = await this.setupPO.warrantyItemGird();
        let addItemBtn=await this.setupPO.newWarrantyItemBtn();
        await addItemBtn.click();
        await this.comPO.WaitForPageLoad();

        let rows=await warrantyGird.$$('.ngRow');

        let cells = await rows[0].$$('.ngCell');
        let code = "WI-" + this.helper.Number(999, 100);
        await cells[0].click();
        await this.page.waitForTimeout(100);
        let cell0 = await cells[0].$('.form-control');
        await cell0.fill(code);

        let auditDate = await this.comBL.GetAuditDateAsDate();
        let fromDate = _moment(auditDate).format('MM/DD/YY');
        let toDate = _moment(auditDate).add(10, 'y').format('MM/DD/YY');

        await cells[1].click();
        await this.page.waitForTimeout(100);
        let cell1 = await cells[1].$('.form-control');       
        await cell1.fill(fromDate);
        await this.page.keyboard.press("Tab");

        await cells[2].click();
        await this.page.waitForTimeout(100);
        let cell2 = await cells[2].$('.form-control');
        await cell2.fill(toDate);
        await this.page.keyboard.press("Tab");

        await cells[3].click();
        await this.page.waitForTimeout(100);
        let cell3 = await cells[3].$('.form-control');
        await cell3.fill(code);

        await cells[4].click();
        await this.page.waitForTimeout(100);
        let cell4 = await cells[4].$('.form-control');
        await cell4.fill("admin");

        
        await cells[5].click();
        await this.page.waitForTimeout(100);
        let cell5 = await cells[5].$('.form-control');
        await cell5.fill("12345678");

        let custNo = this.helper.Number(9999, 1000);
        await cells[6].click();
        await this.page.waitForTimeout(100);
        let cell6 = await cells[6].$('.form-control');
        await cell6.fill(custNo.toString());

        let invoiceNo = this.helper.Number(9999, 1000);
        await cells[7].click();
        await this.page.waitForTimeout(100);
        let cell7 = await cells[7].$('.form-control');
        await cell7.fill(invoiceNo.toString());
      

        let saveBtn=await this.setupPO.saveWarrantyItemBtn();
        await saveBtn.click();

        await this.comPO.WaitForPageLoad();

        let errrorExist = await this.comBL.IsErrorAppeared();
        expect(errrorExist).toBeFalsy();

        await this.page.reload();
        await this.page.waitForTimeout(1000);
        await this.comPO.WaitForPageLoad();

        warrantyGird = await this.setupPO.warrantyItemGird();
        let row= await this.comBL.ScrollToRecord(warrantyGird, 0, code);

        expect(row != null).toBeTruthy();
        return row;
    }

    DeleteWarrantyItem = async (rndCode) => {
        let  warrantyGird = await this.setupPO.warrantyItemGird();
        let row = await this.comBL.ScrollToRecord(warrantyGird, 0, rndCode);
        let cells = await row.$$('.ngCell');
        await cells[0].click();
        let removeBtn = await this.setupPO.removeWarrantyItemBtn();
        await removeBtn.click();
        await this.comPO.WaitForPageLoad();
        let errrorExist = await this.comBL.IsErrorAppeared();
        expect(errrorExist).toBeFalsy();

    }
}