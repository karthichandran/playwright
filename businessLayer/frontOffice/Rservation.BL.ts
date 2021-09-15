import ReservationPage from '../../pages/frontOffice/Reservation.page';
import CommanPage from '../../pages/common/Common.page';
import CommonBL from '../common/Common.BL';
import ReservationSearchPage from '../../pages/frontOffice/ReservationSearch.page';
import RandomHelper from '../util/Helper';

import { Page } from "playwright";
import test, { expect } from '@playwright/test';
import moment from 'moment';

import { keyboard, Key } from '@nut-tree/nut-js'

export default class ReservationBL {
    private page: Page;
    private resPO: ReservationPage;
    private comPO: CommanPage;
    private comBL: CommonBL;
    private searchPO: ReservationSearchPage;
    private helper: RandomHelper;
    constructor(page: Page) {
        this.page = page;
        this.resPO = new ReservationPage(page);
        this.comPO = new CommanPage(page);
        this.comBL = new CommonBL(page);
        this.searchPO = new ReservationSearchPage(page);
        this.helper = new RandomHelper();
        keyboard.config.autoDelayMs = 1000;
    }

    public async FillContactInformation(firstName: string, lastName: string, address1: string, city: string, state: string, country: string, pinCode: string) {
        await this.page.waitForTimeout(1000);
        await this.comPO.WaitForPageLoad();
        await this.page.waitForTimeout(2000);
        await this.resPO.waitForLastNameElm();
        await (await this.resPO.lastNameInputElm()).fill(lastName);
        await (await this.resPO.firstNameInputElm()).fill(firstName);
        let cityElm = await this.resPO.cityInpuElm();
        await cityElm.click();
        await this.comPO.WaitForPageLoad();
        await this.page.waitForTimeout(1000);
        await (await this.resPO.addGuestProfileBtnElm()).click();
        await (await this.resPO.address1InputElm()).fill(address1);
        if (city != undefined && city != "")
            await (await this.resPO.cityInpuElm()).fill(city);
        if (state != undefined && state != "")
            await (await this.resPO.stateInpuElm()).fill(state);
        if (pinCode != undefined && pinCode != "")
            await (await this.resPO.zipInpuElm()).fill(pinCode);
        if (country != undefined && country != "")
            await (await this.resPO.countryElm()).selectOption({ label: country });
    }

    public async FillMarketingInfo() {

        const segOptions = await this.resPO.segmentOptions();
        await (await this.resPO.segmentSelectionElm()).selectOption(segOptions[1]);

        const refOptions = await this.resPO.referralOptions();
        await (await this.resPO.referralSelectionElm()).selectOption(refOptions[1]);

        const reasonOptions = await this.resPO.reasonOptions();
        await (await this.resPO.reasonForStayElm()).selectOption(reasonOptions[1]);
    }

    SelectRoomType = async (roomType) => {
        if (roomType == '')
            return false;

        let roomTypeOptTxt = await this.resPO.roomTypeOptionsText();
        let txt = roomTypeOptTxt.find(e => e.trim() == roomType.trim());
        let roolTypeElm = await this.resPO.roomTypeElm();
        await roolTypeElm.selectOption({ label: txt });
        await this.page.waitForTimeout(3000);
        await this.page.waitForLoadState("domcontentloaded");
        await this.page.waitForLoadState("load");
        await this.page.waitForLoadState('networkidle');

        var err = await this.comPO.IsErrorMessageExist();
        if (err) {
            await this.page.waitForTimeout(5000);
            return false;
        }
        await this.page.waitForTimeout(3000);
        await this.page.waitForLoadState("load");
        await this.page.waitForLoadState('networkidle');
        do {
            var modelTitle = await this.comPO.IsModelPopupExist();
            if (modelTitle != null) {

                if (modelTitle.includes('Room Type has been Overbooked at least one night! Please enter the Password to override')) {

                    await this.page.fill('#overridePwd', 'ok');
                    await this.page.click('button[data-bb-handler="success"]');
                    //  await page.waitForTimeout(3000);
                    await this.page.waitForLoadState("load");
                    await this.page.waitForLoadState('networkidle');
                }
                else if (modelTitle.includes('Change of RoomType may cause Rates/Discount to change... Wish to keep the Tier Level?')) {
                    var yesBtn = await this.page.waitForSelector('button[data-bb-handler="yes"]');
                    if (yesBtn != null) {
                        await yesBtn.click();
                        await this.page.waitForLoadState("load");
                    }
                } else if (modelTitle.includes('Change of RoomType may cause Rates/Discount to change... Wish to keep the OverRide Rate?')) {
                    var yesBtn = await this.page.waitForSelector('button[data-bb-handler="yes"]');
                    if (yesBtn != null) {
                        await yesBtn.click();
                        await this.page.waitForLoadState("load");
                    }
                }
                else if (modelTitle.includes('This arrival date is Closed to Arrival!')) {
                    await this.comBL.HandleOverridePasswordForClosedArrival();
                }

                err = await this.comPO.IsErrorMessageExist();
                if (err) {
                    await this.page.waitForTimeout(5000);
                    return false;
                }
            }
            else
                break;

            await this.comPO.WaitForPageLoad();
        } while (true)
        return true;
    };

