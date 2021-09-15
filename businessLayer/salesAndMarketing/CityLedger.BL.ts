import CommanPage from '../../pages/common/Common.page';
import CommonBL from '../common/Common.BL';
import { Page } from "playwright";
import test, { expect } from '@playwright/test';
import CityLedgerPage from '../../pages/salesAndMarketing/CityLedger.page';
import RandomHelper from '../util/Helper';
const _moment = require('moment');

export default class CityLedgerBL {
    private page: Page;
    private comPO: CommanPage;
    private comBL: CommonBL;
    private clPO: CityLedgerPage;
    private helper: RandomHelper;
    constructor(page: Page) {
        this.page = page;
        this.comPO = new CommanPage(page);
        this.comBL = new CommonBL(page);
        this.clPO = new CityLedgerPage(page);
        this.helper = new RandomHelper();
    }

    private _acctCode = "";
    private _companyName = "";
    private _rndFirstName = "";
    private _rndLastName = "";
    private _zipCode = "75025";
    private _address1 = "533 Modoc Alley";
    private _address2 = "21 Baker Street";
    private _email = "vmfaketest@gmail.com";
    private _rndPhoneNo = "";
    private _rndAreaCode = "";
    private _terms = "Net 15";
    private _creditLimit = "10000";
    private _name1 = "name1";
    private _name2 = "name2";
    private _name3 = "name3";

    Perform_MDL_operationInCityLedger=async()=>{
        await this.comBL.NavigateTo_SalesAndMarketing_CityLedger();
        await this.FillCompanyAddress();
        await this.FillContactInfo();
        await this.FillCreditInfo();
        await this.FillAuthorizedNames();

        let saveElm=await this.clPO.saveBtn();
        await saveElm.click();
        await this.comPO.WaitForPageLoad();

        let error=await this.comPO.GetErrorMessage();
        if (error != null) {
            if (error.includes("Account Number is already used,")) {
                test.skip();
            } else
                expect(error).toBeFalsy();
        }
       
        await this.page.reload();
        await this.page.waitForTimeout(1000);
        await this.comPO.WaitForPageLoad();
        
       await this.VerifyCompanyAddress();
       await this.VerifyContactInfo();
       await this.VerifyCreditInfo();
       await this.VerifyAuthorizedNames();

        let deleteBtn=await this.clPO.deleteBtn();
        await deleteBtn.click();
        await this.comPO.WaitForPageLoad();

        let modalTitle=await this.comPO.IsModelPopupExist();
        if(modalTitle!=null){
            if(modalTitle.includes("Are you sure want to delete?")){
                let okBtn=await this.page.$('button:has-text("OK")');
                await okBtn.click();
                await this.comPO.WaitForPageLoad();
                 let isError=await this.comBL.IsErrorAppeared();
                expect(isError).toBeFalsy();
            }
        }
    }

    FillCompanyAddress=async(acctCode:string="")=>{
        let rndCompanyCode = await this.helper.Number(9999, 1000);
        if(acctCode=="")
        this._acctCode = rndCompanyCode.toString();
        else
        this._acctCode = acctCode;
        let acctElm = await this.clPO.account();
        await acctElm.fill(this._acctCode);
        

        let compName="cl-company-"+await this.helper.Number(999,100);
        let comNameElm=await this.clPO.companyNameElm();
        await comNameElm.fill(compName);
        this._companyName=compName;

        let zipCodeElm=await this.clPO.zipCodeElm();
        await zipCodeElm.fill(this._zipCode);

        let addr1 =await this.clPO.address1Elm();
        await addr1.fill(this._address1); 

        let addr2 =await this.clPO.address2Elm();
        await addr2.fill(this._address2); 
    }

    FillContactInfo=async()=>{
        let rndno=await this.helper.Number(999,100);
        let firstNameElm=await this.clPO.firstNameElm();
        await firstNameElm.fill("firstname"+rndno);
        this._rndFirstName="firstname"+rndno;

        let lastNameElm=await this.clPO.lastNameElm();
        await lastNameElm.fill("lastname"+rndno);
        this._rndLastName="lastname"+rndno;

        let email= await this.clPO.emailElm();
        await email.fill(this._email);

        let phoneElm=await this.clPO.phone1Elm();
        await phoneElm.fill("56574337");
        this._rndPhoneNo="56574337"
    }

