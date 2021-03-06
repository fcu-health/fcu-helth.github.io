var fcuuibootstrap = angular.module("fcu.ui.bootstrap", ['fcumodule', 'ui.bootstrap', 'fcu.ui.bootstrap.tpls']);
angular.module('fcu.ui.bootstrap.tpls', ['template/modal/image.html', 'template/modal/confirm.html', 'template/modal/alert.html']);

//fcuuibootstrap.value('eepParams',
//{
//    isEng: fcuUtil.isEng(),
//    root: fcuUtil.getEEPRoot()
//});

/**

Directive

**/

fcuuibootstrap.directive('imageGallery', ['$templateCache', function($templateCache)
{
    return {
        restrict: 'A',
        scope: { images: '=' },
        controller: ['$scope', '$modal', function($scope, $modal)
        {
            $scope.open = function(index)
            {

                var modalInstance = $modal.open({
                    //templateUrl: 'template/modal/image.html',
                    template: $templateCache.get('template/modal/image.html'),
                    controller: 'imageModalInstanceCtrl',
                    windowClass: 'fcu-modal image-modal',
                    resolve: {
                        imglist: function()
                        {
                            return { showindex: index, items: $scope.images };
                        }
                    }
                });
            }


        } ],
        template: "<ul class='image-icon'>" +
                  " <li ng-repeat='image in images'>" +
                  "     <a href ng-click='open($index)' title='{{image.title}}'><img ng-src='{{image.icon}}' /></a> </li>" +
                  "</ul>",
        replace: true,
        link: function(scope, element, attrs)
        {


        }
    }

} ]);

fcuuibootstrap.controller("imageModalInstanceCtrl", ['$scope', '$modalInstance', 'imglist', function($scope, $modalInstance, imglist)
{
    $scope.imgList = imglist;
    var maxindex = imglist.items.length - 1;

    $scope.prevImage = function()
    {
        if ($scope.imgList.showindex == 0)
        {
            $scope.imgList.showindex = maxindex;
        }
        else
        {
            $scope.imgList.showindex = $scope.imgList.showindex - 1;
        }

    }
    $scope.nextImage = function()
    {
        if ($scope.imgList.showindex < maxindex)
        {
            $scope.imgList.showindex = $scope.imgList.showindex + 1;
        }
        else
        {
            $scope.imgList.showindex = 0;
        }

    }

    $scope.closeImage = function()
    {
        $modalInstance.dismiss();
    }

} ]);

fcuuibootstrap.directive('confirmModal', ['$modal', '$templateCache', function($modal, $templateCache)
{
    return {
        restrict: 'A',
        scope: {
            confirmTitle: '@',
            confirmTemplate: '@',
            confirmText: '@',
            contentModel: '=',
            okText: '@',
            cancelText: '@',
            okType: '@',
            onOk: '&',
            onCancel: '&',
            hideFooter: '=',
            backdropClose: '=',
            windowClass: '@'
        },
        controller: ['$scope', function($scope)
        {
            $scope.isContentLoaded = false;
            $scope.setContentLoaded = function()
            {
                $scope.isContentLoaded = true;
            }

        } ],
        link: function(scope, element, attrs)
        {

            element.bind('click', function()
            {
                element[0].blur();
                var modalInstance = $modal.open({
                    //templateUrl: 'template/modal/confirm.html',
                    template: $templateCache.get('template/modal/confirm.html'),
                    controller: 'confirmModalInstanceCtrl',
                    scope: scope,
                    windowClass: scope.windowClass ? ('fcu-modal confirm-modal ' + scope.windowClass) : 'fcu-modal confirm-modal',
                    backdrop: !!scope.backdropClose || 'static'
                });

                modalInstance.result.then(function()
                {

                    scope.onOk();
                }, function()
                {
                    scope.onCancel();
                });
            });
        }
    }

} ]);

fcuuibootstrap.factory("modal", modalFn);

modalFn.$inject = ['$modal', '$templateCache', '$rootScope'];
function modalFn($modal, $templateCache, $rootScope)
{
    var obj = {};
    obj.confirm = confirmFn;
    obj.alert = alertFn;

    function confirmFn(param)
    {
        var scope = $rootScope.$new();
        angular.extend(scope, param);

        var modalInstance = $modal.open({
            template: $templateCache.get('template/modal/confirm.html'),
            controller: 'confirmModalInstanceCtrl',
            scope: scope,
            windowClass: scope.windowClass ? ('fcu-modal confirm-modal ' + scope.windowClass) : 'fcu-modal confirm-modal',
            backdrop: !!scope.backdropClose || 'static'
        });

        return modalInstance.result;
    }

    function alertFn(param)
    {
        var scope = $rootScope.$new();
        angular.extend(scope, param);

        var modalInstance = $modal.open({
            template: $templateCache.get('template/modal/alert.html'),
            controller: 'alertModalInstanceCtrl',
            scope: scope,
            windowClass: scope.windowClass ? ('fcu-modal alert-modal ' + scope.windowClass) : 'fcu-modal alert-modal',
            backdrop: !!scope.backdropClose || true
        });

        return modalInstance.result;

    }


    return obj;
}


fcuuibootstrap.controller("confirmModalInstanceCtrl", ['$scope', '$modalInstance', function($scope, $modalInstance)
{
    $scope.isContentLoaded = false;
    $scope.setContentLoaded = function()
    {
        $scope.isContentLoaded = true;
    }

    $scope.ok = function()
    {
        $modalInstance.close();
    }
    $scope.cancel = function()
    {
        $modalInstance.dismiss();
    }
} ]);

fcuuibootstrap.controller("alertModalInstanceCtrl", ['$scope', '$modalInstance', function($scope, $modalInstance)
{
    $scope.isContentLoaded = false;
    $scope.setContentLoaded = function()
    {
        $scope.isContentLoaded = true;
    }

    $scope.ok = function()
    {
        $modalInstance.close();
    }
} ]);



