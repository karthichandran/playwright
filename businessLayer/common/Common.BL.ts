
import CommanPage from '../../pages/common/Common.page';
import { Page } from "playwright";
import * as configDate from '../../configDate.json';
const _moment = require('moment');
export default class CommonBL {
    private page: Page;
    private comPO: CommanPage;
    constructor(page: Page) {
        this.page = page;
        this.comPO = new CommanPage(page);
    }

    NavigateTo = async (superMenu: string, primaryMenu: string, subMenu: string) => {
        let activeMEnu=await (await this.page.$('.menuselect')).innerText();
        if (activeMEnu != superMenu) {
            await (await this.comPO.SuperMenuDDLElm()).click();
            await this.page.waitForTimeout(500);
            await (await this.comPO.superMenuelm(superMenu)).click();
            await this.page.waitForTimeout(1000);
        }
        await (await this.comPO.PrimaryMenu(primaryMenu)).click();
        await this.page.waitForTimeout(1000);
        if(subMenu!="")
        await (await this.comPO.SecondaryMenu(subMenu)).click();
        await this.page.waitForTimeout(1000);
        await this.page.waitForLoadState("networkidle");
        await this.page.waitForTimeout(1000);
        await this.comPO.WaitForPageLoad();
    }
    
    //Front office
    NavigateToAddReservation = async () => {
        await this.NavigateTo("Front Office", "Reservations", " Add Res ");
    }
    NavigateToGroup = async () => {
        await this.NavigateTo("Front Office", "Group", " Add Group ");
    }

    NavigateToAvailability = async () => {
        await this.NavigateTo("Front Office", "Reservations", " Availability ");        
    }
    NavigateToResSearch = async () => {
        await this.NavigateTo("Front Office", "Reservations", " Search ");        
    }
    NavigateToSupervisorSepcialReq= async () => {
        await this.NavigateTo("Front Office", "Supervisor", " Special Request ");        
    }
    NavigateToPBX_guest= async () => {
        await this.NavigateTo("Front Office", "PBX", " Guest ");        
    }
    NavigateToPBX_arrivals= async () => {
        await this.NavigateTo("Front Office", "PBX", " Arrivals ");        
    }
    NavigateToCashieringGuestAccount=async()=>{
        await this.NavigateTo("Front Office", "Cashiering", " Guest Account "); 
    }
    NavigateToCashieringGroupAccount=async()=>{
        await this.NavigateTo("Front Office", "Cashiering", " Group Account "); 
    }
    NavigateToCashieringHouseAccount=async()=>{
        await this.NavigateTo("Front Office", "Cashiering", " House Account "); 
    }

    NavigateToBookRes = async () => {
        await this.NavigateTo("Front Office", "Reservations", " Book RES ");        
    }

    //Accounting

    NavigateToNightAudit= async () => {
        await this.NavigateTo("Accounting", "Night Audit", " Run Audit ");        
    }

    //Saels and Marketing
    NavigateTo_SalesAndMarketing_Setup= async () => {
        await this.NavigateTo("Sales & Marketing", "Setup", "");        
    }

    NavigateTo_SalesAndMarketing_Company= async () => {
        await this.NavigateTo("Sales & Marketing", "Company", " Company ");        
    }

    NavigateTo_SalesAndMarketing_Company_Search= async () => {
        await this.NavigateTo("Sales & Marketing", "Company", " Search ");        
    }

    NavigateTo_SalesAndMarketing_Guest_Setup= async () => {
        await this.NavigateTo("Sales & Marketing", "Guest Profiler", " Setup ");        
    }

    NavigateTo_SalesAndMarketing_GuestProfiler_GuestProfiler= async () => {
        await this.NavigateTo("Sales & Marketing", "Guest Profiler", " Guest Profiler ");        
    }

    NavigateTo_SalesAndMarketing_GuestProfiler_Searcj= async () => {
        await this.NavigateTo("Sales & Marketing", "Guest Profiler", " Search ");        
    }

    NavigateTo_SalesAndMarketing_marketing_Guest= async () => {
        await this.NavigateTo("Sales & Marketing", "Marketing", " Guest ");        
    }
    
    NavigateTo_SalesAndMarketing_CityLedger= async () => {
        await this.NavigateTo("Sales & Marketing", "City Ledger", "");        
    }


    //Housekeeping
    NavigateTo_Housekeeping_Setup_Sections= async () => {
        await this.NavigateTo("Housekeeping", "Setup"," Housekeeping Sections ");        
    }

    NavigateTo_Housekeeping_Setup_SupplyItem= async () => {
        await this.NavigateTo("Housekeeping", "Setup"," Supply Usage ");        
    }
    
    NavigateTo_Housekeeping_Setup_TimeAllotment= async () => {
        await this.NavigateTo("Housekeeping", "Setup"," Time Allotment ");        
    }

    NavigateTo_Housekeeping_RoomAssignment= async () => {
        await this.NavigateTo("Housekeeping", "Room Assign"," Room Assignment ");        
    }


    //Maintenance
    NavigateTo_Maintenance_Setup_Maintenance= async () => {
        await this.NavigateTo("Maintenance", "Setup"," Maintenance ");        
    }