    SelectRoomNo = async () => {
        await this.comPO.WaitForselectionOptionsLoaded("#cboRoom");
        var roomNoOpt = await this.resPO.roomNoOptionTextElm();
        var roomNoElm = await this.resPO.roomNoElm();
        if (roomNoOpt.length <= 0)
            test.skip();

        let isRoomNOSelected: boolean = false;
        for (const o of roomNoOpt) {
            if (o.includes("V")) {
                await roomNoElm.selectOption({ label: o });
                isRoomNOSelected = true;
                break;
            }
        }

        if (!isRoomNOSelected) {
            await roomNoElm.selectOption({ label: roomNoOpt[1] });
        }
    }

    GeRoomTypeTextFromString = async (roomType: string) => {
        let roomTypes = await this.resPO.roomTypeOptionsText();
        let obj = roomTypes.find(x => x.trim() == roomType);
        return obj;
    }
    public async FillStayDetails(arrivalDate: string, NoOfStay: string, fillRoomNo: boolean, roomType: string = null) {

        await (await this.resPO.arrivalDateInputElm()).fill(arrivalDate);
        await this.page.keyboard.down("Tab");
        let nightElm = await this.resPO.numberOfNightInputElm();
        await nightElm.click();
        await nightElm.fill(NoOfStay);
        // let arrDate = await this.comBL.GetDateFromstring(arrivalDate);
        // let depDate = moment(arrDate).add( NoOfStay,'d').format('MM/DD/YY');
        // await  (await this.resPO.departureDateElm()).fill(depDate);

        let roolTypeElm = await this.resPO.roomTypeElm();
        await roolTypeElm.click();

        let roomTypes = await this.resPO.roomTypeOptionsText();
        if (roomType == null) {
            for (const o of roomTypes) {
                const status = await this.SelectRoomType(o);
                let vacantRooms = await this.IsVacantRoomAvailable();
                if (status && vacantRooms)
                    break;
            }
        }
        else {
            let obj = await this.GeRoomTypeTextFromString(roomType);
            await this.SelectRoomType(obj);
        }

        this.comPO.WaitForPageLoad();
        if (fillRoomNo) {
            await this.SelectRoomNo();
        }
    }

    public IsVacantRoomAvailable = async () => {
        let roomNumbers = await this.resPO.roomNoOptionTextElm();
        let containRoomStatus = roomNumbers.find(x => x.includes("-"));
        if (containRoomStatus == null)
            return true;
        let vacantRoom = roomNumbers.find(x => x.includes("V"));
        return vacantRoom == null ? false : true;

    }

    public async FillInvaliArrivalDateAndValidate(arrivalDate: string) {
        await (await this.resPO.arrivalDateInputElm()).fill(arrivalDate);
        await this.page.keyboard.down("Tab");
        let nightElm = await this.resPO.numberOfNightInputElm();
        await nightElm.click();
        await nightElm.fill('1');

        let roolTypeElm = await this.resPO.roomTypeElm();
        await roolTypeElm.click();

        let roomTypes = await this.resPO.roomTypeOptionsText();
        await roolTypeElm.selectOption({ index: 1 });
        await this.comPO.WaitForPageLoad();
        let error = await this.comPO.GetErrorMessage();
        expect(error).toContain("Arrival Date can not be less than Today.");
    }

    public async Save() {
        await this.comPO.WaitForPageLoad();
        await (await this.resPO.saveElm()).click();
        await this.page.waitForLoadState("load");
        await this.comPO.WaitForPageLoad();
    }

    public async VerifiyConfirmationNumberGenerated() {
        var confNumber = await this.page.$eval("#txtResId", e => e.value);
        expect(confNumber).toBeTruthy();
        return confNumber;
    }

    public async FillArrivalDateAndNoOFNight(date: string, nights: string) {
        await (await this.resPO.arrivalDateInputElm()).fill(date);
        await this.page.keyboard.down("Tab");
        let nightElm = await this.resPO.numberOfNightInputElm();
        await nightElm.click();
        await nightElm.fill(nights);
        await this.page.keyboard.down("Tab");
    }

    public async DepartureDateShouldBeMatchedWithAddedNights(arrivalDate: string, nights: string) {
        let deptDate = await this.page.evaluate(el => el.value, (await this.resPO.departureDateElm()));
        let arrDate = await this.comBL.GetDateFromstring(arrivalDate);
        let date = moment(arrDate).add(nights, 'd').format('MM/DD/YY');

        //Cancel reservation
        await (await this.resPO.cancelElm()).click();
        await this.comPO.WaitForPageLoad();

        await expect(deptDate).toEqual(date);
    }

    public async ProceedCheckin() {
        await this.PostDeposit();
        await this.page.waitForTimeout(1000);
        await this.comPO.WaitForPageLoad();

        // await this.comPO.waitForPopupVisible();
        var lanePopup = await this.comPO.IsLanePopupExist();
        if (lanePopup != null) {
            let lanDDL = await this.page.$("select[data-ng-model='laneSelection.selectedLaneId']");
            let ddlOption = await this.page.$$("select[data-ng-model='laneSelection.selectedLaneId']>option");
            if (ddlOption.length > 1) {
                await lanDDL.selectOption({ index: 1 });
                await this.page.waitForTimeout(300);
            }
            var okBtn = await lanePopup.waitForSelector(" button[data-ng-click='button.click(modalScope)']:has-text('OK')");
            await okBtn.click();
        }
        await this.comPO.WaitForPageLoad();
        var modelTitle = await this.comPO.IsModelPopupExist();
        if (modelTitle != null) {
            if (modelTitle.includes('Would you like to post room charges now ?')) {
                var cancelBtn = await this.page.waitForSelector('button[data-bb-handler="cancel"]');
                if (cancelBtn != null) {
                    await cancelBtn.click();
                    await this.page.waitForLoadState("load");
                }
            }
        }
        await this.comPO.WaitForPageLoad();
        await this.page.waitForLoadState("networkidle");

        // await keyboard.pressKey(Key.Tab);
        // await keyboard.pressKey(Key.Tab);
        // await keyboard.pressKey(Key.Enter);
        // await this.page.waitForTimeout(1000); 
        await keyboard.pressKey(Key.Escape);

        await this.page.waitForTimeout(2000);
        modelTitle = await this.comPO.IsModelPopupExist();
        if (modelTitle != null) {
            if (modelTitle.includes('This guest is not a BWR member. Would you like to enroll now?')) {
                var cancelBtn = await this.page.waitForSelector('button[data-bb-handler="Cancel"]');
                if (cancelBtn != null) {
                    await cancelBtn.click();
                    await this.page.waitForLoadState("load");
                    await this.comPO.WaitForPageLoad();
                }

            }
        }

    }

