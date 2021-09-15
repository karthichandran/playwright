import BookResPage from '../../pages/frontOffice/BookRes.page';
import CommanPage from '../../pages/common/common.page';
import CommonBL from '../common/common.BL';

import { Page } from "playwright";
import test, { expect } from '@playwright/test';
import moment from 'moment';

export default class BookResBL {
    private page: Page;
    private bookResPO: BookResPage;
    private comPO: CommanPage;
    private comBL: CommonBL;
    constructor(page: Page) {
        this.page = page;
        this.bookResPO = new BookResPage(page);
        this.comPO = new CommanPage(page);
        this.comBL = new CommonBL(page);
    }


  
    PickTheRoom = async () => {
        var roomRows = await this.bookResPO.roomTypeRows();

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
                let modelTitle = await this.comPO.IsModelPopupExist();
               
                if (modelTitle.includes('Generate Reservation for the following dates Arrival')) {
                    var okBtn = await this.page.waitForSelector("button:has-text('OK')");
                    if (okBtn != null) {
                        await okBtn.click();
                        await this.page.waitForLoadState("load");
                        await this.comPO.WaitForPageLoad();
                    }

                }
                await this.comBL.HandleOverridePasswordForClosedArrival();
                await this.comPO.WaitForPageLoad();
                break;
            }
        }
    }
    public async FillContactInformation(firstName: string, lastName: string, address1: string, city: string, state: string, country: string, pinCode: string) {
        await this.page.waitForTimeout(1000);
        await this.comPO.WaitForPageLoad();
        await this.page.waitForTimeout(2000);
        await this.bookResPO.waitForLastNameElm();
        await (await this.bookResPO.lastNameInputElm()).fill(lastName);
        await (await this.bookResPO.firstNameInputElm()).fill(firstName);
        let cityElm = await this.bookResPO.cityInpuElm();
        await cityElm.click();
        await this.comPO.WaitForPageLoad();
        await this.page.waitForTimeout(1000);
        await (await this.bookResPO.addGuestProfileBtnElm()).click();
        await (await this.bookResPO.address1InputElm()).fill(address1);
        if (city != undefined && city != "")
            await (await this.bookResPO.cityInpuElm()).fill(city);
        if (state != undefined && state != "")
            await (await this.bookResPO.stateInpuElm()).fill(state);
        if (pinCode != undefined && pinCode != "")
            await (await this.bookResPO.zipInpuElm()).fill(pinCode);
        if (country != undefined && country != "")
            await (await this.bookResPO.countryElm()).selectOption({ label: country });
    }

    public async FillMarketingInfo() {

        const segOptions = await this.bookResPO.segmentOptions();
        await (await this.bookResPO.segmentSelectionElm()).selectOption(segOptions[1]);

        const refOptions = await this.bookResPO.referralOptions();
        await (await this.bookResPO.referralSelectionElm()).selectOption(refOptions[1]);

        const reasonOptions = await this.bookResPO.reasonOptions();
        await (await this.bookResPO.reasonForStayElm()).selectOption(reasonOptions[1]);
    }
    
    ClickNext = async () => {
        await this.comPO.WaitForPageLoad();
        let nextBtn = await this.bookResPO.waitForNextBtn();        
          await nextBtn.click();
          nextBtn = await this.bookResPO.nextElm(); 
          if(nextBtn!=null)  
          await nextBtn.click();          
        await this.comPO.WaitForPageLoad();
    }

    SelectNoOfNights = async (nights: string) => {
        let noOfstaySelection = await this.bookResPO.nightsSelectionElm();
        await noOfstaySelection.selectOption({ label: nights });
    }
    ClickSearchBtn=async()=>{
        let searchBtn=await this.bookResPO.searchElm();
        await searchBtn.click();
        await this.comPO.WaitForPageLoad();

    }

}