import { Page } from "playwright";

export default class ReservationPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

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
    languageElm = async () =>await this.page.$('#cboLanguage');
    confirmationDeliveryElm = async () =>await this.page.$('#cboConfDelivery');
    textMsgCheckboxElm = async () =>await this.page.$('input[data-ng-model="$parent.$parent.guestReservation.reservationGuestInfoModel.guestHistoryModel.allowNotificatio"]')
    customLetterElm = async () =>await this.page.$('#cboCusLetter');

    phone1extensiontElm = async () =>await this.page.$('$parent.$parent.guestReservation.reservationGuestInfoModel.guestHistoryModel.areaCode')
    phone1inputElm = async () =>await this.page.$('$parent.$parent.guestReservation.reservationGuestInfoModel.guestHistoryModel.telephone')
    emailinputElm = async () =>await this.page.$('#txtEmail')

    txtCommentInputElm = async () =>await this.page.$('#txtComment')
    hskInstructionInputElm = async () =>await this.page.$('#txtHskpInstruction')
    internalCommentInputElm = async () =>await this.page.$('#txtInternalComment')


    segmentSelectionElm = async () =>await this.page.$('#cboSegment');
    segmentOptions=async()=>await this.page.$$('#cboSegment>option');
    referralSelectionElm = async () =>await this.page.$('#cboReferralMethod');
    referralOptions=async()=>await this.page.$$('#cboReferralMethod>option');
    reasonForStayElm = async () =>await this.page.$('#cboReasonForStay');
    reasonOptions=async()=>await this.page.$$('#cboReasonForStay>option');

    arrivalDateInputElm = async () =>await this.page.$('#txtArrivalDate');
    checkinTimeElm = async () =>await this.page.$('#checkInTime');
    numberOfNightInputElm = async () =>await this.page.$('#txtNumberOfNights');
    roomTypeElm = async () =>await this.page.$('#cboRoomType');
    roomTypeOptions=async()=>await this.page.$$('#cboRoomType>option');
    roomTypeOptionsText=async()=>await this.page.$$eval('#cboRoomType>option', e => e.map(e => e.textContent));

    waitForStatusElm=async()=>await this.page.waitForSelector('#txtStatus',{timeout:60000});
    statusElm = async () =>await this.page.$('#txtStatus');
    roomKeyElm = async () =>await this.page.$('button[ng-data-click="guestReservation.showCreateRoomKeyModal()"]');
    mobileKeyElm = async () =>await this.page.$('button[ng-data-click="guestReservation.showCreateMobileKeyModal()"]');
    noOfRoomsElm = async () =>await this.page.$('#txtNumberOfRooms');
    departureDateElm = async () =>await this.page.$('#txtDepartureDate');

    companyElm = async () =>await this.page.$('#cboCompany');
    addCompanyElm = async () =>await this.page.$('#btnAddCompany');
    adultsElm = async () =>await this.page.$('#txtAdults');
    childrenElm = async () =>await this.page.$('#txtKids');

    dnmCHeckboxElm = async () =>await this.page.$('[data-ng-model="$parent.$parent.guestReservation.reservationGuestInfoModel.reservationModel.doNotMove"]');
    roomNoElm = async () =>await this.page.$('#cboRoom');
    roomNoOptionTextElm = async () =>await this.page.$$eval('#cboRoom>option', e => e.map(e => e.textContent));
   
    buttonRoomChartElm = async () =>await this.page.$('#btnRoomChart');
    iataElm = async () =>await this.page.$('#cboTravelAgent');
    travelAgentAddElm = async () =>await this.page.$('#btnAddTravelAgent');
    specialReqElm = async () =>await this.page.$('#txtSpecialRequest');
    specialReqBtnElm = async () =>await this.page.$('#btnShowSpecialReq');
    resMadeByElm = async () =>await this.page.$('#txtResMadeBy');

    resMadeByPhoneExtensiontElm = async () =>await this.page.$('#txtMadeByAreaCode')
    resMadeByPhoneInputElm = async () =>await this.page.$('#txtMadeByTelePhone')
    groupNameElm = async () =>await this.page.$('#txtGroupName')

    rateTypeElm = async () =>await this.page.$('#cboRateType')
    rateDetailsElm = async () =>await this.page.$('#btnRateDetails')

    actualWeekDayRateElm = async () =>await this.page.$('#txtActualWeekDayRate')
    actualWeekEndRateElm = async () =>await this.page.$('#txtActualWeekEndRate')

    ratePrivateElm = async () =>await this.page.$('#cboRatePrivate')
    multiRoomResElm = async () =>await this.page.$('#txtMultiRoomRes')
    
    overrideWeekDayRateElm = async () =>await this.page.$('#txtOverrideWeekDayRate')
    taxStatusElm = async () =>await this.page.$('#txtTaxStatus')
    excemptElm = async () =>await this.page.$('#btnExempt')

    weekDayRateElm = async () =>await this.page.$('#txtWeekDayRate')
    weekEndRateElm = async () =>await this.page.$('#txtWeekEndRate')

    weekDayDiscountCodeElm = async () =>await this.page.$('#cboWeekDayDiscountCode')
    weekEndDiscountCodeElm = async () =>await this.page.$('#cboWeekEndDiscountCode')

    extras1Elm = async () =>await this.page.$('select[data-ng-model="guestReservation.reservationGuestInfoModel.reservationModel.extraOneId"]')
    extras2Elm = async () =>await this.page.$('cboExtraTwo')

    multiPackagesElm = async () =>await this.page.$('#btnMultiple')


    totalsElm = async () =>await this.page.$('#txtTotal')
    paymentDepositElm = async () =>await this.page.$('#txtDeposit')
    balanceElm = async () =>await this.page.$('#txtBalance')
    activityChargesElm = async () =>await this.page.$('#txtTotalActivityCharges')

    paymentElm = async () =>await this.page.$('#cboPaymentMethod');

    resIDElm = async () =>await this.page.$('#txtResId')

    centralConfirmationNOElm = async () =>await this.page.$('#txtCentralConfNumber')
    
    thirdPartyConfirmationNOElm = async () =>await this.page.$('#txtThirdPartyConf')

    guaranteeTypeElm = async () =>await this.page.$('#cboGuaranteeType')
    cancelRegElm = async () =>await this.page.$('#txtCancelReq')
    saveElm=async()=> await this.page.$('#btnSave');