    public async ReservationShouldBeCheckIn() {
        await this.resPO.waitForStatusElm();
        let status = await (await this.resPO.statusElm()).inputValue();
        await expect(status).toEqual("LOCAL - IN");
    }

    public async PostDeposit(addAmount: boolean = false) {
        await this.comPO.WaitForPageLoad();
        await this.resPO.waitForPaymentTypeElm();
        let paymenSelection = await this.resPO.checkInPaymentTypeElm();
        await paymenSelection.selectOption({ label: "Cash" });
        await this.comPO.WaitForPageLoad();

        if (!addAmount) {
            await (await this.resPO.checkInAmountPaidElm()).fill('0');
            await (await this.resPO.checkInAmountReceivedElm()).fill('0');
        } else {

            let prepaidAmtElm = await this.resPO.checkInPrepaidDepositElm();
            let prepaidAmt = await prepaidAmtElm.inputValue();
            let formatedAmt = prepaidAmt.replace("$", " ");
            await (await this.resPO.checkInAmountPaidElm()).fill(formatedAmt);
            await (await this.resPO.checkInAmountReceivedElm()).fill(formatedAmt);
        }

        await (await this.resPO.checkInOKbtn()).click();
        await this.comPO.WaitForPageLoad();

    }

    FillPaymentTypeToCityLedger = async () => {

        let paymentTypeElm = await this.resPO.paymentElm();
        paymentTypeElm.selectOption({ label: 'City Ledger' });
        await this.page.waitForTimeout(1000);
        await this.comPO.WaitForPageLoad();
        await this.page.waitForTimeout(1000);
        let rows = await this.page.$$('.ngRow');
        if (rows.length == 0)
            return;

        let inx: number = 0;
        let foundCT: Boolean = true;
        do {
            let cells = await rows[inx].$$('.ngCell');
            let cell = await cells[0].$('.ngCellText');
            await cell.click();
            await this.comPO.WaitForPageLoad();
            let modelTitle = await this.comPO.IsModelPopupExist();
            if (modelTitle != null) {
                if (modelTitle.includes('has reached or exceeded its limit')) {
                    var cancelBtn = await this.page.waitForSelector("button:has-text('Ok')");
                    if (cancelBtn != null) {
                        await cancelBtn.click();
                        await this.page.waitForLoadState("load");
                        await this.comPO.WaitForPageLoad();
                    }

                    paymentTypeElm = await this.resPO.paymentElm();
                    paymentTypeElm.selectOption({ label: 'Cash' });
                    await this.comPO.WaitForPageLoad();
                    paymentTypeElm = await this.resPO.paymentElm();
                    paymentTypeElm.selectOption({ label: 'City Ledger' });

                    rows = await this.page.$$('.ngRow');
                    inx++;
                    if (rows.length == inx) {
                        foundCT = false;
                        break;
                    }

                    continue;
                }
                break;
            }
            break;
        } while (true);

        let modelTitle = await this.comPO.IsModelPopupExist();
        if (modelTitle != null) {
            if (modelTitle.includes('Special rates exist for this City Ledger Account. Do you wish to apply them')) {
                var yesBtn = await this.page.waitForSelector("button:has-text('No')");
                await yesBtn.click();
            }
        }
        await this.comPO.WaitForPageLoad();
    }

    verifyPaymentTypeToCityLedger = async () => {
        let paymentType = await this.comPO.getSelectedTextFromDDL('#cboPaymentMethod');
        expect(paymentType).toEqual("City Ledger")
    }

    FillPaymentTypeToCheck = async () => {
        let paymentTypeElm = await this.resPO.paymentElm();
        paymentTypeElm.selectOption({ label: 'Check' });
        await this.comPO.WaitForPageLoad();
    }

    verifyPaymentTypeToCheck = async () => {
        await this.comPO.WaitForPageLoad();
        await this.page.waitForTimeout(2000);
        let paymentType = await this.comPO.getSelectedTextFromDDL('#cboPaymentMethod');
        expect(paymentType).toEqual("Check")
    }

    CLickOnCheckInBtn = async () => {
        await this.comPO.WaitForPageLoad();
        await this.page.evaluate(() => window.scrollTo(0, 0));
        await this.page.waitForTimeout(1500);
        let toolbox = await this.resPO.toolBoxElm();
        await toolbox.hover({ force: true, position: { x: 3, y: 3 } });
        let checkInBtn = await this.resPO.checkInButtonElm();
        await checkInBtn.click();
        await this.comPO.WaitForPageLoad();
    }
    isAllowingToCheckIn = async () => {
        await this.CLickOnCheckInBtn();
        let isError = await this.comPO.IsErrorMessageExist();
        expect(isError).toBeTruthy();
    }

