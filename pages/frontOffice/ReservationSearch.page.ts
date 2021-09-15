import { Page } from "playwright";
import moment from 'moment';
import CommanPage from "../common/Common.page";

export default class ReservationSearchPage {
    private page: Page;
    private comPO: CommanPage;

    constructor(page: Page) {
        this.page = page;
        this.comPO = new CommanPage(page);
    }

    searchOptionElm=async()=>await this.page.$("#cboSearchOption");
    arrivateDateElm=async()=>await this.page.$("#txtSearchFromDate");
    departureDateElm=async()=>await this.page.$("#txtSearchToDate");
    searchfilterDDLElm=async()=>await this.page.$("#cboSearchFilter");
    searchFilterTxtElm=async()=>await this.page.$("#txtSearchFilter");
    searchBtnElm=async()=>await this.page.$("#btnSearch");
    ResetElm=async()=>await this.page.$("#btnResSearchPref");
    searchCancelBtnElm=async()=>await this.page.$("#btnResSearchCancel");
    getRows=async()=>{
        let rows= await this.page.$$('.ngRow');
        return rows;
    }
}