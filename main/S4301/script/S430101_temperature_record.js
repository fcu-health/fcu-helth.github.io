var module = angular.module('myapp', ['fcumodule', 'fcu.ui.bootstrap', 'date.after', 'date.before', 'pascalprecht.translate']);

module.constant('CONTROL', { FIRST: 0, NEWMASTER: 1, EDITMASTER: 2, EDITDETAIL: 3, SECOND: 4 });

module.config(configFn)
configFn.$inject = ["$translateProvider", 'cht', 'en', 'isCht']
function configFn($translateProvider, cht, en, isCht) {

    //translate
    $translateProvider
        .translations('cht', cht)
        .translations('en', en)

    var lang = isCht ? 'cht' : 'en';
    
    $translateProvider.preferredLanguage(lang);

    $translateProvider.useSanitizeValueStrategy(null);
}

module.factory('dataService', dataServiceFn)

dataServiceFn.$inject = ['webService'];
function dataServiceFn(webService) {
    var service = {};

    service.getMaster = getMasterFn
    service.saveMaster = saveMasterFn
    service.updateMaster = updateMasterFn
    service.saveDetail = saveDetailFn   

    return service;

    function getMasterFn() {

        var url = "S430101_temperature_record.aspx/GetMaster"
        var params = {}

        return webService.post(url, params);
    }

    function saveMasterFn(master) {
        var url = "S430101_temperature_record.aspx/SaveMaster"
        var params = { master: master }

        return webService.post(url, params);
    }

    function saveDetailFn(detailList) {
        var url = "S430101_temperature_record.aspx/SaveDetail"
        var params = { detailList: detailList }

        return webService.post(url, params);
    }

    function updateMasterFn(master) {
        var url = "S430101_temperature_record.aspx/UpdateMaster"
        var params = { master: master }

        return webService.post(url, params);
    } 
}

module.controller('rootController', rootControllerFn)