    DoCheckIn = async () => {
        await this.CLickOnCheckInBtn();
        let modelTitle = await this.comPO.IsModelPopupExist();
        if (modelTitle != null) {
            if (modelTitle.includes('Room Status is Dirty. Would you still like to Check-In?')) {
                var yesBtn = await this.page.waitForSelector("button:has-text('OK')");
                await yesBtn.click();
            }
        }
    }
    FillNoOfRooms = async (noOfRooms: string) => {
        let roomsELm = await this.resPO.noOfRoomsElm();
        await roomsELm.fill(noOfRooms);
        await this.page.keyboard.press("Tab");
        await this.comPO.WaitForPageLoad();
    }

    VerifyMultiReservationGenerated = async (confNo: string) => {
        let searchBtnElm = await this.resPO.searchBtnElm();
        await searchBtnElm.click();
        await this.comPO.WaitForPageLoad();

        let resetBtn = await this.searchPO.ResetElm();
        await resetBtn.click();
        await this.comPO.WaitForPageLoad();

        let searchOptElm = await this.searchPO.searchOptionElm();
        await searchOptElm.selectOption({ label: "Multi Reservations" });
        await this.comPO.WaitForPageLoad();

        let searchFilterElm = await this.searchPO.searchfilterDDLElm();
        await searchFilterElm.selectOption({ label: confNo });
        await this.comPO.WaitForPageLoad();

        let submitBtn = await this.searchPO.searchBtnElm();
        await submitBtn.click();
        await this.comPO.WaitForPageLoad();

        let confNum = parseInt(confNo);
        let rows = await this.page.$$(".ngRow");
        let isPersisted: boolean = true;
        for (var i = 0; i < rows.length - 1; i++) {
            let cells = await rows[i].$$('.ngCell');
            let resID = await (await cells[3].$('.ngCellText')).innerText();
            let resIdNo = parseInt(resID);
            let isCheckBox = await (await cells[5].$('input')).isChecked();
            if (resIdNo != (confNum + i) || !isCheckBox)
                isPersisted = false;
        }

        expect(isPersisted).toBeTruthy();
    }

    SetNoOfNights = async (nights) => {
        let nightsElm = await this.resPO.numberOfNightInputElm();
        await nightsElm.fill(nights);
        await keyboard.pressKey(Key.Tab);
        await this.comPO.WaitForPageLoad();
    }

    CardPayment = async (payment, card, amout) => {
        let advanceDepositElm = await this.resPO.advanceDepositBtn();
        await advanceDepositElm.click();
        await this.comPO.WaitForPageLoad();

        let paymenMethodelm = await this.comPO.paymentMethodSelectionADelm();
        await paymenMethodelm.selectOption({ label: payment });
        await this.comPO.WaitForPageLoad();

        let depositAmtElm = await this.comPO.depositAmountADelm();
        await depositAmtElm.fill(amout);
        await this.comPO.WaitForPageLoad();

        let postElm = await this.comPO.postADelm();
        await postElm.click();
        await this.comPO.WaitForPageLoad();

        if (card != "CHECK" && card != "CASH") {
            let status = await this.comBL.HandleCreditPardPayment(card);
            await this.comPO.WaitForPageLoad();
        }
    }

    PostDepositAllPaymentTypes = async () => {
        let depositDetailsBtn = await this.resPO.depositDetailsElm();
        await depositDetailsBtn.click();
        await this.comPO.WaitForPageLoad();

        //CASH
        await this.CardPayment("ADV DEP CASH", "CASH", "3");
        let isvalid = await this.validatePosteddepositAmount("3", "ADV DEP CASH");
        expect(isvalid).toBeTruthy();

        //Check
        await this.CardPayment("ADV DEP CHECK", "CHECK", "5");
        isvalid = await this.validatePosteddepositAmount("5", "ADV DEP CHECK");
        expect(isvalid).toBeTruthy();

        //AMEX
        await this.CardPayment("ADV DEP AMEX", "AMEX", "10");
        isvalid = await this.validatePosteddepositAmount("10", "ADV DEP AMEX");
        expect(isvalid).toBeTruthy();

        //Diners  Note: we dont have caard details for diner
        // await this.CardPayment("ADV DEP DINERS","DINERS","15");
        //  isvalid= await this.validatePosteddepositAmount("15","ADV DEP DINERS");
        // expect(isvalid).toBeTruthy();

        //DISCOVER
        await this.CardPayment("ADV DEP DISCOVER", "DISCOVER", "20");
        isvalid = await this.validatePosteddepositAmount("20", "ADV DEP DISCOVER");
        expect(isvalid).toBeTruthy();

        //VISA
        await this.CardPayment("ADV DEP VISA", "VISA", "25");
        isvalid = await this.validatePosteddepositAmount("25", "ADV DEP VISA");
        expect(isvalid).toBeTruthy();

        let closeElm = await this.resPO.closeDepositBtn();
        await closeElm.click();
        await this.comPO.WaitForPageLoad();

        return true;

    }

    validatePosteddepositAmount = async (paidAmt, type) => {
        let rows = await this.page.$$('.ngRow');
        for (var i = 0; i < rows.length; i++) {
            let cells = await rows[i].$$('.ngCellText');
            let amount = await cells[5].innerText();
            let paid = amount.replace(/[()$]/g, ' ').split('.')[0].trim();
            let payType = await cells[6].innerText();
            if (paid == paidAmt && type == payType)
                return true;
        }
        return false;
    }

