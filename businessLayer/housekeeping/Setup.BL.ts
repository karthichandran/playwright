import CommanPage from '../../pages/common/Common.page';
import CommonBL from '../common/Common.BL';
import { Page } from "playwright";
import test, { expect } from '@playwright/test';
import HousekeepingSetupPage from '../../pages/housekeeping/Setup.page';
import RandomHelper from '../util/Helper';
const _moment = require('moment');

export default class HousekeepingSetupBL {
    private page: Page;
    private comPO: CommanPage;
    private comBL: CommonBL;
    private setupPO: HousekeepingSetupPage;
    private helper: RandomHelper;
    constructor(page: Page) {
        this.page = page;
        this.comPO = new CommanPage(page);
        this.comBL = new CommonBL(page);
        this.setupPO = new HousekeepingSetupPage(page);
        this.helper = new RandomHelper();
    }


    AddNewSectionAndValidate=async ()=>{

        let sectionAddBtn=await this.setupPO.sectionAddBtn();
        await sectionAddBtn.click();
        await this.page.waitForTimeout(1000);

        let sectionGrid=await this.setupPO.sectionGridElm();
        let rows=await sectionGrid.$$('.ngRow');
        let cells=await rows[0].$$('.ngCell');
        let rndCode=this.helper.TwoLetters();       

        let itrate = 1;
        let isCodeAccepted=false;
        do {
            await cells[0].click();
            await this.page.waitForTimeout(500);
            let cell0 = await cells[0].$('.form-control');
            await cell0.fill(rndCode);
            await this.page.keyboard.press("Tab");
            let error = await this.comPO.GetErrorMessage();
            if (error != null) {
                if (error.includes("No duplicates allowed.")) {
                    rndCode = this.helper.TwoLetters();
                }
            }
            else{
                isCodeAccepted=true;
                break;
            }
        }
        while (itrate <= 3)

        if (!isCodeAccepted)
            test.skip();

        await cells[1].click();
        await this.page.waitForTimeout(500);
        let cell1=await cells[1].$('.form-control');
        await cell1.fill(rndCode);
       
        let saveSectionElm=await this.setupPO.sectionSaveBtn();
        await saveSectionElm.click();
        await this.comPO.WaitForPageLoad();

        let errrorExist = await this.comBL.IsErrorAppeared();
        expect(errrorExist).toBeFalsy();

        await this.page.reload();
        await this.page.waitForTimeout(1000);
        await this.comPO.WaitForPageLoad();
        sectionGrid=await this.setupPO.sectionGridElm();
        rows=await this.comBL.ScrollToRecord(sectionGrid,0,rndCode);
        expect(rows!=null).toBeTruthy();

        return rndCode;
    }

    DeleteSection=async(rndCode)=>{
        let sectionGrid=await this.setupPO.sectionGridElm();
        let row=await this.comBL.ScrollToRecord(sectionGrid,0,rndCode);
        let cells=await row.$$('.ngCell');
        let removeBtn=await cells[2].$('.icon-remove-sign');
        await removeBtn.click();
        await this.comPO.WaitForPageLoad();
        let errrorExist = await this.comBL.IsErrorAppeared();
        expect(errrorExist).toBeFalsy();

    }

