import CommanPage from '../../pages/common/common.page';
import CommonBL from '../common/common.BL';
import { Page } from "playwright";
import  { expect } from '@playwright/test';
import SalesAndMarketingSetupPage from '../../pages/salesAndMarketing/Setup.page';
import RandomHelper from '../../businessLayer/util/helper';

export default class SalesAndMarketingBL {
    private page: Page;
    private comPO: CommanPage;
    private comBL: CommonBL;
    private setupPO: SalesAndMarketingSetupPage;
    private helper:RandomHelper;
    constructor(page: Page) {
        this.page = page;
        this.comPO = new CommanPage(page);
        this.comBL = new CommonBL(page);
        this.setupPO = new SalesAndMarketingSetupPage(page); 
        this.helper=new RandomHelper();     
    }

    AddCompanyCategoryCodeAndValidate=async()=>{
        let companyGrid=await this.setupPO.companyCategorygrid();

        let headerCells=await companyGrid.$$('.ngHeaderText');
        await headerCells[0].dblclick();

        let rows=await companyGrid.$$('.ngRow');

        let cells=await rows[0].$$('.ngCell');

        let rndNo = this.helper.Number(999, 100);
        let companyCategoryCodesCode = "CCC-" + rndNo;

        await cells[0].click();
        await this.page.waitForTimeout(100);
        let input=await cells[0].$('.form-control');
        await input.fill(companyCategoryCodesCode);

        await cells[1].click();
        await this.page.waitForTimeout(100);
        let desc=await cells[1].$('.form-control');
        await desc.fill(companyCategoryCodesCode);

        await this.page.keyboard.press("Tab");
        await this.page.waitForTimeout(1000);
        let  saveBtn=await cells[2].$('.glyphicon-floppy-disk');
        await saveBtn.click();

        await this.comPO.WaitForPageLoad();
        await this.page.reload();
        await this.page.waitForTimeout(2000);
        await this.comPO.WaitForPageLoad();
        
        companyGrid = await this.setupPO.companyCategorygrid();
        rows = await companyGrid.$$('.ngRow');
        cells = await rows[0].$$('.ngCell');

      let row=await this.comBL.ScrollToRecord(companyGrid,0,companyCategoryCodesCode);

      expect(row!=null).toBeTruthy();
      cells = await row.$$('.ngCellText');

      let cell0Text=await cells[0].innerText();
      let cell1Text=await cells[1].innerText();

        expect(cell0Text == companyCategoryCodesCode).toBeTruthy();
        expect(cell1Text == companyCategoryCodesCode).toBeTruthy();
        cells = await row.$$('.ngCell');
        let removeBrn = await cells[2].$('.icon-remove-sign');
        if (removeBrn != null) {
            await removeBrn.click();
            await this.comPO.WaitForPageLoad();
        }
    }

    AddDupilcateCompanyCategoryCodeAndValidate=async()=>{
        let companyGrid=await this.setupPO.companyCategorygrid();

       let rows = await companyGrid.$$('.ngRow');
       let cells = await rows[0].$$('.ngCellText');
       let companyCategoryCodesCode = await cells[0].innerText();

        let headerCells=await companyGrid.$$('.ngHeaderText');
        await headerCells[0].dblclick();
        await this.page.waitForTimeout(500);
         rows=await companyGrid.$$('.ngRow');
         cells=await rows[0].$$('.ngCell');      

        await cells[0].click();
        await this.page.waitForTimeout(100);
        let input=await cells[0].$('.form-control');
        await input.fill(companyCategoryCodesCode);

        await cells[1].click();
        await this.page.waitForTimeout(100);
        let desc=await cells[1].$('.form-control');
        await desc.fill(companyCategoryCodesCode);

        await this.page.keyboard.press("Tab");
        await this.page.waitForTimeout(1000);
        let  saveBtn=await cells[2].$('.glyphicon-floppy-disk');
        await saveBtn.click();

        await this.comPO.WaitForPageLoad();
        
        let error=await this.comPO.IsErrorMessageExist();
        expect(error).toBeTruthy();    
    }