    postDepostForCash = async () => {
        let depositDetailsBtn = await this.resPO.depositDetailsElm();
        await depositDetailsBtn.click();
        await this.comPO.WaitForPageLoad();

        //CASH
        await this.CardPayment("ADV DEP CASH", "CASH", "8");
        let isvalid = await this.validatePosteddepositAmount("8", "ADV DEP CASH");
        expect(isvalid).toBeTruthy();

    }

    VoidDeposit = async () => {

        let rows = await this.page.$$('.ngRow');
        let cells = await rows[0].$$('.ngCellText');
        await cells[0].click();
        await this.page.waitForTimeout(500);
        let voidBtn = await this.resPO.voidDepositBtn();
        await voidBtn.click();
        await this.comPO.WaitForPageLoad();

        let reasonElm = await this.resPO.voidDepositReasonElm();
        await reasonElm.fill("void");
        let reasonPOst = await this.resPO.voidReasonPostBtn();
        await reasonPOst.click();
        await this.comPO.WaitForPageLoad();

        let error = await this.comPO.IsErrorMessageExist();
        expect(error).toBeFalsy();
        await this.comPO.WaitForPageLoad();

        // Retry for voided amount
        rows = await this.page.$$('.ngRow');
        cells = await rows[0].$$('.ngCellText');
        await cells[0].click();
        await this.page.waitForTimeout(500);
        voidBtn = await this.resPO.voidDepositBtn();
        await voidBtn.click();
        await this.comPO.WaitForPageLoad();
        reasonElm = await this.resPO.voidDepositReasonElm();
        await reasonElm.fill("void");
        reasonPOst = await this.resPO.voidReasonPostBtn();
        await reasonPOst.click();
        await this.comPO.WaitForPageLoad();

        error = await this.comPO.IsErrorMessageExist();
        expect(error).toBeTruthy();
        let closeReasonElm = await this.resPO.voidReasonCloseBtn();
        await closeReasonElm.click();

        let closeElm = await this.resPO.closeDepositBtn();
        await closeElm.click();
        await this.comPO.WaitForPageLoad();

        return true;
    }

    RefundDeposit = async () => {

        let rows = await this.page.$$('.ngRow');
        let cells = await rows[0].$$('.ngCellText');
        await cells[0].click();
        await this.page.waitForTimeout(500);
        let refundBtn = await this.resPO.refundDepositBtn();
        await refundBtn.click();
        await this.comPO.WaitForPageLoad();

        let paymentTypeelm = await this.resPO.refundPaymentTypeElm();
        await paymentTypeelm.selectOption({ label: "Cash" });
        await this.comPO.WaitForPageLoad();

        let refundPostElm = await this.resPO.refundPostElm();
        await refundPostElm.click();

        let error = await this.comPO.IsErrorMessageExist();
        expect(error).toBeFalsy();
        await this.comPO.WaitForPageLoad();

        // Retry for voided amount
        rows = await this.page.$$('.ngRow');
        cells = await rows[0].$$('.ngCellText');
        await cells[0].click();
        await this.page.waitForTimeout(500);

        refundBtn = await this.resPO.refundDepositBtn();
        await refundBtn.click();
        await this.comPO.WaitForPageLoad();

        error = await this.comPO.IsErrorMessageExist();
        expect(error).toBeTruthy();

        let refundCloseBtn = await this.resPO.refundCancelElm();
        await refundCloseBtn.click();
        await this.comPO.WaitForPageLoad();

        let closeElm = await this.resPO.closeDepositBtn();
        await closeElm.click();
        await this.comPO.WaitForPageLoad();

        return true;
    }

    AddAiportPickupAndDropOff = async () => {
        let arrivalDateElm = await this.resPO.arrivalDateInputElm();
        let arrivalDate = await arrivalDateElm.inputValue();
        let departureDateElm = await this.resPO.departureDateElm();
        let dropDate = await departureDateElm.inputValue();

        let airportBtn = await this.resPO.airportElm();
        await airportBtn.click();
        await this.comPO.WaitForPageLoad();

        //Fill Pickup
        let pickupAirportElm = await this.resPO.pickeupAirportElm();
        await pickupAirportElm.fill("JFK");

        let pickupAirlineElm = await this.resPO.pickupAirlineElm();
        await pickupAirlineElm.fill("5");

        let pickupFlightelm = await this.resPO.pickupFlightNoElm();
        await pickupFlightelm.fill("9");

        let pickupdateElm = await this.resPO.pickupDateElm();
        await pickupdateElm.fill(arrivalDate);
        await (await this.comPO.calendarDoneBtn()).click();
        await this.page.waitForTimeout(500);
        let pickupTimeElm = await this.resPO.pickupTimeElm();
        await pickupTimeElm.type("1100PM");

        //Fill drop off
        let dropAirportElm = await this.resPO.dropAirportElm();
        await dropAirportElm.fill("ORD");

        let dropAirlineElm = await this.resPO.dropAirlineElm();
        await dropAirlineElm.fill("7");

        let dropFlightelm = await this.resPO.dropFlightNoElm();
        await dropFlightelm.fill("3");

        let dropdateElm = await this.resPO.dropDateElm();
        await dropdateElm.fill(dropDate);
        await dropFlightelm.click();
        await this.page.waitForTimeout(500);
        let dropTimeElm = await this.resPO.dropTimeElm();
        await dropTimeElm.type("1000AM");

        let saveBtn = await this.resPO.airportSaveElm();
        await saveBtn.click();
        await this.comPO.WaitForPageLoad();
        let error = await this.comPO.IsErrorMessageExist();
        expect(error).toBeFalsy();

        return true;
    }
    ClearTheAirportSchedule = async () => {
        let clearBtn1 = await this.resPO.pickupClearElm();
        let clearBtn2 = await this.resPO.dropClearElm();
        await clearBtn1.click();
        await this.comPO.WaitForPageLoad();
        await clearBtn2.click();
        await this.comPO.WaitForPageLoad();
        let error = await this.comPO.IsErrorMessageExist();
        expect(error).toBeFalsy();

        let closebtn = await this.resPO.airportCloseElm();
        await closebtn.click();
        await this.comPO.WaitForPageLoad();
    }

