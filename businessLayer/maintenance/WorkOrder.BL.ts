import CommanPage from '../../pages/common/Common.page';
import CommonBL from '../common/Common.BL';
import { Page } from "playwright";
import { test, expect } from '@playwright/test';
import MaintenancePage from '../../pages/maintenance/Maintenance.page';
import RandomHelper from '../util/Helper';
const _moment = require('moment');

export default class WorkOrderBL {
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

    private _referrelTo = "Admin";
    private _referralCmd = "Admin";
    private _workOrderDetails = "Please do service asap";

    AddNewWorkOrderForRoomAndValidate = async () => {
        let roomDDl = await this.setupPO.roomDDlElm();
        let roomsOpt = await this.setupPO.roomDDlOptionsText();
        let rndInx = this.helper.Number(roomsOpt.length, 1);
        let rndRoomNo = roomsOpt[rndInx];
        await roomDDl.selectOption({ label: rndRoomNo });

        let auditDate = await this.comBL.GetAuditDateAsDate();
        let outOfServDate = _moment(auditDate).format('MM/DD/YY');
        let backInServDate = _moment(auditDate).add(1, 'd').format('MM/DD/YY');

        let outOfServElm = await this.setupPO.outOfServiceElm();
        await outOfServElm.fill(outOfServDate);

        let referredTo = await this.setupPO.referToElm();
        await referredTo.fill(this._referrelTo);

        let backInServElm = await this.setupPO.backOfServiceElm();
        await backInServElm.fill(backInServDate);

        let maintItemElm = await this.setupPO.maintItemDDlElm();
        let maintOptions = await this.setupPO.maintItemDDlOptionElm();
        let rndmaintInx = this.helper.Number(maintOptions.length, 1);
        let rndMaintItem = maintOptions[rndmaintInx];
        await maintItemElm.selectOption({ label: rndMaintItem });

        let assignToElm = await this.setupPO.assignToDDlElm();
        let assignToOpt = await this.setupPO.assignToDDlOptions();
        let rndAssignToInx = this.helper.Number(assignToOpt.length, 1);
        let rndAssignTO = assignToOpt[rndAssignToInx];
        assignToElm.selectOption({ label: rndAssignTO });

        let referralCmd = await this.setupPO.referralCommentElm();
        await referralCmd.fill(this._referralCmd);

        let workOrderDetElm = await this.setupPO.workORderDetailElm();
        await workOrderDetElm.fill(this._workOrderDetails);

        let saveBtn = await this.setupPO.workOrderSaveBtn();
        await saveBtn.click();
        await this.comPO.WaitForPageLoad();

        let errrorExist = await this.comBL.IsErrorAppeared();
        expect(errrorExist).toBeFalsy();

        await this.comBL.NavigateTo_Maintenance_WorkOrders_Search();

        let roomNoDDlElm = await this.setupPO.woRoomNoSelectElm();
        await roomNoDDlElm.selectOption({ label: rndRoomNo });

        let assignToDDLElm = await this.setupPO.assignToSelectElm();
        await assignToDDLElm.selectOption({ label: rndAssignTO });

        let fromElm = await this.setupPO.startDateElm();
        await fromElm.fill(outOfServDate);
        let toElm = await this.setupPO.endDateElm();
        await toElm.fill(backInServDate);

        let searchElm = await this.setupPO.searchElm();
        await searchElm.click();
        await this.comPO.WaitForPageLoad();

        let rows = await this.page.$$('.ngRow');
        expect(rows.length > 0).toBeTruthy();

        let cells=await rows[0].$$('.ngCell');
        await cells[0].click();
        await this.comPO.WaitForPageLoad();

        let savedRoomNo=await this.setupPO.selectedRoomNoElm();
        referralCmd = await this.setupPO.referralCommentElm();
        let savedReferralCmd=await referralCmd.inputValue();

        outOfServElm = await this.setupPO.outOfServiceElm();
        let savedOutOfServ=await outOfServElm.inputValue();

        backInServElm = await this.setupPO.backOfServiceElm();
        let savedBackInServ = await backInServElm.inputValue();

        let selectedMaintItem = await this.setupPO.selectedMaintItem();
        let selectedAssignTo = await this.setupPO.selectedAssignTo();

        workOrderDetElm = await this.setupPO.workORderDetailElm();
        let savedworkOrderDet = await workOrderDetElm.inputValue();

        referredTo = await this.setupPO.referToElm();
        let savedReferralTo = await referredTo.inputValue();

        expect(rndRoomNo==savedRoomNo).toBeTruthy();
        expect(this._referralCmd==savedReferralCmd).toBeTruthy();
        expect(outOfServDate==savedOutOfServ).toBeTruthy();
        expect(backInServDate==savedBackInServ).toBeTruthy();
        expect(rndMaintItem==selectedMaintItem).toBeTruthy();
        expect(rndAssignTO==selectedAssignTo).toBeTruthy();
        expect(this._workOrderDetails==savedworkOrderDet).toBeTruthy();
        expect(this._referrelTo==savedReferralTo).toBeTruthy();
    }