fcuuibootstrap.directive('skyPicker', ['$modal', '$templateCache', 'eepParams', function($modal, $templateCache, eepParams)
{
    return {
        restrict: 'A',
        scope: {
            onOk: '&',
            ticket: '=',
            multiSelect: '=',
            selectFolder: '=',
            folderOnly: '='

        },
        controller: ['$rootScope', '$scope', '$http', '$q', function($rootScope, $scope, $http, $q)
        {
            $scope.isContentLoaded = false;
            $scope.setContentLoaded = function()
            {
                $scope.isContentLoaded = true;
            }

        } ],
        link: function(scope, element, attrs)
        {
            var text = {
                title: "Sky????????????",
                message: "??????????????????Sky??????????????????????????????????????????????????????",
                loading: "?????????...",
                name: "??????",
                time: "????????????",
                nofile: "?????????????????????",
                viewmore: "????????????...",
                search: "??????",
                startsearch: "????????????",
                back: "??????",
                refresh: "????????????",
                close: "??????",
                selected: "????????????",
                selectall: "??????",
                unselectall: "?????????",
                noselecteditem: "??????????????????",
                clearall: "??????????????????",
                clear: "????????????",
                empty: "??????",
                confirmempty: "???????????????????????????"
            }

            if (eepParams.isEng)
            {
                text.title = "Sky";
                text.message = "??????????????????Sky??????????????????????????????????????????????????????";
                text.loading = "Loading...";
                text.name = "Name";
                text.time = "File time";
                text.nofile = "No files.";
                text.viewmore = "View more...";
                text.search = "Search";
                text.startsearch = "Start search";
                text.back = "Back";
                text.refresh = "Refresh";
                text.close = "Close";
                text.selected = "Selected items";
                text.selectall = "Select all";
                text.unselectall = "Unselect all";
                text.noselecteditem = "No seleted items";
                text.clearall = "Clear all";
                text.clear = "Clear";
                text.empty = "Clear";
                text.confirmempty = "Clear all selections?";

            }

            scope.isEng = eepParams.isEng;
            scope.text = text;

            var root = eepParams.root;
            scope.confirmTitle = text.title;
            scope.confirmTemplate = root + "/S9000/view/skypicker-modalcontent.htm";

            scope.showLogin = function()
            {

                if (scope.ticket == "")
                {
                    return true;
                } else
                {
                    return false;
                }

            }


            element.bind('click', function()
            {

                element[0].blur();
                if (scope.ticket == null || scope.ticket == "")
                {
                    //                    alert(text.message);
                    //                    return;
                }

                var modalInstance = $modal.open({
                    template: $templateCache.get('template/modal/confirm.html'),
                    controller: 'skypickerModalInstanceCtrl',
                    scope: scope,
                    windowClass: 'fcu-modal skypicker-modal',
                    backdrop: 'static'
                });

                modalInstance.result.then(function(selectednodes)
                {

                    selectednodes = angular.copy(selectednodes);

                    for (var i = 0; i < selectednodes.folder.length; i++)
                    {
                        delete selectednodes.folder[i].checked;
                        delete selectednodes.folder[i].contributor;
                    }


                    for (var i = 0; i < selectednodes.file.length; i++)
                    {
                        delete selectednodes.file[i].checked;
                        delete selectednodes.file[i].headversion;
                        delete selectednodes.file[i].contributor;
                    }


                    scope.onOk({ selectednodes: selectednodes });

                }, function()
                {

                });

            });

        }
    }


} ]);

