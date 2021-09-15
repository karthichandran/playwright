import { expect, Page, test } from "@playwright/test";
import LoginBL from '../../businessLayer/login/Login.BL';
import ReservationBL from '../../businessLayer/frontOffice/Rservation.BL';
import CommonBL from '../../businessLayer/common/common.BL';
import RandomHelper from '../../businessLayer/util/helper';
import moment from 'moment';
import AvailabilityBL from '../../businessLayer/frontOffice/Availability.BL';
import BookResBL from '../../businessLayer/frontOffice/BookRes.BL';
import ReservationSearchBL from '../../businessLayer/frontOffice/ReservationSearch.BL';

test.describe("Reservation Tests", () => {

    let page: Page;
    let loginBL: LoginBL;
    let commonBL: CommonBL;
    let resBL: ReservationBL;
    let helper: RandomHelper;
    let availBL:AvailabilityBL;
    let bookResBl:BookResBL;
    let resSearchBL:ReservationSearchBL;
    test.beforeEach(async ({ browser }) => {
        page = await browser.newPage();
        loginBL = new LoginBL(page);
        commonBL = new CommonBL(page);
        resBL = new ReservationBL(page);
        helper = new RandomHelper();
        availBL=new AvailabilityBL(page);
        bookResBl=new BookResBL(page);
        resSearchBL=new ReservationSearchBL(page);
        await loginBL.DoLoginWithHb123();
    })
    test.afterEach(async ({ browser }) => {
        await page.close();
    })

    test("TC0001 - CreateNewReservationForToday_EnterAllFieldsAndSave_GetConfirmationNumbers", async () => {
        await commonBL.NavigateToAddReservation();
        await resBL.FillContactInformation(helper.FirstName(), helper.LastName(), helper.AddressOne(), '', '', 'United States', '75025');
        await resBL.FillMarketingInfo();
        const auditDate = await commonBL.GetAuditDate();
        await resBL.FillStayDetails(auditDate, '1', false);
        await resBL.Save();
        await resBL.VerifiyConfirmationNumberGenerated();
    });

    test("TC0002 - EnterArrivalAndNumberOfNightsAs1To5Randomly_DepartureDateShouldBeAutomaticallyPopulatedWithSaidRandomDayLater ", async () => {
        await commonBL.NavigateToAddReservation();
        await resBL.FillContactInformation(helper.FirstName(), helper.LastName(), helper.AddressOne(), '', '', 'United States', '75025');
        await resBL.FillMarketingInfo();
        const auditDate = await commonBL.GetAuditDate();
        let ranNumber = helper.Number(5, 1);
        await resBL.FillArrivalDateAndNoOFNight(auditDate, ranNumber.toString());
        await resBL.DepartureDateShouldBeMatchedWithAddedNights(auditDate, ranNumber.toString());
    });

    test("TC0003 - CreateLateCheckin", async () => {
        await commonBL.NavigateToAddReservation();
        await resBL.FillContactInformation(helper.FirstName(), helper.LastName(), helper.AddressOne(), '', '', 'United States', '75025');
        await resBL.FillMarketingInfo();
        const auditDate = await commonBL.GetAuditDate();
        let date = await commonBL.GetDateFromstring(auditDate);
        let modifiedDate = moment(date).add(-1, 'd').format('MM/DD/YY');
        await resBL.FillStayDetails(modifiedDate, '1', true);
        await resBL.Save();
        await resBL.ProceedCheckin();
        await resBL.ReservationShouldBeCheckIn();
        
    });

    test("TC0004 - CreateNewReservation_SetModeOfPaymentAsCityLedger_ModeOfPaymentShouldPersist", async () => {
        await commonBL.NavigateToAvailability();
      
        let availDate= await availBL.getDateOnRoomAvailbility();
        if(availDate==null)
        test.skip();
        await availBL.selectTheAvailabilityDate(availDate);
        await availBL.PickTheRoom();
        await availBL.PickTheRate();

        //create reservation
        await resBL.FillContactInformation(helper.FirstName(), helper.LastName(), helper.AddressOne(), '', '', 'United States', '75025');
        await resBL.FillMarketingInfo();
        await resBL.FillPaymentTypeToCityLedger();
        await resBL.Save();
        await resBL.verifyPaymentTypeToCityLedger();
    });

    test("TC0005 - CreateNewReservation_SetModeOfPaymentAsCheck_ModeOfPaymentShouldPersist", async () => {
        await commonBL.NavigateToAddReservation();
        //create reservation
        await resBL.FillContactInformation(helper.FirstName(), helper.LastName(), helper.AddressOne(), '', '', 'United States', '75025');
        await resBL.FillMarketingInfo();
        const auditDate = await commonBL.GetAuditDate();
        await resBL.FillStayDetails(auditDate, '1', true);
        await resBL.FillPaymentTypeToCheck();
        await resBL.Save();
        await page.reload();
        await page.waitForTimeout(2000);
        await resBL.verifyPaymentTypeToCheck();
    });

    test("TC0006 - CreateFutureReservation_ReservationsCannotBeCheckedIn", async () => {
        await commonBL.NavigateToAddReservation();
      
        //create reservation
        await resBL.FillContactInformation(helper.FirstName(), helper.LastName(), helper.AddressOne(), '', '', 'United States', '75025');
        await resBL.FillMarketingInfo();
        const auditDate = await commonBL.GetAuditDate();
        let date = await commonBL.GetDateFromstring(auditDate);
        let arrivalDate = moment(date).add(2, 'd').format('MM/DD/YY');
        await resBL.FillStayDetails(arrivalDate, '1', true);
        await resBL.Save();
        await page.reload();
        await page.waitForTimeout(2000);
       await resBL.isAllowingToCheckIn();
    });

    test("TC0007 - CreateReservation_SetArrivalDateLessThanAuditDateByAtleast2_ConfirmationNoCannotBeGenerated", async () => {
        await commonBL.NavigateToAddReservation();
      
        //create reservation
        await resBL.FillContactInformation(helper.FirstName(), helper.LastName(), helper.AddressOne(), '', '', 'United States', '75025');
        await resBL.FillMarketingInfo();
        const auditDate = await commonBL.GetAuditDate();
        let date = await commonBL.GetDateFromstring(auditDate);
        let arrivalDate = moment(date).add(-2, 'd').format('MM/DD/YY');
        await resBL.FillInvaliArrivalDateAndValidate(arrivalDate);
       
    });

    test("TC0008 - CreateReservation_CreateMultipleReservations_ShouldBePersisted", async () => {
        await commonBL.NavigateToAddReservation();

        //create reservation
        await resBL.FillContactInformation(helper.FirstName(), helper.LastName(), helper.AddressOne(), '', '', 'United States', '75025');
        await resBL.FillMarketingInfo();
        const auditDate = await commonBL.GetAuditDate();
        await resBL.FillStayDetails(auditDate, '1', false);
        await resBL.FillNoOfRooms("2");
        await resBL.Save();
        let confNo = await resBL.VerifiyConfirmationNumberGenerated();
        await resBL.VerifyMultiReservationGenerated(confNo);
    });

    test("TC0009 - Reservation_ChangeRoomTypeForInhouseGuest_NewRoomtypeShouldPersist", async () => {
        await commonBL.NavigateToAvailability();
        let roomTypes = await availBL.GetAvailable2RoomTypes();
        if (roomTypes == null || roomTypes.length != 2)
            test.skip();
        //create reservation
        await commonBL.NavigateToAddReservation();       
        await resBL.FillContactInformation(helper.FirstName(), helper.LastName(), helper.AddressOne(), '', '', 'United States', '75025');
        await resBL.FillMarketingInfo();
        const auditDate = await commonBL.GetAuditDate();
        await resBL.FillStayDetails(auditDate, '1', true, roomTypes[0]);
        await resBL.Save();
        await resBL.DoCheckIn();
        await resBL.ProceedCheckin();
        let confNo = await resBL.VerifiyConfirmationNumberGenerated();
        let isRoomTpeChanged = await resBL.SelectRoomType( roomTypes[1]);
        expect(isRoomTpeChanged).toBeTruthy();
    });

    test("TC0010 - Reservation_ChangingMOPOnACheckedInRes_TheStatusShouldRemainIN", async () => {
       
        //create reservation
        await commonBL.NavigateToAddReservation();       
        await resBL.FillContactInformation(helper.FirstName(), helper.LastName(), helper.AddressOne(), '', '', 'United States', '75025');
        await resBL.FillMarketingInfo();
        const auditDate = await commonBL.GetAuditDate();
        await resBL.FillStayDetails(auditDate, '1', true);
        await resBL.Save();
        await resBL.DoCheckIn();
        await resBL.ProceedCheckin();
        let confNo = await resBL.VerifiyConfirmationNumberGenerated();
        await resBL.FillPaymentTypeToCheck();
        await page.reload();
        await page.waitForTimeout(2000);
        await resBL.verifyPaymentTypeToCheck();
    });

    test("TC0011 - CreateReservationChangeDepartureDate_ExtendingAReservationShouldBeSimpleWhenTheRoomsAreAvailable", async () => {
       
        //create reservation
        await commonBL.NavigateToBookRes();  
        await bookResBl.SelectNoOfNights("2");
        await bookResBl.ClickSearchBtn();
        await bookResBl.PickTheRoom();   
        await bookResBl.FillContactInformation(helper.FirstName(), helper.LastName(), helper.AddressOne(), '', '', 'United States', '75025');
        await bookResBl.ClickNext();
        await bookResBl.FillMarketingInfo();
        await bookResBl.ClickNext();
        let confNo = await resBL.VerifiyConfirmationNumberGenerated();     
        await resBL.SetNoOfNights("2");
          let error=await commonBL.IsErrorAppeared();
          expect(error).toBeFalsy();

    });

    test("TC0012 - Reservation_PostDepositByEachMethod_AmountShouldPersist", async () => {
test.skip()// Note :amex is not working
        await commonBL.NavigateToResSearch();
        let isAvailable = await resSearchBL.OpenPendingReservtion();
        if (!isAvailable) {// Create new reservation if not available
            await resBL.FillContactInformation(helper.FirstName(), helper.LastName(), helper.AddressOne(), '', '', 'United States', '75025');
            await resBL.FillMarketingInfo();
            const auditDate = await commonBL.GetAuditDate();
            await resBL.FillStayDetails(auditDate, '1', false);
            await resBL.Save();
        }
        let status = await resBL.PostDepositAllPaymentTypes();
        expect(status).toBeTruthy();
    });

    test("TC0013 - Reservation_DepositDetails_VoidDeposit_ShouldNotAbleToVoidTheDepositThatAlreadyVoided", async () => {

        await commonBL.NavigateToAddReservation();
        await resBL.FillContactInformation(helper.FirstName(), helper.LastName(), helper.AddressOne(), '', '', 'United States', '75025');
        await resBL.FillMarketingInfo();
        const auditDate = await commonBL.GetAuditDate();
        await resBL.FillStayDetails(auditDate, '1', false);
        await resBL.Save();
        await resBL.postDepostForCash();
        let status = await resBL.VoidDeposit();
        expect(status).toBeTruthy();
    });

    test("TC0014 - Reservation_DepositDetails_RefundDeposit_ShouldNotAbleToRefundTheDepositThatAlreadyRefunded", async () => {
        await commonBL.NavigateToAddReservation();
        await resBL.FillContactInformation(helper.FirstName(), helper.LastName(), helper.AddressOne(), '', '', 'United States', '75025');
        await resBL.FillMarketingInfo();
        const auditDate = await commonBL.GetAuditDate();
        await resBL.FillStayDetails(auditDate, '1', false);
        await resBL.Save();
        await resBL.postDepostForCash();
        let status = await resBL.RefundDeposit();
        expect(status).toBeTruthy();
    });

    test("TC0015 - Reservation_AirportSchedule_AddPickupAndDropSchedule", async () => {
        await commonBL.NavigateToAddReservation();
        await resBL.FillContactInformation(helper.FirstName(), helper.LastName(), helper.AddressOne(), '', '', 'United States', '75025');
        await resBL.FillMarketingInfo();
        const auditDate = await commonBL.GetAuditDate();
        await resBL.FillStayDetails(auditDate, '1', false);
        await resBL.Save();
        let success = await resBL.AddAiportPickupAndDropOff();
        expect(success).toBeTruthy();
        await resBL.ValidateAirport(false);
        await resBL.ClearTheAirportSchedule();
        await resBL.ValidateAirport(true);
    });

    test("TC0016 - Reservation_AddCarAndDriverLicense", async () => {
        await commonBL.NavigateToAddReservation();
        await resBL.FillContactInformation(helper.FirstName(), helper.LastName(), helper.AddressOne(), '', '', 'United States', '75025');
        await resBL.FillMarketingInfo();
        const auditDate = await commonBL.GetAuditDate();
        await resBL.FillStayDetails(auditDate, '1', false);
        await resBL.Save();
       await resBL.AddCarDriverLicense();
       await resBL.VerifyCarDriverLicense();
    });

    test("TC0017 - Reservation_SpecialRequest_ManageRequests", async () => {
        test.skip()//Note : department need to be fixed
        await commonBL.NavigateToAddReservation();
        await resBL.FillContactInformation(helper.FirstName(), helper.LastName(), helper.AddressOne(), '', '', 'United States', '75025');
        await resBL.FillMarketingInfo();
        const auditDate = await commonBL.GetAuditDate();
        await resBL.FillStayDetails(auditDate, '1', false);
        await resBL.Save();
       await resBL.CreateSpecialRequest();
      
    });

    test("TC0018 - Reservation_Packages_AddPackages", async () => {
        await commonBL.NavigateToAddReservation();
        await resBL.FillContactInformation(helper.FirstName(), helper.LastName(), helper.AddressOne(), '', '', 'United States', '75025');
        await resBL.FillMarketingInfo();
        const auditDate = await commonBL.GetAuditDate();
        await resBL.FillStayDetails(auditDate, '1', false);
        await resBL.Save();
       await resBL.AddPackagesAndVerify();
      
    });

    test("TC0019 - Reservation_Messages_AddNewMessage", async () => {
        await commonBL.NavigateToAddReservation();
        await resBL.FillContactInformation(helper.FirstName(), helper.LastName(), helper.AddressOne(), '', '', 'United States', '75025');
        await resBL.FillMarketingInfo();
        const auditDate = await commonBL.GetAuditDate();
        await resBL.FillStayDetails(auditDate, '1', false);
        await resBL.Save();
       await resBL.AddNewMessageAndValidate();
      
    });

    test("TC0020 - Reservation_Messages_AddNewMessage_MessageShouldBeAvailableInPbxGuest", async () => {
        await commonBL.NavigateToAddReservation();
        let rndNum=helper.Number(10000,99999);
        await resBL.FillContactInformation(helper.FirstName(), helper.LastName()+rndNum, helper.AddressOne(), '', '', 'United States', '75025');
        await resBL.FillMarketingInfo();
        const auditDate = await commonBL.GetAuditDate();
        await resBL.FillStayDetails(auditDate, '1', false);
        await resBL.Save();
        let message= await resBL.AddNewMessageAndValidate();
        await resBL.VerifiyMessageInPBXguest(message);      
    });

    test("TC0021 - ArrivingReservations_ShouldAppearIn_Arrivals", async () => {
        await commonBL.NavigateToAddReservation();
        let rndNum=helper.Number(10000,99999);
        await resBL.FillContactInformation(helper.FirstName(), helper.LastName()+rndNum, helper.AddressOne(), '', '', 'United States', '75025');
        await resBL.FillMarketingInfo();
        const auditDate = await commonBL.GetAuditDate();
        await resBL.FillStayDetails(auditDate, '1', false);
        await resBL.Save();
        let confNo = await resBL.VerifiyConfirmationNumberGenerated();
        await resBL.VerifyReservationInPBXarrivals(confNo);
    });
   
})