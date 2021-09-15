import { expect, Page, test } from "@playwright/test";
import LoginBL from '../../businessLayer/login/Login.BL';
import ReservationBL from '../../businessLayer/frontOffice/Rservation.BL';
import CommonBL from '../../businessLayer/common/common.BL';
import RandomHelper from '../../businessLayer/util/helper';
import moment from 'moment';
import NightAuditBL from '../../businessLayer/Accounting/NightAudit.BL';

test("run Nightaudit", async ({page}) => {
    test.skip();
    let loginBL = new LoginBL(page);
    let commonBL = new CommonBL(page);
    let resBL = new ReservationBL(page);
    let helper = new RandomHelper();
    let auditBL=new NightAuditBL(page);

    await loginBL.DoLoginWithParthi();

    await commonBL.NavigateToNightAudit();
    await auditBL.CheckOutDueOuts();
    await auditBL.CancelNoShows();
    await auditBL.OpenTransactionReports();
    await auditBL.PerformAuditAction();
});