fcuuibootstrap.controller("skypickerModalInstanceCtrl", ['$scope', '$modalInstance', '$http', '$q', 'eepParams', function($scope, $modalInstance, $http, $q, eepParams)
{
    var text = {
        message: "????????????????????????",
        error: "?????????????????????????????????"
    }

    if (eepParams.isEng)
    {
        text.message = "You have not selected item???";
        text.error = "An error occurred, please try again???";
    }


    $scope.ok = function()
    {
        if (($scope.selectednodes.folder.length + $scope.selectednodes.file.length) > 0)
        {
            $modalInstance.close($scope.selectednodes);
        }
        else
        {
            alert(text.message);
        }

    }

    $scope.cancel = function()
    {
        $modalInstance.dismiss();
    }

    var root = eepParams.root;
    $scope.seletecdnotesTemplate = root + '/S9000/view/skypicker-modalselectednotes.htm';

    $scope.isLoading = true;

    var root = eepParams.root;
    var _multiSelect = !!$scope.multiSelect;
    var _folderOnly = !!$scope.folderOnly;
    var _selectFolder = !!$scope.selectFolder;

    $scope._selectFolder = !!$scope.selectFolder;
    $scope.mode = 0;

    if (_folderOnly)
    {
        $scope._selectFolder = true;
    }


    $scope.search = {};
    $scope.folderStack = [];
    $scope.selectednodes = { folder: [], file: [] };


    var _getIndex = function(arr, obj)
    {
        var _nodeIndex = -1;
        for (var i = 0; i < arr.length; i++)
        {
            if (arr[i].id == obj.id)
            {
                _nodeIndex = i;
                break;
            }
        }

        return _nodeIndex;

    }

    var _getCurrFolder = function()
    {
        var lastStackIndex = $scope.folderStack.length - 1;
        if (lastStackIndex < 0)
        {
            return null;
        }

        return $scope.folderStack[lastStackIndex];
    }

    var _resetCheckedStatus = function()
    {

        var currFolder;
        if ($scope.mode == 1)
        {
            currFolder = $scope.searchresult.searchinfo;
        } else
        {
            currFolder = _getCurrFolder();
        }

        for (var i = 0; i < currFolder.folderlist.length; i++)
        {
            var index = _getIndex($scope.selectednodes.folder, currFolder.folderlist[i]);

            if (index > -1)
            {
                currFolder.folderlist[i].checked = true;
                $scope.selectednodes.folder[index] = currFolder.folderlist[i];
            }
            else
            {
                currFolder.folderlist[i].checked = false;
            }
        }


        for (var i = 0; i < currFolder.filelist.length; i++)
        {
            var index = _getIndex($scope.selectednodes.file, currFolder.filelist[i]);
            if (index > -1)
            {
                currFolder.filelist[i].checked = true;
                $scope.selectednodes.file[index] = currFolder.filelist[i];
            }
            else
            {
                currFolder.filelist[i].checked = false;
            }
        }


    }

    var _setChecked = function(item)
    {
        for (var i = 0; i < $scope.selectednodes.folder.length; i++)
        {
            $scope.selectednodes.folder[i].checked = false;
        }

        for (var i = 0; i < $scope.selectednodes.file.length; i++)
        {
            $scope.selectednodes.file[i].checked = false;
        }

        item.checked = true;
    }

    var _getfullpath = function(id)
    {
        var defer = $q.defer();

        var params = { ticket: $scope.ticket, id: id }

        $http({
            method: 'POST',
            url: root + '/S9000/service/skynavigate.asmx/GetFullPath',
            data: JSON.stringify(params)
        }).success(function(response, status, headers, config)
        {

            var result = response.d;

            if (result.status != 0)
            {
                defer.reject('error');
            }

            defer.resolve(result.fullpath);


        }).error(function(response, status, headers, config)
        {

            defer.reject('error');
        });


        return defer.promise;
    }

    var _searchfolder = function(params)
    {
        var defer = $q.defer();

        params.folderonly = _folderOnly;

        $http({
            method: 'POST',
            url: root + '/S9000/service/skynavigate.asmx/SearchFolder',
            data: JSON.stringify(params)
        }).success(function(response, status, headers, config)
        {

            var result = response.d;

            //            if (result.status != 0)
            //            {
            //                defer.reject('error');
            //            }

            defer.resolve(result);


        }).error(function(response, status, headers, config)
        {

            defer.reject('error');
        });


        return defer.promise;
    }

    var _browsefolder = function(params, folderinfo)
    {
        var defer = $q.defer();

        params.folderonly = _folderOnly;

        $http({
            method: 'POST',
            url: root + '/S9000/service/skynavigate.asmx/BrowseFolder',
            data: JSON.stringify(params)
        }).success(function(response, status, headers, config)
        {

            var result = response.d;

            if (result.status != 0)
            {
                defer.reject('error');
            }

            if (angular.isUndefined(folderinfo))
            {
                folderinfo = {
                    id: result.id,
                    folderlist: result.folderlist,
                    filelist: result.filelist,
                    totalcount: result.totalcount
                };
            } else
            {
                folderinfo.folderlist = folderinfo.folderlist.concat(result.folderlist);
                folderinfo.filelist = folderinfo.filelist.concat(result.filelist);
            }

            if (result.hasnext)
            {
                params.page = params.page + 1;

                defer.resolve(_browsefolder(params, folderinfo));
            } else
            {
                defer.resolve(folderinfo);
            }

        }).error(function(response, status, headers, config)
        {

            defer.reject('error');
        });


        return defer.promise;
    }

    $scope.browseFolder = function(folder, stackIndex)
    {
        $scope.isLoading = true;

        var params = {
            ticket: $scope.ticket,
            page: 1,
            id: folder.id
        };

        _browsefolder(params).then(function(folderinfo)
        {
            $scope.isLoading = false;

            folderinfo = angular.extend(
            {
                rawfoldername: folder.rawfoldername,
                reload: false
            },
            folderinfo);

            if (angular.isUndefined(stackIndex))
            {
                $scope.folderStack.push(folderinfo);

            } else
            {
                $scope.folderStack[stackIndex] = folderinfo;
            }

            _resetCheckedStatus();

        }, function()
        {
            $scope.isLoading = false;

            alert(text.error)
        });
    }

    $scope.gotoFolder = function(index)
    {

        var folder = $scope.folderStack[index];

        $scope.folderStack = $scope.folderStack.slice(0, index + 1);


        if (folder.reload)
        {
            $scope.browseFolder(folder, index);
        }

    }

    $scope.goBack = function()
    {
        if ($scope.mode == 1)
        {
            $scope.mode = 0;
            _resetCheckedStatus();

        } else
        {
            $scope.folderStack.pop();

            var lastStackIndex = $scope.folderStack.length - 1;
            var folder = $scope.folderStack[lastStackIndex];
            if (folder.reload)
            {
                $scope.browseFolder(folder, lastStackIndex);
            }
        }
    }

    $scope.refresh = function()
    {
        var lastStackIndex = $scope.folderStack.length - 1;

        if (lastStackIndex < 0)
        {
            $scope.browseMySyncFolder();

        } else
        {
            $scope.browseFolder($scope.folderStack[lastStackIndex], lastStackIndex);
        }

    }

    $scope.browseMySyncFolder = function()
    {
        $scope.folderStack = [];

        if ($scope.ticket != "")
        {
            $scope.browseFolder({ id: '-5', rawfoldername: 'MySyncFolder' });
        }
    }


    $scope.searchFolder = function()
    {
        var searchtext = $scope.search.text;
        if (!searchtext)
        {
            return;
        }

        var lastStackIndex = $scope.folderStack.length - 1;
        if (lastStackIndex < 0)
        {
            return;
        }

        $scope.isLoading = true;
        var searchinput = document.getElementById('search');
        searchinput.blur();

        var searchfolder = $scope.folderStack[lastStackIndex];

        var params = {
            ticket: $scope.ticket,
            page: 1,
            id: searchfolder.id,
            searchtext: searchtext
        };

        _searchfolder(params).then(function(result)
        {

            $scope.searchresult = {
                page: params.page,
                hasnext: result.hasnext,
                searchtext: searchtext,
                searchfolder: searchfolder.rawfoldername,
                searchfolderid: searchfolder.id,
                searchinfo: { totalcount: result.totalcount, folderlist: result.folderlist, filelist: result.filelist }
            };

            $scope.search.text = '';
            $scope.mode = 1;

            _resetCheckedStatus();

            $scope.isLoading = false;
            searchinput.focus();
            document.getElementById('skysearchlist').scrollTop = 0;

        }, function(error)
        {
            $scope.isLoading = false;
            alert(text.error);

        });
    }

    $scope.searchFolderRest = function()
    {
        var searchresult = $scope.searchresult;


        if (searchresult.hasnext)
        {
            $scope.isLoading = true;

            var params = {
                ticket: $scope.ticket,
                page: searchresult.page + 1,
                id: searchresult.searchfolderid,
                searchtext: searchresult.searchtext
            };

            _searchfolder(params).then(function(result)
            {
                $scope.searchresult.page = params.page;
                $scope.searchresult.hasnext = result.hasnext;
                $scope.searchresult.searchinfo.folderlist = searchresult.searchinfo.folderlist.concat(result.folderlist);
                $scope.searchresult.searchinfo.filelist = searchresult.searchinfo.filelist.concat(result.filelist);

                _resetCheckedStatus();

                $scope.isLoading = false;

            }, function(error)
            {
                $scope.isLoading = false;
                alert(text.error);

            });
        };
    }

    $scope.browseFolderFromSearch = function(folder)
    {
        $scope.isLoading = true;

        var params = {
            ticket: $scope.ticket,
            page: 1,
            id: folder.id
        };

        _browsefolder(params).then(function(folderinfo)
        {

            folderinfo = angular.extend(
            {
                rawfoldername: folder.rawfoldername,
                reload: false
            },
            folderinfo);


            _getfullpath(folder.id).then(function(paths)
            {
                $scope.folderStack.length = 0;

                for (var i = 0; i < paths.length; i++)
                {
                    $scope.folderStack.push({
                        id: paths[i].id,
                        rawfoldername: paths[i].rawfoldername,
                        reload: true
                    });
                }

                $scope.folderStack.push(folderinfo);


                $scope.isLoading = false;
                $scope.mode = 0;

                _resetCheckedStatus();

            }, function(error)
            {
                $scope.isLoading = false;

                alert(text.error)

            });


        }, function()
        {
            $scope.isLoading = false;

            alert(text.error)
        });
    }

    $scope.selectItem = function(type, item)
    {

        if (_multiSelect)
        {
            item.checked = !item.checked;

            if (item.checked)
            {
                $scope.selectednodes[type].push(item);
            }
            else
            {
                var index = _getIndex($scope.selectednodes[type], item);
                $scope.selectednodes[type].splice(index, 1);
            }

        }
        else
        {
            _setChecked(item);


            $scope.selectednodes[type] = [item];
            if (type == "folder")
            {
                $scope.selectednodes.file.length = 0;
            } else
            {
                $scope.selectednodes.folder.length = 0;
            }

            //_resetCheckedStatus();
        }

    }

    $scope.removeItem = function(type, index)
    {
        $scope.selectednodes[type][index].checked = false;
        $scope.selectednodes[type].splice(index, 1);
    }



    var _setAllCheckStatus = function(currFolder, type, checkvalue)
    {
        for (var i = 0; i < currFolder[type + 'list'].length; i++)
        {
            if ((!!currFolder[type + 'list'][i].checked) != checkvalue)
            {
                currFolder[type + 'list'][i].checked = checkvalue;


                if (checkvalue)
                {//??????
                    $scope.selectednodes[type].push(currFolder[type + 'list'][i]);
                }
                else
                {//????????????
                    var index = _getIndex($scope.selectednodes[type], currFolder[type + 'list'][i]);
                    $scope.selectednodes[type].splice(index, 1);
                }

            }

        }

    }

    $scope.toggleCheckAll = function(checkvalue)
    {
        var currFolder = _getCurrFolder();
        if (currFolder != null && _multiSelect)
        {
            if (_folderOnly || _selectFolder)
            { //??????folder

                _setAllCheckStatus(currFolder, 'folder', checkvalue);
            }

            if (!_folderOnly)
            {//??????file

                _setAllCheckStatus(currFolder, 'file', checkvalue);
            }

        }

    }

    $scope.clearSelectedNodes = function()
    {
        for (var i = 0; i < $scope.selectednodes.folder.length; i++)
        {
            $scope.selectednodes.folder[i].checked = false;
        }

        $scope.selectednodes.folder.length = 0;

        for (var i = 0; i < $scope.selectednodes.file.length; i++)
        {
            $scope.selectednodes.file[i].checked = false;
        }
        $scope.selectednodes.file.length = 0;
    }

    //$scope.browseMySyncFolder();
    $scope.$watch('ticket', function(newVal)
    {
        if (!angular.isUndefined(newVal))
        {
            $scope.browseMySyncFolder();

        }
    });

} ]);