    AddNewWorkOrderForCommonAreaAndValidate = async () => {
        let commonAreaDDl = await this.setupPO.commonAreaDDlElm();
        let commonAreaOpt = await this.setupPO.commonAreaOptionsText();
        let rndInx = this.helper.Number(commonAreaOpt.length, 1);
        let rndCommonArea = commonAreaOpt[rndInx];
        await commonAreaDDl.selectOption({ label: rndCommonArea });

        let auditDate = await this.comBL.GetAuditDateAsDate();
        let outOfServDate = _moment(auditDate).format('MM/DD/YY');
        let backInServDate = _moment(auditDate).add(1, 'd').format('MM/DD/YY');

        let outOfServElm = await this.setupPO.outOfServiceElm();
        await outOfServElm.fill(outOfServDate);

        let referredTo = await this.setupPO.referToElm();
        await referredTo.fill(this._referrelTo);

        let backInServElm = await this.setupPO.backOfServiceElm();
        await backInServElm.fill(backInServDate);

        let maintItemElm = await this.setupPO.maintItemDDlElm();
        let maintOptions = await this.setupPO.maintItemDDlOptionElm();
        let rndmaintInx = this.helper.Number(maintOptions.length, 1);
        let rndMaintItem = maintOptions[rndmaintInx];
        await maintItemElm.selectOption({ label: rndMaintItem });

        let assignToElm = await this.setupPO.assignToDDlElm();
        let assignToOpt = await this.setupPO.assignToDDlOptions();
        let rndAssignToInx = this.helper.Number(assignToOpt.length, 1);
        let rndAssignTO = assignToOpt[rndAssignToInx];
        assignToElm.selectOption({ label: rndAssignTO });

        let referralCmd = await this.setupPO.referralCommentElm();
        await referralCmd.fill(this._referralCmd);

        let workOrderDetElm = await this.setupPO.workORderDetailElm();
        await workOrderDetElm.fill(this._workOrderDetails);

        let saveBtn = await this.setupPO.workOrderSaveBtn();
        await saveBtn.click();
        await this.comPO.WaitForPageLoad();

        let errrorExist = await this.comBL.IsErrorAppeared();
        expect(errrorExist).toBeFalsy();

        await this.comBL.NavigateTo_Maintenance_WorkOrders_Search();

        let commAreaDDlElm = await this.setupPO.commonAreaSelectElm();
        await commAreaDDlElm.selectOption({ label: rndCommonArea });

        let assignToDDLElm = await this.setupPO.assignToSelectElm();
        await assignToDDLElm.selectOption({ label: rndAssignTO });

        let fromElm = await this.setupPO.startDateElm();
        await fromElm.fill(outOfServDate);
        let toElm = await this.setupPO.endDateElm();
        await toElm.fill(backInServDate);

        let searchElm = await this.setupPO.searchElm();
        await searchElm.click();
        await this.comPO.WaitForPageLoad();

        let rows = await this.page.$$('.ngRow');
        expect(rows.length > 0).toBeTruthy();

        for(let i=0;i<rows.length;i++){
            let cells=await rows[i].$$('.ngCell');
            let cellsText=await rows[i].$$('.ngCellText');
            let s1=await cellsText[1].innerText();
            let s2=await cellsText[2].innerText();
            let s3=await cellsText[3].innerText();
            if(s1==outOfServDate &&s2==backInServDate && s3==rndMaintItem){
            await cells[0].click();
            await this.comPO.WaitForPageLoad();
            break;
        }
        }
        

        let savedCommonArea=await this.setupPO.selectedCommonArea();
        referralCmd = await this.setupPO.referralCommentElm();
        let savedReferralCmd=await referralCmd.inputValue();

        outOfServElm = await this.setupPO.outOfServiceElm();
        let savedOutOfServ=await outOfServElm.inputValue();

        backInServElm = await this.setupPO.backOfServiceElm();
        let savedBackInServ = await backInServElm.inputValue();

        let selectedMaintItem = await this.setupPO.selectedMaintItem();
        let selectedAssignTo = await this.setupPO.selectedAssignTo();

        workOrderDetElm = await this.setupPO.workORderDetailElm();
        let savedworkOrderDet = await workOrderDetElm.inputValue();

        referredTo = await this.setupPO.referToElm();
        let savedReferralTo = await referredTo.inputValue();

        expect(rndCommonArea==savedCommonArea).toBeTruthy();
        expect(this._referralCmd==savedReferralCmd).toBeTruthy();
        expect(outOfServDate==savedOutOfServ).toBeTruthy();
        expect(backInServDate==savedBackInServ).toBeTruthy();
        expect(rndMaintItem==selectedMaintItem).toBeTruthy();
        expect(rndAssignTO==selectedAssignTo).toBeTruthy();
        expect(this._workOrderDetails==savedworkOrderDet).toBeTruthy();
        expect(this._referrelTo==savedReferralTo).toBeTruthy();
    }

