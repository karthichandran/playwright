import { Page } from "playwright";
import CommanPage from '../common/Common.page';

export default class MaintenancePage {
    private page: Page;
    private comPO: CommanPage;
    constructor(page: Page) {
        this.page = page;
        this.comPO = new CommanPage(page);
    }

    // setup -> maintenance
    commonAreaGrid = async () =>await this.page.$('div[data-ng-grid="maintSetupMaintenance.commonAreaGridProperties"]');
    workOrderItemGrid = async () =>await this.page.$('div[data-ng-grid="maintSetupMaintenance.WorkOrderItemGridProperties"]');
    preventativeMaintItemGrid = async () =>await this.page.$('div[data-ng-grid="maintSetupMaintenance.PreventativeItemGridProperties"]');
 
     // setup -> assign preventative item
    roomTypeGrid = async () =>await this.page.$('div[data-ng-grid="maintSetupAssignPreventative.RoomTypeConfigCommonAreaServiceGridProperties"]');
    preventativeItemAssignGird = async () =>await this.page.$('div[data-ng-grid="maintSetupAssignPreventative.PreventativeAssignmentPreventativeItemGridProperties"]');

    preventativeItemAssignSaveBtn = async () =>await this.page.$('button[data-ng-repeat="model in maintSetupAssignPreventative.PreventativeAssignmentPreventativeItemGridProperties.headerButtonDefs"]');
    
     // setup ->warranty Items
    warrantyItemGird = async () =>await this.page.$('div[data-ng-grid="maintSetupWarranty.warrantyItemGridOptions"]');
    newWarrantyItemBtn = async () =>{
       let btn= await this.page.$$('button[data-ng-repeat="model in maintSetupWarranty.warrantyItemGridOptions.headerButtonDefs"]');
       return btn[0];
    }
    removeWarrantyItemBtn = async () =>{
        let btn= await this.page.$$('button[data-ng-repeat="model in maintSetupWarranty.warrantyItemGridOptions.headerButtonDefs"]');
        return btn[1];
     }
    saveWarrantyItemBtn = async () =>await this.page.$('button[data-ng-click="maintSetupWarranty.saveAllWarrantyItems()"]');


    //work orders -> Search   
    allRadioELm=async ()=>(await this.page.$$('input[data-ng-model="workOrderSearch.data.searchBy"]'))[0];
    pendingRadioELm=async ()=>(await this.page.$$('input[data-ng-model="workOrderSearch.data.searchBy"]'))[1];
    completedRadioELm=async ()=>(await this.page.$$('input[data-ng-model="workOrderSearch.data.searchBy"]'))[2];
    woRoomNoSelectElm=async ()=>await this.page.$('select[data-ng-model="workOrderSearch.data.roomId"]');
    commonAreaSelectElm=async ()=>await this.page.$('select[data-ng-model="workOrderSearch.data.commonArea"]');
    assignToSelectElm=async ()=>await this.page.$('select[data-ng-model="workOrderSearch.data.assignedTo"]');
    startDateElm=async ()=>await this.page.$('input[data-ng-model="workOrderSearch.data.startDate"]');
    endDateElm=async ()=>await this.page.$('input[data-ng-model="workOrderSearch.data.endDate"]');
    searchElm=async ()=>await this.page.$('button[data-ng-click="workOrderSearch.search()"]');
    workOrderGrid = async () =>await this.page.$('div[data-ng-grid="workOrderSearch.gridOptions"]');

    //work orders -> new work order
    roomDDlElm=async ()=>await this.page.$('select[data-ng-model="maintWorkOrders.data.roomId"]');
    roomDDlOptionsText=async ()=>await this.page.$$eval('select[data-ng-model="maintWorkOrders.data.roomId"]>option',e => e.map(e => e.textContent));
    selectedRoomNoElm=async ()=>await this.comPO.getSelectedTextFromDDL('select[data-ng-model="maintWorkOrders.data.roomId"]');
    
    outOfServiceElm=async ()=>await this.page.$('input[data-ng-model="maintWorkOrders.data.outOfServiceDate"]');
    referToElm=async ()=>await this.page.$('input[data-ng-model="maintWorkOrders.data.referredTo"]');
    
    commonAreaDDlElm=async ()=>await this.page.$('select[data-ng-model="maintWorkOrders.data.commonAreaCodeId"]');
    commonAreaOptionsText=async ()=>await this.page.$$eval('select[data-ng-model="maintWorkOrders.data.commonAreaCodeId"]>option',e => e.map(e => e.textContent));