    DeleteCompanyCategoryCodeThatAlreadyInUse = async () => {
        await this.comBL.NavigateTo_SalesAndMarketing_Company();

        let companyCodeSelection = await this.page.$('select[data-ng-model="company.companyInfo.sourceCodeID"]');
        await companyCodeSelection.selectOption({ index: 1 });
        await this.comPO.WaitForPageLoad();

        let selectedCompCategoryCode=await this.comPO.getSelectedTextFromDDL('select[data-ng-model="company.companyInfo.categoryCodeID"]');

        if(selectedCompCategoryCode==null){
            let ddl= await this.page.$('select[data-ng-model="company.companyInfo.categoryCodeID"]');
            await ddl.selectOption({ index: 1 });
            await this.page.waitForTimeout(500);
            let saveBtn= await this.page.$('button[data-ng-model="company.save()"]');
            await saveBtn.click();
            await this.comPO.WaitForPageLoad();
        }

        await this.comBL.NavigateTo_SalesAndMarketing_Setup();

        let companyGrid=await this.setupPO.companyCategorygrid();
        let row=await this.comBL.ScrollToRecord(companyGrid,1,selectedCompCategoryCode);

        expect(row!=null).toBeTruthy();
        let cells = await row.$$('.ngCell');

        let removeBrn = await cells[2].$('.icon-remove-sign');
        await removeBrn.click();
        await this.comPO.WaitForPageLoad();
        let error = await this.comPO.IsErrorMessageExist();
        expect(error).toBeTruthy();         

    }


    AddReasonForStayAndValidate=async()=>{
        let stayGrid=await this.setupPO.reasonForStaygrid();

        let headerCells=await stayGrid.$$('.ngHeaderText');
        await headerCells[0].dblclick();

        let rows=await stayGrid.$$('.ngRow');

        let cells=await rows[0].$$('.ngCell');

        let rndNo = this.helper.Number(999, 100);
        let reasonCode = "RFS" + rndNo;

        await cells[0].click();
        await this.page.waitForTimeout(100);
        let input=await cells[0].$('.form-control');
        await input.fill(reasonCode);

        await cells[1].click();
        await this.page.waitForTimeout(100);
        let desc=await cells[1].$('.form-control');
        await desc.fill(reasonCode);
        await this.page.keyboard.press("Tab");
        await this.page.waitForTimeout(500);

        let activeCheckbox=await cells[2].$('.form-control');
        await activeCheckbox.check();
       
        let  saveBtn=await cells[3].$('.glyphicon-floppy-disk');
        await saveBtn.click();

        await this.comPO.WaitForPageLoad();
        await this.page.reload();
        await this.page.waitForTimeout(2000);
        await this.comPO.WaitForPageLoad();
        
        stayGrid = await this.setupPO.reasonForStaygrid();
        rows = await stayGrid.$$('.ngRow');
        cells = await rows[0].$$('.ngCell');

      let row=await this.comBL.ScrollToRecord(stayGrid,0,reasonCode);

      expect(row!=null).toBeTruthy();
      cells = await row.$$('.ngCellText');

      let cell0Text=await cells[0].innerText();
      let cell1Text=await cells[1].innerText();

      cells = await row.$$('.ngCell');
      let checkbox=await cells[2].$('.form-control');
      let ischecked= await checkbox.isChecked();

        expect(cell0Text == reasonCode).toBeTruthy();
        expect(cell1Text == reasonCode).toBeTruthy();
        expect(ischecked).toBeTruthy();
        cells = await row.$$('.ngCell');
        let removeBrn = await cells[3].$('.icon-remove-sign');
        if (removeBrn != null) {
            await removeBrn.click();
            await this.comPO.WaitForPageLoad();
        }
    }

    AddDupilcateReasonForStayAndValidate=async()=>{
        let companyGrid=await this.setupPO.reasonForStaygrid();

       let rows = await companyGrid.$$('.ngRow');
       let cells = await rows[0].$$('.ngCellText');
       let reasonForStayCode = await cells[0].innerText();

        let headerCells=await companyGrid.$$('.ngHeaderText');
        await headerCells[0].dblclick();
        await this.page.waitForTimeout(500);
         rows=await companyGrid.$$('.ngRow');
         cells=await rows[0].$$('.ngCell');      

        await cells[0].click();
        await this.page.waitForTimeout(100);
        let input=await cells[0].$('.form-control');
        await input.fill(reasonForStayCode);

        await cells[1].click();
        await this.page.waitForTimeout(100);
        let desc=await cells[1].$('.form-control');
        await desc.fill(reasonForStayCode);
        await this.page.keyboard.press("Tab");
        await this.page.waitForTimeout(500);

        let activeCheckbox=await cells[2].$('.form-control');
        await activeCheckbox.check();
        let  saveBtn=await cells[3].$('.glyphicon-floppy-disk');
        await saveBtn.click();

        await this.comPO.WaitForPageLoad();        
        let error=await this.comPO.IsErrorMessageExist();
        expect(error).toBeTruthy();    
    }

