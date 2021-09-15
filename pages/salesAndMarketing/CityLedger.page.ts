import { Page } from "playwright";
import CommanPage from "../common/common.page";
export default class CityLedgerPage {
    private page: Page;
    private comPO: CommanPage;
    constructor(page: Page) {
        this.page = page;
        this.comPO = new CommanPage(page);
    }


    saveBtn = async () => await this.page.$("#btnSave");
    deleteBtn = async () => await this.page.$("button[data-ng-click='cityLedger.delete()']");
    account=async () => await this.page.$("input[data-ng-model='cityLedger.cityLedgerInfo.clAcct']");
    companyNameElm=async () => await this.page.$("input[data-ng-model='cityLedger.cityLedgerInfo.company']");
    address1Elm=async () => await this.page.$("input[data-ng-model='cityLedger.cityLedgerInfo.addr1']");
    address2Elm=async () => await this.page.$("input[data-ng-model='cityLedger.cityLedgerInfo.addr2']");
    memberCodeSelectElm=async () => await this.page.$("select[data-ng-model='cityLedger.cityLedgerInfo.memberCodeID']");
    countrySelectElm=async () => await this.page.$("select[data-ng-model='cityLedger.cityLedgerInfo.countryID']");
    cityElm = async () => {
        let city = await this.page.$$("input[data-ng-model='city']");
        return city[0];
    };
    stateSelectElm = async () => {
        let state = await this.page.$$("select[data-ng-model='state']");
        return state[0];
    };
    zipCodeElm = async () => {
        let zip = await this.page.$$("input[data-ng-model='zip']");
        return zip[0];
    };
    billingAddr1Elm=async () => await this.page.$("input[data-ng-model='cityLedger.cityLedgerInfo.billAddr1']");
    billingAddr2Elm=async () => await this.page.$("input[data-ng-model='cityLedger.cityLedgerInfo.billAddr2']");
    billingCityElm = async () => {
        let city = await this.page.$$("input[data-ng-model='city']");
        return city[1];
    };
    billingStateSelectElm = async () => {
        let state = await this.page.$$("select[data-ng-model='state']");
        return state[1];
    };
    billingZipCodeElm = async () => {
        let zip = await this.page.$$("input[data-ng-model='zip']");
        return zip[1];
    };
    BillingCountrySelectElm=async () => await this.page.$("select[data-ng-model='cityLedger.cityLedgerInfo.billCountryID']");

    firstNameElm = async () => await this.page.$("input[data-ng-model='cityLedger.cityLedgerInfo.contactFName']");
    lastNameElm = async () => await this.page.$("input[data-ng-model='cityLedger.cityLedgerInfo.contactLName']");
    emailElm = async () => await this.page.$("input[data-ng-model='cityLedger.cityLedgerInfo.email']");
    phone1Elm = async () => await this.page.$("input[data-ng-model='$parent.$parent.cityLedger.cityLedgerInfo.telephone']");
    phone2Elm = async () => await this.page.$("input[data-ng-model='$parent.$parent.cityLedger.cityLedgerInfo.fax']");

    termsSelectElm=async () => await this.page.$("select[data-ng-model='cityLedger.cityLedgerInfo.termTypeID']");
    getSelectedTerm=async () => await this.comPO.getSelectedTextFromDDL("select[data-ng-model='cityLedger.cityLedgerInfo.termTypeID']");
    discountElm=async () => await this.page.$("#netDiscount']");
    daysElm=async () => await this.page.$("input[data-ng-model='cityLedger.cityLedgerInfo.discWithinDays']");
    creditLimitElm=async () => await this.page.$("input[data-ng-model='cityLedger.cityLedgerInfo.creditLimit']");

    name1Elm=async () => await this.page.$("input[data-ng-model='cityLedger.cityLedgerInfo.allowedToBook1']");
    name2Elm=async () => await this.page.$("input[data-ng-model='cityLedger.cityLedgerInfo.allowedToBook2']");
    name3Elm=async () => await this.page.$("input[data-ng-model='cityLedger.cityLedgerInfo.allowedToBook3']");
    searchEln=async () => await this.page.$("button[data-ng-click='cityLedger.open()']");
    searchFilterEln=async () => await this.page.$("#btnSearch");
    closeSearchElm=async () => await this.page.$("button[data-ng-repeat='button in config.footerButtons']");

}