    selectedCommonArea=async ()=>await this.comPO.getSelectedTextFromDDL('select[data-ng-model="maintWorkOrders.data.commonAreaCodeId"]');
    backOfServiceElm=async ()=>await this.page.$('input[data-ng-model="maintWorkOrders.data.backInServiceDate"]');
   
    maintItemDDlElm=async ()=>await this.page.$('select[data-ng-model="maintWorkOrders.data.maintItemId"]');
    maintItemDDlOptionElm=async ()=>await this.page.$$eval('select[data-ng-model="maintWorkOrders.data.maintItemId"]>option',e => e.map(e => e.textContent));
    selectedMaintItem=async ()=>await this.comPO.getSelectedTextFromDDL('select[data-ng-model="maintWorkOrders.data.maintItemId"]');
   
    assignToDDlElm=async ()=>await this.page.$('select[data-ng-model="maintWorkOrders.data.assignedToId"]');
    assignToDDlOptions=async ()=>await this.page.$$eval('select[data-ng-model="maintWorkOrders.data.assignedToId"]>option',e => e.map(e => e.textContent));
    selectedAssignTo=async ()=>await this.comPO.getSelectedTextFromDDL('select[data-ng-model="maintWorkOrders.data.assignedToId"]');
   
    referralCommentElm=async ()=>await this.page.$('textarea[data-ng-model="maintWorkOrders.data.referralComment"]');
    workORderDetailElm=async ()=>await this.page.$('textarea[data-ng-model="maintWorkOrders.data.workOrderDetail"]');
    dateReportedElm=async ()=>await this.page.$('input[data-ng-model="maintWorkOrders.data.reportedDate"]');
    completedByElm=async ()=>await this.page.$('select[data-ng-model="maintWorkOrders.data.completedById"]');
    selectedCompletedByElm=async ()=>await this.comPO.getSelectedTextFromDDL('select[data-ng-model="maintWorkOrders.data.completedById"]');
    miscCostElm=async ()=>await this.page.$('input[data-ng-model="maintWorkOrders.data.miscCost"]');
    reportedByElm=async ()=>await this.page.$('select[data-ng-model="maintWorkOrders.data.reportedById"]');
    selectedreportedBy=async ()=>await this.comPO.getSelectedTextFromDDL('select[data-ng-model="maintWorkOrders.data.reportedById"]');
    masterialCostElm=async ()=>await this.page.$('input[data-ng-model="maintWorkOrders.data.materialCost"]');
    totalCostElm=async ()=>await this.page.$('input[data-ng-model="maintWorkOrders.data.totalCost"]');
    dateCompletedElm=async ()=>await this.page.$('input[data-ng-model="maintWorkOrders.data.completedDate"]');
    laborCostElm=async ()=>await this.page.$('input[data-ng-model="maintWorkOrders.data.laborCost"]');
    workOrderSaveBtn=async ()=>await this.page.$('button[data-ng-click="maintWorkOrders.create();"]');
    workOrderdeleteBtn=async ()=>await this.page.$('button[data-ng-click="maintWorkOrders.cancel();"]');

    openToolBox=async()=>{ 
        let toolBox=await this.page.$('.right-menu-box');
        await toolBox.hover({ force: true, position: { x: 3, y: 3 } });        
    }

    completeWorkOrderBtn=async ()=>await this.page.$('div[data-ng-click="maintWorkOrders.completeWorkorder();"]');
    completeWorkOrderByElm=async ()=> await this.page.$('select[data-ng-model="completeWorkOrder.data.completedById"]');
    completeWorkOrderByOptions=async ()=>await this.page.$$eval('select[data-ng-model="completeWorkOrder.data.completedById"]>option',e => e.map(e => e.textContent));
    selectedcompleteWorkOrderBy=async ()=>await this.comPO.getSelectedTextFromDDL('select[data-ng-model="completeWorkOrder.data.completedById"]');

    compWorkOrderlaborCostElm=async ()=>await this.page.$('input[data-ng-model="completeWorkOrder.data.laborCost"]');
    compWorkOrderMaterialCostElm=async ()=>await this.page.$('input[data-ng-model="completeWorkOrder.data.materialCost"]');
    compWorkOrderMiscCostElm=async ()=>await this.page.$('input[data-ng-model="completeWorkOrder.data.miscCost"]');
    compWorkOrderTotalCostElm=async ()=>await this.page.$('input[data-ng-model="completeWorkOrder.data.totalCost"]');
    compWorkOrderSaveBtn=async ()=>await this.page.$('button[data-ng-click="completeWorkOrder.save()"]');
    compWorkOrderCancelBtn=async ()=>await this.page.$('button[data-ng-click="completeWorkOrder.Cancel()"]');
}
