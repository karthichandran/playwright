import { Page } from "playwright";

export default class GuestProfilerSetupPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    mailingListGrid = async () => await this.page.$("div[data-ng-grid='mailingListOptions']");
    mailingListAddBrn=async () => await this.page.$("button[data-ng-repeat='model in mailingListOptions.headerButtonDefs']:has-text('Add')");
    mailingListRemoveBrn=async () => await this.page.$("button[data-ng-repeat='model in mailingListOptions.headerButtonDefs']:has-text('Remove')");
    mailingListSaveBrn=async () => await this.page.$("button[data-ng-repeat='model in mailingListOptions.headerButtonDefs']:has-text('Save')");

    guestTypeGrid = async () => await this.page.$("div[data-ng-grid='guestTypesOptions']");
    guestTypeAddBrn=async () => await this.page.$("button[data-ng-repeat='model in guestTypesOptions.headerButtonDefs']:has-text('Add')");
    guestTypeRemoveBrn=async () => await this.page.$("button[data-ng-repeat='model in guestTypesOptions.headerButtonDefs']:has-text('Remove')");
    guestTypeSaveBrn=async () => await this.page.$("button[data-ng-repeat='model in guestTypesOptions.headerButtonDefs']:has-text('Save')");


    //guest Profiler

    addGuetProfilerBtn=async () => await this.page.$("span[data-ng-click='guestProfiler.new()']");
    mailingListSelectElm=async () => await this.page.$("select[data-ng-model='guestProfiler.guestProfilerInfo.mailingItems']");

    mailingListSelectOptionsElm=async () => await this.page.$$eval("select[data-ng-model='guestProfiler.guestProfilerInfo.mailingItems']>option",el => el.map(e => e.textContent));

    guestTypeSelectElm=async () => await this.page.$("select[data-ng-model='guestProfiler.guestProfilerInfo.guestTypeID']");
    guestTypeSelectOptionsElm=async () => await this.page.$$eval("select[data-ng-model='guestProfiler.guestProfilerInfo.guestTypeID']>option",el => el.map(e => e.textContent));

    guestIncentiveElm = async () => await this.page.$("input[data-ng-model='guestProfiler.guestProfilerInfo.guestIncentiveCode']");
    lastNameElm = async () => await this.page.$("input[data-ng-model='guestProfiler.guestProfilerInfo.lastName']");
    firstNameElm = async () => await this.page.$("input[data-ng-model='guestProfiler.guestProfilerInfo.firstName']");
    effectiveDateElm = async () => await this.page.$("input[data-ng-model='guestProfiler.guestProfilerInfo.guestIncentiveEffDate']");
    birthDateElm = async () => await this.page.$("input[data-ng-model='guestProfiler.guestProfilerInfo.birthday']");
    address1Elm = async () => await this.page.$("input[data-ng-model='guestProfiler.guestProfilerInfo.addr1']");
    address2Elm = async () => await this.page.$("input[data-ng-model='guestProfiler.guestProfilerInfo.addr2']");
    countrySelectElm=async () => await this.page.$("select[data-ng-model='guestProfiler.guestProfilerInfo.countryID']");
    cityElm = async () => await this.page.$("input[data-ng-model='city']");
    stateSelectElm=async () => await this.page.$("select[data-ng-model='state']");
    zipElm = async () => await this.page.$("input[data-ng-model='zip']");
    phone1CountryCodeElm=async () =>{ 
        let code=await this.page.$$("input[data-ng-model='$parent.$parent.guestProfiler.guestProfilerInfo.countryCode']");
    return code[0];
    }
    phone2CountryCodeElm=async () =>{ 
        let code=await this.page.$$("input[data-ng-model='$parent.$parent.guestProfiler.guestProfilerInfo.countryCode']");
    return code[1];
    }
    phone1AreaCodeElm = async () => await this.page.$("input[data-ng-model='$parent.$parent.guestProfiler.guestProfilerInfo.areaCode']");
    phone2AreaCodeElm = async () => await this.page.$("input[data-ng-model='$parent.$parent.guestProfiler.guestProfilerInfo.faxAreaCode']");
    phone1NumberElm = async () => await this.page.$("input[data-ng-model='$parent.$parent.guestProfiler.guestProfilerInfo.telephone']");
    phone2NumberElm = async () => await this.page.$("input[data-ng-model='$parent.$parent.guestProfiler.guestProfilerInfo.fax']");

    emailElm = async () => await this.page.$("input[data-ng-model='guestProfiler.guestProfilerInfo.email']");
    paymentSelectElm=async () => await this.page.$("select[data-ng-model='guestProfiler.guestProfilerInfo.paymentMethodID']");
    accountNoElm = async () => await this.page.$("input[data-ng-model='guestProfiler.guestProfilerInfo.accountNumber']");
    franchiseNoElm = async () => await this.page.$("input[data-ng-model='guestProfiler.guestProfilerInfo.franchiseMemberCode']");
    expDateElm = async () => await this.page.$("input[data-ng-model='guestProfiler.guestProfilerInfo.expirationDate']");
    drivingLicenseElm = async () => await this.page.$("input[data-ng-model='guestProfiler.guestProfilerInfo.driverLicense']");
    drivingLicenseStateElm = async () => await this.page.$("input[data-ng-model='guestProfiler.guestProfilerInfo.driverLicenseState']");
    referralElm = async () => await this.page.$("input[data-ng-model='guestProfiler.guestProfilerInfo.referralMethodID']");
    taxStatusElm = async () => await this.page.$("input[data-ng-model='guestProfiler.guestProfilerInfo.taxStatus']");
    reasonSelectElm=async () => await this.page.$("select[data-ng-model='guestProfiler.guestProfilerInfo.reasonForStayID']");
    marketSegSelectElm=async () => await this.page.$("select[data-ng-model='guestProfiler.guestProfilerInfo.marketSegmentID']");
    companySegSelectElm=async () => await this.page.$("select[data-ng-model='guestProfiler.guestProfilerInfo.sourceCodeID']");
    doNotMailCheckboxElm=async () => await this.page.$("input[data-ng-model='guestProfiler.guestProfilerInfo.doNotMail']");
    optInCheckboxElm=async () => await this.page.$("input[data-ng-model='guestProfiler.guestProfilerInfo.eMailOptIn']");
    confirmPrefSelectElm=async () => await this.page.$("select[data-ng-model='guestProfiler.guestProfilerInfo.conPrefID']");
    commentElm=async () => await this.page.$("textarea[data-ng-model='guestProfiler.guestProfilerInfo.comments']");
    guestProfilerSaveBtn=async () => await this.page.$("button[data-ng-click='guestProfiler.save()']");

    guestSearchBtn=async () => await this.page.$("button[data-ng-click='showSearch()']");

    filterLastNameElm=async () => await this.page.$("input[data-ng-model='guestprofilerListing.model.lastName']");
    filterSubmitElm=async () => await this.page.$("button[data-ng-click='guestprofilerListing.search()']");
}