import CommanPage from '../../pages/common/Common.page';
import CommonBL from '../common/Common.BL';
import { Page } from "playwright";
import { expect } from '@playwright/test';
import GuestProfilerSetupPage from '../../pages/salesAndMarketing/GuestProfiler.page';
import RandomHelper from '../util/Helper';
const _moment = require('moment');

export default class GuestProfilerSetupBL {
    private page: Page;
    private comPO: CommanPage;
    private comBL: CommonBL;
    private setupPO: GuestProfilerSetupPage;
    private helper: RandomHelper;
    constructor(page: Page) {
        this.page = page;
        this.comPO = new CommanPage(page);
        this.comBL = new CommonBL(page);
        this.setupPO = new GuestProfilerSetupPage(page);
        this.helper = new RandomHelper();
    }

    private  guestIncentive = "";
        private rndFirstName = "";
        private rndLastName = "";
        private address1 = "533 Modoc Alley";
        private address2 = "21 Baker Street";
        private zipCode = "75025";
        private rndPhoneNo = "4540987";
        private rndAreaCode = "042";
        private email = "vmfaketest@gmail.com";
        private paymentMethod = "Cash";
        private acctNo = "10000567";
        private franchiseMember= "234234535";
        private drivingLicense = "k123-222-90-333-4";
        private dlst = "AA";

    AddMailingList = async () => {

        let mailingListGrid = await this.setupPO.mailingListGrid();
        let addBtn = await this.setupPO.mailingListAddBrn();
        await addBtn.click();

        let rows = await mailingListGrid.$$('.ngRow');

        let rndNo = this.helper.Number(999, 100);
        let desc = "MailingList" + rndNo;

        let cells = await rows[0].$$('.ngCell');
        await cells[0].click();
        await this.page.waitForTimeout(500);
        let input = await cells[0].$('.form-control');
        await input.fill(desc);
        await this.page.keyboard.press("Tab");
        await this.page.waitForTimeout(500);

        let saveBtn = await this.setupPO.mailingListSaveBrn();
        await saveBtn.click();
        await this.comPO.WaitForPageLoad();
        let error = await this.comPO.IsErrorMessageExist();
        expect(error).toBeFalsy();

        this.page.reload();
        await this.page.waitForTimeout(2000);
        await this.comPO.WaitForPageLoad();
        mailingListGrid = await this.setupPO.mailingListGrid();
        let row = await this.comBL.ScrollToRecord(mailingListGrid, 0, desc);
        expect(row != null).toBeTruthy();     
        return desc;  
    }

    NewMailItemShouldBeAvailableInGuestProfiler=async(mail)=>{
        await this.comBL.NavigateTo_SalesAndMarketing_GuestProfiler_GuestProfiler();
        let addBtn=this.setupPO.addGuetProfilerBtn();
        (await addBtn).click();
        await this.comPO.WaitForPageLoad();

        let mailOptions=await this.setupPO.mailingListSelectOptionsElm();
        for (var item of mailOptions) {
            if (item == mail) {
                return true;
            }
        }
        expect(true).toBeFalsy();
    }

    deleteMailingItem=async(mail)=>{
      let  mailingListGrid = await this.setupPO.mailingListGrid();
        let row = await this.comBL.ScrollToRecord(mailingListGrid, 0, mail);

        expect(row != null).toBeTruthy();
       let cells = await row.$$('.ngCell');
        await cells[0].click();

        let removeBtn = await this.setupPO.mailingListRemoveBrn();
        await removeBtn.click();

        let modelTitle=await this.comPO.IsModelPopupExist();
        if(modelTitle!=null){
            let btn=await this.page.$('button:has-text("OK")');
            await btn.click();
            await this.comPO.WaitForPageLoad();
        }

        await this.comPO.WaitForPageLoad();
        let error = await this.comPO.IsErrorMessageExist();
        expect(error).toBeFalsy();

        this.page.reload();
        await this.page.waitForTimeout(2000);
        await this.comPO.WaitForPageLoad();
        mailingListGrid = await this.setupPO.mailingListGrid();
        row = await this.comBL.ScrollToRecord(mailingListGrid, 0, mail);
        expect(row == null).toBeTruthy();  
    }

