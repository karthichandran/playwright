import { expect, Page, test } from "@playwright/test";
import LoginBL from '../../businessLayer/login/Login.BL';
import CommonBL from '../../businessLayer/common/common.BL';
import RandomHelper from '../../businessLayer/util/helper';
import CompanyBL from'../../businessLayer/salesAndMarketing/Company.BL';
test.describe("SalesAndMarketing Company Tests", () => {
    let page: Page;
    let loginBL: LoginBL;
    let comBL: CommonBL;
    let helper: RandomHelper;
    let companyBL: CompanyBL;
    test.beforeEach(async ({ browser }) => {
        page = await browser.newPage();
        loginBL = new LoginBL(page);
        comBL = new CommonBL(page);
        helper = new RandomHelper();
         companyBL= new CompanyBL(page);
        await loginBL.DoLogin();
    }) 
     test.afterEach(async ({ browser }) => {
        await page.close();
    })

    test("TC0047 -SalesAndMarketing_Company_DML_ShoudBePersisted", async () => {
        await comBL.NavigateTo_SalesAndMarketing_Company();
        await companyBL.CreateCompanyAndValidate(); 
        await companyBL.CheckCompanyExistsInReservation();  
        await companyBL.MakeTheCompanyInActive();   
        await companyBL.CheckInCompanyDoesNotExistsInReservation();
        await companyBL.CheckINCompanyDoesNotExistInGroup(); 
        await companyBL.DeleteCompany();             
    });
})