    ValidateAirport = async (isEmpty: boolean) => {
        let arrivalDateElm = await this.resPO.arrivalDateInputElm();
        let arrivalDate = await arrivalDateElm.inputValue();
        let departureDateElm = await this.resPO.departureDateElm();
        let departureDate = await departureDateElm.inputValue();

        let airportBtn = await this.resPO.airportElm();
        await airportBtn.click();
        await this.comPO.WaitForPageLoad();

        let pickupAirport = await (await this.resPO.pickeupAirportElm()).inputValue();
        let pickupAirline = await (await this.resPO.pickupAirlineElm()).inputValue();
        let pickupFlightNo = await (await this.resPO.pickupFlightNoElm()).inputValue();
        let pickupDate = await (await this.resPO.pickupDateElm()).inputValue();
        let pickupTime = await (await this.resPO.pickupTimeElm()).inputValue();
        let dropAirport = await (await this.resPO.dropAirportElm()).inputValue();
        let dropAirline = await (await this.resPO.dropAirlineElm()).inputValue();
        let dropFlightNo = await (await this.resPO.dropFlightNoElm()).inputValue();
        let dropDate = await (await this.resPO.dropDateElm()).inputValue();
        let dropTime = await (await this.resPO.dropTimeElm()).inputValue();
        if (!isEmpty) {

            expect(pickupAirport).toEqual("JFK");
            expect(pickupAirline).toEqual("5");
            expect(pickupFlightNo).toEqual("9");
            expect(pickupDate).toEqual(arrivalDate);
            expect(pickupTime).toEqual("23:00:00.000");
            expect(dropAirport).toEqual("ORD");
            expect(dropAirline).toEqual("7");
            expect(dropFlightNo).toEqual("3");
            expect(dropDate).toEqual(departureDate);
            expect(dropTime).toEqual("10:00:00.000");
        } else {
            expect(pickupAirport).toEqual("");
            expect(pickupAirline).toEqual("");
            expect(pickupFlightNo).toEqual("");
            expect(pickupDate).toEqual("");
            expect(pickupTime).toEqual("");
            expect(dropAirport).toEqual("");
            expect(dropAirline).toEqual("");
            expect(dropFlightNo).toEqual("");
            expect(dropDate).toEqual("");
            expect(dropTime).toEqual("");
        }
    }


    AddCarDriverLicense = async () => {
        let carDLelm = await this.resPO.carDLElm();
        await carDLelm.click();
        await this.comPO.WaitForPageLoad();

        let carMakeElm = await this.resPO.carMakeElm();
        await carMakeElm.fill("Ford77");

        let caryearElm = await this.resPO.carYearElm();
        await caryearElm.fill("2021");

        let carlicense = await this.resPO.carLienceElm();
        await carlicense.fill('123456');

        let carStateelm = await this.resPO.carStateElm();
        await carStateelm.fill('TX');

        let carDrivingLicense = await this.resPO.carDriverLicenceElm();
        await carDrivingLicense.fill("456545");

        let carDrivingLicenseState = await this.resPO.carDriverLicenceStateElm();
        await carDrivingLicenseState.fill("AK");

        let save = await this.resPO.carSaveElm();
        await save.click();
        await this.comPO.WaitForPageLoad();

        let error = await this.comPO.IsErrorMessageExist();
        expect(error).toBeFalsy();
    }

    VerifyCarDriverLicense = async () => {
        let carDLelm = await this.resPO.carDLElm();
        await carDLelm.click();
        await this.comPO.WaitForPageLoad();
        let make = await (await this.resPO.carMakeElm()).inputValue();
        let year = await (await this.resPO.carYearElm()).inputValue();
        let license = await (await this.resPO.carLienceElm()).inputValue();
        let state = await (await this.resPO.carStateElm()).inputValue();
        let dl = await (await this.resPO.carDriverLicenceElm()).inputValue();
        let dlState = await (await this.resPO.carDriverLicenceStateElm()).inputValue();

        expect(make).toEqual("Ford77");
        expect(year).toEqual("2021");
        expect(license).toEqual("123456");
        expect(state).toEqual("TX");
        expect(dl).toEqual("456545");
        expect(dlState).toEqual("AK");

        let closebtn = await this.resPO.carCloseElm();
        await closebtn.click();
        await this.comPO.WaitForPageLoad();
    }