    AddDuplicateMailingListAndValidate = async () => {

        let mailingListGrid = await this.setupPO.mailingListGrid();
        let rows = await mailingListGrid.$$('.ngRow');
        let cells = await rows[0].$$('.ngCell');
        let desc= await cells[0].innerText();

        let addBtn = await this.setupPO.mailingListAddBrn();
        await addBtn.click();

         rows = await mailingListGrid.$$('.ngRow');

         cells = await rows[0].$$('.ngCell');
        await cells[0].click();
        await this.page.waitForTimeout(500);
        let input = await cells[0].$('.form-control');
        await input.fill(desc);
        await this.page.keyboard.press("Tab");
        await this.page.waitForTimeout(500);

        let saveBtn = await this.setupPO.mailingListSaveBrn();
        await saveBtn.click();
        await this.comPO.WaitForPageLoad();
        let error = await this.comPO.IsErrorMessageExist();
        expect(error).toBeTruthy();
    }


    AddGuetsType = async () => {

        let guestTypeGrid = await this.setupPO.guestTypeGrid();
        let addBtn = await this.setupPO.guestTypeAddBrn();
        await addBtn.click();

        let rows = await guestTypeGrid.$$('.ngRow');

        let rndNo = this.helper.Number(999, 100);
        let desc = "GuestType" + rndNo;

        let cells = await rows[0].$$('.ngCell');
        await cells[0].click();
        await this.page.waitForTimeout(500);
        let input = await cells[0].$('.form-control');
        await input.fill(desc);
        await this.page.keyboard.press("Tab");
        await this.page.waitForTimeout(500);

        let saveBtn = await this.setupPO.guestTypeSaveBrn();
        await saveBtn.click();
        await this.comPO.WaitForPageLoad();
        let error = await this.comPO.IsErrorMessageExist();
        expect(error).toBeFalsy();

        this.page.reload();
        await this.page.waitForTimeout(2000);
        await this.comPO.WaitForPageLoad();
        guestTypeGrid = await this.setupPO.guestTypeGrid();
        let row = await this.comBL.ScrollToRecord(guestTypeGrid, 0, desc);
        expect(row != null).toBeTruthy();     
        return desc;  
    }
    NewGuestTypeShouldBeAvailableInGuestProfiler=async(mail)=>{
        await this.comBL.NavigateTo_SalesAndMarketing_GuestProfiler_GuestProfiler();
        let addBtn=this.setupPO.addGuetProfilerBtn();
        (await addBtn).click();
        await this.comPO.WaitForPageLoad();

        let typeOptions=await this.setupPO.guestTypeSelectOptionsElm();
        for (var item of typeOptions) {
            if (item == mail) {
                return true;
            }
        }
        expect(true).toBeFalsy();
    }

    deleteGuestType=async(guestType)=>{
        let  guestTypeGrid = await this.setupPO.guestTypeGrid();
          let row = await this.comBL.ScrollToRecord(guestTypeGrid, 0, guestType);
  
          expect(row != null).toBeTruthy();
         let cells = await row.$$('.ngCell');
          await cells[0].click();
  
          let removeBtn = await this.setupPO.guestTypeRemoveBrn();
          await removeBtn.click();
  
          let modelTitle=await this.comPO.IsModelPopupExist();
          if(modelTitle!=null){
              let btn=await this.page.$('button:has-text("OK")');
              await btn.click();
              await this.comPO.WaitForPageLoad();
          }
  
          await this.comPO.WaitForPageLoad();
          let error = await this.comPO.IsErrorMessageExist();
          expect(error).toBeFalsy();
  
          this.page.reload();
          await this.page.waitForTimeout(2000);
          await this.comPO.WaitForPageLoad();
          guestTypeGrid = await this.setupPO.guestTypeGrid();
          row = await this.comBL.ScrollToRecord(guestTypeGrid, 0, guestType);
          expect(row == null).toBeTruthy();  
      }