    AddDuplicateSectionAndValidate=async()=>{
        let sectionGrid=await this.setupPO.sectionGridElm();
        let rows=await sectionGrid.$$('.ngRow');
        let cells=await rows[0].$$('.ngCellText');
        let rndCode=await cells[0].innerText();

        let sectionAddBtn=await this.setupPO.sectionAddBtn();
        await sectionAddBtn.click();
        await this.page.waitForTimeout(1000);

         sectionGrid=await this.setupPO.sectionGridElm();
         rows=await sectionGrid.$$('.ngRow');
         cells=await rows[0].$$('.ngCell');

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
    DeleteSectionThatAlreadyReferenced=async()=>{

        let roomsGrid = await this.setupPO.roomsGridElm();
        let roomRows = await roomsGrid.$$('.ngRow');
        let sec="";
        for (var r of roomRows) {
            let cols = await r.$$('.ngCellText');
             sec=await cols[1].innerText();
            if(sec!="")
            break;
        }

        if(sec=="")
        test.skip();

        let sectionGrid=await this.setupPO.sectionGridElm();
        let row=await this.comBL.ScrollToRecord(sectionGrid,1,sec);
        let cells=await row.$$('.ngCell');
        let removeBtn=await cells[2].$('.icon-remove-sign');
        await removeBtn.click();
        await this.comPO.WaitForPageLoad();
        let errrorExist = await this.comBL.IsErrorAppeared();
        expect(errrorExist).toBeTruthy();

    }

    AssingSectionToRoom=async()=>{
        let roomsGrid = await this.setupPO.roomsGridElm();
        let roomRows = await roomsGrid.$$('.ngRow');

        let cols = await roomRows[1].$$('.ngCellText');
        let sec = await cols[1].innerText();

        let cells = await roomRows[1].$$('.ngCell');
        await cells[1].click();
        await this.page.waitForTimeout(500);
        let selection = await cells[1].$('.form-control');
        let options = await selection.$$eval('option', e => e.map(e => e.textContent));

        let newSection="";
        for(var i=0;i<options.length;i++){
            if(options[i]==sec)
            {
                if(i>2)
                newSection=options[i-1];
                else 
                newSection=options[i+1];
                break;
            }
        }

       await selection.selectOption({label:newSection});

       let saveBtn=await cells[2].$('.glyphicon-floppy-disk');
       await saveBtn.click();
       await this.comPO.WaitForPageLoad();
       let errrorExist = await this.comBL.IsErrorAppeared();
       expect(errrorExist).toBeFalsy();

    }


    //Supply Usage

    AddSupplyItemAndValidate=async()=>{
        
        let itemGrid=await this.setupPO.supplyItemGridElm();
        let headerRow=await itemGrid.$$('.ngHeaderText');
        await headerRow[0].click();
        await headerRow[0].click();

        let rows=await itemGrid.$$('.ngRow');
        let cells=await rows[0].$$('.ngCell');

        let rndNo = this.helper.Number(9999, 1000);
        let itemName="item-"+rndNo;

        await cells[0].click();      
        await this.page.waitForTimeout(500);
        let cell0=await cells[0].$('.form-control');
        await cell0.fill(itemName);

        await cells[1].click();      
        await this.page.waitForTimeout(500);
        let cell1=await cells[1].$('.form-control');
        await cell1.fill(itemName);

        await cells[2].click();      
        await this.page.waitForTimeout(500);
        let cell2=await cells[2].$('.form-control');
        await cell2.fill("24");
        await this.page.keyboard.press("Tab");
        await this.page.waitForTimeout(500);

        let saveSectionElm=await this.setupPO.supplyItemSaveBtn();
        await saveSectionElm.click();
        await this.comPO.WaitForPageLoad();

        let errrorExist = await this.comBL.IsErrorAppeared();
        expect(errrorExist).toBeFalsy();

        await this.page.reload();
        await this.page.waitForTimeout(1000);
        await this.comPO.WaitForPageLoad();
        itemGrid=await this.setupPO.supplyItemGridElm();
        rows=await this.comBL.ScrollToRecord(itemGrid,0,itemName);
        expect(rows!=null).toBeTruthy();
       
        return itemName;
    }

    DeleteSupplyItem=async(item)=>{
        let itemGrid=await this.setupPO.supplyItemGridElm();
        let row=await this.comBL.ScrollToRecord(itemGrid,0,item);
        let cells=await row.$$('.ngCell');
        let removeBtn=await cells[3].$('.icon-remove-sign');
        await removeBtn.click();
        await this.comPO.WaitForPageLoad();
        let errrorExist = await this.comBL.IsErrorAppeared();
        expect(errrorExist).toBeFalsy();
    }

    AddDuplicateSupplyItemAndValidate=async()=>{
        let itemGrid=await this.setupPO.supplyItemGridElm();
        let rows=await itemGrid.$$('.ngRow');
        let cells=await rows[0].$$('.ngCellText');
        let rndCode=await cells[0].innerText();

        let headerRow=await itemGrid.$$('.ngHeaderText');
        await headerRow[0].click();
        await headerRow[0].click();

        itemGrid=await this.setupPO.supplyItemGridElm();
         rows=await itemGrid.$$('.ngRow');
         cells=await rows[0].$$('.ngCell');

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

    AssignItemToRoomTypeAndValidate=async()=>{
        let itemGrid=await this.setupPO.supplyItemGridElm();
        let rows=await itemGrid.$$('.ngRow');
        let cells=await rows[0].$$('.ngCell');

        await cells[0].click();
        await this.comPO.WaitForPageLoad();

        let roomTypeGrid=await this.setupPO.supplyRoomTypeGridElm();
        let roomTypeRows=await roomTypeGrid.$$('.ngRow');
        let roomTypeCells=await roomTypeRows[0].$$('.ngCell');
        let rndNo = this.helper.Number(99, 10);

        await roomTypeCells[1].click();      
        await this.page.waitForTimeout(500);
        let cell1=await roomTypeCells[1].$('.form-control');
        await cell1.fill(rndNo.toString());

        await roomTypeCells[2].click();      
        await this.page.waitForTimeout(500);
        let cell2=await roomTypeCells[2].$('.form-control');
        await cell2.fill((rndNo+1).toString());
        await this.page.keyboard.press("Tab");
        await this.page.waitForTimeout(200);

        let saveSectionElm=await this.setupPO.supplyRoomTypeBtn();
        await saveSectionElm.click();
        await this.comPO.WaitForPageLoad();

        let errrorExist = await this.comBL.IsErrorAppeared();
        expect(errrorExist).toBeFalsy();

        await this.page.reload();
        await this.page.waitForTimeout(1000);
        await this.comPO.WaitForPageLoad();

        itemGrid=await this.setupPO.supplyItemGridElm();
        rows=await itemGrid.$$('.ngRow');
        cells=await rows[0].$$('.ngCell');

        await cells[0].click();
        await this.comPO.WaitForPageLoad();

         roomTypeGrid=await this.setupPO.supplyRoomTypeGridElm();
         roomTypeRows=await roomTypeGrid.$$('.ngRow');
         roomTypeCells=await roomTypeRows[0].$$('.ngCellText');

         let make=await roomTypeCells[1].innerText();
         let change=await roomTypeCells[2].innerText();

         expect(make==rndNo.toString()).toBeTruthy();
         expect(change==(rndNo+1).toString()).toBeTruthy();
    }

    //Time Allotment

    UpdateMinimumMakeAndChangeValueAndValidate=async()=>{
       
        let grid=await this.setupPO.timealotmentGridElm();
        let rows=await grid.$$('.ngRow');
        let rowsCount=await rows.length;
        let rndNo = this.helper.Number(rowsCount-1, 0);

       let cells=await rows[rndNo].$$('.ngCell');

       await cells[1].click();      
       await this.page.waitForTimeout(500);
       let cell1=await cells[1].$('.form-control');
       await cell1.fill(rndNo.toString());

       await cells[2].click();      
       await this.page.waitForTimeout(500);
       let cell2=await cells[2].$('.form-control');
       await cell2.fill((rndNo+1).toString());
       await this.page.keyboard.press("Tab");
       await this.page.waitForTimeout(200);

       let saveBtn=await cells[3].$('.glyphicon-floppy-disk');
       await saveBtn.click();
       await this.comPO.WaitForPageLoad();
       let errrorExist = await this.comBL.IsErrorAppeared();
       expect(errrorExist).toBeFalsy();

       await this.page.reload();
       await this.page.waitForTimeout(1000);
       await this.comPO.WaitForPageLoad();

       grid=await this.setupPO.timealotmentGridElm();
       rows=await grid.$$('.ngRow');      

       cells=await rows[rndNo].$$('.ngCellText');

       let make=await cells[1].innerText();
       let change=await cells[2].innerText();

       expect(make==rndNo.toString()).toBeTruthy();
       expect(change==(rndNo+1).toString()).toBeTruthy();
    }

    UpdateScheduledService=async()=>{
        let grid=await this.setupPO.timealotmentGridElm();
        let rows=await grid.$$('.ngRow');
        let rowsCount=await rows.length;
        let rndNo = this.helper.Number(rowsCount-1, 0);

       let cells=await rows[rndNo].$$('.ngCell');

       await cells[0].click();      
       await this.page.waitForTimeout(1000);

       let dailySvcSelction=await this.setupPO.dailyServiceElm();
       let dailySvcOpts=await this.setupPO.dailyServiceOptionsElm();
       let rndDailySvcOpt=this.helper.Number(dailySvcOpts.length-1, 0);
       let selectingDailySvc=dailySvcOpts[rndDailySvcOpt];
       await dailySvcSelction.selectOption({label:selectingDailySvc});

       let weeklySvcOption=await this.setupPO.weeklyServiceOptionsElm();
       //day1
       let day1Selection=await this.setupPO.day1Elm();
       let rndDaySvcNo=this.helper.Number(2, 0);
       let selectingDay1Svc=weeklySvcOption[rndDaySvcNo];
       await day1Selection.selectOption({label:selectingDay1Svc});

        //day2
        let day2Selection=await this.setupPO.day2Elm();
         rndDaySvcNo=this.helper.Number(2, 0);
        let selectingDay2Svc=weeklySvcOption[rndDaySvcNo];
        await day2Selection.selectOption({label:selectingDay2Svc});

         //day3
         let day3Selection=await this.setupPO.day3Elm();
         rndDaySvcNo=this.helper.Number(2, 0);
        let selectingDay3Svc=weeklySvcOption[rndDaySvcNo];
        await day3Selection.selectOption({label:selectingDay3Svc});

        //day4
        let day4Selection=await this.setupPO.day4Elm();
        rndDaySvcNo=this.helper.Number(2, 0);
       let selectingDay4Svc=weeklySvcOption[rndDaySvcNo];
       await day4Selection.selectOption({label:selectingDay4Svc});

         //day5
         let day5Selection=await this.setupPO.day5Elm();
         rndDaySvcNo=this.helper.Number(2, 0);
        let selectingDay5Svc=weeklySvcOption[rndDaySvcNo];
        await day5Selection.selectOption({label:selectingDay5Svc});
         //day6
         let day6Selection=await this.setupPO.day6Elm();
         rndDaySvcNo=this.helper.Number(2, 0);
        let selectingDay6Svc=weeklySvcOption[rndDaySvcNo];
        await day6Selection.selectOption({label:selectingDay6Svc});
         //day6
         let day7Selection=await this.setupPO.day7Elm();
         rndDaySvcNo=this.helper.Number(2, 0);
        let selectingDay7Svc=weeklySvcOption[rndDaySvcNo];
        await day7Selection.selectOption({label:selectingDay7Svc});

        let saveBtn=await this.setupPO.timeAllotmentSaveBtn();
        await saveBtn.click();
        await this.comPO.WaitForPageLoad();
        let errrorExist = await this.comBL.IsErrorAppeared();
        expect(errrorExist).toBeFalsy();
 
        await this.page.reload();
        await this.page.waitForTimeout(1000);
        await this.comPO.WaitForPageLoad();

         grid=await this.setupPO.timealotmentGridElm();
         rows=await grid.$$('.ngRow');
         rowsCount=await rows.length;     

        cells=await rows[rndNo].$$('.ngCell');

       await cells[0].click();      
       await this.page.waitForTimeout(1000);


       let selectedDailySvcOpt=await this.setupPO.dailyServiceSelectedText();
       let selectedDay1Opt=await this.setupPO.day1SelectedText();
       let selectedDay2Opt=await this.setupPO.day2SelectedText();
       let selectedDay3Opt=await this.setupPO.day3SelectedText();
       let selectedDay4Opt=await this.setupPO.day4SelectedText();
       let selectedDay5Opt=await this.setupPO.day5SelectedText();
       let selectedDay6Opt=await this.setupPO.day6SelectedText();
       let selectedDay7Opt=await this.setupPO.day7SelectedText();

       expect(selectedDailySvcOpt==selectingDailySvc).toBeTruthy();
       expect(selectedDay1Opt==selectingDay1Svc).toBeTruthy();
       expect(selectedDay2Opt==selectingDay2Svc).toBeTruthy();
       expect(selectedDay3Opt==selectingDay3Svc).toBeTruthy();
       expect(selectedDay4Opt==selectingDay4Svc).toBeTruthy();
       expect(selectedDay5Opt==selectingDay5Svc).toBeTruthy();
       expect(selectedDay6Opt==selectingDay6Svc).toBeTruthy();
       expect(selectedDay7Opt==selectingDay7Svc).toBeTruthy();

    }
}