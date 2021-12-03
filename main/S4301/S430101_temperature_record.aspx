

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" ng-app="myapp">
<head><title>
	自主健康管理系統（A430101）
</title>
    <!--[if lt IE 9]>
        <script src="../S9000/scripts/vendor/es5-shim.min.js" type="text/javascript"></script>
        <script src="../S9000/scripts/vendor/css3-mediaqueries.js" type="text/javascript"></script> 
    <![endif]-->
    <!--[if lt IE 10]>
        <meta http-equiv="refresh" content="0;url=/ie8/" />
    <![endif]-->
    <meta http-equiv="X-UA-Compatible" content="IE=edge" /><meta name="viewport" content="width=device-width, user-scalable=no,initial-scale=1" /><link href="../S9000/css/bootstrap337.min.css" rel="stylesheet" type="text/css" /><link href="css/s43_custom_insch.css?20200321" rel="stylesheet" type="text/css" /><link href="../S9000/css/custom.css" rel="stylesheet" type="text/css" />
    <script src="../S9000/json2.js" type="text/javascript"></script>
    <script src="../S9000/scripts/vendor/ng1511/angular.min.js" type="text/javascript"></script>
    <script src="../S9000/scripts/vendor/angulartranslate/angular-translate.2.18.2.min.js" type="text/javascript"></script>
    <script src="../S9000/WdatePicker.js" type="text/javascript"></script>
    <script src="../S9000/scripts/custom/fcumodule.js" type="text/javascript"></script>
    <script src="../S9000/scripts/vendor/ngplugin/ui-bootstrap-custom-tpls-0.7.0.js" type="text/javascript"></script>
    <script src="../S9000/scripts/custom/fcu.ui.bootstrap.js" type="text/javascript"></script>
    <script src="script/datebefore-directive.js" type="text/javascript"></script>
    <script src="script/dateafter-directive.js" type="text/javascript"></script>
    <script src="script/S430101_temperature_record.js?20211201" type="text/javascript"></script>
    <script src="lang/S4301_cht.js?20211028" type="text/javascript"></script>
    <script src="lang/S4301_en.js?20211028" type="text/javascript"></script>
    <script type="text/javascript">
        (function() {
            angular.module('myapp').constant('isCht', true)
        })();
    </script>
    
    <style type="text/css">
        .alert-custom
        {
        	color:Red;
        	font-weight:bold;
        	font-size:medium;
        }
    </style>
</head>
<body ng-controller="rootController as rootCtrl" class="fcu">
    <form name="form1" method="post" action="S430101_temperature_record.aspx" id="form1">
<div>
<input type="hidden" name="__VIEWSTATE" id="__VIEWSTATE" value="/wEPDwUKMjEzMjEyMDg3OGRkdCJo6AxPHdzjY85q9Q6/7okMUIY=" />
</div>

<script type="text/javascript">
//<![CDATA[
var theForm = document.forms['form1'];
if (!theForm) {
    theForm = document.form1;
}
function __doPostBack(eventTarget, eventArgument) {
    if (!theForm.onsubmit || (theForm.onsubmit() != false)) {
        theForm.__EVENTTARGET.value = eventTarget;
        theForm.__EVENTARGUMENT.value = eventArgument;
        theForm.submit();
    }
}
//]]>
</script>


<script src="/main/WebResource.axd?d=6K61PQwW-ti0p4VuJe9cPkbOu0PR9ktH0XC9M8wmrxmrh5Ekwlx9ZHsg-T9-s1MBcvqYfpfq7OQbGdgZW-fjf_xnCeY1&amp;t=635873800531025136" type="text/javascript"></script>

<div>

	<input type="hidden" name="__VIEWSTATEGENERATOR" id="__VIEWSTATEGENERATOR" value="49D2CEAD" />
	<input type="hidden" name="__SCROLLPOSITIONX" id="__SCROLLPOSITIONX" value="0" />
	<input type="hidden" name="__SCROLLPOSITIONY" id="__SCROLLPOSITIONY" value="0" />
	<input type="hidden" name="__EVENTTARGET" id="__EVENTTARGET" value="" />
	<input type="hidden" name="__EVENTARGUMENT" id="__EVENTARGUMENT" value="" />