    NavigateTo_Maintenance_Setup_AssignPreventativeItem= async () => {
        await this.NavigateTo("Maintenance", "Setup"," Assign Preventative Item ");        
    }

    NavigateTo_Maintenance_WorkOrders_Search= async () => {
        await this.NavigateTo("Maintenance", "Work Orders"," Search ");        
    }

    NavigateTo_Maintenance_Setup_WarrantyItem= async () => {
        await this.NavigateTo("Maintenance", "Setup"," Warranty Items ");        
    }

    NavigateTo_Maintenance_WorkOrders_NewWorkOrder= async () => {
        await this.NavigateTo("Maintenance", "Work Orders"," New Work Order ");        
    }


    // navigatesearch=async()=>{          
    //    await this.page.waitForFunction(() => document.location.href = '#/front-office/reservations/search');     
    //     await this.page.waitForTimeout(1000);
    //     await this.page.waitForLoadState("networkidle");
    //     await this.page.waitForTimeout(1000);
    //     await this.comPO.WaitForPageLoad();
    // }

  

    GetAuditDate = async () => {
        let auditDate = await (await this.comPO.AuditDateElm()).innerText();
        var dateSplit = auditDate.split('/');
        var month = dateSplit[0];
        var day = dateSplit[1];
        var year = dateSplit[2];
        var dateObj = _moment(auditDate, 'MM/DD/YY')
        return auditDate;
    }

    GetAuditDateAsDate = async () => {
        let auditDate = await (await this.comPO.AuditDateElm()).innerText();
        var dateObj = _moment(auditDate, 'MM/DD/YY')
        return dateObj;
    }

    GetDateFromstring = async (date) => {
        var dateObj = _moment(date, 'MM/DD/YY');
        return dateObj;
    }

    HandleOverridePasswordForClosedArrival = async () => {
        let modelTitle = await this.comPO.IsModelPopupExist();
        if (modelTitle != null) {
            if (modelTitle.includes('This arrival date is Closed to Arrival!')) {
                let inputElm = await this.comPO.overridePwdInputElm();
                await inputElm.fill("ok");
                let okButton= await this.comPO.overridePwdOKbuttonElm();
                await okButton.click();
            }
            await this.comPO.WaitForPageLoad();
        }
    }

    IsErrorAppeared=async()=>{
        let error= await this.comPO.IsErrorMessageExist();
        return error;
    }

    GetcreditCardNumber=(type: string)=> {
        switch (type) {
            case "AMEX":
                return configDate.IsTokenBasePayment ? configDate.TokenBasedCards.AmericanExpress : configDate.NumberBasedCards.AmericanExpress;
                break;
            case "DINERS":
                return configDate.IsTokenBasePayment ? configDate.TokenBasedCards.MasterCard : configDate.NumberBasedCards.MasterCard;
                break;
            case "DISCOVER":
                return configDate.IsTokenBasePayment ? configDate.TokenBasedCards.Discover : configDate.NumberBasedCards.Discover;
                break;
            case "VISA":
                return configDate.IsTokenBasePayment ? configDate.TokenBasedCards.Visa : configDate.NumberBasedCards.Visa;
                break;
                default:
                    return null;
        }

    }
    HandleCreditPardPayment = async (type) => {
        let cardNum = this.GetcreditCardNumber(type);
        let cardNoElm = await this.comPO.cardNumberElm();
        let isEmpty=await cardNoElm.inputValue();
        if(isEmpty!=null|| isEmpty!=""){
            await (await this.comPO.creditCardClearBtn()).click();
            await this.comPO.WaitForPageLoad();

        }
        await cardNoElm.fill(cardNum);
        let expDateElm=await this.comPO.expDateElm();
        await expDateElm.fill(configDate.Expiry);
        let voiceAuthBtn=await this.comPO.voviceAuthorizationBtn();
        await voiceAuthBtn.click();
        let voiceAuthInput=await this.comPO.authCodeElm();
        await voiceAuthInput.fill("123456");
        let authBtn=await this.comPO.authorizationBtn();
        await authBtn.click();
        await this.comPO.WaitForPageLoad();
        let okBtn=await this.comPO.creditCardOkBtn();
        await okBtn.click();
        await this.comPO.WaitForPageLoad();

        let error=await this.comPO.IsErrorMessageExist();
        return !error;       
        
    }

    ScrollToRecord=async(grid,colInx,item)=>{
        var isScrollable:boolean=false;
        let isExist: boolean = false;
        do{
        let gridRows = await grid.$$('.ngRow');
       let rowCount=await gridRows.length;
        
       let lastText="";
        for (const elem of gridRows) {
            const cells = await elem.$$('.ngCellText');
            lastText = await (await cells[colInx].$('span')).innerText();
            if (lastText == item) {
               return elem;
            }
        };
        // if(isExist){
        //     return true;
        // }       
    
        let lastRow=await gridRows[rowCount-1];
        let cell0=await( await lastRow.$$('.ngCellText'))[0];
        await cell0.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(100); 
        gridRows = await grid.$$('.ngRow');
         lastRow=await gridRows[rowCount-1];
         cell0=await( await lastRow.$$('.ngCellText'))[0];
         let txt=await( await cell0.$('span')).innerText();
         if(txt==lastText)
         isScrollable=false;
         else
         isScrollable=true;
    }while(isScrollable);
return null;
    }
}