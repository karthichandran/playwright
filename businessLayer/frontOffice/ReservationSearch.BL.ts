import ReservationSearch from '../../pages/frontOffice/ReservationSearch.page';
import CommanPage from '../../pages/common/common.page';
import CommonBL from '../common/common.BL';

import { Page } from "playwright";
import test, { expect } from '@playwright/test';
import moment from 'moment';

export default class ReservationSearchBL {
    private page: Page;
    private searchPO: ReservationSearch;
    private comPO: CommanPage;
    private comBL: CommonBL;
    constructor(page: Page) {
        this.page = page;
        this.searchPO = new ReservationSearch(page);
        this.comPO = new CommanPage(page);
        this.comBL = new CommonBL(page);
    }

    SelectSearchOption=async(option)=>{
        let searchSelectionElm=await this.searchPO.searchOptionElm();
        await searchSelectionElm.selectOption({label:option});
        await this.comPO.WaitForPageLoad();
    }

    SelectSearchFilter=async(value,isSelction)=>{
        if (isSelction) {
            let filterElm = await this.searchPO.searchfilterDDLElm();
            await filterElm.selectOption({ label: value });
            await this.comPO.WaitForPageLoad();
        } else {
            let filterElm = await this.searchPO.searchFilterTxtElm();
            await filterElm.fill(value);
        }
    }

    OpenPendingReservtion=async ()=>{
        await this.SelectSearchOption("Reservation Status");

        const auditDate = await this.comBL.GetAuditDate();
        let date = await this.comBL.GetDateFromstring(auditDate);
        let modifiedDate = moment(date).add(10, 'd').format('MM/DD/YY');
        let departureDate = await this.searchPO.departureDateElm();
        await departureDate.fill(modifiedDate);
        await this.SelectSearchFilter("Pending Arrivals",true);
        let searchBtn=await this.searchPO.searchBtnElm();
        await searchBtn.click();
        await this.comPO.WaitForPageLoad();

        let rows = await this.searchPO.getRows();
        if (rows == null)
            return false;

        for (var i = 0; i < rows.length; i++) {
            let cells = await rows[i].$$(".ngCellText");
            let name=await cells[0].innerText();
            if(name.length>4)
            {
                await cells[0].click();
                await this.page.waitForTimeout(500);
                await this.comPO.WaitForPageLoad();
               return true;
            }
        }

        await (await this.searchPO.searchCancelBtnElm()).click();
        await this.comPO.WaitForPageLoad();
        return false;
    }
    
}