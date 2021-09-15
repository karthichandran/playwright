import { Page } from "playwright";

export default class SalesAndMarketingSetupPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    companyCategorygrid = async () =>await this.page.$('div[data-ng-grid="setup.CompanyCategoryCodeGridProperties"]');
    reasonForStaygrid = async () =>await this.page.$('div[data-ng-grid="setup.reasonForStayCodeGridProperties"]');
    marketSeggrid = async () =>await this.page.$('div[data-ng-grid="setup.marketSegmentCodeGridProperties"]');
    referralgrid = async () =>await this.page.$('div[data-ng-grid="setup.referralCodeGridProperties"]');
    reasonForStayRequired = async () =>await this.page.$('input[data-ng-model="setup.options.required.reasonForStay"]');
    reasonForStayDDL = async () =>await this.page.$('select[data-ng-model="setup.options.default.reasonForStayId"]');
    marketRequired = async () =>await this.page.$('input[data-ng-model="setup.options.required.market"]');
    marketDDL = async () =>await this.page.$('select[data-ng-model="setup.options.default.marketSegmentId"]');
    eferralRequired = async () =>await this.page.$('input[data-ng-model="ssetup.options.required.referral"]');
    referralDDL = async () =>await this.page.$('select[data-ng-model="setup.options.default.referralMethodId"]');
}