    FillCreditInfo=async()=>{
        let termElm=await this.clPO.termsSelectElm();
        await termElm.selectOption({label:this._terms});

        let creditELm=await this.clPO.creditLimitElm();
        await creditELm.fill(this._creditLimit);
    }

    FillAuthorizedNames=async()=>{
        let name1Elm=await this.clPO.name1Elm();
        await name1Elm.fill(this._name1);

        let name2Elm=await this.clPO.name2Elm();
        await name2Elm.fill(this._name2);

        let name3Elm=await this.clPO.name3Elm();
        await name3Elm.fill(this._name3);
    }

    VerifyCompanyAddress=async()=>{
        let acctElm = await this.clPO.account();
        let accode=await acctElm.inputValue();

        let comNameElm=await this.clPO.companyNameElm(); 
        let compName=await comNameElm.inputValue();

        let zipCodeElm=await this.clPO.zipCodeElm();
        let zipCode=await zipCodeElm.inputValue();

        let addr1Elm =await this.clPO.address1Elm();
        let addr1= await addr1Elm.inputValue();

        let addr2Elm =await this.clPO.address2Elm();
        let addr2= await addr2Elm.inputValue();

        expect(this._acctCode==accode).toBeTruthy();
        expect(this._companyName==compName).toBeTruthy();
        expect(this._zipCode==zipCode).toBeTruthy();
        expect(this._address1==addr1).toBeTruthy();
        expect(this._address2==addr2).toBeTruthy();
    }

    VerifyContactInfo=async()=>{
        let firstNameElm=await this.clPO.firstNameElm();
        let firstName=await firstNameElm.inputValue();

        let lastNameElm=await this.clPO.lastNameElm();
        let lastName=await lastNameElm.inputValue();

        let emailElm= await this.clPO.emailElm();
        let email=await emailElm.inputValue();

        let phoneElm=await this.clPO.phone1Elm();
        let phone= await phoneElm.inputValue();

        expect(this._rndFirstName==firstName).toBeTruthy();
        expect(this._rndLastName==lastName).toBeTruthy();
        expect(this._email==email).toBeTruthy();
        expect(this._rndPhoneNo==phone).toBeTruthy();
    }

    VerifyCreditInfo=async()=>{
        let terms=await this.clPO.getSelectedTerm();

        let creditELm=await this.clPO.creditLimitElm();
        let credit=await creditELm.inputValue();      
        let formattedCredit=credit.replace('$','').replace(',','').split(".")[0].trim();

        expect(this._terms==terms).toBeTruthy();
        expect(this._creditLimit==formattedCredit).toBeTruthy();
      
    }

    VerifyAuthorizedNames=async()=>{
        let name1Elm=await this.clPO.name1Elm();
        let name1=await name1Elm.inputValue();

        let name2Elm=await this.clPO.name2Elm();
        let name2=await name2Elm.inputValue();

        let name3Elm=await this.clPO.name3Elm();
        let name3=await name3Elm.inputValue();

        expect(this._name1==name1).toBeTruthy();
        expect(this._name2==name2).toBeTruthy();
        expect(this._name3==name3).toBeTruthy();
    }

    AddDuplicateCoountNumberAndValidate=async()=>{

        await this.comBL.NavigateTo_SalesAndMarketing_CityLedger();
        let searchEln=await this.clPO.searchEln();
        await searchEln.click();
        await this.comPO.WaitForPageLoad();

        let rows=await this.page.$$(".ngRow");
        let cells=await rows[0].$$(".ngCellText");
        let acctNo=await cells[0].innerText();

        let closeBtn=await this.clPO.closeSearchElm();
        await closeBtn.click();
        await this.comPO.WaitForPageLoad();

        await this.FillCompanyAddress(acctNo);
        await this.FillContactInfo();
        await this.FillCreditInfo();
        await this.FillAuthorizedNames();
        
        let saveElm=await this.clPO.saveBtn();
        await saveElm.click();
        await this.comPO.WaitForPageLoad();

        let error=await this.comPO.GetErrorMessage();
        if (error != null)
            expect(error.includes("Account Number is already used,")).toBeTruthy();
        else
            expect(true).toBeFalsy();
    }
}