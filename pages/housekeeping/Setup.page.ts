import { Page } from "playwright";
import CommanPage from "../common/common.page";

export default class HousekeepingSetupPage {
    private page: Page;
    private comPO: CommanPage;
    constructor(page: Page) {
        this.page = page;
        this.comPO = new CommanPage(page);
    }

    sectionSaveBtn = async () => await this.page.$("button[data-ng-click='setupHousekeepingSections.saveSectionList()']");
    sectionAddBtn = async () => await this.page.$("span:has-text('Add')");

    sectionGridElm=async () => await this.page.$("div[data-ng-grid='setupHousekeepingSections.HskpSetupSectionGridProperties']");
    roomsGridElm=async () => await this.page.$("div[data-ng-grid='setupHousekeepingSections.HskpSetupRoomGridProperties']");
    itemsGridElm=async () => await this.page.$("div[data-ng-grid='setupSupplyUsage.HskpItemGridProperties']");
    roomTypeGridElm=async () => await this.page.$("div[data-ng-grid='setupSupplyUsage.RoomTypesGridProperties']");
    timealotmentGridElm=async () => await this.page.$("div[data-ng-grid='timeAllotment.RoomTypesGridProperties']");
    supplyItmSaveBtn = async () => await this.page.$("button[data-ng-click='setupSupplyUsage.saveItems()']");
    roomTypeSaveBtn = async () => await this.page.$("button[data-ng-click='setupSupplyUsage.saveRooms()']");

    //Supply Usage
    supplyItemSaveBtn = async () => await this.page.$("button[data-ng-click='setupSupplyUsage.saveItems()']");
    supplyRoomTypeBtn = async () => await this.page.$("button[data-ng-click='setupSupplyUsage.saveRooms()']");
    supplyItemGridElm=async () => await this.page.$("div[data-ng-grid='setupSupplyUsage.HskpItemGridProperties']");
    supplyRoomTypeGridElm=async () => await this.page.$("div[data-ng-grid='setupSupplyUsage.RoomTypesGridProperties']");

    dailyServiceElm=async () => await this.page.$("select[data-ng-model='timeAllotment.scheduleForRoomType.dailyDaysChange']");
    dailyServiceOptionsElm=async () => await this.page.$$eval("select[data-ng-model='timeAllotment.scheduleForRoomType.dailyDaysChange']>option",e => e.map(e => e.textContent));
    dailyServiceSelectedText=async()=>await this.comPO.getSelectedTextFromDDL("select[data-ng-model='timeAllotment.scheduleForRoomType.dailyDaysChange']");

    weeklyServiceOptionsElm=async () => await this.page.$$eval("select[data-ng-model='timeAllotment.scheduleForRoomType.weekDayOneID']>option",e => e.map(e => e.textContent));
    day1Elm=async () => await this.page.$("select[data-ng-model='timeAllotment.scheduleForRoomType.weekDayOneID']");
    day1SelectedText=async()=>await this.comPO.getSelectedTextFromDDL("select[data-ng-model='timeAllotment.scheduleForRoomType.weekDayOneID']");

    day2Elm=async () => await this.page.$("select[data-ng-model='timeAllotment.scheduleForRoomType.weekDayTwoID']");
    day2SelectedText=async()=>await this.comPO.getSelectedTextFromDDL("select[data-ng-model='timeAllotment.scheduleForRoomType.weekDayTwoID']");

    day3Elm=async () => await this.page.$("select[data-ng-model='timeAllotment.scheduleForRoomType.weekDayThreeID']");
    day3SelectedText=async()=>await this.comPO.getSelectedTextFromDDL("select[data-ng-model='timeAllotment.scheduleForRoomType.weekDayThreeID']");

    day4Elm=async () => await this.page.$("select[data-ng-model='timeAllotment.scheduleForRoomType.weekDayFourID']");
    day4SelectedText=async()=>await this.comPO.getSelectedTextFromDDL("select[data-ng-model='timeAllotment.scheduleForRoomType.weekDayFourID']");

    day5Elm=async () => await this.page.$("select[data-ng-model='timeAllotment.scheduleForRoomType.weekDayFiveID']");
    day5SelectedText=async()=>await this.comPO.getSelectedTextFromDDL("select[data-ng-model='timeAllotment.scheduleForRoomType.weekDayFiveID']");

    day6Elm=async () => await this.page.$("select[data-ng-model='timeAllotment.scheduleForRoomType.weekDaySixID']");
    day6SelectedText=async()=>await this.comPO.getSelectedTextFromDDL("select[data-ng-model='timeAllotment.scheduleForRoomType.weekDaySixID']");

    day7Elm=async () => await this.page.$("select[data-ng-model='timeAllotment.scheduleForRoomType.weekDaySevenID']");
    day7SelectedText=async()=>await this.comPO.getSelectedTextFromDDL("select[data-ng-model='timeAllotment.scheduleForRoomType.weekDaySevenID']");

    timeAllotmentSaveBtn = async () => await this.page.$("button[data-ng-click='timeAllotment.save()']");
    roomDirtyCHeckoutElm=async () => await this.page.$("input[data-ng-model='$parent.$parent.timeAllotment.data.sysParam.setRoomDirtyOnCheckOut']");

}