fcuuibootstrap.directive('whenScrolled', [function()
{
    return {
        restrict: 'A',
        link: function(scope, element, attrs)
        {
            var raw = element[0];

            var execHeight = 0;

            element.bind('scroll', function()
            {
                var currHeight = raw.scrollTop + raw.offsetHeight;
                if (currHeight >= raw.scrollHeight)
                {
                    if (currHeight != execHeight)
                    {
                        execHeight = currHeight;
                        scope.$apply(attrs.whenScrolled);
                    }

                }
            });

        }
    };

} ]);

fcuuibootstrap.directive('fileUploadSky', ['$modal', '$templateCache', 'eepParams', function($modal, $templateCache, eepParams)
{

    var text = {
        title: "????????????",
        cancelText: "??????",
        message: "??????????????????Sky??????????????????????????????????????????????????????",
        addfiles: "????????????",
        startupload: "????????????",
        clearlist: "????????????",
        cancel: "??????",
        single: "??????",
        multiple: "??????",
        uploading: "???????????????????????????...",
        uploadfiles: "?????????????????????",
        information: "??????",
        success: "??????",
        failure: "??????",
        upload: "?????????",
        error: "???????????????",
        notes: "??????????????????",
        sizelimit: "??????????????????????????????",
        allowtype: "??????????????????????????????"
    }

    if (eepParams.isEng)
    {
        text.title = "File Upload";
        text.cancelText = "Close";
        text.message = "??????????????????Sky??????????????????????????????????????????????????????";
        text.addfiles = "Add files";
        text.startupload = "Start upload";
        text.clearlist = "Clear list";
        text.cancel = "Cancel";
        text.single = "Single";
        text.multiple = "Multiple";
        text.uploading = "Uploading, please wait...";
        text.uploadfiles = "Upload files:";
        text.information = "Message";
        text.success = "Success";
        text.failure = "Failure";
        text.upload = "Uploading";
        text.error = "Error:";
        text.notes = "Notes";
        text.sizelimit = "The maximum file size for uploads is";
        text.allowtype = "Allow upload file types :";
    }

    return {
        restrict: 'A',
        scope: {
            onClose: '&',
            ticket: '=',
            multiSelect: '=',
            autoUpload: '=',
            uploadService: '@',
            sizeLimit: '=',
            allowExtList: '=',
            formData: '=',
            notes: '='
        },
        controller: ['$rootScope', '$scope', '$http', '$q', function($rootScope, $scope, $http, $q)
        {
            $scope.isContentLoaded = false;
            $scope.setContentLoaded = function()
            {
                $scope.isContentLoaded = true;
            }

        } ],
        link: function(scope, element, attrs)
        {

            scope.text = text;


            var root = eepParams.root;
            scope.confirmTitle = text.title;
            scope.confirmTemplate = root + "/S9000/view/fileuploadsky-modalcontent.htm";
            scope.cancelText = text.cancelText;
            scope.hideFooter = true;


            element.bind('click', function()
            {

                element[0].blur();
                if (scope.ticket == null || scope.ticket == "")
                {
                    //                    alert(text.message);
                    //                    return;
                }
                if (scope.uploadService == undefined || scope.uploadService == '')
                {
                    alert('?????????????????????????????????');
                    return;
                }
                var modalInstance = $modal.open({
                    template: $templateCache.get('template/modal/confirm.html'),
                    controller: 'fileUploadSkyModalInstanceCtrl',
                    scope: scope,
                    windowClass: 'fcu-modal fileupload-modal',
                    backdrop: 'static'
                });

                modalInstance.result.then(function()
                {



                }, function(result)
                {
                    scope.onClose({ result: result });
                });

            });

        }
    }


} ]);

