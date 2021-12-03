
var fcuUtil = {
    getEEPRoot: function()
    {
        var root = "main";
        if (location.pathname.indexOf("/EEPWebClient/") != -1) { root = "EEPWebClient"; };

        return "/" + root;
    },
    formatBytes: function(bytes)
    {
        if (bytes >= 1000000000)
        {
            return (bytes / 1073741824).toFixed(2) + 'GB';
        }
        if (bytes >= 1000000)
        {
            return (bytes / 1048576).toFixed(2) + 'MB';
        }
        if (bytes >= 1000)
        {
            return (bytes / 1024).toFixed(2) + 'KB';
        }
        return bytes + ' B';
    },
    formatMegaBytes: function(megabytes)
    {
        if (megabytes >= 1000)
        {
            return (megabytes / 1024).toFixed(1) + 'GB';
        }
        return megabytes + 'MB';
    },
    isIOS: function()
    {
        return !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    },
    isMobile: {
        Android: function()
        {
            return !!navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function()
        {
            return !!navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function()
        {
            return !!navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function()
        {
            return !!navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function()
        {
            return !!navigator.userAgent.match(/IEMobile/i) || !!navigator.userAgent.match(/WPDesktop/i);
        },
        any: function()
        {
            return (this.Android() || this.BlackBerry() || this.iOS() || this.Opera() || this.Windows());
        }
    },
    isEng: function()
    {
        var iseng = false;
        if (typeof lang != "undefined" && lang != null && lang == "en")
        {
            iseng = true;
        }

        return iseng;
    }

}


var fcumodule = angular.module("fcumodule", []);

fcumodule.value('eepParams',
{
    isEng: fcuUtil.isEng(),
    root: fcuUtil.getEEPRoot(),
    skyticket: '',
    isOnline: true
});

fcumodule.factory("webService", webServiceFn);

webServiceFn.$inject = ["$http", "$q"];

function webServiceFn($http, $q)
{
    var service = {};
    service.post = postFn;


    return service;

    function postFn(url, params)
    {
        var defer = $q.defer();

        params = params || {};


        $http({
            method: "POST",
            url: url,
            data: JSON.stringify(params)
        }).then(
            function(response)
            {

                if (response)
                {
                    var result = response.data.d || response.data;

                    defer.resolve(result);
                } else
                {
                    defer.resolve(response);

                }

            },
            function(response)
            {

                defer.reject(response);
            });

        return defer.promise;


    }

}


fcumodule.config(['$httpProvider', function($httpProvider)
{
    var $http;

    var interceptor = ['$q', '$injector', '$rootScope', function($q, $injector, $rootScope)
    {

        return {
            'response': function(response)
            {
                $http = $http || $injector.get('$http');

                if ($http.pendingRequests.length < 1)
                {
                    $rootScope.networkStatus = 0
                    //$rootScope.$broadcast('httpend', 'finish');
                }
                return response;
            },

            'responseError': function(response)
            {
                var status = response.status;
                var message = response.data || "";
                if (status == 401 || status == 403)
                {
                    //window.location = fcuUtil.getEEPRoot() + "/Timeout.aspx";
                    window.location.reload();
                    return;

                } else if (status == 500 || status == 404|| status == -1)
                {
                    window.location = fcuUtil.getEEPRoot() + "/Error.aspx";

                    return;
                } else if (status == 599)
                {
                    window.location.reload();

                    return;
                }

                $http = $http || $injector.get('$http');
                if ($http.pendingRequests.length < 1)
                {
                    $rootScope.networkStatus = 0
                    //$rootScope.$broadcast('httpend', 'error');
                }
                return $q.reject(response);
            }
        };
    } ];

    $httpProvider.interceptors.push(interceptor);



    $httpProvider.defaults.headers.post = {};
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
} ]);

/**

Filter

**/

fcumodule.filter("cutstring", function()
{

    function substring(str, length, more)
    {
        var r = /[^\x00-\xff]/g;
        if (str.replace(r, "mm").length <= length) return str;
        var m = Math.floor(length / 2);
        for (var i = m; i < str.length; i++)
        {
            var temp = str.substr(0, i);
            if (temp.replace(r, "mm ").length >= length)
                return temp + more;
        }
        return str;
    }

    function cutstr(str, len)
    {

        var str_length = 0;
        var str_len = 0;
        str_cut = new String();
        str = str || '';
        str_len = str.length;

        for (var i = 0; i < str_len; i++)
        {

            a = str.charAt(i);
            str_length++;
            if (escape(a).length > 4)
            {
                str_length++;
            }

            str_cut = str_cut.concat(a);

            if (str_length >= len)
            {
                str_cut = str_cut.concat("...");
                return str_cut;
            }
        }

        if (str_length < len)
        {
            return str;
        }

    }

    return function(input, length)
    {
        return cutstr(input, length);
    }

});


fcumodule.filter('parseUrl', function()
{
    var urlPattern = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/gi;

    var normalize = function(arr)
    {
        var result = {};
        if (angular.isArray(arr))
        {
            for (var i = 0, l = arr.length; i < l; i++)
            {
                if (!result.hasOwnProperty(arr[i]))
                {
                    result[arr[i]] = arr[i];
                }
            }
        }
        return result;
    }

    return function(text, target, otherProp)
    {

        angular.forEach(text.match(urlPattern), function(url)
        {
            text = text.replace(new RegExp(url.replace(/\?/g, '\\?'), 'g'), '<a target="' + target + '" href="' + url + '">' + url + '</a>');
        });
        return text;
    }
});

/**

Directive

**/

//REF: http://stackoverflow.com/a/14519881
fcumodule.directive('checkList', function()
{

    return {
        scope: {
            list: '=checkList',
            value: '@'
        },
        link: function(scope, elem, attrs)
        {
            scope.list = scope.list || []; //fix by jt

            var handler = function(setup)
            {
                var checked = elem.prop('checked');


                var index = scope.list.indexOf(scope.value);

                if (checked && index == -1)
                {
                    if (setup) elem.prop('checked', false);

                    else scope.list.push(scope.value);

                } else if (!checked && index != -1)
                {

                    if (setup) elem.prop('checked', true);

                    else scope.list.splice(index, 1);

                }

            };

            var setupHandler = handler.bind(null, true);

            var changeHandler = handler.bind(null, false);


            elem.on('change', function()
            {
                scope.$apply(changeHandler);
            });

            scope.$watch('list', setupHandler, true);
        }
    };
});


fcumodule.directive('systemname', ['$window', function($window)
{
    return {
        restrict: 'A',
        link: function(scope, element, attrs)
        {
            if (attrs.systemname)
            {
                $window.document.title = attrs.systemname;
                element.text(attrs.systemname);
            }
        }
    }

} ]);


fcumodule.directive('uppercase', [function()
{
    return {
        restrict: 'A',
        require: '?ngModel',
        link: function(scope, element, attrs, ngModel)
        {
            element.css({ 'text-transform': 'uppercase' });

            if (ngModel)
            {
                ngModel.$parsers.unshift(function(viewValue)
                {
                    return angular.uppercase(viewValue);
                });
            }

        }
    }

} ]);

fcumodule.directive('datepicker', [function()
{
    return {
        restrict: 'A',
        //        scope: {
        //            page: '=',
        //            totalItems: '=',
        //            onSelectPage: ' &',
        //            numPages: '='
        //        },
        //        controller: 'PaginationController',
        //templateUrl: 'template/pagination/pagination.html',
        //        template: $templateCache.get('template/pagination/pagination.html'),
        //        replace: true,
        require: 'ngModel',
        link: function(scope, element, attrs, ngModel)
        {
            element.addClass('Wdate');
            var format = "yyyy/MM/dd";
            if (attrs.datepicker !== '')
            {
                format = attrs.datepicker;
            }

            element.attr("maxlength", format.length);
            element.css("width", (format.length * 10 + 20) + "px");
            element.css("height", "auto");
            if (ngModel)
            {
                element.on('blur', function()
                {
                    scope.$apply(function()
                    {
                        ngModel.$setViewValue(element.val());

                    });

                });

                element.on('click', function()
                {
                    WdatePicker({
                        dateFmt: format,
                        isShowClear: true,
                        readOnly: !!attrs.readyonly,
                        errDealMode: 1,
                        lang: fcuUtil.isEng() ? 'en' : 'auto',
                        onpicked: function(dp)
                        {
                            scope.$apply(function()
                            {
                                ngModel.$setViewValue(dp.cal.getNewDateStr());

                            });
                        },
                        oncleared: function(dp)
                        {
                            scope.$apply(function()
                            {
                                ngModel.$setViewValue("");

                            });
                        }
                    });
                });
            }

            //            scope.$watch(function()
            //            {
            //                return ngModel.$modelValue;
            //            }, function(newValue)
            //            {
            //                console.log(newValue);
            //            });


        }
    }

} ]);

fcumodule.directive("layDate", ["$filter", function ($filter) {
    return {
        restrict: "A",
        require: "?ngModel",
        scope: {
            ngModel: "=",
            max: "=",
            min: "="
        },
        link: function (scope, element, attrs, ngModel) {
            //element.addClass("Wdate");
            var layDateType, layDateFormat;

            setTypeAndFormat(attrs.layDate);
            
            if (ngModel) {
                
                var options = {
                    elem: element[0], // 指定元素
                    lang: fcuUtil.isEng() ? "en" : "cn",
                    format: layDateFormat,
                    type: layDateType,
                    position:"fixed",
                    theme:"#337ab7",
                    btns: ["clear", "confirm"],
                    ready: function(date){
                    },
                    done: function (newDate, formatDate, endDate) {
                        scope.$apply(setViewValue(newDate));
                    }
                };

                var dateOpt = laydate.render(options);

                var defaultMax = dateOpt.config.max;
                var defaultMin = dateOpt.config.min;
                
                if (attrs.hasOwnProperty("max")) {

                    scope.$watch("max", function (newDate, oldDate) {
                        if (newDate) {
                            element.attr("readonly", true);
                            dateOpt.config.max = getLimitDate(newDate);
                        } else {
                            dateOpt.config.max = defaultMax;
                            element.attr("readonly", !(dateOpt.config.min === defaultMin));
                        }
                    });
                }
                
                if (attrs.hasOwnProperty("min")) {

                    scope.$watch("min", function (newDate, oldDate) {
                        
                        if (newDate) {
                            element.attr("readonly", true);
                            dateOpt.config.min = getLimitDate(newDate);
                        } else {
                            dateOpt.config.min = defaultMin;
                            element.attr("readonly", !(dateOpt.config.max === defaultMax));
                        }
                    });
                }


                //ngModel.$render = function () {
                //    element.val(ngModel.$viewValue || "");
                //};


                function setViewValue(value) {
                    ngModel.$setViewValue(value);
                }

            }
            
            function setTypeAndFormat(type) {
                var space;
                switch (type) {
                case "y":
                    layDateType = "year";
                    layDateFormat = "yyyy";
                    space = 35;
                    break;
                case "m":
                    layDateType = "month";
                    layDateFormat = "yyyy/MM";
                    space = 20;
                    break;
                case "dt":
                    layDateType = "datetime";
                    layDateFormat = "yyyy/MM/dd HH:mm";
                    space = -10;
                    break;
                case "t":
                    layDateType = "time";
                    layDateFormat = "HH:mm";
                    space = 25;
                    break;
                default:
                    layDateType = "date";
                    layDateFormat = "yyyy/MM/dd";
                    space = 10;
                }

                element.attr("maxlength", layDateFormat.length);
                element.css("width", (layDateFormat.length * 10 + space) + "px");
                element.css("height", "auto");

            }
            
            function getLimitDate(value) {
                
                var ymd = [], hms = [];
                if (typeof value === "number") {
                    var day = value,
                        time = new Date().getTime(),
                        STAMP = 86400000 
                        ,
                        thisDate = new Date(
                            day
                            ? (
                                day < STAMP ? time + day * STAMP : day
                            )
                            : time
                        );
                    ymd = [thisDate.getFullYear(), thisDate.getMonth() + 1, thisDate.getDate()];
                    day < STAMP || (hms = [thisDate.getHours(), thisDate.getMinutes(), thisDate.getSeconds()]);
                } else {
                    value = value.replace(/\//g, "-");
                    ymd = (value.match(/\d+-\d+-\d+/) || [""])[0].split("-");
                    hms = (value.match(/\d+:\d+/) || [""])[0].split(":");
                }
                return {
                    year: ymd[0] | 0 || new Date().getFullYear(),
                    month: ymd[1] ? (ymd[1] | 0) - 1 : new Date().getMonth(),
                    date: ymd[2] | 0 || new Date().getDate(),
                    hours: hms[0] | 0,
                    minutes: hms[1] | 0,
                    seconds: 0
                };

            }



        }
    }
}]);



fcumodule.directive('accordionitem', ['$parse', '$location', 'eepParams', function($parse, $location, eepParams)
{
    var btnText = "意見回饋";
    if (fcuUtil.isEng())
    {
        btnText = "Feedback";
    }

    return {
        restrict: 'A',
        scope: {
            title: '@subject'
        },
        controller: ['$scope', function($scope)
        {
            $scope.ChangeState = function()
            {
                $scope.isOpen = !$scope.isOpen;
            }
        } ],
        transclude: true,
        template: '<div><div ng-click="ChangeState()" ng-class="{\'title\': true, \'open\': isOpen,\'closed\':!isOpen}">{{title}}</div>' +
                  '<div ng-show="isOpen" class="inner" >' +
                  ' <div ng-transclude></div>' +
                  ' <div ng-if="showFeedback&&params.isOnline"><input type="button" value="' + btnText + '" feedback-modal style="float:right"/></div></div></div>',
        replace: true,
        link: function(scope, element, attrs, controller)
        {

            if (!angular.isUndefined(attrs["showFeedback"]))
            {
                scope.showFeedback = true;

            }

            scope.params = eepParams;

            var getIsOpen, setIsOpen;

            scope.isOpen = true;

            if (fcuUtil.isMobile && fcuUtil.isMobile.any())
            {
                scope.isOpen = false;
            }


            if (attrs.initopen)
            {
                getIsOpen = $parse(attrs.initopen);
                setIsOpen = getIsOpen.assign;

                scope.$watch(getIsOpen, function(value)
                {
                    scope.isOpen = !!value;
                });
            }

        }
    }

} ]);


fcumodule.directive('skylogin', ['eepParams', '$http', function(eepParams, $http)
{
    var text = {
        title: "帳號驗證",
        password: "密碼",
        login: "登入",
        error: "登入失敗！",
        logging: "登入中..."
    }

    if (eepParams.isEng)
    {
        text.title = "Login";
        text.password = "Password";
        text.login = "Login";
        text.error = "Login fail";
        text.logging = "Logging in...";
    }


    return {
        restrict: 'A',
        //        scope: {
        //            ticket: '='
        //        },
        //controller: [],
        //template: "<div><input type='password' ng-model='password'/><input type='button' value='login' ng-click='getTicket()' class='btn'/></div>",
        template: "<form name='login'>" +
                     "<fieldset ng-disabled='isLogin'>" +
                         "<legend>{{text.title}}</legend>" +
                         "<label>{{text.password}}：</label>" +
                         "<input type='password' ng-model='password' required/>" +
                         "<span class='help-block'>{{info}}</span>" +
                         "<button type='submit' class='btn' ng-click='getTicket()' ng-disabled='!login.$valid'>{{text.login}}</button>" +
                     "</fieldset>" +
                 "</form>",
        link: function(scope, element, attrs)
        {
            scope.text = text;

            scope.info = "";
            scope.isLogin = false;


            scope.getTicket = function()
            {
                scope.isLogin = true;
                scope.info = text.logging;

                $http({
                    method: 'POST',
                    url: eepParams.root + "/S9000/service/skynavigate.asmx/GetTicket",
                    data: JSON.stringify({ password: scope.password })
                }).success(function(response, status, headers, config)
                {
                    scope.password = "";
                    var result = response.d;
                    if (result != "")
                    {
                        eepParams.skyticket = result;
                    }
                    else
                    {
                        scope.info = text.error;
                    };
                    scope.isLogin = false;

                }).error(function(response, status, headers, config)
                {
                    scope.password = "";
                    scope.info = text.error;
                    scope.isLogin = false;

                });


            }
        }
    }

} ]);




fcumodule.directive('rating', [function()
{
    var text = {
        t1: '很差',
        t2: '差',
        t3: '普通',
        t4: '好',
        t5: '非常好'
    }

    if (fcuUtil.isEng())
    {
        text.t1 = 'Bad';
        text.t2 = 'Poor';
        text.t3 = 'Regular';
        text.t4 = 'Good';
        text.t5 = 'Gorgeous';
    }



    return {
        restrict: 'A',
        scope: {
            list: '=',
            defaultValue: "@"
        },
        controller: ['$scope', function($scope)
        {
            $scope.selectedIndex = -1;

            if (!$scope.list)
            {
                $scope.items = [
                { text: text.t1, value: '0' },
                { text: text.t2, value: '1' },
                { text: text.t3, value: '2' },
                { text: text.t4, value: '3' },
                { text: text.t5, value: '4' }
                ]
            } else
            {
                $scope.items = $scope.list;
            }

            if ($scope.defaultValue && angular.isArray($scope.items))
            {
                for (var i = 0; i < $scope.items.length; i++)
                {
                    if ($scope.defaultValue == $scope.items[i].value)
                    {
                        $scope.selectedIndex = i;
                        break;
                    }
                }

            }


        } ],
        template: '<div class="star-rating" ng-repeat="item in items" ng-class="{\'star-rating-on\':!selecting&&($index<=selectedIndex),\'star-rating-hover\':selecting&&($index<=selectingIndex),\'star-rating-readonly\':readOnly}" ng-mouseenter="mouseEnter($index)" ng-mouseleave="mouseLeave()" ng-click="setRatingValue($index)">' +
                  ' <a title="{{item.text}}"></a>' +
                  '</div>' +
                  '<span style="padding-left:7px" ng-hide="hideText">{{desc}}</span>',
        replace: false,
        require: '?ngModel',
        link: function(scope, element, attrs, ngModel)
        {

            scope.readOnly = false;

            if (!angular.isUndefined(attrs["hideText"]))
            {
                scope.hideText = true;

            }

            if (!angular.isUndefined(attrs["readOnly"]))
            {
                scope.readOnly = true;

            }

            element.addClass('star-rating-control');

            scope.mouseEnter = function(index)
            {
                if (scope.readOnly)
                {
                    return;
                }
                scope.selecting = true;
                scope.selectingIndex = index;

                scope.desc = scope.items[index].text;

            }

            scope.mouseLeave = function()
            {

                _resetSelecting();

                if (scope.selectedIndex >= 0)
                {
                    scope.desc = scope.items[scope.selectedIndex].text;
                } else
                {
                    scope.desc = "";
                }
            }

            scope.setRatingValue = function(index)
            {
                if (scope.readOnly)
                {
                    return;
                }
                _resetSelecting();

                scope.selectedIndex = index;
            }

            var _resetSelecting = function()
            {
                scope.selecting = false;
                scope.selectingIndex = -1;
            }
            _resetSelecting();

            if (ngModel)
            {
                scope.$watch('selectedIndex', function(newVal)
                {
                    if (newVal >= 0)
                    {
                        ngModel.$setViewValue(scope.items[newVal]);
                    }
                    scope.mouseLeave();
                });
            }
        }
    }

} ]);


fcumodule.directive('treeView', [function()
{
    return {
        restrict: 'A',
        scope: {
            serviceUrl: '@',
            multiSelect: '=',
            useParent: '=',
            rootText: '@',
            leafIcon: '@'
        },
        controller: ['webService', '$q', '$scope', '$rootScope', function(webService, $q, $scope, $rootScope)
        {

            $scope.getData = function(service, param)
            {
                return webService.post(service,param);

            }

            $scope.isLoading = function()
            {
                return $rootScope.networkStatus == 1;
            }

        } ],
        template: '<ul>' +
                  ' <li class="tree-last tree-open"><ins class="tree-icon">&nbsp;</ins><a href ng-class="{\'tree-loading\':isLoading()}"><ins class="tree-icon">&nbsp;</ins>{{ rootText}}</a>' +
                  '   <ul>' +
                  '     <li ng-hide="tree.length>=0" class="tree-last tree-leaf"><ins class="tree-icon">&nbsp;</ins><a href class="tree-loading"><ins class="tree-icon">&nbsp;</ins>Loading...</a></li>' +
                  '     <li ng-show="tree.length>=0" ng-repeat="node in tree" ng-include="treerender" ng-class="getNodeType($last,node)"></li>' +
                  '   </ul>' +
                  ' </li>' +
                  '</ul>',
        //replace: true,
        require: '?ngModel',
        link: function(scope, element, attrs, ngModel)
        {
            scope.treerender = fcuUtil.getEEPRoot() + "/S9000/view/tree-renderer.htm";

            var service = scope.serviceUrl;
            var param = { level: 1, value: '' };
            var multiSelect = !!scope.multiSelect;
            var useParent = multiSelect ? false : !!scope.useParent;
            var selectNodes = [];
            var _selectedNode = {};
            var _state = { Closed: 0, Opened: 1, Leaf: 2 };
            var _loadstate = { Error: 0, Waiting: 1, Finish: 2 };
            var _checkstate = { UnChecked: 0, Checked: 1, UnDetermined: 2 }

            if (ngModel)
            {
                ngModel.$setViewValue(selectNodes);
            }

            element.addClass('uiTreeView');

            var _getIndex = function(arr, obj)
            {
                var _nodeIndex = -1;
                for (var i = 0; i < arr.length; i++)
                {
                    if (angular.equals(arr[i], obj))
                    {
                        _nodeIndex = i;
                        break;
                    }
                }

                return _nodeIndex;

            }

            var _resetCheckState = function(data)
            {

                if (angular.isArray(data))
                {
                    for (var i = 0; i < data.length; i++)
                    {

                        if (data[i].checkstate)
                        {
                            delete data[i].checkstate;
                            return;
                        }
                        _resetCheckState(data[i].children);

                    }
                }
            }
            scope.$watch('serviceUrl', function(newVal)
            {
                if (!angular.isUndefined(newVal))
                {
                    service = newVal;

                    scope.getData(service, param).then(function(data)
                    {
                        scope.tree = data;

                    }, function(error)
                    {
                        if (fcuUtil.isEng())
                        {
                            alert('Loading Data Error！')
                        } else
                        {

                            alert('資料讀取發生錯誤！')
                        }
                    });
                }
            });

            //            scope.getData(service, param).then(function(data)
            //            {
            //                scope.tree = data;

            //            }, function(error)
            //            {
            //                if (fcuUtil.isEng())
            //                {
            //                    alert('Loading Data Error！')
            //                } else
            //                {

            //                    alert('資料讀取發生錯誤！')
            //                }
            //            });

            scope.setChecked = function(node)
            {
                if (node.state == _state.Leaf)
                {
                    scope.setSelected(node);
                }
                else
                {
                    if (scope.isLoading())
                    {
                        //alert('資料載入中，請稍後再試');
                    } else
                    {
                        var checkstate = (_getCheckedState(node) == 'checked');
                        scope.toggleChecked(node, !checkstate);

                    }
                }
            }

            scope.setSelected = function(node, checkstate)
            {

                _selectedNode = { text: node.text, value: node.value };

                if (multiSelect)
                {
                    if (node.state == _state.Leaf)
                    {
                        var nodeIndex = _getIndex(selectNodes, _selectedNode);
                        if (checkstate == null)
                        {
                            if (nodeIndex < 0)
                            {

                                selectNodes.push(_selectedNode);
                                node.checkstate = _checkstate.Checked;

                            }
                            else
                            {

                                selectNodes.splice(nodeIndex, 1);
                                node.checkstate = _checkstate.UnChecked;
                            }
                        } else
                        {
                            if (checkstate)
                            {
                                if (nodeIndex < 0)
                                {
                                    selectNodes.push(_selectedNode);
                                    node.checkstate = _checkstate.Checked;
                                }

                            } else
                            {
                                if (nodeIndex >= 0)
                                {
                                    selectNodes.splice(nodeIndex, 1);
                                    node.checkstate = _checkstate.UnChecked;
                                }

                            }
                        }
                    } else
                    {

                        scope.toggleNode(node);

                    }

                }
                else
                {
                    if (node.state != _state.Leaf)
                    {
                        scope.toggleNode(node);

                    }

                    if (node.state != _state.Leaf && !useParent)
                    {
                        selectNodes = [];

                    } else
                    {
                        selectNodes = [_selectedNode];
                    }

                    //_resetCheckState(scope.tree);
                    //node.checkstate = _checkstate.Checked;
                }


                if (ngModel)
                {
                    ngModel.$setViewValue(selectNodes);
                }
            }

            scope.loadNodes = function(node)
            {
                param.level = node.lv + 1;
                param.value = node.value;
                node.loadState = _loadstate.Waiting;

                return scope.getData(service, param).then(function(data)
                {
                    node.children = data;

                    node.loadState = _loadstate.Finish;



                }, function(error)
                {
                    node.loadState = _loadstate.Error;
                    node.state = _state.Closed;

                });

            }

            scope.toggleChecked = function(node, checkstate)
            {

                if ((node.loadState == _loadstate.Finish || node.children != null))
                {

                    for (var i = 0; i < node.children.length; i++)
                    {
                        if (node.children[i].state == _state.Leaf)
                        {

                            scope.setSelected(node.children[i], checkstate);
                        }
                        else
                        {
                            scope.toggleChecked(node.children[i], checkstate);
                        }
                    }

                } else
                {
                    scope.loadNodes(node).then(function()
                    {
                        //node.state = _state.Opened; ;
                        scope.toggleChecked(node, checkstate);
                    });


                }

            }

            scope.toggleNode = function(node)
            {
                if (node.state == _state.Leaf) { return; }

                if (node.state == _state.Opened) { node.state = _state.Closed; return; }

                if (node.state == _state.Closed && (node.loadState == _loadstate.Finish || node.children != null))
                {
                    node.state = _state.Opened; ;

                } else
                {
                    scope.loadNodes(node).then(function()
                    {
                        node.state = (node.state == _state.Closed) ? _state.Opened : _state.Closed;
                    });
                }
            }

            scope.getNodeType = function(isLast, node)
            {

                var types = [];
                if (isLast)
                {
                    types.push('tree-last');
                }
                if (multiSelect)
                {
                    if (node.state == _state.Leaf)
                    {
                        if (_isSelected(node))
                        {
                            types.push('tree-checked');
                        } else
                        {
                            types.push('tree-unchecked');
                        };
                    } else
                    {
                        types.push('tree-' + _getCheckedState(node));

                    }

                }

                switch (node.state)
                {
                    case _state.Closed:
                        types.push('tree-closed');
                        break;
                    case _state.Opened:
                        types.push('tree-open');
                        break;
                    case _state.Leaf:
                        types.push('tree-leaf');
                        if (scope.leafIcon)
                        {
                            types.push(scope.leafIcon);

                        } else
                        {
                            types.push('file');
                        }

                        break;
                }


                return types;
            }

            var _isSelected = function(node)
            {
                return node.checkstate == _checkstate.Checked;
                //return _getIndex(selectNodes, { text: node.text, value: node.value }) >= 0;
            }

            scope.isClicked = function(node)
            {

                if (multiSelect)
                {
                    return false;
                }
                else
                {
                    //return node.checkstate == _checkstate.Checked;
                    return angular.equals(_selectedNode, { text: node.text, value: node.value });
                }
            }

            var _getCheckedState = function(node)
            {

                if (node.loadState == _loadstate.Finish || (node.loadState == null && node.children != null))
                {
                    var selectedleaf = 0;

                    for (var i = 0; i < node.children.length; i++)
                    {

                        if (node.children[i].state == _state.Leaf && _isSelected(node.children[i]))
                        {
                            selectedleaf = selectedleaf + 1;
                        }
                        if (node.children[i].state != _state.Leaf)
                        {
                            var parentstate = _getCheckedState(node.children[i]);
                            if (parentstate == 'checked')
                            {
                                selectedleaf = selectedleaf + 1;
                            }
                            if (parentstate == 'undetermined')
                            {
                                return 'undetermined';
                            }
                        }


                    }
                    if (selectedleaf == 0)
                    {

                        return 'unchecked';
                    }
                    if (selectedleaf != 0 && selectedleaf == node.children.length)
                    {

                        return 'checked';
                    } else
                    {

                        return 'undetermined';
                    }
                }
                else
                {
                    return 'unchecked';
                }

            }

        }
    }

} ]);


fcumodule.factory("PopMenuService", [function()
{
    var _currPopMenu = null;

    return {
        setCurrPopMenu: function(currPopMenu)
        {

            _currPopMenu = currPopMenu;
        },
        hidePopMenu: function()
        {
            if (_currPopMenu)
            {
                _currPopMenu.hideMenu();
            }

        }

    }
} ]);

fcumodule.directive('popMenu', ['PopMenuService', function(PopMenuService)
{
    return {
        restrict: 'A',
        scope: true,
        controller: ['$scope', '$timeout', function($scope, $timeout)
        {
            var timer = false;

            var pendingMouseState = false;

            $scope.changeMouseState = function(newMouseState)
            {
                if (pendingMouseState == newMouseState)
                {
                    if (timer)
                    {
                        $timeout.cancel(timer);
                    }
                    return;
                }

                startTimer(newMouseState);
            };

            function startTimer(newMouseState)
            {


                timer = $timeout(function()
                {

                    pendingMouseState = newMouseState;

                    if (pendingMouseState)
                    {
                        $scope.showmenu();
                    }
                    else
                    {
                        $scope.hidemenu();

                    }
                }, 10, false);
            }




        } ],
        link: function(scope, element, attrs)
        {

            var _showevent = "mouseenter click";

            var _clickonly = !!scope.$eval(attrs.clickOnly);
            if (_clickonly)
            {
                _showevent = "click";
            }

            element.addClass('popmenu');

            var raw = element[0];

            var _showmenu = function()
            {

                PopMenuService.hidePopMenu();

                element.addClass('active');

                var scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
                var clientHeight = document.documentElement.clientHeight;
                var clientWidth = document.documentElement.clientWidth;

                if (fcuUtil.isIOS())
                {
                    scrollTop = parent.pageYOffset;
                    clientHeight = parent.document.documentElement.clientHeight;
                    clientWidth = parent.document.documentElement.clientWidth;
                }


                scope.$broadcast('showPopMenu', {
                    clientHeight: clientHeight,
                    clientWidth: clientWidth,
                    scrollTop: scrollTop,
                    offsetTop: raw.offsetTop,
                    offsetHeight: raw.offsetHeight,
                    offsetLeft: raw.offsetLeft,
                    offsetWidth: raw.offsetWidth
                });

                PopMenuService.setCurrPopMenu(scope);

            }

            var _hidemenu = function()
            {

                element.removeClass('active');

                scope.$broadcast('hidePopMenu');

            }

            scope.showmenu = _showmenu;

            scope.hidemenu = _hidemenu;

            element.bind(_showevent, function(e)
            {


                if (!!scope.$eval(attrs.disable))
                {
                    return;
                }

                _showmenu();
                //scope.changeMouseState(true);

            });

            element.bind('mouseleave', function(e)
            {
                if (!!scope.$eval(attrs.disable))
                {
                    return;
                }

                _hidemenu();
                //scope.changeMouseState(false);


            });

            scope.hideMenu = function()
            {
                _hidemenu();
            }

        }
    };


} ]);

fcumodule.directive('dropdownMenu', [function()
{
    return {
        restrict: 'A',
        transclude: true,
        scope: {},
        replace: true,
        template: '<ul ng-transclude class="dropdown-menu"  ng-click="close($event)"></ul>',
        controller: ['$scope', function($scope)
        {


        } ],
        link: function(scope, element, attrs)
        {


            var raw = element[0];

            var _showMenu = function(show)
            {
                if (show)
                {
                    element.removeClass('ng-hide');
                } else
                {
                    element.addClass('ng-hide');
                }
            }

            var _addClass = function(classname)
            {
                element.addClass(classname)

            }
            var _top = function(value)
            {
                element.css("top", value);
            }
            var _left = function(value)
            {
                element.css("left", value);
            }

            var _clearClass = function()
            {

                element.removeClass("menu-top menu-bottom menu-right menu-left");

            }

            scope.$on('showPopMenu', function(e, popmenu)
            {
                toggleShowMenu(true, popmenu);
            });

            scope.$on('hidePopMenu', function()
            {

                toggleShowMenu(false);
            });

            _showMenu(false);

            var toggleShowMenu = function(show, popmenu)
            {

                _showMenu(show);

                if (popmenu)
                {
                    if (popmenu.offsetTop + popmenu.offsetHeight + raw.offsetHeight > popmenu.clientHeight + popmenu.scrollTop && raw.offsetHeight < popmenu.offsetTop - popmenu.scrollTop)
                    {
                        //_top((-(raw.offsetHeight - popmenu.offsetHeight * 0.5) + 'px'));
                        _top((-(raw.offsetHeight - 10) + 'px'));
                        _addClass('menu-top');

                    } else
                    {


                        //_top((popmenu.offsetHeight * 0.5 + 'px'));
                        _top((popmenu.offsetHeight - 10 + 'px'));
                        _addClass('menu-bottom');
                    }

                    if (popmenu.offsetLeft + popmenu.offsetWidth + raw.offsetWidth > popmenu.clientWidth + 20)
                    {


                        //_left(((popmenu.clientWidth - popmenu.offsetLeft - raw.offsetWidth - popmenu.offsetWidth * 2 / 3) + 'px'));
                        _left(((popmenu.clientWidth - popmenu.offsetLeft - raw.offsetWidth - 10) + 'px'));
                        _addClass('menu-right');
                    } else
                    {

                        //_left((popmenu.offsetWidth * 2 / 3 + "px"));
                        _left(((10) + "px"));
                        _addClass('menu-left');

                    }


                    //                    var head = document.getElementsByTagName('head')[0];
                    //                    var style = document.createElement('style');
                    //                    style.type = 'text/css';
                    //                    style.styleSheet.cssText = '.dropdown-menu:before,.dropdown-menu:after{content:none !important}';
                    //                    head.appendChild(style);
                    //                    setTimeout(function()
                    //                    {
                    //                        head.removeChild(style);;
                    //                    }, 0);


                } else
                {
                    _clearClass();
                    _top("100%");
                    _left("");
                }


            }
            //            };

            scope.close = function($event)
            {
                $event.stopPropagation();

                _showMenu(false);
            }

        }
    };


} ]);


fcumodule.directive('popOver', [function()
{
    return {
        restrict: 'A',
        transclude: true,
        scope: {},
        replace: true,
        template: '<div class="popover"  ng-click="close($event)"><div class="arrow"></div><h3 class="popover-title">{{title}}</h3><div class="popover-content" ng-transclude></div></div>',
        controller: ['$scope', function($scope)
        {


        } ],
        link: function(scope, element, attrs)
        {
            scope.title = attrs['title'] || (fcuUtil.isEng() ? "Information" : "訊息");
            var raw = element[0];

            var _showMenu = function(show)
            {
                if (show)
                {
                    element.removeClass('ng-hide');
                } else
                {
                    element.addClass('ng-hide');
                }
            }

            var _addClass = function(classname)
            {
                element.addClass(classname)

            }
            var _top = function(value)
            {
                element.css("top", value);
            }
            var _left = function(value)
            {
                element.css("left", value);
            }

            var _clearClass = function()
            {

                element.removeClass("top bottom arrow-right arrow-left");

            }

            scope.$on('showPopMenu', function(e, popmenu)
            {
                toggleShowMenu(true, popmenu);
            });

            scope.$on('hidePopMenu', function()
            {

                toggleShowMenu(false);
            });

            _showMenu(false);

            var toggleShowMenu = function(show, popmenu)
            {

                _showMenu(show);

                if (popmenu)
                {
                    if (popmenu.offsetTop + popmenu.offsetHeight + raw.offsetHeight > popmenu.clientHeight + popmenu.scrollTop && raw.offsetHeight < popmenu.offsetTop - popmenu.scrollTop)
                    {
                        _top((-(raw.offsetHeight + 15) + 'px'));
                        _addClass('top');

                    } else
                    {
                        _top((popmenu.offsetHeight - 25 + 'px'));
                        _addClass('bottom');
                    }

                    if (popmenu.offsetLeft + popmenu.offsetWidth + raw.offsetWidth > popmenu.clientWidth)
                    {
                        _left(((popmenu.clientWidth - popmenu.offsetLeft - raw.offsetWidth - 10) + 'px'));
                        _addClass('arrow-right');
                    } else
                    {


                        _left(((10) + "px"));
                        _addClass('arrow-left');

                    }


                } else
                {
                    _clearClass();
                    _top("100%");
                    _left("");
                }


            }


            scope.close = function($event)
            {
                $event.stopPropagation();

                _showMenu(false);
            }

        }
    };


} ]);


fcumodule.directive('iframeOnload', [function()
{
    return {
        restrict: 'A',
        scope: {
            callBack: '&iframeOnload'
        },
        link: function(scope, element, attrs)
        {
            element.on('load', function()
            {
                scope.$apply(function()
                {
                    return scope.callBack();
                })
            })
        }
    }
} ]);

//https://stackoverflow.com/questions/14852802/detect-unsaved-changes-and-alert-user-using-angularjs
fcumodule.directive('confirmOnExit', function()
{
   return {
       scope: {
           confirmOnExit: '=',
           confirmMessage: '@'
       },
       link: function($scope, elem, attrs)
       {
          
           window.onbeforeunload = function()
           {
               if ($scope.confirmOnExit)
               {
                   return $scope.confirmMessage;
               }
           }


           $scope.$on('$destroy', function()
           {
               window.onbeforeunload = null;
          
           });
       }
   };
});


/**
第三方API
**/

/*! ngStorage 0.3.0 | Copyright (c) 2013 Gias Kay Lee | MIT License */

!function() { function a(a) { return ["$rootScope", "$window", function(b, c) { for (var d, e, f, g = c[a] || (console.warn("This browser does not support Web Storage!"), {}), h = { $default: function(a) { for (var b in a) angular.isDefined(h[b]) || (h[b] = a[b]); return h }, $reset: function(a) { for (var b in h) "$" === b[0] || delete h[b]; return h.$default(a) } }, i = 0; i < g.length; i++) (f = g.key(i)) && "ngStorage-" === f.slice(0, 10) && (h[f.slice(10)] = angular.fromJson(g.getItem(f))); return d = angular.copy(h), b.$watch(function() { e || (e = setTimeout(function() { if (e = null, !angular.equals(h, d)) { angular.forEach(h, function(a, b) { angular.isDefined(a) && "$" !== b[0] && g.setItem("ngStorage-" + b, angular.toJson(a)), delete d[b] }); for (var a in d) g.removeItem("ngStorage-" + a); d = angular.copy(h) } }, 100)) }), "localStorage" === a && c.addEventListener && c.addEventListener("storage", function(a) { "ngStorage-" === a.key.slice(0, 10) && (a.newValue ? h[a.key.slice(10)] = angular.fromJson(a.newValue) : delete h[a.key.slice(10)], d = angular.copy(h), b.$apply()) }), h } ] } angular.module("ngStorage", []).factory("$localStorage", a("localStorage")).factory("$sessionStorage", a("sessionStorage")) } ();


/** scrollIntoViewIfNeeded擴充 
https://stackoverflow.com/questions/11461724/scrollintoviewifneeded-for-ie7
**/
if (!Element.prototype.scrollIntoViewIfNeeded)
{
    Element.prototype.scrollIntoViewIfNeeded = function(centerIfNeeded)
    {
        function withinBounds(value, min, max, extent)
        {
            if (false === centerIfNeeded || max <= value + extent && value <= min + extent)
            {
                return Math.min(max, Math.max(min, value));
            } else
            {
                return (min + max) / 2;
            }
        }

        function makeArea(left, top, width, height)
        {
            return { "left": left, "top": top, "width": width, "height": height
                    , "right": left + width, "bottom": top + height
                    , "translate":
                        function(x, y)
                        {
                            return makeArea(x + left, y + top, width, height);
                        }
                    , "relativeFromTo":
                     	function(lhs, rhs)
                     	{
                     	    var newLeft = left, newTop = top;
                     	    lhs = lhs.offsetParent;
                     	    rhs = rhs.offsetParent;
                     	    if (lhs === rhs)
                     	    {
                     	        return area;
                     	    }
                     	    for (; lhs; lhs = lhs.offsetParent)
                     	    {
                     	        newLeft += lhs.offsetLeft + lhs.clientLeft;
                     	        newTop += lhs.offsetTop + lhs.clientTop;
                     	    }
                     	    for (; rhs; rhs = rhs.offsetParent)
                     	    {
                     	        newLeft -= rhs.offsetLeft + rhs.clientLeft;
                     	        newTop -= rhs.offsetTop + rhs.clientTop;
                     	    }
                     	    return makeArea(newLeft, newTop, width, height);
                     	}
            };
        }

        var parent, elem = this, area = makeArea(
            this.offsetLeft, this.offsetTop,
            this.offsetWidth, this.offsetHeight);
        while ((parent = elem.parentNode) instanceof HTMLElement)
        {
            var clientLeft = parent.offsetLeft + parent.clientLeft;
            var clientTop = parent.offsetTop + parent.clientTop;

            // Make area relative to parent's client area.
            area = area.
                relativeFromTo(elem, parent).
                translate(-clientLeft, -clientTop);

            parent.scrollLeft = withinBounds(
              	parent.scrollLeft,
              	area.right - parent.clientWidth, area.left,
            		parent.clientWidth);

            parent.scrollTop = withinBounds(
              	parent.scrollTop,
              	area.bottom - parent.clientHeight, area.top,
            		parent.clientHeight);

            // Determine actual scroll amount by reading back scroll properties.
            area = area.translate(clientLeft - parent.scrollLeft,
                                  clientTop - parent.scrollTop);
            elem = parent;
        }
    };
}