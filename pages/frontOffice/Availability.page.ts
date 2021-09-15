import { Page } from "playwright";
import moment from 'moment';
import CommanPage from "../common/common.page";

export default class AvailabilityPage {
    private page: Page;
    private comPO: CommanPage;

    constructor(page: Page) {
        this.page = page;
        this.comPO = new CommanPage(page);
    }

    arrivalDateElm = async () => await this.page.$('#txtAvailArrivalDate');
    printElm = async () => await this.page.$('#btnAvailPrint');
    stepForwardElm = async () => await this.page.$('button > span > .step_forward');
    fastForwardElm = async () => await this.page.$('button > span > .fast_forward');
    stepBackwardElm = async () => await this.page.$('button > span > .step_backward');
    fastBackwardElm = async () => await this.page.$('button > span > .fast_backward');
    TotalOfOccupancyElms = async () => await this.page.$$('#divTotalInOccupancy');
    occupanvyRoomTypeElms = async () => await this.page.$$('#divInOccupancyRoomTypes');
    rateRow=async()=> await this.page.$('#rate');
    rateRowCells=async ()=>{
        let row=await this.page.$('#rate');
       let cells= await row.$$('.room-cell-2');
       return cells;
    }

    selectTheAvailabilityDate = async (date: string) => {
        let dateElm = await this.arrivalDateElm();
        await dateElm.fill(date);
        await this.page.keyboard.press("Tab");
        await this.comPO.WaitForPageLoad();
    }




}