fcuuibootstrap.controller("fileUploadSkyModalInstanceCtrl", ['$scope', '$modalInstance', '$http', '$q', '$timeout', 'eepParams', function($scope, $modalInstance, $http, $q, $timeout, eepParams)
{

    var text = {
        message: "??????????????????????????????",
        sizeError: "??????????????????$!",
        extError: "????????????????????? $ ????????????",
        success: "??????????????? ????????????????????????",
        unknow: "???????????????"
    }

    if (eepParams.isEng)
    {
        text.message = "Upload in progress, please wait!";
        text.sizeError = "The maximum file size for uploads is $";
        text.extError = "Only files (&) are allowed";
        text.success = "Upload Complete??? Successful upload files???";
        text.unknow = "Unknow Error???";
    }

    $scope.ok = function()
    {

    }
    $scope.cancel = function()
    {
        if ($scope.isUploading)
        {
            $scope.message = text.message;
            return;
        }
        $modalInstance.dismiss({ success: $scope.uploadSuccess, fail: $scope.uploadFail });
    }

    var _progress = function(progress)
    {
        var status = 0;
        var incTimeout = null;
        var started = false;
        var startSize = 0.02;

        this.getStatus = function()
        {
            return status;
        }

        this.start = function()
        {
            started = true;

            this.set(startSize);
        }

        this.set = function(n)
        {
            if (!started)
            {
                return;
            }
            var pct = (n * 100);
            var p = this;
            status = n;

            $timeout.cancel(incTimeout);
            incTimeout = $timeout(function()
            {

                //progress = Math.round(pct);
                $scope.progress[progress] = Math.round(pct);

                p.inc();
            }, 250);
        }
        this.inc = function()
        {

            if (this.getStatus() >= 1)
            {
                return;
            }

            var rnd = 0;

            var stat = this.getStatus();
            if (stat >= 0 && stat < 0.25)
            {
                // Start out between 3 - 6% increments
                rnd = (Math.random() * (5 - 3 + 1) + 3) / 100;
            } else if (stat >= 0.25 && stat < 0.65)
            {
                // increment between 0 - 3%
                rnd = (Math.random() * 3) / 100;
            } else if (stat >= 0.65 && stat < 0.9)
            {
                // increment between 0 - 2%
                rnd = (Math.random() * 2) / 100;
            } else if (stat >= 0.9 && stat < 0.99)
            {
                // finally, increment it .5 %
                rnd = 0.005;
            } else
            {
                // after 99%, don't increment:
                rnd = 0;
            }

            var pct = this.getStatus() + rnd;
            this.set(pct);

        }
        this.complete = function()
        {

            this.set(1);
            status = 0;
            started = false;
        },
        this.stop = function()
        {
            started = false;
        }


    }

    $scope.isUploading = false;

    $scope.uploadSuccess = [];
    $scope.uploadFail = [];

    var _autoupload = !!$scope.autoUpload;
    var _sizeLimit = parseFloat($scope.sizeLimit) || (4 * 1024);
    _sizeLimit = _sizeLimit * 1024;

    var _allowextlist = angular.isArray($scope.allowExtList) ? $scope.allowExtList : [];
    var _multiselect = !!$scope.multiSelect;

    var _getFileExt = function(filename)
    {
        var ext = '';
        var extIndex = filename.lastIndexOf('.');

        if (extIndex != -1)
        {
            var name = filename.substr(0, extIndex);                     //?????????????????????

            ext = filename.substr(extIndex + 1, filename.length).toLowerCase();  //?????????
        }
        return ext;
    }

    var _isAllowExt = function(filename)
    {
        var result = false;

        if (_allowextlist.length == 0)
        {
            result = true;
        } else
        {
            var ext = _getFileExt(filename);

            for (var i = 0; i < _allowextlist.length; i++)
            {
                if (_allowextlist[i].toLowerCase() == ext)
                {
                    result = true;
                    break;
                }
            }
        }

        return result;
    }

    $scope.formatBytes = fcuUtil.formatBytes;

    $scope.formatMegaBytes = fcuUtil.formatMegaBytes;


    $scope.abort = function(index)
    {
        $scope.clearMessage();
        $scope.status[index] = 2;
    };

    $scope.remove = function(index)
    {
        $scope.clearMessage();
        $scope.status[index] = 2;

    };

    $scope.formatSizeLimit = $scope.formatBytes(_sizeLimit);
    $scope.uploadIndex = 0;
    $scope.selectedFiles = [];

    $scope.onFileSelect = function(selectednodes)
    {

        $scope.clearMessage();
        $scope.selectedFiles = [];
        $scope.progress = [];
        $scope.uploadIndex = 0;
        $scope.errorMsg = [];
        $scope.selectedFiles = selectednodes.file;
        $scope.status = [];

        for (var i = 0; i < selectednodes.file.length; i++)
        {
            $scope.progress[i] = -1;
        }

        if (_autoupload)
        {
            $scope.uploadAll();
        }
    };


    var _checkFile = function(index)
    {
        $scope.progress[index] = 0;

        var file = $scope.selectedFiles[index];

        //????????????
        if (file.size > _sizeLimit)
        {
            $scope.status[index] = 0;
            $scope.errorMsg[index] = text.sizeError.replace('$', $scope.formatBytes(_sizeLimit)); //'??????????????????' + $scope.formatBytes(_sizeLimit) + '???';
            return false;
        }


        //???????????????
        if (!_isAllowExt(file.rawfilename))
        {
            $scope.status[index] = 0;
            $scope.errorMsg[index] = text.extError.replace('$', _allowextlist); //'????????????????????? ' + _allowextlist + ' ????????????';
            return false;
        }


        return true;
    }

    var _upload = function(index)
    {

        if (index == $scope.selectedFiles.length)
        {
            $timeout(function()
            {
                $scope.isUploading = false;
                $scope.message = text.success + $scope.uploadSuccess.length;

            }, 600);

            return;
        }

        $scope.uploadIndex = index + 1;

        if ($scope.status[index] == 2)
        {
            _upload(index + 1);
        } else if ($scope.status[index] == undefined)
        {

            if (_checkFile(index))
            {

                $scope.status[index] = 4;
                $scope.progress[index] = 0;
                $scope.errorMsg[index] = '';

                var progress = new _progress(index);
                progress.start();

                var file = $scope.selectedFiles[index];

                var params = { ticket: $scope.ticket, file: file, formdata: $scope.formData };

                var fileinfo = { name: file.rawfilename, size: file.size, formatsize: $scope.formatBytes(file.size) };
                //                var canceller = $q.defer();

                $http({
                    method: 'POST',
                    url: $scope.uploadService,
                    //                    timeout: canceller.promise,
                    data: JSON.stringify(params)
                }).success(function(response, status, headers, config)
                {

                    var result = response.d;

                    if (result.success)
                    {
                        progress.complete();

                        $scope.status[index] = 1;

                        $scope.uploadSuccess.push(fileinfo);
                    } else
                    {
                        progress.stop();

                        $scope.status[index] = 0;
                        $scope.errorMsg[index] = result.error || text.unknow;

                        $scope.uploadFail.push(fileinfo);
                    }

                    _upload(index + 1);

                }).error(function(response, status, headers, config)
                {
                    progress.stop();

                    var error = text.unknow;

                    $scope.status[index] = 0;

                    $scope.uploadFail.push(fileinfo);

                    $scope.errorMsg[index] = error;

                    _upload(index + 1);

                });

                //                $scope.cancel = function()
                //                {
                //                    canceller.resolve("user cancelled");
                //                };
            } else
            {
                _upload(index + 1);
            }



        }

    }


    $scope.uploadAll = function()
    {

        var text = {
            noFile: "?????????????????????",
            success: "???????????????"
        }

        if (eepParams.isEng)
        {
            text.noFile = "Please select the file???";
            text.success = "Upload Complete???";
        }

        $scope.clearMessage();

        if (angular.isArray($scope.selectedFiles) && $scope.selectedFiles.length > 0 && $scope.uploadIndex != $scope.selectedFiles.length)
        {
            $scope.isUploading = true;
            _upload(0);
        } else
        {
            if ($scope.selectedFiles.length == 0)
            {

                $scope.message = text.noFile;
            } else
            {

                $scope.message = text.success;
            }


        }
    }

    $scope.clearList = function()
    {
        $scope.clearMessage();
        $scope.selectedFiles.length = 0;
        $scope.status.length = 0;
        $scope.progress.length = 0;
        $scope.errorMsg.length = 0;
        $scope.uploadIndex = 0;
    }

    $scope.clearMessage = function()
    {
        $scope.message = "";
    }

} ]);