    AddMarketSegmentAndValidate=async()=>{
        let companyGrid=await this.setupPO.marketSeggrid();

        let headerCells=await companyGrid.$$('.ngHeaderText');
        await headerCells[0].dblclick();

        let rows=await companyGrid.$$('.ngRow');

        let cells=await rows[0].$$('.ngCell');

        let rndNo = this.helper.Number(999, 100);
        let msCode = "ms" + rndNo;

        await cells[0].click();
        await this.page.waitForTimeout(100);
        let input=await cells[0].$('.form-control');
        await input.fill(msCode);

        await cells[1].click();
        await this.page.waitForTimeout(100);
        let desc=await cells[1].$('.form-control');
        await desc.fill(msCode);

        let rndNoBufget = this.helper.Number(99, 1);
        await cells[2].click();
        await this.page.waitForTimeout(100);
        let budget=await cells[2].$('.form-control');
        await budget.fill(rndNoBufget.toString());
        await this.page.keyboard.press("Tab");        
        await this.page.waitForTimeout(1000);


        let activeCheckbox=await cells[3].$('.form-control');
        await activeCheckbox.check();
       
        let  saveBtn=await cells[4].$('.glyphicon-floppy-disk');
        await saveBtn.click();

        await this.comPO.WaitForPageLoad();
        await this.page.reload();
        await this.page.waitForTimeout(2000);
        await this.comPO.WaitForPageLoad();
        
        companyGrid = await this.setupPO.marketSeggrid();
        rows = await companyGrid.$$('.ngRow');
        cells = await rows[0].$$('.ngCell');

      let row=await this.comBL.ScrollToRecord(companyGrid,0,msCode);

      expect(row!=null).toBeTruthy();
      cells = await row.$$('.ngCellText');

      let cell0Text=await cells[0].innerText();
      let cell1Text=await cells[1].innerText();
      let cell2Text=await cells[2].innerText();

        expect(cell0Text == msCode).toBeTruthy();
        expect(cell1Text == msCode).toBeTruthy();
        expect(cell2Text == rndNoBufget.toString()).toBeTruthy();
        cells = await row.$$('.ngCell');
        let removeBrn = await cells[4].$('.icon-remove-sign');
        if (removeBrn != null) {
            await removeBrn.click();
            await this.comPO.WaitForPageLoad();
        }
    }

    AddDupilcateMargetSegmentAndValidate=async()=>{
        let msGrid=await this.setupPO.marketSeggrid();

       let rows = await msGrid.$$('.ngRow');
       let cells = await rows[0].$$('.ngCellText');
       let msCode = await cells[0].innerText();

        let headerCells=await msGrid.$$('.ngHeaderText');
        await headerCells[0].dblclick();
        await this.page.waitForTimeout(500);
         rows=await msGrid.$$('.ngRow');
         cells=await rows[0].$$('.ngCell');      

        await cells[0].click();
        await this.page.waitForTimeout(100);
        let input=await cells[0].$('.form-control');
        await input.fill(msCode);

        await cells[1].click();
        await this.page.waitForTimeout(100);
        let desc=await cells[1].$('.form-control');
        await desc.fill(msCode);
        await this.page.keyboard.press("Tab");
        await this.page.waitForTimeout(500);

        let rndNoBufget = this.helper.Number(99, 1);
        await cells[2].click();
        await this.page.waitForTimeout(100);
        let budget=await cells[2].$('.form-control');
        await budget.fill(rndNoBufget.toString());
        await this.page.keyboard.press("Tab");        
        await this.page.waitForTimeout(500);        

        let activeCheckbox=await cells[3].$('.form-control');
        await activeCheckbox.check();

        let  saveBtn=await cells[4].$('.glyphicon-floppy-disk');
        await saveBtn.click();

        await this.comPO.WaitForPageLoad();        
        let error=await this.comPO.IsErrorMessageExist();
        expect(error).toBeTruthy();    
    }