    CreateSpecialRequest=async()=>{
        let specReqBtn=await this.resPO.specialReqBtnElm();
        await specReqBtn.click();
        await this.comPO.WaitForPageLoad();

        let newBtn=await this.resPO.specReqNewBtnElm();
        await newBtn.click();

        let dateElm=await this.resPO.specialReqDateElm();
        let dateOptions=await this.resPO.specialReqDateOptionsElm();
        let rndDate=this.helper.Number(0,dateOptions.length-1);
        await dateElm.selectOption({label:dateOptions[rndDate]});

        let depElm=await this.resPO.specialReqDepElm();
        let depOptions=await this.resPO.specialReqDepOptionsElm();
        let rndDep=this.helper.Number(0,depOptions.length-1);
        await depElm.selectOption({label:depOptions[rndDep]});

        let rndNum=this.helper.Number(100,999);
        let inputElm=await this.resPO.specialReqInputElm();
        let reqData="Special Req "+rndNum;
        await inputElm.fill(reqData);

        let save=await this.resPO.specReqSaveElm();
        await save.click();
        await this.comPO.WaitForPageLoad();

        //reopen the popup
        specReqBtn=await this.resPO.specialReqBtnElm();
        await specReqBtn.click();
        await this.comPO.WaitForPageLoad();

        let rows=await this.page.$$('.ngRow');

        let isPersisted = false;
        for (var i = 0; i < rows.length; i++) {
            let cells = await rows[i].$$('.ngCellText');
            let text = await cells[4].innerText();
            if(text==reqData){
                isPersisted=true;
            }
            expect(isPersisted).toBeTruthy();
            await cells[1].click();

             cells = await rows[i].$$('.ngCell');
             let ddl=await cells[1].$('.form-control');
             await ddl.selectOption({label:'Filled'});
             await this.comPO.WaitForPageLoad();
             await cells[2].click();
             break;
        }
        let closeSpecReq = await this.resPO.specReqCloseElm();
        await closeSpecReq.click();
        await this.comPO.WaitForPageLoad();
        
        
        await this.comBL.NavigateToSupervisorSepcialReq();
        await this.comPO.WaitForPageLoad();

        let dep=await this.resPO.supSpecialRqDepElm();
        await dep.selectOption({label:depOptions[rndDep]});

        let startDateElm=await this.resPO.supSpecialRqStartDateElm();
        await startDateElm.fill(dateOptions[rndDate]);

        let endDate=moment().format('MM/DD/YY');
        let endDateElm=await this.resPO.supSpecialRqEndDateElm();
       await endDateElm.fill(endDate);

        let refreshBtn=await this.resPO.supSpecialRqRefreshElm();
        await  refreshBtn.click();
        await this.comPO.WaitForPageLoad();
        isPersisted=false;
        rows=await this.page.$$('.ngRow');
        for (var i = 0; i < rows.length; i++) {
            let cells = await rows[i].$$('.ngCellText');
            let text = await cells[8].innerText();
            if (text == reqData) {
                isPersisted = true;
                let staus = await cells[1].innerText();
                expect(staus).toEqual("Filled");
                break;
            }        
        }
        expect(isPersisted).toBeTruthy();

    }

    AddPackagesAndVerify=async()=>{
        let packageBtn = await this.resPO.multiPackagesElm();
        await packageBtn.click();
        await this.comPO.WaitForPageLoad();
        let dateElm = await this.resPO.packageDateSelectionElm();
        let packageItemElm = await this.resPO.packageItemSelectionElm();
        let items = await this.resPO.packageItemListElm();
        let addBtn = await this.resPO.packageAddNewElm();
        let ispackageAvail=false;
        for (var i = 0; i < items.length; i++) {
            await packageItemElm.selectOption({ label: items[i] });
            await addBtn.click();
            await this.comPO.WaitForPageLoad();
            let error=await this.comPO.IsErrorMessageExist();
            if(error==false){
                ispackageAvail=true;
                break;
            }
        }

        if(!ispackageAvail)
        test.skip();

        let closebtn=await this.resPO.packageCloseElm();
        await closebtn.click();
        await this.comPO.WaitForPageLoad();

        packageBtn = await this.resPO.multiPackagesElm();
        await packageBtn.click();
        await this.comPO.WaitForPageLoad();

        let rows=await this.page.$$('.ngRow');
        expect(rows.length>0).toBeTruthy();

        closebtn=await this.resPO.packageCloseElm();
        await closebtn.click();
        await this.comPO.WaitForPageLoad();
    }

    AddNewMessageAndValidate=async()=>{
        let msgBtn=await this.resPO.meassageElm();
        await msgBtn.click();
        await this.comPO.WaitForPageLoad();

        let newMsgBtn=await this.resPO.newMsgBtn();
        await newMsgBtn.click();
        let rndNum=this.helper.Number(10000,99999);
        let message="message-"+rndNum;

        let textarea=await this.resPO.messageInputBtn();
        await textarea.fill(message);
        let saveBtn=await this.resPO.messageSendBtn();
        await saveBtn.click();

        await this.comPO.WaitForPageLoad();

        let closebtn=await this.resPO.messageCloseBtn();
        await closebtn.click();

        msgBtn=await this.resPO.meassageElm();
        await msgBtn.click();
        await this.comPO.WaitForPageLoad();

        let messages = await this.resPO.messagesList();
        let isPersisted = false;
        for (var i = 0; i < messages.length; i++) {
            if (messages[i] == message) {
                isPersisted = true;
                break;
            }
        }

        closebtn = await this.resPO.messageCloseBtn();
        await closebtn.click();
        expect(isPersisted).toBeTruthy();
        return message;
    }