fcuuibootstrap.directive('feedbackModal', ['$modal', '$templateCache', 'eepParams', 'modal', function($modal, $templateCache, eepParams, modal)
{
    return {
        restrict: 'A',
        scope: {

    },
    controller: ['$rootScope', '$scope', 'webService', '$q', '$http', function($rootScope, $scope, webService, $q, $http)
    {
        $scope.isContentLoaded = false;
        $scope.setContentLoaded = function()
        {
            $scope.isContentLoaded = true;
        }

        $scope.doPost = function(service, param)
        {

            return webService.post(service, param);

        }

        $scope.doPostForm = function(service, param)
        {


            var defer = $q.defer();

            $http({
                method: 'POST',
                url: service,
                data: param,
                transformRequest: function(obj)
                {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            })
            .then(function(response)
            {

                var result = response.data;

                defer.resolve(result);
            },
            function(response)
            {
                defer.reject('error');

            })

            return defer.promise;
        }


        $scope.isLoading = function()
        {
            return $rootScope.networkStatus == 1;
        }


    } ],
    link: function(scope, element, attrs)
    {

        var text = {
            title: "????????????",
            message: "???????????????????????????????????????????????????????????????/????????????????????????????????????????????????!"
        }

        if (eepParams.isEng)
        {
            text.title = "Suggestions and Feedback";
            text.message = "Your feedback have been submitted and will be forwarded to the relevant unit(s) for processing. When it has been processed, responses will be answered in APPs/feedback-response system. Please re-access to Apps and check. Thanks.";
        }

        element.addClass("feedbackbtn");

        var root = eepParams.root;
        scope.confirmTitle = text.title;
        scope.confirmTemplate = root + "/S9000/view/feedback-modalcontent.aspx";

        var formtitle = document.title.replace(/\(/g, "???").replace(/\)/g, "???").replace(/???/g, "");
        var system = formtitle.split("???");
        scope.setProcess = function(selectednodes)
        {
            if (selectednodes.length != 0)
            {
                scope.feedback.title = selectednodes[0].text
                scope.feedback.code = selectednodes[0].value;
            }
        }

        element.bind('click', function()
        {
            scope.feedback = { title: "", code: "", catalog: "", type: "1", content: "", rate: { value: "" }, user: "", date: "", idtype: "" }

            if (system.length == 2)
            {
                scope.feedback.title = system[0]
                scope.feedback.code = system[1];
            }

            scope.doPost(scope.confirmTemplate + "/Init", {}).then(function(data)
            {
                scope.feedback.user = data.user;
                scope.feedback.date = data.date;
                scope.feedback.idtype = data.type;

            }, function() { });

            element[0].blur();


            var modalInstance = $modal.open({
                template: $templateCache.get('template/modal/confirm.html'),
                controller: 'feedbackModalInstanceCtrl',
                scope: scope,
                windowClass: 'fcu-modal feedback-modal',
                backdrop: 'static'
            });

            modalInstance.result.then(function()
            {
                if (scope.feedback.catalog == "forFcu")
                {
                    modal.alert({ alertTemplate: "feedbackinfo.html" });

                } else
                {
                    modal.alert({ alertText: text.message });
                }


            }, function()
            {

            });
        });
    }
}

} ]);

fcuuibootstrap.controller("feedbackModalInstanceCtrl", ['$scope', '$modalInstance', 'eepParams', 'modal', function($scope, $modalInstance, eepParams, modal)
{
    var text = {
        noSystem: "??????????????????",
        noContent: "???????????????????????????????????????",
        noContent2: "??????????????????",
        error: "??????????????????,??????????????????",
        typename1: "????????????",
        typename2: "?????????????????????",
        noCatalog: "??????????????????????????????"
    }

    if (eepParams.isEng)
    {
        text.noSystem = "Please select the system!";
        text.noContent = "When you submit a form, please double check that comments or score will be filled in.";
        text.noContent2 = "Please fill the required fields (comments).",
        text.error = "An error occurred, please try again???";
        text.typename1 = "Suggestions for university operations and development",
        text.typename2 = "Suggestion for application services";
        text.noCatalog = "Please select the feedback category.";
    }

    var modaltitle = $scope.confirmTitle;
    var title = $scope.feedback.title;
    var code = $scope.feedback.code;

    $scope.contentUrl = "";

    $scope.selCatalog = function()
    {
        if ($scope.feedback.catalog)
        {
            var typename = "";

            switch ($scope.feedback.catalog)
            {
                case "forFcu":
                    typename = text.typename1;
                    break;
                case "forSystem":
                    typename = text.typename2;
                    break;
                default:
                    break;
            }
            $scope.confirmTitle = modaltitle + "(" + typename + ")";

            $scope.contentUrl = $scope.feedback.catalog + ".html";
        }
    }

    $scope.reset = function()
    {
        $scope.confirmTitle = modaltitle;
        $scope.contentUrl = "";
        $scope.feedback.catalog = "";
        $scope.feedback.content = "";
        $scope.feedback.rate.value = "";
        $scope.feedback.type = "1";
        $scope.feedback.title = title;
        $scope.feedback.code = code;
    }


    $scope.ok = function()
    {
        if ($scope.feedback.catalog == undefined || $scope.feedback.catalog == "")
        {            
            modal.alert({ alertText: text.noCatalog });
            return;

        }


        if ($scope.feedback.catalog == "forFcu")
        {
            if ($scope.feedback.content == "")
            {               
                modal.alert({ alertText: text.noContent2 });
                return;
            }

        } else
        {

            if ($scope.feedback.type == "1" && $scope.feedback.code == "")
            {
                
                modal.alert({ alertText: text.noSystem });
                return;

            }


            if ($scope.feedback.content == "" && $scope.feedback.rate.value == "")
            {
                
                modal.alert({ alertText: text.noContent });
                return;
            }

        }


        $scope.doPostForm(eepParams.root + "/S9000/feedback.ashx",
                { feedbackcontent: $scope.feedback.content,
                    pagename: ($scope.feedback.catalog == "forFcu") ? "fcu0000" : ($scope.feedback.type == "2") ? "A999999" : $scope.feedback.code,
                    rate: $scope.feedback.rate.value
                }).then(function(data)
                {
                    if (data == "1")
                    {
                        $modalInstance.close();
                    } else
                    {
                        alert(text.error);
                    }

                }, function() { });

    }

    $scope.cancel = function()
    {
        $modalInstance.dismiss();
    }
} ]);



fcuuibootstrap.directive('treeModal', ['$modal', '$templateCache', 'eepParams', function($modal, $templateCache, eepParams)
{
    var text = {
        title: "??????",
        rootText: "????????????",
        CLTitle: "??????????????????",
        unitTitle: "???????????????",
        appsTitle: "?????????????????????",
        appsRootText: "????????????",
        countryTitle: "???????????????",
        countryRootText: "??????",
        skyTitle: "??????????????????",
        skyRootText: "Sky????????????",
        skyError: "??????????????????Sky??????????????????????????????????????????????????????"
    }

    if (eepParams.isEng)
    {
        text.title = "Menu";
        text.rootText = "FCU";
        text.CLTitle = "Consulting Location";
        text.unitTitle= "???????????????";
        text.appsTitle = "Please select the system name",
        text.appsRootText = "System";
        text.countryTitle = "???????????????";
        text.countryRootText = "??????";
        text.skyTitle = "Please select a folder";
        text.skyRootText = "Sky";
        text.skyError = "??????????????????Sky??????????????????????????????????????????????????????";
    }



    return {
        restrict: 'A',
        scope: {
            customTitle: '@confirmTitle',
            customTemplate: '@confirmTemplate',
            confirmText: '@',
            contentModel: '=',
            okText: '@',
            cancelText: '@',
            okType: '@',
            onOk: '&',
            onCancel: '&',
            customRootText: '@rootText',
            customServiceUrl: '@serviceUrl',
            multiSelect: '=',
            customUseParent: '=useParent',
            customLeafIcon: '@leafIcon'
        },
        controller: ['$scope', function($scope)
        {
            $scope.selectednodes = { value: [] };

            $scope.isContentLoaded = false;
            $scope.setContentLoaded = function()
            {
                $scope.isContentLoaded = true;
            }

        } ],
        link: function(scope, element, attrs)
        {

            var root = eepParams.root;

            var template = root + "/S9000/view/tree-modalcontent.htm";
            var title = text.title;
            var roottext = text.rootText;
            var treetype = attrs['treeModal'];
            var serviceurl = root + '/S9000/ngTreeView.asmx/' + treetype;
            var leaficon = null;
            var useparent = false;
            var ticket = "";

            switch (treetype)
            {
                case 'ConsultingLocation':
                    title = text.CLTitle;

                    break;
                case 'FcuUnit':
                    title = text.unitTitle;
                    roottext = text.rootText;


                    break;
                case 'Apps':
                    title = text.appsTitle;
                    roottext = text.appsRootText;

                    break;
                case 'Country':
                    title = text.countryTitle;
                    roottext = text.countryRootText;

                    break;
                case 'FcuSky':
                    title = text.skyTitle;
                    roottext = text.skyRootText;
                    leaficon = "folder";
                    useparent = true;

                    scope.$watch('contentModel', function(newVal)
                    {
                        if (!angular.isUndefined(newVal))
                        {
                            ticket = encodeURIComponent(newVal);
                            scope.serviceUrl = serviceurl + '?t=' + ticket;

                        }
                    });
                    break;
                case 'Custom':
                    template = scope.customTemplate || template;
                    title = scope.customTitle || title;
                    roottext = scope.customRootText || roottext;
                    serviceurl = scope.customServiceUrl || serviceurl;
                    leaficon = scope.customLeafIcon || leaficon;
                    useparent = scope.customUseParent || useparent;
                    break;
                default:
                    return;
            }

            scope.confirmTemplate = template;
            scope.confirmTitle = title;
            scope.rootText = roottext;
            scope.serviceUrl = serviceurl;
            scope.leafIcon = leaficon;

            if (useparent)
            {
                scope.useParent = useparent;
            }

            scope.showLogin = function()
            {

                if (treetype == "FcuSky" && ticket == "")
                {
                    return true;
                } else
                {
                    return false;
                }

            }

            element.bind('click', function()
            {

                var modalInstance;

                if (treetype == "FcuSky" && ticket == "")
                {
                    //alert(text.skyError);

                    //return;
                }

                element[0].blur();
                modalInstance = $modal.open({

                    template: $templateCache.get('template/modal/confirm.html'),
                    controller: 'treeModalInstanceCtrl',
                    scope: scope,
                    windowClass: 'fcu-modal tree-modal',
                    backdrop: 'static'
                });

                modalInstance.result.then(function()
                {
                    scope.onOk({ selectednodes: scope.selectednodes.value });
                }, function()
                {
                    scope.onCancel();
                });
            });
        }
    }

} ]);


fcuuibootstrap.controller("treeModalInstanceCtrl", ['$scope', '$modalInstance', '$rootScope', 'eepParams', 'modal', function($scope, $modalInstance, $rootScope, eepParams, modal)
{
    var text = {
        loading: "????????????????????????????????????",
        noItem: "????????????????????????"
    }

    if (eepParams.isEng)
    {
        text.loading = "Data Loading, please try again later";
        text.noItem = "You have not selected item";
    }

    $scope.ok = function()
    {

        if ($rootScope.networkStatus == 1)
        {            
            modal.alert({alertText:text.loading});
            return;
        }

        if ($scope.selectednodes.value.length == 0)
        {            
            modal.alert({alertText:text.noItem});

        } else
        {
            $modalInstance.close();
        }

    }
    $scope.cancel = function()
    {
        $modalInstance.dismiss();
    }
} ]);


angular.module("template/modal/image.html", []).run(["$templateCache", 'eepParams', function($templateCache, eepParams)
{
    var text = {
        btn1: "?????????",
        btn2: "?????????",
        btn3: "??????"
    };

    if (eepParams.isEng)
    {
        text.btn1 = "Previous";
        text.btn2 = "Next";
        text.btn3 = "Close";
    };


    $templateCache.put("template/modal/image.html",
    "<div class='image-body'>" +
    "    <img ng-src=\"{{imgList.items[imgList.showindex].src}}\" alt=''/>" +
    "</div>" +
    "<center><span class=\"imagetitle\" >{{imgList.items[imgList.showindex].title}}</span></center>" +
    "<a title=\"" + text.btn1 + "\" class=\"image-nav image-prev\" ng-click='prevImage()'><span></span></a>" +
    "<a title=\"" + text.btn2 + "\" class=\"image-nav image-next\" ng-click='nextImage()'><span></span></a>" +
    "<a title=\"" + text.btn3 + "\" class=\"image-item image-close\" ng-click='closeImage()'></a>");

} ]);

angular.module("template/modal/confirm.html", []).run(["$templateCache", 'eepParams', function($templateCache, eepParams)
{
    var text = {
        confirmTitle: "??????",
        confirmText: "????????????????????????",
        okText: "??????",
        cancelText: "??????"
    };

    if (eepParams.isEng)
    {
        text.confirmTitle = "Confirm";
        text.confirmText = "Are you sure?",
        text.okText = "Ok",
        text.cancelText = "Cancel"
    }


    $templateCache.put("template/modal/confirm.html",
    "<div class=\"modal-header\">" +
    "   <h4>{{confirmTitle||'" + text.confirmTitle + "'}}</h4>" +
    "</div>" +
    "<div class=\"modal-body\"><div ng-if=\"confirmTemplate\" ng-hide='isContentLoaded'>Loading...</div>" +
    "   <div ng-if=\"confirmTemplate\" ng-include=\"confirmTemplate\" onload='setContentLoaded()'>" +
    "   </div>" +
    "   <div ng-if=\"!confirmTemplate\">" +
    "       <div style='white-space: pre-wrap'>{{confirmText||'" + text.confirmText + "'}}</div>" +
    "   </div>" +
    "</div>" +
    "<div class=\"modal-footer\" ng-if=\"!!!hideFooter\">" +
    "   <button class=\"btn btn-{{okType||'primary'}}\" ng-click=\"ok()\">{{okText||'" + text.okText + "'}}</button>" +
    "   <button class=\"btn btn-default\" ng-click=\"cancel()\">{{cancelText||'" + text.cancelText + "'}}</button>" +
    "</div>" +
    "<a title=\"{{cancelText||'" + text.cancelText + "'}}\" class=\"image-item image-close\" ng-click=\"cancel()\"></a>");

} ]);


angular.module("template/modal/alert.html", []).run(["$templateCache", 'eepParams', function($templateCache, eepParams)
{
    var text = {
        alertTitle: "??????",
        alertOkText: "??????"

    };

    if (eepParams.isEng)
    {
        text.alertTitle = "Information";
        text.alertOkText = "Close"

    }

    $templateCache.put("template/modal/alert.html",
    "<div class=\"modal-header\">" +
    "   <h4>{{alertTitle||'" + text.alertTitle + "'}}</h4>" +
    "</div>" +
    "<div class=\"modal-body\">" +
    "   <div ng-if=\"alertTemplate\" ng-include=\"alertTemplate\" >" +
    "   </div>" +
    "   <div ng-if=\"!alertTemplate\">" +
    "       <div style='white-space: pre-wrap'>{{alertText||'" + text.alertText + "'}}</div>" +
    "   </div>" +
    "</div>" +
    "<div class=\"modal-footer\" ng-if=\"!!!hideFooter\">" +
    "   <button class=\"btn btn-{{alertOkType||'primary'}}\" ng-click=\"ok()\">{{alertOkText||'" + text.alertOkText + "'}}</button>" +
    "</div>" +
    "<a title=\"{{alertOkText||'" + text.alertOkText + "'}}\" class=\"image-item image-close\" ng-click=\"ok()\"></a>");

} ]);