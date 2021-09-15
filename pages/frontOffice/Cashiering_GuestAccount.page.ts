import { Page } from "playwright";

export default class CashieringGuestAccountPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

     // Inhouse guest tool
    inHouseToolBtn = async () =>await this.page.$('#divInHouseGuests');
    retrieveOldFolioToolBtn = async () =>await this.page.$('#divRetrieveOldFolio');
    expressCheckOutToolBtn = async () =>await this.page.$('#divExpressCheckout');
    // Inhouse guest popup
    inHouseGuestGridRows=async () =>await this.page.$$('div[data-ng-grid="inhouseGridProperties"] .ngRow');
    inHouseGuestCancelBtn = async () =>await this.page.$('button[data-ng-click="cancel()"]');

     // Inhouse guest folio
     viewFolioBtn = async () =>await this.page.$('button[data-ng-click="controllerCallback[controllerCallback.namespace].viewClick(controllerCallback[controllerCallback.namespace][$attrs.modelList].id)"]');

}