import { Page } from "playwright";
import moment from 'moment';
import CommanPage from "../common/common.page";

export default class BookResPage {
    private page: Page;
    private comPO: CommanPage;

    constructor(page: Page) {
        this.page = page;
        this.comPO = new CommanPage(page);
    }

    arrivalDateElm = async () => await this.page.$('#txtAvailArrivalDate');
   
    forwardElm = async () => await this.page.$('.fast_forward');
    backwardElm = async () => await this.page.$('.fast_backward');
    
    nightsSelectionElm = async () => await this.page.$('#cboNights');
    adultsSelectionElm = async () => await this.page.$('#cboAdults');
    childrensSelectionElm = async () => await this.page.$('#cboChildren');
    companyCodeSelectionElm = async () => await this.page.$('#cboCompanyCode');
    companyNameSelectionElm = async () => await this.page.$('#cboCompanyName');
    rateSelectionElm = async () => await this.page.$('#cboRatePlan');
    searchElm = async () => await this.page.$('button[data-ng-click="availability.search()"]');
    resetElm = async () => await this.page.$('#btnResSearchPref');
    roomTypeRows=async()=>await this.page.$$('#divInOccupancyRoomTypes');

    guestIdNoInputElm = async () =>await this.page.$('#txtGuestIncentiveCode');
    address1InputElm = async () =>await this.page.$('#txtAddress1');
    profileSelectionElm = async () =>await this.page.$('select[name="profile"]');

    address2InputElm = async () =>await this.page.$('#txtAddress2');
    phone2extensiontElm = async () =>await this.page.$('$parent.$parent.guestReservation.reservationGuestInfoModel.guestHistoryModel.faxAreaCode')
    phone2inputElm = async () =>await this.page.$('input[data-ng-model="$parent.$parent.guestReservation.reservationGuestInfoModel.guestHistoryModel.fax"]')

    waitForLastNameElm=async ()=> await this.page.waitForSelector('#txtLastName',{timeout:60000});
    lastNameInputElm = async () =>await this.page.$('#txtLastName');
    firstNameInputElm = async () =>await this.page.$('#txtFirstName');
    cityInpuElm = async () =>await this.page.$('input[data-ng-model="city"]');
    stateInpuElm = async () =>await this.page.$('input[data-ng-model="state"]');
    countryElm = async () =>await this.page.$('#cboCountry');
    zipInpuElm = async () =>await this.page.$('input[data-ng-model="zip"]');
    addGuestProfileBtnElm = async () =>await this.page.$('#btnAddNewGuestProfile');

    waitForNextBtn=async()=>await this.page.waitForSelector('button[data-ng-click="bookResWizard.next()"]',{timeout:30000});
    nextElm = async () => await this.page.$('button[data-ng-click="bookResWizard.next()"]');
    cancelElm = async () => await this.page.$('button[data-ng-click="bookResWizard.back()"]');

    segmentSelectionElm = async () =>await this.page.$('#cboSegment');
    segmentOptions=async()=>await this.page.$$('#cboSegment>option');
    referralSelectionElm = async () =>await this.page.$('#cboReferralMethod');
    referralOptions=async()=>await this.page.$$('#cboReferralMethod>option');
    reasonForStayElm = async () =>await this.page.$('#cboReasonForStay');
    reasonOptions=async()=>await this.page.$$('#cboReasonForStay>option');

    paymentselectionElm=async()=>await this.page.$$('#cboPaymentMethod');
    paymentOptionsElm=async()=>await this.page.$$('#cboPaymentMethod>option');

    roomselectionElm=async()=>await this.page.$$('#cboRoom');
    roomNoOptionsElm=async()=>await this.page.$$('#cboRoom>option');


    selectTheAvailabilityDate = async (date: string) => {
        let dateElm = await this.arrivalDateElm();
        await dateElm.fill(date);
        await this.page.keyboard.press("Tab");
        await this.comPO.WaitForPageLoad();
    }

}