rootControllerFn.$inject = ['dataService', 'modal', 'CONTROL', '$translate', 'cht'];
function rootControllerFn(dataService, modal, CONTROL, $translate, cht) {
    var vm = this;
    vm.changeSym = changeSymFn
    vm.changeTr = changeTrFn
    vm.saveMaster = saveMasterFn;
    vm.saveDetail = saveDetailFn;
    vm.updatebtn = updatebtnFn;
    vm.updateMaster = updateMasterFn;
    vm.isLoading = false;
    vm.pass = passFn
    vm.today = getToday();
    vm.afterdate = '2021/10/10';
    vm.afterdate2 = '2021/10/15';
    vm.afterdate3 = getOneMonthAgoDate();
    vm.getDayNum = getDayNumFn
    vm.changeLang = changeLangFn
    vm.lang = $translate.use();

    var copyMaster = {};
    
    function passCheck() {
        vm.allpass = true;
        if (vm.detailList[0].isCPass) {
            vm.allpass = false;
        } else if (vm.detailList[0].isPass) {
            if (vm.detailList[0].btd_temp08 > 37.5 || vm.detailList[0].btd_temp17 > 37.5) vm.allpass = false;
            if (vm.isLoading || vm.detailList[0].invalid) vm.allpass = false;
            if (vm.detailList[0].btd_temp08 > 37.5 || vm.detailList[0].btd_temp17 > 37.5) vm.allpass = false;
            if (vm.detailList[0].btd_temp08 > 37.5 || vm.detailList[0].btd_temp17 > 37.5) vm.allpass = false;
            if (vm.detailList[0].btd_temp08 > 37.5 || vm.detailList[0].btd_temp17 > 37.5) vm.allpass = false;
            if (vm.detailList[0].btd_symptom[0] != 9) vm.allpass = false;
        } else {
            vm.allpass = false;
        }
        return vm.allpass;
    }
    
    function changeLangFn() {

        var activeLanguage = $translate.use();

        if (activeLanguage == 'cht') {
            vm.lang = 'en';
            $translate.use('en');
        } else {
            vm.lang = 'cht';
            $translate.use('cht');
        }
    }

    dataService.getMaster().then(
    function(result) {
        vm.master = result.master;
        if (result.master == null) {
            vm.toOutsch = true;
        } else {
            vm.toOutsch = false;
            //???????????????FIRST???????????????SECOND??????????????????????????????
            vm.control = result.isFirst ? CONTROL.FIRST : vm.master.qn1 == null || vm.master.qn4 == null ? CONTROL.SECOND : CONTROL.EDITDETAIL;

            if (!result.isFirst) {
                vm.detailList = result.detailList;
                passCheck();
                
                //????????????????????????
                vm.detailList[0].invalid = changeSymFn(vm.detailList[0], true)
                
                if (vm.detailList[0].invalid) {
                    $translate('OPEN_ALERT').then(function(translations) {
                        modal.alert({
                            alertText: translations,
                            windowClass: "alert-custom"
                        });
                    })
                }
                
                if (vm.detailList[0].isPass) {
                    modal.alert({ alertTemplate: "view/S430101_pass.htm?0324",
                        alertTitle: "PASS",
                        contentModal: {
                            date: vm.detailList[0].btd_date.substr(5),
                            name: vm.master.stu_name,
                            isCondition: false,
                            cssnum: getDayNumFn()
                        }
                    });
                } else if (vm.detailList[0].isCPass) {
                    modal.alert({ alertTemplate: "view/S430101_pass.htm?0324",
                        alertTitle: "CONDITIONAL PASS",
                        contentModal: {
                            date: vm.detailList[0].btd_date.substr(5),
                            name: vm.master.stu_name,
                            isCondition: true,
                            cssnum: getDayNumFn()
                        }
                    });
                } 
            }
            
            copyMaster = angular.copy(result.master);
        }
    });

    function saveMasterFn() {
        vm.isLoading = true;
        dataService.saveMaster(vm.master).then(
        function(result) {
            if (vm.master.qn1 != null && vm.master.qn4 != null) {
                vm.detailList = result.detailList;
                passCheck();
                if (result.showAlert) {
                    $translate('MASTER_QN14_ALERT').then(function(translations) {
                        modal.alert({
                            alertText: translations,
                            windowClass: "alert-custom"
                        });
                    })
                } else {
                    $translate('NOTICE_1').then(function(translations) {
                        modal.alert({ alertText: translations });
                    })
                }
                vm.control = CONTROL.EDITDETAIL;
            }
            vm.isLoading = false;
            vm.master = result.master;
            copyMaster = angular.copy(result.master);
            //????????????????????????
            vm.detailList[0].invalid = changeSymFn(vm.detailList[0], true)
        });
    }

    vm.getTransKey = getTransKeyFn;

    vm.q1 = {
        value: ['????????????????????????', '?????????????????????', '???????????????????????????????????????', '?????????????????????'],
        transKey: ['QN7_ANS1', 'QN7_ANS2', 'QN7_ANS3', 'QN7_ANS4']
    }

    vm.qn1 = { value: ['???', '??????????????????', '?????????????????????'], transKey: ['QN_ANS1', 'QN_ANS2', 'QN_ANS3'] }

    vm.qn2 = { value: ['???', '???'], transKey: ['QN_ANS5', 'QN_ANS4'] }

    vm.qn3 = { value: ['???', '???'], transKey: ['QN_ANS5', 'QN_ANS4'] }

    vm.qn4 = { value: ['???', '???'], transKey: ['QN_ANS5', 'QN_ANS4'] }

    vm.qn4_kind = { value: ['??????????????????', '????????????????????????'], transKey: ['QN_ANS6_1', 'QN_ANS6_2'] };

    vm.btm_symp = {
        value: ['???????????????????????????', '???????????????????????????', '????????????(????????????????????????????????????)', '??????????????????'],
        transKey: ['SYMP_1', 'SYMP_2', 'SYMP_4', 'SYMP_3']
    }

    function getTransKeyFn(question, value) {
        var index = vm[question].value.indexOf(value);
        return vm[question].transKey[index];
    }
    
    function saveDetailFn() {
        vm.isLoading = true;
        dataService.saveDetail(vm.detailList).then(
        function(result) {
            vm.detailList = result.detailList;
            passCheck();
            vm.isLoading = false;

            if (vm.detailList[0].isPass) {
                modal.alert({ alertTemplate: "view/S430101_pass.htm?0324",
                    alertTitle: "PASS",
                    contentModal: {
                        date: vm.detailList[0].btd_date.substr(5),
                        name: vm.master.stu_name,
                        isCondition: false,
                        cssnum: getDayNumFn()
                    }
                });
            } else if (vm.detailList[0].isCPass) {
                modal.alert({ alertTemplate: "view/S430101_pass.htm?0324",
                    alertTitle: "CONDITIONAL PASS",
                    contentModal: {
                        date: vm.detailList[0].btd_date.substr(5),
                        name: vm.master.stu_name,
                        isCondition: true,
                        cssnum: getDayNumFn()
                    }
                });
            } else {
                if (vm.master.qn1 != "?????????????????????") {
                    $translate('QN_ANS1_NOTICE').then(function(translations) {
                        modal.alert({
                            alertText: translations,
                            windowClass: "alert-custom"
                        });
                    });
                } else {
                    $translate('NOPASS_NOTICE').then(function(translations) {
                        modal.alert({
                            alertText: translations,
                            windowClass: "alert-custom"
                        });
                    })
                }
                //                if (result.showAlert) {
                //                    $translate('MASTER_QN14_ALERT').then(function(translations) {
                //                        modal.alert({ 
                //                            alertText: translations,
                //                            windowClass: "alert-custom" 
                //                        });
                //                    })
                //                }

                //                $translate('SAVE_SUCCESS').then(function(translations) {
                //                    modal.alert({ alertText: translations });
                //                })
            }
        });
    }

    function updatebtnFn(isCancel) {
        if (isCancel) {
            vm.master = angular.copy(copyMaster);
            vm.control = CONTROL.EDITDETAIL;
        } else {
            vm.control = CONTROL.EDITMASTER;
        }
    }

    function updateMasterFn() {
        vm.isLoading = true;
        dataService.updateMaster(vm.master).then(
        function(result) {
            vm.isLoading = false;
            
            if (result.showAlert) {
                $translate('MASTER_QN14_ALERT').then(function(translations) {
                    modal.alert({
                        alertText: translations,
                        windowClass: "alert-custom"
                    });
                })
            } else {
               $translate('SAVE_SUCCESS').then(function(translations) {
                    modal.alert({ alertText: translations });
                })
            }
            
            if (vm.master.qn1 != null && vm.master.qn4 != null) {
                vm.detailList = result.detailList;
                passCheck();
            }
            //????????????????????????
            vm.detailList[0].invalid = changeSymFn(vm.detailList[0], true)
            vm.control = CONTROL.EDITDETAIL;
            copyMaster = angular.copy(vm.master);
        });
    }

    function passFn(isCondition) {

        modal.alert({ alertTemplate: "view/S430101_pass.htm?0324",
            alertTitle: isCondition ? "CONDITIONAL PASS" : "PASS",
            contentModal: {
                date: vm.detailList[0].btd_date.substr(5),
                name: vm.master.stu_name,
                isCondition: isCondition,
                cssnum: getDayNumFn()
            }
        });
    }

    function getToday() {
        var date = new Date();
        var dd = date.getDate();
        var mm = date.getMonth() + 1;
        var yyyy = date.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        var today = yyyy + '/' + mm + '/' + dd;
        return today;
    }

    //??????????????????
    function changeSymFn(temp, isInit) {
        if (isInit) {
            if (temp.btd_symptom01 || temp.btd_symptom02 || temp.btd_symptom03 || temp.btd_symptom04 || temp.btd_symptom05 || temp.btd_symptom06 || temp.btd_symptom07 || temp.btd_symptom08 || temp.btd_symptom09) {
                return false;
            } else {
                return true;
            }
        } else {
        if (temp.btd_symptom01 || temp.btd_symptom02 || temp.btd_symptom03 || temp.btd_symptom04 || temp.btd_symptom05 || temp.btd_symptom06 || temp.btd_symptom07 || temp.btd_symptom08 || temp.btd_symptom09) {
                temp.invalid = false;
            } else {
                temp.invalid = true;
            }
        }
    }
    
    //??????????????????
    function changeTrFn(isInit) {
        if (vm.master.qn3 == null||vm.master.qn3[0] == '???') {
            vm.master.qn3_place_arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            vm.master.qn3_invalid = false;
            return vm.master.qn3_invalid;
        } else {
            if (isInit) {
                if (vm.master.qn3[0] == '???') {
                    vm.master.qn3_invalid = true;
                    for (var i = 0; i < vm.master.qn3_place_arr.length; i++) {
                        if (vm.master.qn3_place_arr[i] == 1) {
                            vm.master.qn3_invalid = false;
                            return vm.master.qn3_invalid;
                        }
                    }
                } else {
                    vm.master.qn3_place_arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                    vm.master.qn3_place = null;
                    vm.master.qn3_place_other = null;
                    return false;
                }
            } else {
                if (vm.master.qn3[0] == '???') {
                    vm.master.qn3_invalid = true;
                    for (var i = 0; i < vm.master.qn3_place_arr.length; i++) {
                        if (vm.master.qn3_place_arr[i] == 1) {
                            vm.master.qn3_invalid = false;
                            return vm.master.qn3_invalid;
                        }
                    }
                } else {
                    vm.master.qn3_place_arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                    vm.master.qn3_place = null;
                    vm.master.qn3_place_other = null;
                    vm.master.qn3_invalid = false;
                }
            }
        }
    }
    
    function getDayNumFn() {
        var date = new Date();
        return date.getDay();
    }
}

//??????????????????????????????
function getOneMonthAgoDate() {
    var d = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());

    var year = d.getFullYear();
    var month = d.getMonth();
    if (month < 10) {
        month = "0" + month;
    };
    var day = d.getDate();
    if (day < 10) {
        day = "0" + day;
    };
    return year + '/' + month + '/' + day; ;
} //getOneMonthAgoDate