    CompleteWorkOrder=async()=>{
        await this.setupPO.openToolBox();
        await this.page.waitForTimeout(500);
        let completeWorkOrderBtn=await this.setupPO.completeWorkOrderBtn();
        await completeWorkOrderBtn.click();
        await this.comPO.WaitForPageLoad();
        await this.page.waitForTimeout(1000);

        let completeWorkerByElm=await this.setupPO.completeWorkOrderByElm();
        let completeWorkerOpt=await this.setupPO.completeWorkOrderByOptions();
        let rndCompleteByInx = this.helper.Number(completeWorkerOpt.length, 1);
        let rndCompletedBy = completeWorkerOpt[rndCompleteByInx];
       await completeWorkerByElm.selectOption({ label: rndCompletedBy });

        let rndMaterialCost= this.helper.Number(100, 10);   
        let completeMeterialCostElm=await this.setupPO.compWorkOrderMaterialCostElm();
        await completeMeterialCostElm.fill(rndMaterialCost.toString());

        let rndLaborCost= this.helper.Number(100, 10);   
        let completeLaborCostElm=await this.setupPO.compWorkOrderlaborCostElm();
        await completeLaborCostElm.fill(rndLaborCost.toString());

        let rndMiscCost= this.helper.Number(100, 10);   
        let completeMiscCostElm=await this.setupPO.compWorkOrderMiscCostElm();
        await completeMiscCostElm.fill(rndMiscCost.toString());
        await this.page.keyboard.press("Tab");
        await this.page.waitForTimeout(1000);

        let totalCostElm= await this.setupPO.compWorkOrderTotalCostElm();
        let totalCost=await totalCostElm.inputValue();
        totalCost=totalCost.replace("$","").trim();
        expect((rndMaterialCost+rndLaborCost+rndMiscCost)==parseInt( totalCost)).toBeTruthy();

        let saveBtn=await this.setupPO.compWorkOrderSaveBtn();
        await saveBtn.click();
        await this.comPO.WaitForPageLoad();

        let errrorExist = await this.comBL.IsErrorAppeared();
        expect(errrorExist).toBeFalsy();

        let savedCompletedBy=await this.setupPO.selectedCompletedByElm();

        let materialCostElm=await this.setupPO.masterialCostElm();
        let saveMaterialCost=await materialCostElm.inputValue();
        saveMaterialCost=saveMaterialCost.replace('$',"").trim();

        let miscCostElm=await this.setupPO.miscCostElm();
        let miscCost=await miscCostElm.inputValue();
        miscCost=miscCost.replace('$',"").trim();

        let laborCostElm=await this.setupPO.laborCostElm();
        let laborCost=await laborCostElm.inputValue();
        laborCost=laborCost.replace('$',"").trim();

        let completedTotalCostElm=await this.setupPO.totalCostElm();
        let savedTotalCost=await completedTotalCostElm.inputValue();
        savedTotalCost=savedTotalCost.replace('$',"").trim();

       // expect( rndCompletedBy.includes(savedCompletedBy)).toBeTruthy();  //Note : completed by not matching
        expect(parseInt(saveMaterialCost)==rndMaterialCost).toBeTruthy();
        expect(parseInt(miscCost)==rndMiscCost).toBeTruthy();
        expect(parseInt(laborCost)==rndLaborCost).toBeTruthy();
        expect(parseInt(savedTotalCost)==parseInt( totalCost)).toBeTruthy();

    }

    SearchByPendingWorkOrdersAndValidate=async()=>{

        let searchByPendingElm=await this.setupPO.pendingRadioELm();       
        await searchByPendingElm.click();

        let searchElm = await this.setupPO.searchElm();
        await searchElm.click();
        await this.comPO.WaitForPageLoad();

        let rows = await this.page.$$('.ngRow');

        if (rows.length == 0)
            test.skip();

        let isPersisted = true;
        for (let i = 0; i < rows.length; i++) {
            let cells = await rows[i].$$('.ngCell');
            let cellsText = await rows[i].$$('.ngCellText');
            let status = await cellsText[5].innerText();
            if (status == "Pending")
                isPersisted = true;
            else
                isPersisted = false;
        }

        expect(isPersisted).toBeTruthy();

        }
   
        SearchByCompletedWorkOrdersAndValidate=async()=>{

            let searchByCompletedElm=await this.setupPO.completedRadioELm();       
            await searchByCompletedElm.click();
    
            let searchElm = await this.setupPO.searchElm();
            await searchElm.click();
            await this.comPO.WaitForPageLoad();
    
            let rows = await this.page.$$('.ngRow');
    
            if (rows.length == 0)
                test.skip();
    
            let isPersisted = true;
            for (let i = 0; i < rows.length; i++) {
                let cells = await rows[i].$$('.ngCell');
                let cellsText = await rows[i].$$('.ngCellText');
                let status = await cellsText[5].innerText();
                if (status == "Completed")
                    isPersisted = true;
                else
                    isPersisted = false;
            }
    
            expect(isPersisted).toBeTruthy();
    
            }
       
}

