import CommanPage from '../../pages/common/Common.page';
import CommonBL from '../common/Common.BL';
import { Page } from "playwright";
import test, { expect } from '@playwright/test';
import CompanyPage from '../../pages/salesAndMarketing/Company.page';
import RandomHelper from '../util/Helper';
const _moment = require('moment');

export default class CompanyBL {
    private page: Page;
    private comPO: CommanPage;
    private comBL: CommonBL;
    private companyPO: CompanyPage;
    private helper: RandomHelper;
    constructor(page: Page) {
        this.page = page;
        this.comPO = new CommanPage(page);
        this.comBL = new CommonBL(page);
        this.companyPO = new CompanyPage(page);
        this.helper = new RandomHelper();
    }

 private _compCode="";
 private _compName="";
 private _addr1="533 Modoc Alley";
 private _addr2="21 Baker Street";
 private _zip="12365";
 private _taxStatus="TAXABLE"; 

    CreateCompanyAndValidate=async()=>{
let newBtn=await this.companyPO.newCompanyBtn();
await newBtn.click();
await this.comPO.WaitForPageLoad();

let rndCode=this.helper.Number(9999,1000);  
this._compCode="comp_"+rndCode;

let compCodeElm=await this.companyPO.companyCodeElm();
await compCodeElm.fill(this._compCode);

this._compName="Comp_"+rndCode;
let compNameElm=await this.companyPO.companyNameElm();
await compNameElm.fill(this._compName);

let addr1Elm=await this.companyPO.addr1Elm();
await addr1Elm.fill(this._addr1);

let zipElm=await this.companyPO.zipElm();
await zipElm.fill(this._zip);
await this.page.keyboard.press("Tab");
await this.comPO.WaitForPageLoad();

let addr2Elm=await this.companyPO.addr2Elm();
await addr2Elm.fill(this._addr2);

let taxStatusElm=await this.companyPO.taxStatusSelectionElm();
await taxStatusElm.selectOption({label:this._taxStatus});

let saveBtn=await this.companyPO.saveBtn();
await saveBtn.click();
await this.comPO.WaitForPageLoad();
let errrorExist = await this.comBL.IsErrorAppeared();
expect(errrorExist).toBeFalsy();

await this.comBL.NavigateTo_SalesAndMarketing_Company_Search();
await this.comPO.WaitForPageLoad();

let startCompElm=await this.companyPO.startCompSelectionElm();
await startCompElm.selectOption({label:this._compCode});
let searchBrn=await this.companyPO.searchBtn();
await searchBrn.click();
await this.comPO.WaitForPageLoad();

let rows= await this.page.$$('.ngRow');
let Cells=await rows[0].$$('.ngCell');
await Cells[0].click();
await this.comPO.WaitForPageLoad();

compCodeElm=await this.companyPO.companyCodeElm();
let  compCode=await compCodeElm.inputValue();

compNameElm=await this.companyPO.companyNameElm();
let  compName=await compNameElm.inputValue();

addr1Elm=await this.companyPO.addr1Elm();
let addr1=await addr1Elm.inputValue();

addr2Elm=await this.companyPO.addr2Elm();
let addr2=await addr2Elm.inputValue();

zipElm=await this.companyPO.zipElm();
let zip=await zipElm.inputValue();

let selectedTaxStatus=await this.companyPO.getSelectedTaxStatus();

expect(this._compCode==compCode).toBeTruthy();
expect(this._compName==compName).toBeTruthy();
expect(this._addr1==addr1).toBeTruthy();
expect(this._addr2==addr2).toBeTruthy();
expect(this._zip==zip).toBeTruthy();
expect(this._taxStatus==selectedTaxStatus).toBeTruthy();
}

    CheckCompanyExistsInReservation = async () => {
        await this.comBL.NavigateToAddReservation();
        let compOptions = await this.page.$$eval('#cboCompany>option', e => e.map(e => e.textContent));
        let IsExist = false;
        for (let opt of compOptions) {
            if (opt == this._compName) {
                IsExist = true;
                break;
            }
        }
        expect(IsExist).toBeTruthy();
    }

    CheckCompanyExistInGroup = async () => {
        await this.comBL.NavigateToGroup();
        let compOptions = await this.page.$$eval('#cboSourceCode>option', e => e.map(e => e.textContent));
        let IsExist = false;
        for (let opt of compOptions) {
            if (opt == this._compName) {
                IsExist = true;
                break;
            }
        }
        expect(IsExist).toBeTruthy();
    }

    MakeTheCompanyInActive = async () => {
        await this.comBL.NavigateTo_SalesAndMarketing_Company();

        let compCodeSelecElm = await this.companyPO.companyCodeSelectionElm();
        await compCodeSelecElm.selectOption({ label: this._compCode });
        await this.comPO.WaitForPageLoad();

        let activeELm = await this.companyPO.activeChkElm();
        await activeELm.uncheck();
        let saveBtn = await this.companyPO.saveBtn();
        await saveBtn.click();
        await this.comPO.WaitForPageLoad();
        let errrorExist = await this.comBL.IsErrorAppeared();
        expect(errrorExist).toBeFalsy();

    }

    CheckInCompanyDoesNotExistsInReservation = async () => {
        await this.comBL.NavigateToAddReservation();
        let compOptions = await this.page.$$eval('#cboCompany>option', e => e.map(e => e.textContent));
        let IsExist = false;
        for (let opt of compOptions) {
            if (opt == this._compName) {
                IsExist = true;
                break;
            }
        }
        expect(IsExist).toBeFalsy();
    }

    CheckINCompanyDoesNotExistInGroup = async () => {
        await this.comBL.NavigateToGroup();
        let compOptions = await this.page.$$eval('#cboSourceCode>option', e => e.map(e => e.textContent));
        let IsExist = false;
        for (let opt of compOptions) {
            if (opt == this._compName) {
                IsExist = true;
                break;
            }
        }
        expect(IsExist).toBeFalsy();
    }

    DeleteCompany=async()=>{
        await this.comBL.NavigateTo_SalesAndMarketing_Company();

        let compCodeSelecElm = await this.companyPO.companyCodeSelectionElm();
        await compCodeSelecElm.selectOption({ label: this._compCode });
        await this.comPO.WaitForPageLoad();

        let deleteBrn=await this.companyPO.deleteBtn();
        await deleteBrn.click();

        await this.comPO.WaitForPageLoad();

        let modelTitle= await this.comPO.IsModelPopupExist();
        if(modelTitle!=null){
            let okBtn=await this.page.$('button:has-text("OK")');
            await okBtn.click();
        }
        await this.comPO.WaitForPageLoad();
        let errrorExist = await this.comBL.IsErrorAppeared();
        expect(errrorExist).toBeFalsy();

    }
}