</div>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-12">
                <div class="accordion">
                    
                    <div accordionitem subject="{{'COMMENT_TITLE'|translate}}">
                        <div style="font-size: medium;font-weight:bold">{{'COMMENT8'|translate}}</div>
                        <div style="font-size: medium;">{{'COMMENT9'|translate}}</div>
                        <ol style="font-size: medium">
                            <li>{{'COMMENT10'|translate}}</li>                            
                            <li>{{'COMMENT1'|translate}}</li>
                            <li>{{'COMMENT2'|translate}}<br />
                                {{'COMMENT3'|translate}}<br />
                                {{'COMMENT4'|translate}}<br />
                                {{'COMMENT5'|translate}}<br />
                                {{'COMMENT6'|translate}}&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;{{'COMMENT7'|translate}}<br />
                            </li>
                        </ol>
                    </div>
                </div>
                <div class="col-md-12" style="text-align:right"><a class="btn btn-link" style="font-size:medium;display: initial;padding: 0px;" ng-click="rootCtrl.changeLang()">{{'LANGUAGE'|translate}}</a></div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                
                <span class="statusbar">
                    <div class="title">{{'SYS_TITLE_1'|translate}}</div>
                </span>
            </div>
        </div>
        <div class="row" ng-if="rootCtrl.control==0">
            <div class="col-md-6" style="font-size:large"><br />
                {{'ANNOUNCE_5'|translate}}：<br />
	            &emsp;&emsp;{{'ANNOUNCE_6'|translate}}<br />
                {{'ANNOUNCE_7'|translate}}
                <div style="text-align:right">{{'ANNOUNCE_4'|translate}}</div>
                <div style="text-align:center"><input class="btn btn-primary" ng-click="rootCtrl.control=1" style="margin-top:5px; margin-left:10px" type="button" value="{{'ENTER'|translate}}" /> </div>
            </div>
        </div>
        <div class="row" ng-if="rootCtrl.control==4">
            <div class="col-md-6" style="font-size:large"><br />
	            <span style="color:blue">{{'ANNOUNCE_6_1'|translate}}</span><br />
                <div style="text-align:center"><input class="btn btn-primary" ng-click="rootCtrl.control=2" style="margin-top:5px; margin-left:10px" type="button" value="{{'ENTER'|translate}}" /> </div>
            </div>
        </div>
        
        <div ng-if="!rootCtrl.toOutsch">
        <ng-form name="rootCtrl.infoForm" class="form-inline" ng-if="rootCtrl.control==1||rootCtrl.control==2||rootCtrl.control==3">
        <div class="row" style="font-size:medium">
            <div class="col-md-12">
                <span style="font-weight:bold">{{'INFOMATION'|translate}}</span><br />
                
                <div style="margin-top:5px">
                    <span style="font-weight:bold">{{'NAME'|translate}}：</span> {{rootCtrl.master.stu_name}} &emsp;&emsp; <span style="font-weight:bold">{{'ID'|translate}}：</span>{{rootCtrl.master.stu_id}}
                </div>
                
                <div style="margin-top:5px">
                    <span style="font-weight:bold">{{'UNIT'|translate}}：</span>                    
                        <span ng-if="rootCtrl.lang=='cht'">{{rootCtrl.master.unt_name}}</span>
                        <span ng-if="rootCtrl.lang=='en'">{{rootCtrl.master.unt_ename}}</span>
                </div>
                
                <div style="margin-top:5px">
                    <span style="font-weight:bold">{{'HANDPHONE'|translate}}：</span>
                    <span ng-if="rootCtrl.control==1||rootCtrl.control==2">
                        <input type="text" style="width:200px" ng-model="rootCtrl.master.btm_handphone" class="form-control" required="required" name="btm_handphone" maxlength="10" minlength="7" ng-pattern="/^\d*$/" />
                        <span ng-show="rootCtrl.infoForm.btm_handphone.$error.pattern" class="error">{{'HANDPHONE_ERROR'|translate}}</span>
                    </span>
                    <span ng-if="rootCtrl.control==3">
                        {{rootCtrl.master.btm_handphone}} 
                    </span>
                </div>
                
                <div style="margin-top:5px">
                    <span style="font-weight:bold">{{'ADDRESS'|translate}}：</span>           
                    <span ng-if="rootCtrl.control==1||rootCtrl.control==2">
                        <textarea class="form-control" rows="2" autocomplete="off" required="required" style="width:600px" ng-model="rootCtrl.master.btm_dormadr" name="btm_dormadr"></textarea>
                    </span>
                    <span ng-if="rootCtrl.control==3">
                        {{rootCtrl.master.btm_dormadr}} 
                    </span>
                </div>    
                
                
                <div class="error" style="font-weight:bold; margin-top:10px;margin-bottom:10px">{{'BEFORE_QN'|translate}}</div>
                
                <div style="margin-top:5px">
                    <span style="font-weight:bold">1. {{'QN7'|translate}}</span>
                    <div ng-if="rootCtrl.control==1||rootCtrl.control==2">
                        <div class="radio">
                            <label style="font-size:medium" ng-class="{error:rootCtrl.infoForm.q1.$error.required}">
                                <input type="radio" style="box-shadow: inset 0 0px 0px rgba(0,0,0,.075),0 0 6px rgba(206, 132, 131, 0)!important;" 
                                ng-model="rootCtrl.master.q1" value="有，已經完成兩劑" required name="q1"/>{{'QN7_ANS1'|translate}}
                            </label>
                        </div>
                        <div class="radio">
                            <label style="font-size:medium" ng-class="{error:rootCtrl.infoForm.q1.$error.required}">
                                <input type="radio" style="box-shadow: inset 0 0px 0px rgba(0,0,0,.075),0 0 6px rgba(206, 132, 131, 0)!important;" 
                                ng-model="rootCtrl.master.q1" value="有，已施打一劑" required name="q1"/>{{'QN7_ANS2'|translate}}
                            </label>
                        </div>
                        <div class="radio">
                            <label style="font-size:medium" ng-class="{error:rootCtrl.infoForm.q1.$error.required}">
                                <input type="radio" style="box-shadow: inset 0 0px 0px rgba(0,0,0,.075),0 0 6px rgba(206, 132, 131, 0)!important;" 
                                ng-model="rootCtrl.master.q1" value="尚未施打，但已完成意願登記" required name="q1"/>{{'QN7_ANS3'|translate}}
                            </label>
                        </div>
                        <div class="radio">
                            <label style="font-size:medium" ng-class="{error:rootCtrl.infoForm.q1.$error.required}">
                                <input type="radio" style="box-shadow: inset 0 0px 0px rgba(0,0,0,.075),0 0 6px rgba(206, 132, 131, 0)!important;" 
                                ng-model="rootCtrl.master.q1" value="目前無施打願意" required name="q1"/>{{'QN7_ANS4'|translate}}
                            </label>
                        </div>
                    </div>                
                    <span ng-if="rootCtrl.control==3">
                        {{rootCtrl.getTransKey("q1", rootCtrl.master.q1)|translate}}
                    </span>
                </div>
                
                <div style="margin-top:5px">
                    <span style="font-weight:bold">2. {{'QN1'|translate}}</span>
                    <div ng-if="rootCtrl.control==1||rootCtrl.control==2">
                        <div class="radio">
                            <label style="font-size:medium" ng-class="{error:rootCtrl.infoForm.qn1.$error.required}">
                                <input type="radio" style="box-shadow: inset 0 0px 0px rgba(0,0,0,.075),0 0 6px rgba(206, 132, 131, 0)!important;" 
                                ng-model="rootCtrl.master.qn1" value="有" required name="qn1"/>{{'QN_ANS1'|translate}}
                            </label>
                        </div>
                        <div class="radio">
                            <label style="font-size:medium" ng-class="{error:rootCtrl.infoForm.qn1.$error.required}">
                                <input type="radio" style="box-shadow: inset 0 0px 0px rgba(0,0,0,.075),0 0 6px rgba(206, 132, 131, 0)!important;" 
                                ng-model="rootCtrl.master.qn1" value="目前人在國外" required name="qn1"/>{{'QN_ANS2'|translate}}
                            </label>
                        </div>
                        <div class="radio">
                            <label style="font-size:medium" ng-class="{error:rootCtrl.infoForm.qn1.$error.required}">
                                <input type="radio" style="box-shadow: inset 0 0px 0px rgba(0,0,0,.075),0 0 6px rgba(206, 132, 131, 0)!important;" 
                                ng-model="rootCtrl.master.qn1" value="沒有至其他國家" required name="qn1"/>{{'QN_ANS3'|translate}}
                            </label>
                        </div>
                    </div>                
                    <span ng-if="rootCtrl.control==3">
                        {{rootCtrl.getTransKey("qn1", rootCtrl.master.qn1)|translate}}
                    </span>
                </div>
                 
                <div style="margin-top:5px;padding-left: 20px">
                    <span ng-if="rootCtrl.master.qn1=='有'" style="font-weight:bold">{{'ENDATE'|translate}}：</span>               
                    <span ng-if="rootCtrl.master.qn1=='目前人在國外'" style="font-weight:bold">{{'BACKDATE'|translate}}：</span>
                    <span ng-if="rootCtrl.control==1||rootCtrl.control==2">
                        <span ng-if="rootCtrl.master.qn1=='有'">
                            <input type="text" class="form-control" autocomplete="off" required="required" datepicker="yyyy/MM/dd" 
                                   ng-model="rootCtrl.master.qn1_date" name="qn1_date" date-before="rootCtrl.today" date-after="rootCtrl.afterdate" />                     
                            <span ng-show="rootCtrl.infoForm.qn1_date.$error.dateBefore||rootCtrl.infoForm.qn1_date.$error.dateAfter" class="error">
                                {{'DATE_ERROR'|translate}}
                            </span>
                        </span>                    
                        <span ng-if="rootCtrl.master.qn1=='目前人在國外'">
                            <input type="text" class="form-control" autocomplete="off" required="required" datepicker="yyyy/MM/dd"
                                   ng-model="rootCtrl.master.qn1_date" name="qn1_date" date-after="rootCtrl.today"/>                     
                            <span ng-show="rootCtrl.infoForm.qn1_date.$error.dateAfter" class="error">{{'BACKDATE_ERROR'|translate}}</span> 
                        </span>
                    </span>                  
                    <span ng-if="rootCtrl.control==3">
                        <span ng-if="rootCtrl.master.qn1=='有'||rootCtrl.master.qn1=='目前人在國外'">{{rootCtrl.master.qn1_date}}</span>
                    </span>       
                </div>
                 
                <div style="margin-top:5px;padding-left: 20px">                 
                    <span ng-if="rootCtrl.master.qn1=='有'" style="font-weight:bold">{{'GO_COUNTRY'|translate}}：</span>
                    <span ng-if="rootCtrl.master.qn1=='目前人在國外'" style="font-weight:bold">{{'NOW_COUNTRY'|translate}}：</span>
                    <span ng-if="(rootCtrl.control==1||rootCtrl.control==2)&&(rootCtrl.master.qn1=='有'||rootCtrl.master.qn1=='目前人在國外')">
                        <input type="text" ng-model="rootCtrl.master.qn1_country" class="form-control" name="qn1_country" required="required"/>
                    </span>
                    <span ng-if="rootCtrl.control==3&&(rootCtrl.master.qn1=='有'||rootCtrl.master.qn1=='目前人在國外')">
                        {{rootCtrl.master.qn1_country}} 
                    </span>      
                    <span ng-if="rootCtrl.master.qn1=='有'" style="color:red">
                        <br />{{'QN_ANS1_NOTICE'|translate}}<br />{{'QN1_NOTICE'|translate}}
                    </span>     
                    <span ng-if="rootCtrl.master.qn1=='目前人在國外'" style="color:red">
                        <br />{{'QN_ANS2_NOTICE'|translate}}<br />{{'QN1_NOTICE'|translate}}
                    </span>                  
                     
                </div>    
                                    
                <div style="margin-top:5px">
                    <span style="font-weight:bold">3. {{'QN2'|translate}}</span>
                    <div ng-if="rootCtrl.control==1||rootCtrl.control==2">
                        <div class="radio">
                            <label style="font-size:medium" ng-class="{error:rootCtrl.infoForm.qn2.$error.required}">
                                <input type="radio" style="box-shadow: inset 0 0px 0px rgba(0,0,0,.075),0 0 6px rgba(206, 132, 131, 0)!important;" 
                                ng-model="rootCtrl.master.qn2" value="有" required name="qn2"/>{{'QN_ANS5'|translate}}
                            </label>
                        </div>
                        <div class="radio">
                            <label style="font-size:medium" ng-class="{error:rootCtrl.infoForm.qn2.$error.required}">
                                <input type="radio" style="box-shadow: inset 0 0px 0px rgba(0,0,0,.075),0 0 6px rgba(206, 132, 131, 0)!important;" 
                                ng-model="rootCtrl.master.qn2" value="無" required name="qn2"/>{{'QN_ANS4'|translate}}
                            </label>
                        </div>
                    </div>                
                    <span ng-if="rootCtrl.control==3">
                        {{rootCtrl.getTransKey("qn2", rootCtrl.master.qn2)|translate}}
                    </span>
                </div>   
                 
                <div style="margin-top:5px;padding-left: 20px">
                    <span ng-if="rootCtrl.master.qn2=='有'" style="font-weight:bold">{{'TOUCHDATE'|translate}}：</span>
                    <span ng-if="rootCtrl.control==1||rootCtrl.control==2">
                        <span ng-if="rootCtrl.master.qn2=='有'">
                            <input type="text" class="form-control" autocomplete="off" required="required" datepicker="yyyy/MM/dd" 
                                   ng-model="rootCtrl.master.qn2_date" name="qn2_date" date-before="rootCtrl.today" date-after="rootCtrl.afterdate3" />                     
                            <span ng-show="rootCtrl.infoForm.qn2_date.$error.dateBefore||rootCtrl.infoForm.qn2_date.$error.dateAfter" class="error">
                                {{'DATE_ERROR3'|translate}}
                            </span> 
                        </span> 
                    </span>                  
                    <span ng-if="rootCtrl.control==3">
                        <span ng-if="rootCtrl.master.qn2=='有'">{{rootCtrl.master.qn2_date}}</span>
                    </span>    
                </div>
                 
                <div style="margin-top:5px;padding-left: 20px">                 
                    <span ng-if="rootCtrl.master.qn2=='有'" style="font-weight:bold">{{'TOUCH_COUNTRY'|translate}}：</span>
                    <span ng-if="(rootCtrl.control==1||rootCtrl.control==2)&&rootCtrl.master.qn2=='有'">
                        <input type="text" ng-model="rootCtrl.master.qn2_country" class="form-control" name="qn2_country" required="required"/>
                    </span>
                    <span ng-if="rootCtrl.control==3&&rootCtrl.master.qn2=='有'">
                        {{rootCtrl.master.qn2_country}} 
                    </span>
                    <span ng-if="rootCtrl.master.qn2[0]=='有'" style="color:red"><br />{{'QN_TOUCH_NOTICE'|translate}}</span>         
                </div>    
                                    
                    
                 
                
                 
                    
                            
                <div style="margin-top:5px">
                    <span style="font-weight:bold">4. {{'QN5'|translate}}</span>
                    <div ng-if="rootCtrl.control==1||rootCtrl.control==2">
                        <div class="radio">
                            <label ng-class="{error:rootCtrl.infoForm.qn4.$error.required}">
                                <input type="radio" style="box-shadow: inset 0 0px 0px rgba(0,0,0,.075),0 0 6px rgba(206, 132, 131, 0)!important;"
                                ng-model="rootCtrl.master.qn4" name="qn4" value="有" required />{{'QN_ANS5'|translate}}
                            </label>
                        </div>
                        <div class="radio">
                            <label ng-class="{error:rootCtrl.infoForm.qn4.$error.required}">
                                <input type="radio" style="box-shadow: inset 0 0px 0px rgba(0,0,0,.075),0 0 6px rgba(206, 132, 131, 0)!important;"
                                ng-model="rootCtrl.master.qn4" name="qn4" value="無" required />{{'QN_ANS4'|translate}}
                            </label>
                        </div>  
                    </div>
                    <span ng-if="rootCtrl.control==3">
                        {{rootCtrl.getTransKey("qn4", rootCtrl.master.qn4)|translate}}
                    </span>
                </div>  
                 
                <div style="margin-top:5px;padding-left: 20px">                 
                    <span ng-if="rootCtrl.master.qn4=='有'" style="font-weight:bold">{{'QN_ANS6'|translate}}：</span>
                    <div ng-if="(rootCtrl.control==1||rootCtrl.control==2)&&rootCtrl.master.qn4=='有'">
                        <div class="radio">
                            <label ng-class="{error:rootCtrl.infoForm.qn4_kind.$error.required}">
                                <input type="radio" style="box-shadow: inset 0 0px 0px rgba(0,0,0,.075),0 0 6px rgba(206, 132, 131, 0)!important;"
                                ng-model="rootCtrl.master.qn4_kind" name="qn4_kind" value="居家隔離通知" required />{{'QN_ANS6_1'|translate}}&nbsp;
                                <span ng-if="rootCtrl.master.qn4_kind=='居家隔離通知'">{{'DATE'|translate}}：
                                    <input type="text" class="form-control" autocomplete="off" required datepicker="yyyy/MM/dd" 
                                           ng-model="rootCtrl.master.qn4_date" name="qn4_date" date-before="rootCtrl.today" date-after="rootCtrl.afterdate2" />     
                                </span>          
                            </label>
                        </div>                  
                        <span ng-show="(rootCtrl.infoForm.qn4_date.$error.dateBefore||rootCtrl.infoForm.qn4_date.$error.dateAfter)&&rootCtrl.master.qn4_kind=='居家隔離通知'" class="error">{{'DATE_ERROR2'|translate}}</span>
                        
                        <br />
                        <div class="radio"style="margin-top:5px">
                            <label ng-class="{error:rootCtrl.infoForm.qn4_kind.$error.required}">
                                <input type="radio" style="box-shadow: inset 0 0px 0px rgba(0,0,0,.075),0 0 6px rgba(206, 132, 131, 0)!important;"
                                ng-model="rootCtrl.master.qn4_kind" name="qn4_kind" value="自主健康管理通知" required />{{'QN_ANS6_2'|translate}}&nbsp;
                                <span ng-if="rootCtrl.master.qn4_kind=='自主健康管理通知'">{{'DATE'|translate}}：
                                    <input type="text" class="form-control" autocomplete="off" required datepicker="yyyy/MM/dd" 
                                           ng-model="rootCtrl.master.qn4_date" name="qn4_date" date-before="rootCtrl.today" date-after="rootCtrl.afterdate" />     
                                </span>          
                            </label>
                        </div>        
                        <span ng-show="(rootCtrl.infoForm.qn4_date.$error.dateBefore||rootCtrl.infoForm.qn4_date.$error.dateAfter)&&rootCtrl.master.qn4_kind=='自主健康管理通知'" class="error">{{'DATE_ERROR2'|translate}}</span>
                    </div>
                    <span ng-if="rootCtrl.control==3&&rootCtrl.master.qn4=='有'">
                        {{rootCtrl.getTransKey("qn4_kind", rootCtrl.master.qn4_kind)|translate}}&emsp;{{rootCtrl.master.qn4_date}}
                    </span>
                    <div ng-if="rootCtrl.master.qn4=='有'&&rootCtrl.master.qn4_kind=='居家隔離通知'" style="color:red">{{'QN5_ANS1_NOTICE'|translate}}</div>
                    <div ng-if="rootCtrl.master.qn4=='有'&&rootCtrl.master.qn4_kind=='自主健康管理通知'" style="color:red">{{'QN5_ANS2_NOTICE'|translate}}</div>                
                </div>   
                            
                
                 
                  
                            
                <div style="margin-top:5px">
                    <span style="font-weight:bold">5. {{'QN3'|translate}}</span>
                    <div ng-if="rootCtrl.control==1||rootCtrl.control==2">
                        <div class="radio">
                            <label ng-class="{error:rootCtrl.infoForm.btm_symp.$error.required}">
                                <input type="radio" style="box-shadow: inset 0 0px 0px rgba(0,0,0,.075),0 0 6px rgba(206, 132, 131, 0)!important;"
                                ng-model="rootCtrl.master.btm_symp" name="btm_symp" value="是，有症狀，已就醫" required />{{'SYMP_1'|translate}}{{'SYMP_NOTICE_1'|translate}}&nbsp;
                            </label>
                        </div><br />
                        <div class="radio">
                            <label ng-class="{error:rootCtrl.infoForm.btm_symp.$error.required}">
                                <input type="radio" style="box-shadow: inset 0 0px 0px rgba(0,0,0,.075),0 0 6px rgba(206, 132, 131, 0)!important;"
                                ng-model="rootCtrl.master.btm_symp" name="btm_symp" value="是，有症狀，未就醫" required />{{'SYMP_2'|translate}}{{'SYMP_NOTICE'|translate}}&nbsp;
                            </label>
                        </div><br />
                        <div class="radio">
                            <label ng-class="{error:rootCtrl.infoForm.btm_symp.$error.required}">
                                <input type="radio" style="box-shadow: inset 0 0px 0px rgba(0,0,0,.075),0 0 6px rgba(206, 132, 131, 0)!important;"
                                ng-model="rootCtrl.master.btm_symp" name="btm_symp" value="其他症狀(噁心、嘔吐、腹痛、腹瀉等)" required />{{'SYMP_4'|translate}}{{'SYMP_NOTICE'|translate}}&nbsp;
                            </label>
                        </div><br />
                        <div class="radio">
                            <label ng-class="{error:rootCtrl.infoForm.btm_symp.$error.required}">
                                <input type="radio" style="box-shadow: inset 0 0px 0px rgba(0,0,0,.075),0 0 6px rgba(206, 132, 131, 0)!important;"
                                ng-model="rootCtrl.master.btm_symp" name="btm_symp" value="否，無上症狀" required />{{'SYMP_3'|translate}}&nbsp;
                            </label>
                        </div>                    
                    </div>
                    <span ng-if="rootCtrl.control==3">
                        {{rootCtrl.getTransKey("btm_symp", rootCtrl.master.btm_symp)|translate}}<br />
                    </span>
                    <span ng-if="rootCtrl.master.btm_symp=='是，有症狀，已就醫'" style="color:red;padding-left: 20px">
                        {{'SYMP_ANS_WARNING_2'|translate}}
                    </span>  
                    <span ng-if="rootCtrl.master.btm_symp=='其他症狀(噁心、嘔吐、腹痛、腹瀉等)'||rootCtrl.master.btm_symp=='是，有症狀，未就醫'" style="color:red;padding-left: 20px">
                        {{'SYMP_ANS_WARNING'|translate}}
                    </span>  
                </div>             
                                                     
                <div style="margin-top:5px; margin-bottom:40px" ng-if="rootCtrl.control==1">
                    <span class="error">{{'NOTICE_5'|translate}}</span>
                    <input class="btn btn-primary" ng-click="rootCtrl.saveMaster()"
                           ng-disabled="rootCtrl.infoForm.$invalid||rootCtrl.isLoading"
                           type="button" value="{{'SEND'|translate}}" />
                </div>                
                <div style="margin-top:5px; margin-bottom:40px" ng-if="rootCtrl.control==2">
                    <span class="error">{{'NOTICE_5'|translate}}</span>
                    <input class="btn btn-primary" ng-click="rootCtrl.updateMaster()"
                           ng-disabled="rootCtrl.infoForm.$invalid||rootCtrl.isLoading"
                           type="button" value="{{'SEND'|translate}}" />
                    <input class="btn btn-default" ng-click="rootCtrl.updatebtn(true)" type="button" value="{{'CANCEL'|translate}}" />
                </div>        
                <div style="margin-top:5px; margin-bottom:20px; font-weight:bold" ng-if="rootCtrl.control==3">
                    {{'EDIT_NOTICE'|translate}}<input class="btn btn-primary" ng-click="rootCtrl.updatebtn(false)" type="button" value="{{'EDIT'|translate}}" />     
                </div>
            </div>
        </div>
        </ng-form>
        <ng-form name="rootCtrl.tempForm" ng-if="rootCtrl.control==3">
        <div class="row" style="font-size:medium">
            <div class="col-md-9">
                <span style="font-weight:bold">{{'TEPERATURE_TABLE'|translate}}</span><br />
                <span style="margin-top:5px">{{'LAST_UPTDATE_TIME'|translate}}：{{rootCtrl.detailList[0].updtime}}</span>
                
                
                <div id="custombtn"
                     ng-click="rootCtrl.pass(false)" 
                     ng-hide="!rootCtrl.detailList[0].isPass||(rootCtrl.detailList[0].btd_temp08>37.5||rootCtrl.detailList[0].btd_temp17>37.5||rootCtrl.tempForm.$invalid||rootCtrl.isLoading||rootCtrl.detailList[0].invalid||rootCtrl.detailList[0].btd_symptom[0]!=9||rootCtrl.detailList[0].btd_symptom01||rootCtrl.detailList[0].btd_symptom02||rootCtrl.detailList[0].btd_symptom03||rootCtrl.detailList[0].btd_symptom04||rootCtrl.detailList[0].btd_symptom05||rootCtrl.detailList[0].btd_symptom06||rootCtrl.detailList[0].btd_symptom07||rootCtrl.detailList[0].btd_symptom08)"
                     class="backgcolor_{{rootCtrl.getDayNum()}}" 
                     style="margin-top:5px">PASS</div>
                     
                <div id="custombtn"
                     ng-click="rootCtrl.pass(true)"
                     ng-show="(rootCtrl.detailList[0].isCPass&&rootCtrl.detailList[0].btd_symptom07&&!rootCtrl.detailList[0].btd_symptom01&&!rootCtrl.detailList[0].btd_symptom08)||(rootCtrl.detailList[0].isCPass&&rootCtrl.detailList[0].btd_symptom09)"
                     class="backgcolor_{{rootCtrl.getDayNum()}}" 
                     style="margin-top:5px">Conditional PASS</div><br />
                <div style="font-size:large; background-color:Red; color:white" ng-if="rootCtrl.detailList[0].qn1_pass_status==0">{{'NOTICE_2'|translate}}</div>
                
                <div style="font-size:large; background-color:yellow; color:black">
                     1. {{'NOTICE_6-1'|translate}}<br />
                     2. {{'NOTICE_6-2'|translate}}<br />
                     3. {{'NOTICE_6'|translate}}
                </div>
                <div style="font-size:large; background-color:red; color:white"
                     ng-show="(rootCtrl.detailList[0].btd_temp08>37.5||rootCtrl.odetailList[0].btd_temp17>37.5||!rootCtrl.detailList[0].btd_symptom09)&&!rootCtrl.detailList[0].invalid">
                     {{'NOTICE_7'|translate}}
                </div>
                <table class="table table-bordered" style="text-align:center;margin-top:10px;font-size:medium">
                
                <tbody>
                    <tr ng-repeat-start="temp in rootCtrl.detailList">
                        <th style="vertical-align:middle; text-align:center; background-color: rgba(128, 128, 128, 0.14);" rowspan="5">
                            {{temp.btd_date.substr(5)}}
                            <div ng-if="temp.isToday">
                                <input class="btn btn-primary" ng-click="rootCtrl.saveDetail()" style="margin-top:10px; font-size:small; width:40px; padding:5px" 
                                       ng-disabled="rootCtrl.tempForm.$invalid||rootCtrl.isLoading||rootCtrl.detailList[0].invalid" type="button" value="{{'SAVE'|translate}}" /> 
                            </div>
                        </th>
                        
                    </tr>
                    
                    <tr><th style="background-color: rgba(128, 128, 128, 0.14);">{{'TABLE_3'|translate}}</th></tr>
                    <tr>
                        <td style="vertical-align:middle; text-align:left">
                            <div ng-if="temp.isToday" class="checkbox" style="padding-left: 5px !important;" ng-class="{error:rootCtrl.detailList[0].invalid}">
                                <p>{{'TEMP_NOTICE_4'|translate}}</p>
                                <label class="checkbox" style="margin-bottom:5px">
                                    <input type="checkbox" ng-model="temp.btd_symptom01" name="btd_symptom" ng-change="rootCtrl.changeSym(temp, false)"
                                           ng-disabled="temp.btd_symptom09"
                                           ng-click="temp.btd_symptom01?temp.btd_symptom09=false:temp.btd_symptom09=temp.btd_symptom09"/>1.發燒(耳溫≧38/額溫≧37.5度)(Fever over 37.5 ˚C)<br />
                                    <span ng-if="temp.btd_symptom01" style="color:red;">請立即就醫(Please seek medical attention immediately.)</span>
                                </label>
                                <label class="checkbox" style="margin-bottom:5px">
                                    <input type="checkbox" ng-model="temp.btd_symptom02" name="btd_symptom" ng-change="rootCtrl.changeSym(temp, false)"
                                           ng-disabled="temp.btd_symptom09"
                                           ng-click="temp.btd_symptom02?temp.btd_symptom09=false:temp.btd_symptom09=temp.btd_symptom09"/>2.咳嗽(Coughs)、或流鼻水鼻塞(非過敏)(or Running/Stuffy Nose)(Not Allergy rhinitis)
                                </label>
                                <label class="checkbox" style="margin-bottom:5px">
                                    <input type="checkbox" ng-model="temp.btd_symptom03" name="btd_symptom" ng-change="rootCtrl.changeSym(temp, false)"
                                           ng-disabled="temp.btd_symptom09"
                                           ng-click="temp.btd_symptom03?temp.btd_symptom09=false:temp.btd_symptom09=temp.btd_symptom09"/>3.頭痛(headache)、喉嚨痛(sore throat)
                                </label>
                                <label class="checkbox" style="margin-bottom:5px">
                                    <input type="checkbox" ng-model="temp.btd_symptom04" name="btd_symptom" ng-change="rootCtrl.changeSym(temp, false)"
                                           ng-disabled="temp.btd_symptom09"
                                           ng-click="temp.btd_symptom04?temp.btd_symptom09=false:temp.btd_symptom09=temp.btd_symptom09"/>4.胸痛(Chest Pain)、呼吸急促、呼吸困難(Shortness of Breath)
                                </label>
                                <label class="checkbox" style="margin-bottom:5px">
                                    <input type="checkbox" ng-model="temp.btd_symptom05" name="btd_symptom" ng-change="rootCtrl.changeSym(temp, false)"
                                           ng-disabled="temp.btd_symptom09"
                                           ng-click="temp.btd_symptom05?temp.btd_symptom09=false:temp.btd_symptom09=temp.btd_symptom09"/>5.全身倦怠、四肢無力(General Weakness)
                                </label>
                                <label class="checkbox" style="margin-bottom:5px">
                                    <input type="checkbox" ng-model="temp.btd_symptom06" name="btd_symptom" ng-change="rootCtrl.changeSym(temp, false)"
                                           ng-disabled="temp.btd_symptom09"
                                           ng-click="temp.btd_symptom06?temp.btd_symptom09=false:temp.btd_symptom09=temp.btd_symptom09"/>6.不明原因腹瀉(Unexplained diarrhea)
                                </label>
                                <label class="checkbox" style="margin-bottom:5px">
                                    <input type="checkbox" ng-model="temp.btd_symptom07" name="btd_symptom" ng-change="rootCtrl.changeSym(temp, false)"
                                           ng-disabled="temp.btd_symptom09"
                                           ng-click="temp.btd_symptom07?temp.btd_symptom09=false:temp.btd_symptom09=temp.btd_symptom09"/>7.有上述2-6項症狀，已就醫且症狀已明顯改善。(Have the above 2-6 symptoms. Have sought medical attention and the symptoms have improved.)
                                </label>
                                <label class="checkbox" style="margin-bottom:5px">
                                    <input type="checkbox" ng-model="temp.btd_symptom08" name="btd_symptom" ng-change="rootCtrl.changeSym(temp, false)"
                                           ng-disabled="temp.btd_symptom09"
                                           ng-click="temp.btd_symptom08?temp.btd_symptom09=false:temp.btd_symptom09=temp.btd_symptom09"/>8.喪失嗅覺或味覺(Loss of smell or taste)<br />
                                    <span ng-if="temp.btd_symptom08" style="font-weight:bold; color:red">請速至急診就醫(Please seek medical attention immediately.)</span>
                                </label>
                                <label class="checkbox" style="margin-bottom:5px">
                                    <input type="checkbox" ng-model="temp.btd_symptom09" name="btd_symptom" ng-change="rootCtrl.changeSym(temp, false)"
                                           ng-disabled="temp.btd_symptom01||temp.btd_symptom02||temp.btd_symptom03||temp.btd_symptom04||temp.btd_symptom05||temp.btd_symptom06||temp.btd_symptom07||temp.btd_symptom08"
                                           ng-click="(temp.btd_symptom01||temp.btd_symptom02||temp.btd_symptom03||temp.btd_symptom04||temp.btd_symptom05||temp.btd_symptom06||temp.btd_symptom07||temp.btd_symptom08)?temp.btd_symptom09=false:temp.btd_symptom09=temp.btd_symptom09"/>9.無以上任一症狀(None of the above)
                                </label>
                            </div>                        
                            <div ng-if="!temp.isToday">
                                {{temp.btd_symptom}}
                            </div>
                        </td>
                    </tr>
                    <tr><th style="background-color: rgba(128, 128, 128, 0.14);" ng-class="{error:rootCtrl.tempForm.btd_other.$error.required}">{{'TABLE_4'|translate}}</th></tr>
                    <tr ng-repeat-end>
                        <td style="vertical-align:middle;text-align:left; ">
                            <div ng-if="temp.isToday">
                                <p ng-class="{error:rootCtrl.tempForm.btd_other.$error.required}" style="text-align:left;" ng-if="temp.btd_symptom01">請務必填寫體溫(Please fill in the temperature measurement record.)</p>
                                <p ng-class="{error:rootCtrl.tempForm.btd_other.$error.required}" style="text-align:left;" ng-if="temp.btd_symptom07">{{'TEMP_NOTICE_5'|translate}}</p>
                                <textarea type="text" ng-model="temp.btd_other" class="form-control" name="btd_other" ng-required="temp.btd_symptom07||temp.btd_symptom01"
                                          style="resize: none; overflow: auto; width:100%; padding:10px; min-width:50px" rows="3"></textarea>
                            </div>
                            <div ng-if="!temp.isToday">
                                {{temp.btd_other?temp.btd_other:"無(N/A)"}}
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="6" style="text-align:center">
                            <input class="btn btn-primary" ng-click="rootCtrl.saveDetail()" ng-disabled="rootCtrl.tempForm.$invalid||rootCtrl.isLoading||rootCtrl.detailList[0].invalid" type="button" value="{{'SAVE_TEMP'|translate}}" /> 
                        </td>
                    </tr>
                </tbody>
                </table>
                <br />
                <br />
                <br />
            </div>        
        </div>
        </ng-form>
        <div ng-if="rootCtrl.master.q1[0]=='5'&&rootCtrl.control==3" style="font-size:large">
            {{'NOTABLE_1'|translate}}<a href ='file/衛教資訊.pdf' target='_blank'>{{'NOTABLE_2'|translate}}</a>{{'NOTABLE_3'|translate}}。
        </div>
        </div>
        <div ng-if="rootCtrl.toOutsch" style="font-size:large">
            <br />{{'NOTABLE_4'|translate}}<a href="S430102_temperature_out.aspx">{{'NOTABLE_5'|translate}}</a>。
        </div>
    </div>
    

<script type="text/javascript">
//<![CDATA[

theForm.oldSubmit = theForm.submit;
theForm.submit = WebForm_SaveScrollPositionSubmit;

theForm.oldOnSubmit = theForm.onsubmit;
theForm.onsubmit = WebForm_SaveScrollPositionOnSubmit;
//]]>
</script>
</form>
</body>
</html>
