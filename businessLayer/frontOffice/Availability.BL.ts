import AvailabilityPage from '../../pages/frontOffice/Availability.page';
import CommanPage from '../../pages/common/common.page';
import CommonBL from '../common/common.BL';

import { Page } from "playwright";
import test, { expect } from '@playwright/test';
import moment from 'moment';

export default class AvailabilityBL {
    private page: Page;
    private availPO: AvailabilityPage;
    private comPO: CommanPage;
    private comBL: CommonBL;
    constructor(page: Page) {
        this.page = page;
        this.availPO = new AvailabilityPage(page);
        this.comPO = new CommanPage(page);
        this.comBL = new CommonBL(page);
    }


    getDateOnRoomAvailbility = async () => {
        var roomsTotalCnt = await this.availPO.TotalOfOccupancyElms();

        let isRoomAvailable: boolean = false;
        var i = 0;
        for (i = 0; i < 11; i++) {
            let roomsCnt = await roomsTotalCnt[i].innerText();
            if (parseInt(roomsCnt) > 0) {
                isRoomAvailable = true;
                break;
            }
        }

        if (isRoomAvailable) {
            var date = await (await this.availPO.arrivalDateElm()).inputValue();
            var formattedDate = moment(date, 'MM/DD/YY');
            let availableDate = moment(formattedDate).add(i, 'd').format('MM/DD/YY');
            return availableDate;
        }

        return null;
    };

    selectTheAvailabilityDate = async (date: string) => {
        let dateElm = await this.availPO.arrivalDateElm();
        await dateElm.fill(date);
        await (await this.comPO.calendarDoneBtn()).click();
        await this.comPO.WaitForPageLoad();
    }

    PickTheRoom = async () => {
        var roomRows = await this.availPO.occupanvyRoomTypeElms();

        for (var i = 0; i < roomRows.length; i++) {

            let cells = await (roomRows[i].$$('.room-cell'));
            let firstCell = await cells[0].innerText();
            if (parseInt(firstCell) > 0) {
                await cells[0].click();
                await this.comPO.WaitForPageLoad();

                let isError = await this.comPO.IsErrorMessageExist();
                if (isError)
                    continue;

                await this.comBL.HandleOverridePasswordForClosedArrival();
                await this.comPO.WaitForPageLoad();
                break;
            }
        }
    }

    PickTheRate = async () => {
        let rateCells = await this.availPO.rateRowCells();

        for (let i = 0; i < rateCells.length; i++) {
            let rate = await rateCells[i].innerText();
            if (rate != "0.00") {
                await rateCells[i].click();

                await this.comPO.WaitForPageLoad();

                let isError = await this.comPO.IsErrorMessageExist();
                if (isError)
                    continue;

                await this.comBL.HandleOverridePasswordForClosedArrival();
                await this.comPO.WaitForPageLoad();
                break;
            }
        }
    }

    GetAvailable2RoomTypes = async () => {
        var roomsTotalCnt = await this.availPO.TotalOfOccupancyElms();

        let roomsCnt = await roomsTotalCnt[0].innerText();
        if (parseInt(roomsCnt) == 0)
            test.skip();

        var roomRows = await this.availPO.occupanvyRoomTypeElms();
        let roomTypeArr: string[]=[];
        let inx: number = 0;
        for (var i = 0; i < roomRows.length; i++) {

            let roomType = await (await roomRows[i].$('h6:nth-child(1)')).innerText();
            let cells = await (roomRows[i].$$('.room-cell'));
            let firstCell = await cells[0].innerText();
            if (parseInt(firstCell) > 0) {
                roomTypeArr.push(roomType);
                if (roomTypeArr.length >= 2)
                    break;
            }
        }
        return roomTypeArr;


    }
}