    VerifiyMessageInPBXguest = async (message) => {

        let lastNameElm = await this.resPO.lastNameInputElm();
        let lastName = await lastNameElm.inputValue();

        await this.comBL.NavigateToPBX_guest();
        await this.comPO.WaitForPageLoad();

        let guestElm=await this.resPO.pbxGuestLastNameElm();
        await  guestElm.fill(lastName);
        await this.page.keyboard.press("Tab");
        await this.comPO.WaitForPageLoad();

        let guestRows=await this.resPO.pbxGuestRows();
        let guestCells=await guestRows[0].$$('.ngCell');
        await guestCells[0].click();
        await this.comPO.WaitForPageLoad();


        let msgRows=await this.resPO.pbxMessageRows();
        let isPersisted = false;
        for (var i = 0; i < msgRows.length; i++) {
            let msgCells=await msgRows[0].$$('.ngCellText');
            let msg=await msgCells[0].innerText();
            if (msg == message) {
                isPersisted = true;
                break;
            }
        }
       
        expect(isPersisted).toBeTruthy();
    }

    VerifyReservationInPBXarrivals=async(confNo)=>{
        await this.comBL.NavigateToPBX_arrivals();
        await this.comPO.WaitForPageLoad();

        let searchOptElm=await  this.resPO.arrivalsSearchElm();
        await searchOptElm.selectOption({label:"Confirmation #"});

        let filterElm=await this.resPO.arrivalsFilterTxtElm();
        await filterElm.fill(confNo);

        let refreshBtn=await this.resPO.arrivalsRefreshElm();
        await refreshBtn.click();
        await this.comPO.WaitForPageLoad();

        let rows=await this.page.$$('.ngRow');
        expect(rows.length>0).toBeTruthy();

    }

    CancelReservation=async()=>{
        let cancelBtn=await this.resPO.cancelElm();
        if(cancelBtn!=null){
            await cancelBtn.click();
            await this.comPO.WaitForPageLoad();

            let modelTitle = await this.comPO.IsModelPopupExist();
            if (modelTitle != null) {
                if(modelTitle.includes("Are you sure you want to cancel creation of this reservation?")){
                    let okBtn = await this.page.$('button:has-text("Yes")');
                    await okBtn.click();
                    await this.comPO.WaitForPageLoad();
                    return;
                }              
            }
        }

        let statusElm=await this.resPO.statusElm();
        let status=await statusElm.inputValue();
        if(status=="NEW"){

            let confNo=await this.page.$eval("#txtResId", e => e.value);
            if(confNo!=""){
                await (await this.resPO.lastNameInputElm()).fill("test");
                await (await this.resPO.firstNameInputElm()).fill("firstName");
                let cityElm = await this.resPO.cityInpuElm();
                await cityElm.click();
                await this.comPO.WaitForPageLoad();
                await this.page.waitForTimeout(1000);
                await (await this.resPO.addGuestProfileBtnElm()).click();
                await (await this.resPO.address1InputElm()).fill("address1");
                await (await this.resPO.cityInpuElm()).fill("city");
                await (await this.resPO.stateInpuElm()).fill("state");
                await (await this.resPO.zipInpuElm()).fill("780009");

                await this.FillMarketingInfo();
                await this.Save();
            }
            else{
                cancelBtn=await this.resPO.cancelElm();
                if(cancelBtn!=null){
                    await cancelBtn.click();
                    await this.comPO.WaitForPageLoad();
        
                    let modelTitle = await this.comPO.IsModelPopupExist();
                    if (modelTitle != null) {
                        if(modelTitle.includes("Are you sure you want to cancel creation of this reservation?")){
                            let okBtn = await this.page.$('button:has-text("Yes")');
                            await okBtn.click();
                            await this.comPO.WaitForPageLoad();
                            return;
                        }              
                    }
                }
            }
        }

        let toolbox = await this.resPO.toolBoxElm();
        await toolbox.hover({ force: true, position: { x: 3, y: 3 } });
        let cancelResBtn = await this.resPO.cancelResElm();
        await cancelResBtn.click();
        await this.comPO.WaitForPageLoad();

        let modelTitle = await this.comPO.IsModelPopupExist();
        if (modelTitle != null) {
            if (modelTitle.includes("This Reservation is NOT within the allowable cancellation period")) {
                let okBtn = await this.page.$('button:has-text("Yes")');
                await okBtn.click();
                await this.comPO.WaitForPageLoad();
                
            }
        }

        // refund advance deposit
        let isRefund = await this.page.$("h3:has-text('Refund Advanced Deposit')");
        if (isRefund != null) {
            let paySelection = await this.resPO.refundPaymentTypeElm();
            await paySelection.selectOption({ label: "Cash" });
            let refundPostElm = await this.resPO.refundPostElm();
            await refundPostElm.click();
            await this.comPO.WaitForPageLoad();
            modelTitle = await this.comPO.IsModelPopupExist();
            if (modelTitle != null) {
                if (modelTitle.includes("This Reservation is NOT within the allowable cancellation period")) {
                    let okBtn = await this.page.$('button:has-text("Yes")');
                    await okBtn.click();
                    await this.comPO.WaitForPageLoad();

                }
            }
        }

        modelTitle = await this.comPO.IsModelPopupExist();
        if (modelTitle != null) {
            if (modelTitle.includes("Please enter reason for cancellation.")) {
                let input=await this.page.$('.bootbox-input-text');
                await input.fill("Cleanup");

                let okBtn = await this.page.$('button:has-text("OK")');
                await okBtn.click();
                await this.comPO.WaitForPageLoad();              
            }
        }
    }
}