      AddDuplicateGuestTypeAndValidate = async () => {

        let guestTypeGrid = await this.setupPO.guestTypeGrid();
        let rows = await guestTypeGrid.$$('.ngRow');
        let cells = await rows[0].$$('.ngCell');
        let desc= await cells[0].innerText();

        let addBtn = await this.setupPO.guestTypeAddBrn();
        await addBtn.click();

         rows = await guestTypeGrid.$$('.ngRow');

         cells = await rows[0].$$('.ngCell');
        await cells[0].click();
        await this.page.waitForTimeout(500);
        let input = await cells[0].$('.form-control');
        await input.fill(desc);
        await this.page.keyboard.press("Tab");
        await this.page.waitForTimeout(500);

        let saveBtn = await this.setupPO.guestTypeSaveBrn();
        await saveBtn.click();
        await this.comPO.WaitForPageLoad();
        let error = await this.comPO.IsErrorMessageExist();
        expect(error).toBeTruthy();
    }

    AddGuestProfileAndValidate=async()=>{
        let addBtn=await this.setupPO.addGuetProfilerBtn();
        await addBtn.click();
        await this.comPO.WaitForPageLoad();
        await this.setupPO.guestProfilerSaveBtn();

        await this.comPO.WaitForPageLoad();
        let error = await this.comPO.IsErrorMessageExist();
        expect(error).toBeFalsy();

        let searchBtn=await this.setupPO.guestSearchBtn();
        await searchBtn.click();
        await this.comPO.WaitForPageLoad();

        let filterLastNameElm=await this.setupPO.filterLastNameElm();
        await filterLastNameElm.fill(this.rndLastName);
        let filterSubmitElm=await this.setupPO.filterSubmitElm();
        await filterSubmitElm.click();
        await this.comPO.WaitForPageLoad();

        let rows=await this.page.$$('.ngRow');
        expect(rows.length>0).toBeTruthy();
    }


    FillGuestInfo=async()=>{
       this.guestIncentive = this.helper.Number(999, 100).toString();
        let incentiveElm=await this.setupPO.guestIncentiveElm();
        await incentiveElm.fill(this.guestIncentive );

        let rndNo = this.helper.Number(999, 100)
        this.rndLastName = "lastName" + rndNo;
        this.rndFirstName = "firstName" + rndNo;
        let lastNameElm = await this.setupPO.lastNameElm();
        await lastNameElm.fill(this.rndLastName);

        let firstName = await this.setupPO.firstNameElm();
        await firstName.fill(this.rndFirstName);

        let incentiveDateElm = await this.setupPO.guestIncentiveElm();
        let date = _moment().add(-5, 'd').format('MM/DD/YY');
        await incentiveDateElm.fill(date);

        let birthDate=await this.setupPO.birthDateElm();
        let dob = _moment().add(-20, 'y').format('MM/DD/YY');
        await birthDate.fill(dob);

        let zip= await this.setupPO.zipElm();
        await zip.fill(this.zipCode);

        let addr1=await this.setupPO.address1Elm();
        await addr1.fill(this.address1);

        let addr2 = await this.setupPO.address2Elm();
        await addr2.fill(this.address2);

        let phone1 = await this.setupPO.phone1NumberElm();
        await phone1.fill(this.rndPhoneNo);

        let areaCode = await this.setupPO.phone1AreaCodeElm();
        await areaCode.fill(this.rndAreaCode);

        let emailElm = await this.setupPO.emailElm();
        await emailElm.fill(this.email);

        let payElm = await this.setupPO.paymentSelectElm();
        await payElm.selectOption({ label: this.paymentMethod });

        let acctElm = await this.setupPO.accountNoElm();
        await acctElm.fill(this.acctNo);

        let franchiseElm = await this.setupPO.franchiseNoElm();
        await franchiseElm.fill(this.franchiseMember);

        var licenseElm = await this.setupPO.drivingLicenseElm();
        await licenseElm.fill(this.drivingLicense);

        let linceseSate = await this.setupPO.drivingLicenseStateElm();
        await linceseSate.selectOption({ label: this.dlst });

    }
}