cancelElm= async()=>await this.page.$('#btnCancel');

    // ==== Side toolbar button

    searchBtnElm=async()=>await this.page.$('button[data-ng-click="guestReservation.showSearch()"]');
    toolBoxElm=async()=> await this.page.$('#spnRightToolsMenu');
    checkInButtonElm=async()=> await this.page.$('#btnGuesttoolboxcheckin');
    viewFolioButtonElm=async()=> await this.page.$('#btnViewFolio');
    reactivateButtonElm=async()=> await this.page.$('#btnReactivate');
    duplicateButtonElm=async()=> await this.page.$('#btnDuplicate');
    cancelResElm=async()=> await this.page.$('#btnCanel');
    undoCheckinElm=async()=> await this.page.$('#btnUndoCheckIn');
    printRegCardElm=async()=> await this.page.$('#btnPrintRegCard');
    confirmLetterElm=async()=> await this.page.$('#btnConfirmLetter');
    proformaElm=async()=> await this.page.$('#btnProforma');
    advanceDepositElm=async()=> await this.page.$('#btnShowAdvanceDeposit');
    resendRoomsReadyTextElm=async()=> await this.page.$('#btnResendRoomReadyText');
    GuestAccountElm=async()=> await this.page.$('#btnShowGuestAccount');
    modificationDetailsElm=async()=>await this.page.$('#btnShowModDetail');
    depositDetailsElm=async()=>await this.page.$('#btnGuestDepositDetails');
    rateDetailsToolElm=async()=>await this.page.$('#btnGuestRateDetails"');
    airportElm=async()=>await this.page.$('button[data-ng-click="guestReservation.showAirportSchedule()"]');
    carDLElm=async()=>await this.page.$('#btnCarDLDetails');
    meassageElm=async()=>await this.page.$('#btnShowguestMessages');
    activityElm=async()=>await this.page.$('#btnGuestActivities');
    specialReqToolElm=async()=>await this.page.$('#btnSpecialRequest');
    historyToolElm=async()=>await this.page.$('#btnGuestHistory');


    //==== Special request 
    specialReqMenuElm=async()=>await this.page.$('#btnSpecialRequest');
    specReqNewBtnElm=async()=>await this.page.$('button[data-ng-click="visSpecialRequest.createNew()"]');
    specialReqDateElm=async()=>await this.page.$('select[data-ng-model="visSpecialRequest.data.date"]');
    specialReqDateOptionsElm=async()=>await this.page.$$eval('select[data-ng-model="visSpecialRequest.data.date"]>option', e => e.map(e => e.textContent));
    specialReqDepElm=async()=>await this.page.$('select[data-ng-model="visSpecialRequest.data.department"]');
    specialReqDepOptionsElm=async()=>await this.page.$$eval('select[data-ng-model="visSpecialRequest.data.department"]>option', e => e.map(e => e.textContent));
    specialReqInputElm=async()=>await this.page.$('textarea[data-ng-model="visSpecialRequest.data.requestData"]');
    specReqSaveElm=async()=>await this.page.$('button[data-ng-click="visSpecialRequest.save(visSpecialRequest)"]');
    specReqCancelElm=async()=>await this.page.$('button[data-ng-click="visSpecialRequest.cancel()"]');
    specReqCloseElm=async()=>await this.page.$('button[data-ng-click="button.click(modalScope)"]');


    //==== Supervisor Special Request
    supSpecialRqStartDateElm = async () => await this.page.$('#txtStartDate');
    supSpecialRqEndDateElm = async () => await this.page.$('#txtEndDate');
    supSpecialRqRefreshElm = async () => await this.page.$('#btnRefresh');
    supSpecialRqDepElm = async () => await this.page.$('#selDepartment');


    //==== Checkin Popup
    checkInPaymentTypeElm = async () =>await this.page.$('#cboCheckinMethodOfPayment');
    waitForPaymentTypeElm=async()=>await this.page.waitForSelector('#cboCheckinMethodOfPayment',{timeout:60000});
    checkInPayOptionTextElm = async () =>await this.page.$$eval('#cboCheckinMethodOfPayment>option', e => e.map(e => e.textContent));
    checkInPrepaidDepositElm = async () =>await this.page.$('#txtCheckinPrepaidDeposit');
    checkInRemainingElm = async () =>await this.page.$('#txtCheckinPresentedAmount');
    checkInAmountPaidElm = async () =>await this.page.$('#txtCheckinAmountPaid');
    checkInAmountReceivedElm = async () =>await this.page.$('#txtCheckinAmountReceived');
    checkInGuestChangeElm = async () =>await this.page.$('#txtCheckinGuestChange');
    checkInOKbtn=async () =>await this.page.$('button[data-ng-click="checkIn.doCheckIn()"]');
    checkInCancelbtn=async () =>await this.page.$('button[data-ng-click="checkIn.close()"]');

    // Deposit Details
    refundDepositBtn=async ()=>this.page.$("button[data-ng-click='froResDeposit.refund()']");
    voidDepositBtn=async ()=>this.page.$("button[data-ng-click='froResDeposit.voidDeposit()']");
    advanceDepositBtn=async ()=>this.page.$("button[data-ng-click='froResDeposit.advanceDeposit()']");
    printDepositBtn=async ()=>this.page.$("button[data-ng-click='froResDeposit.print()']");
    closeDepositBtn=async ()=>this.page.$("button[data-ng-click='froResDeposit.cancel()']");
    voidDepositReasonElm=async ()=>this.page.$("input[data-ng-model='froResVoidDeposit.voidReason']");
    voidReasonPostBtn=async ()=>this.page.$("button[data-ng-click='froResVoidDeposit.voidAdvance()']");
    voidReasonCloseBtn=async ()=>this.page.$("button[data-ng-click='froResVoidDeposit.close()']");

    //Refund Popup
    refundPaymentTypeElm=async ()=>this.page.$("select[data-ng-model='refundMethodId']");
    refundPostElm=async ()=>this.page.$("#btnAdvDepositPost");
    refundCancelElm=async ()=>this.page.$("#btnAdvDepositCancel");

    //Airport schedule
    pickeupAirportElm=async ()=>this.page.$("input[data-ng-model='airport.pickUp.airport']");
    pickupAirlineElm=async ()=>this.page.$("input[data-ng-model='airport.pickUp.airLine']");
    pickupFlightNoElm=async ()=>this.page.$("input[data-ng-model='airport.pickUp.flightNumber']");
    pickupDateElm=async ()=>this.page.$("#pickDate");
    pickupTimeElm=async ()=>this.page.$("#picktime");
    pickupClearElm=async ()=>{
        let clear=await this.page.$$("button:has-text('Clear')");
        return clear[0];
    };

    dropAirportElm=async ()=>this.page.$("input[data-ng-model='airport.dropOff.airport']");
    dropAirlineElm=async ()=>this.page.$("input[data-ng-model='airport.dropOff.airLine']");
    dropFlightNoElm=async ()=>this.page.$("input[data-ng-model='airport.dropOff.flightNumber']");
    dropDateElm=async ()=>this.page.$("#dropDate");
    dropTimeElm=async ()=>this.page.$("#droptime");
    dropClearElm=async ()=>{
        let clear=await this.page.$$("button:has-text('Clear')");
        return clear[1];
    };
    airportSaveElm=async ()=>this.page.$("button[data-ng-click='save()']");
    airportCloseElm=async ()=>this.page.$("button[data-ng-click='cancel()']");

    // Car D/L
    carMakeElm=async ()=>this.page.$("input[data-ng-model='carDLDetails.carDetails.carMake']");
    carYearElm=async ()=>this.page.$("input[data-ng-model='carDLDetails.carDetails.carYear']");
    carLienceElm=async ()=>this.page.$("input[data-ng-model='carDLDetails.carDetails.carLicense']");
    carStateElm=async ()=>this.page.$("input[data-ng-model='carDLDetails.carDetails.carState']");
    carDriverLicenceElm=async ()=>this.page.$("input[data-ng-model='carDLDetails.driverDetails.driverLicense']");
    carDriverLicenceStateElm=async ()=>this.page.$("input[data-ng-model='carDLDetails.driverDetails.driverLicenseState']");
    carSaveElm=async ()=>this.page.$("button[data-ng-click='carDLDetails.save()']");
    carCloseElm=async ()=>this.page.$("button[data-ng-click='carDLDetails.closeModal()']");

    // Multi packages
    packageDateSelectionElm=async ()=>this.page.$("select[data-ng-model='multiPackage.models.packageDateSelected']");
    packageItemSelectionElm=async ()=>this.page.$("select[data-ng-model='multiPackage.models.packageSelected']");
    packageItemListElm=async ()=>this.page.$$eval("select[data-ng-model='multiPackage.models.packageSelected']>option", e => e.map(e => e.textContent));
    packageAddNewElm=async ()=>this.page.$("button[data-ng-click='multiPackage.addNew()']");
    packageCloseElm=async ()=>this.page.$("button[data-ng-click='multiPackage.ok()']");

    //Messages
    newMsgBtn=async ()=>this.page.$("button[data-ng-click='Message.new=true']");
    messageCloseBtn=async ()=>this.page.$("button[data-ng-click='Message.close()']");
    messageInputBtn=async ()=>this.page.$("textarea[data-ng-model='Message.newMsg']");
    messageSendBtn=async ()=>this.page.$("button[data-ng-click='Message.sendMessage()']");
    messageCancelBtn=async ()=>this.page.$("button[data-ng-click='Message.new=false']");
    messagesList=async ()=>{
       
        let messages=await this.page.$$("div[data-ng-repeat='item in Message.guestMessages']");
       let msg:string[]=[];
        for(var i=0;i<messages.length;i++){
            let test=await (await messages[i].$('.message-sample')).innerText();
        msg.push(test);
        }
        return msg;
    }

    // PBX Guest
    pbxGuestLastNameElm=async()=> this.page.$("#txtGuestLName");   
    pbxGuestRows = async () => {
        let grid = await this.page.$('div[data-ng-grid="froPbxGuest.pbxGuestGridProperties"]');
        let rows = await grid.$$('.ngRow');
        return rows;
    }
    pbxMessageRows = async () => {
        let grid = await this.page.$('div[data-ng-grid="froPbxGuest.messageGridProperties"]');
        let rows = await grid.$$('.ngRow');
        return rows;
    }

    // PBX Arrivals

    arrivalsSearchElm=async ()=>this.page.$("#selSearchBy");
    arrivalsFilterTxtElm=async ()=>this.page.$("#txtSearchField");
    arrivalsRefreshElm=async ()=>this.page.$("#btnRefresh");


}