    AddReferralCodeAndValidate=async()=>{
        let refCodeGrid=await this.setupPO.referralgrid();

        let headerCells=await refCodeGrid.$$('.ngHeaderText');
        await headerCells[0].dblclick();

        let rows=await refCodeGrid.$$('.ngRow');

        let cells=await rows[0].$$('.ngCell');

        let rndNo = this.helper.Number(999, 100);
        let rfCode = "RF" + rndNo;

        await cells[0].click();
        await this.page.waitForTimeout(100);
        let input=await cells[0].$('.form-control');
        await input.fill(rfCode);

        await cells[1].click();
        await this.page.waitForTimeout(100);
        let desc=await cells[1].$('.form-control');
        await desc.fill(rfCode);

        let rndNoBufget = this.helper.Number(99, 1);
        await cells[2].click();
        await this.page.waitForTimeout(100);
        let budget=await cells[2].$('.form-control');
        await budget.fill(rndNoBufget.toString());
        await this.page.keyboard.press("Tab");        
        await this.page.waitForTimeout(1000);


        let activeCheckbox=await cells[3].$('.form-control');
        await activeCheckbox.check();
       
        let  saveBtn=await cells[4].$('.glyphicon-floppy-disk');
        await saveBtn.click();

        await this.comPO.WaitForPageLoad();
        await this.page.reload();
        await this.page.waitForTimeout(2000);
        await this.comPO.WaitForPageLoad();
        
        refCodeGrid = await this.setupPO.referralgrid();
        rows = await refCodeGrid.$$('.ngRow');
        cells = await rows[0].$$('.ngCell');

      let row=await this.comBL.ScrollToRecord(refCodeGrid,0,rfCode);

      expect(row!=null).toBeTruthy();
      cells = await row.$$('.ngCellText');

      let cell0Text=await cells[0].innerText();
      let cell1Text=await cells[1].innerText();
      let cell2Text=await cells[2].innerText();

        expect(cell0Text == rfCode).toBeTruthy();
        expect(cell1Text == rfCode).toBeTruthy();
        expect(cell2Text == rndNoBufget.toString()).toBeTruthy();
        cells = await row.$$('.ngCell');
        let removeBrn = await cells[4].$('.icon-remove-sign');
        if (removeBrn != null) {
            await removeBrn.click();
            await this.comPO.WaitForPageLoad();
        }
    }

    AddDupilcateReferralCodeAndValidate=async()=>{
        let refCodeGrid=await this.setupPO.referralgrid();

       let rows = await refCodeGrid.$$('.ngRow');
       let cells = await rows[0].$$('.ngCellText');
       let msCode = await cells[0].innerText();

        let headerCells=await refCodeGrid.$$('.ngHeaderText');
        await headerCells[0].dblclick();
        await this.page.waitForTimeout(500);
         rows=await refCodeGrid.$$('.ngRow');
         cells=await rows[0].$$('.ngCell');      

        await cells[0].click();
        await this.page.waitForTimeout(100);
        let input=await cells[0].$('.form-control');
        await input.fill(msCode);

        await cells[1].click();
        await this.page.waitForTimeout(100);
        let desc=await cells[1].$('.form-control');
        await desc.fill(msCode);
        await this.page.keyboard.press("Tab");
        await this.page.waitForTimeout(500);

        let rndNoBufget = this.helper.Number(99, 1);
        await cells[2].click();
        await this.page.waitForTimeout(100);
        let budget=await cells[2].$('.form-control');
        await budget.fill(rndNoBufget.toString());
        await this.page.keyboard.press("Tab");        
        await this.page.waitForTimeout(500);        

        let activeCheckbox=await cells[3].$('.form-control');
        await activeCheckbox.check();

        let  saveBtn=await cells[4].$('.glyphicon-floppy-disk');
        await saveBtn.click();

        await this.comPO.WaitForPageLoad();        
        let error=await this.comPO.IsErrorMessageExist();
        expect(error).toBeTruthy();    
    }

}
