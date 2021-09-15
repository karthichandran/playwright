import { Page } from "playwright";

export default class NightAuditPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    dueOutCountElm = async () =>await this.page.$('#spnGuestsDueOut');
    dueOutBtnElm = async () =>await this.page.$('#btnGuestsDueOut');
    noShowsCountElm = async () =>await this.page.$('#spnNoShows');
    noShowsBtnElm = async () =>await this.page.$('#btnNoShows');
    transactionReportElm=async()=>await this.page.$("#spnTransactionStatus");
    transactionReportBtn=async()=>await this.page.$("#btnOperatorTransactions");
    transactionCloseBtn=async()=>await this.page.$("#btnAcctNaOperatorTransactionsClose");
    oneButtonAuditElm=async()=>await this.page.$("#btnOneButtonAudit");

}