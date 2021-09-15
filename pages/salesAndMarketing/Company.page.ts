import { Page } from "playwright";
import CommanPage from "../common/common.page";

export default class CompanyPage {
    private page: Page;
    private comPO: CommanPage;
    constructor(page: Page) {
        this.page = page;
        this.comPO = new CommanPage(page);
    }

    saveBtn = async () => await this.page.$("button[data-ng-click='company.save()']");
    deleteBtn = async () => await this.page.$("button[data-ng-click='company.deleteCompany()']");
    newCompanyBtn = async () => await this.page.$("span[data-ng-click='company.new()']");

    companyCodeSelectionElm = async () => await this.page.$("select[data-ng-model='company.companyInfo.sourceCodeID']");
    companyCodeElm = async () => await this.page.$("input[data-ng-model='company.companyInfo.sourceCode']");
    addr1Elm = async () => await this.page.$("input[data-ng-model='company.companyInfo.addr1']");
    addr2Elm = async () => await this.page.$("input[data-ng-model='company.companyInfo.addr2']");
    companyNameElm = async () => await this.page.$("input[data-ng-model='company.companyInfo.companyName']");
    cityElm = async () => await this.page.$("input[data-ng-model='city']");
    stateSelectionElm = async () => await this.page.$("select[data-ng-model='state']");
    zipElm = async () => await this.page.$("input[data-ng-model='zip']");
    countrySelectionElm = async () => await this.page.$("select[data-ng-model='company.companyInfo.countryID']");
    refSelectionElm = async () => await this.page.$("select[data-ng-model='company.companyInfo.referralCodeID']");
    marketSegSelectionElm = async () => await this.page.$("select[data-ng-model='company.companyInfo.marketSegmentID']");
    categoryCodeSelectionElm = async () => await this.page.$("select[data-ng-model='company.companyInfo.categoryCodeID']");
    rateOverrideChkElm = async () => await this.page.$("input[data-ng-model='$parent.$parent.company.companyInfo.rateOverride']");
    ratePrivateChkElm = async () => await this.page.$("input[data-ng-model='$parent.$parent.company.companyInfo.ratePrivate']");
    overrideWeekDayRateElm = async () => await this.page.$("input[data-ng-model='company.companyInfo.overrideRateWkDay']");
    overrideWeekEndRateElm = async () => await this.page.$("input[data-ng-model='company.companyInfo.overrideRateWkEnd']");
    discountWeekDayElm = async () => await this.page.$("select[data-ng-model='company.companyInfo.discountCodeWkDayID']");
    discountWeekENdElm = async () => await this.page.$("select[data-ng-model='company.companyInfo.discountCodeWkEndID']");
    taxStatusSelectionElm = async () => await this.page.$("select[data-ng-model='company.companyInfo.exempt']");
    getSelectedTaxStatus=async () => await this.comPO.getSelectedTextFromDDL("select[data-ng-model='company.companyInfo.exempt']");
    exemptBtn = async () => await this.page.$("input[data-ng-click='company.showRevenueTax()']");
    lastNameElm = async () => await this.page.$("input[data-ng-model='company.companyInfo.contactLName']");
    firstNameElm = async () => await this.page.$("input[data-ng-model='company.companyInfo.contactFName']");
    emailElm = async () => await this.page.$("input[data-ng-model='company.companyInfo.email']");
    commentElm = async () => await this.page.$("textarea[data-ng-model='company.companyInfo.remarks']");
    activeChkElm = async () => await this.page.$("input[data-ng-model='$parent.$parent.company.companyInfo.sourceActive']");
    update2wayChkElm = async () => await this.page.$("input[data-ng-model='$parent.$parent.company.companyInfo.tW_UpdateCRS']");

    phone1Elm = async () => await this.page.$("input[data-ng-model='$parent.$parent.company.companyInfo.telephone']");
    phone1areaElm = async () => await this.page.$("input[data-ng-model='$parent.$parent.company.companyInfo.areaCode']");

    phone2Elm = async () => await this.page.$("input[data-ng-model='$parent.$parent.company.companyInfo.fax']");
    phone2areaElm = async () => await this.page.$("input[data-ng-model='$parent.$parent.company.companyInfo.faxAreaCode']");

    startCompSelectionElm = async () => await this.page.$("#cboStartCompany");
    endCompSelectionElm = async () => await this.page.$("#cboEndCompany");
    CompCategorySelectionElm = async () => await this.page.$("#cboCompanyCategory");
    searchBtn=async () => await this.page.$("#btnSearch");
}