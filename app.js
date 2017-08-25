1/*
2
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when it performs code generation tasks such as generating new
    models, controllers or views and when running "sencha app upgrade".

    Ideally changes to this file would be limited and most work would be done
    in other places (such as Controllers). If Sencha Cmd cannot merge your
    changes and its generated code, it will produce a "merge conflict" that you
    will need to resolve manually.
*/
Ext.Loader.setPath('ux', 'app/ux');1111

Ext.application({123
    name: 'master_ChuangCai',
    code: 'code',
    requires: [
        'ChuangCai.config',
        'ux.locale.Manager',
        //公共方法
        'ChuangCai.utils.util',//别名util
        'ChuangCai.utils.MapLocation',//定位
        'ChuangCai.utils.ImgMgr',//图片管理
        'ChuangCai.utils.FileSystemSingleton',//文件、目录操作

        //Jquery
        'ux.jquerys.jquery',
        'ux.lib',
        'ux.highcharts.Highcharts',
        'ux.jquerys.shake',
        'ux.jquerys.mobiscroll',

        'ux.NavigationView',
        'ux.CSS',
        'ChuangCai.view.BottomBar',
        'ux.plugin.ConHref',
        'ux.plugin.ConTpl',
        'ux.tab.LineTabBar',
        'Ext.plugin.DataViewPaging',
        'ux.plugin.ListOptions',
        'ux.plugin.ListActions',
        'ux.plugin.ButtonMenu',
        'ux.plugin.LoadingBar',
        'ux.plugin.PanelRefreshFn',
        'ux.plugin.RefreshFn',
        'ux.plugin.RefreshFn1',
        'ux.plugin.RefreshFnUp',
        'ux.plugin.SwipeTabs',
        'ux.plugin.TouchCalendar',
        'ux.plugin.TouchCalendarSimpleEvents',
        'ux.plugin.TouchCalendarViewModel',
        'ux.plugin.NavTabs',
        'ux.plugin.ListScrollToTop',
        //'ux.ProgressBar',
        //图片类
        'ux.ImageViewer',
        "ux.ImgUpDataView",


        //list类
        "ChuangCai.view.Abstract.BaseList",
        'ChuangCai.view.Abstract.WeiboList',

        'ux.util.CSS', //动态增删改css

        'ux.field.DatePickerEx',
        'ux.field.DateTimePickerEx',
        'ux.field.SearchComponent',
        'ux.field.SelectFieldEx',
        //'ux.field.MobiscrollField',

        'ux.picker.DateTime',
        'ux.picker.Abstract',

        'ux.LoadMaskEx',
        'ux.locale.override.st.field.Field',
        'ux.locale.override.st.field.DatePicker',
        'ux.locale.override.st.form.FieldSet',
        'ux.locale.override.st.navigation.Bar',
        'ux.locale.override.st.navigation.View',
        'ux.locale.override.st.picker.Date',
        'ux.locale.override.st.picker.Picker',
        'ux.locale.override.st.Button',
        'ux.locale.override.st.Component',
        'ux.locale.override.st.Container',
        'ux.locale.override.st.DataView',
        'ux.locale.override.st.TitleBar',
        'Ext.MessageBox',
        'Ext.field.Spinner',
        //'Ext.data.Store',
        'Ext.Img'
    ],

    models: ['HomeMenu'],

    views: [
    ],

    controllers: ['Main', 'User', 'Vlinker'],

    icon: {
        '57': 'resources/icons/Icon.png',
        '72': 'resources/icons/Icon~ipad.png',
        '114': 'resources/icons/Icon@2x.png',
        '144': 'resources/icons/Icon~ipad@2x.png'
    },

    isIconPrecomposed: true,

    startupImage: {
        '320x460': 'resources/startup/320x460.jpg',
        '640x920': 'resources/startup/640x920.png',
        '768x1004': 'resources/startup/768x1004.png',
        '748x1024': 'resources/startup/748x1024.png',
        '1536x2008': 'resources/startup/1536x2008.png',
        '1496x2048': 'resources/startup/1496x2048.png'
    },

    launch: function () {
        var me = this,
            fileVersion = null;
        if (Ext.browser.is.Cordova && Ext.os.is.Android) {
            this.getTextVersion(function (result) {
                fileVersion = result;
            });
            if (fileVersion != config.version) {
                var localUserId = "1";
                var logindata = localStorage.getItem('login-data-b-' + localUserId);
                localStorage.clear();
                loginDataTemp = null;
                util.clearCookie();
                if (logindata) {
                    var login_data = Ext.decode(logindata);
                    var logUser = Ext.create('ChuangCai.model.User', {
                        id: 1,
                        companyid: login_data["companyid"],
                        userid: login_data["userid"],
                        usercode: login_data["usercode"],
                        username: login_data["username"],
                        empid: login_data["empid"],
                        customercode: login_data['customercode'],
                        newuserid: login_data["newuserid"]
                    });
                    logUser.save();
                }
                window.location.reload();
            } else {
                //localStorageSSSS.clear();
                var appLoadingIn = Ext.fly('appLoadingIndicator');
                appLoadingIn.destroy();
                me.locale();
                util.init();

                // Initialize the main view
                //Ext.Viewport.add(Ext.create('ChuangCai.view.Main'));
                Ext.Viewport.add({
                    xtype: 'main'
                });
            }
        } else {
            var appLoadingIn = Ext.fly('appLoadingIndicator');
            appLoadingIn.destroy();
            me.locale();
            util.init();

            var viewName = "";
            var href = location.href.split('#')[0];

            if (href.indexOf("viewName") > -1) {
                viewName = href.substr(href.indexOf("viewName") + 9);
                if (viewName.indexOf("&") > -1) {
                    viewName = viewName.substr(0, viewName.indexOf("&"));
                }
            }

            if (viewName) {
                Ext.Viewport.add({
                    xtype: viewName
                });
            }
            else {
                Ext.Viewport.add({
                    xtype: 'main'
                });
            }


        }

        //this.getTextVersion(function (result) {
        //    //alert(result);
        //    if (result != config.version) {
        //        //alert("clear");
        //        localStorageSSSS.clear();
        //        //alert("clear end");
        //    }

        //    appLoadingIn.destroy();
        //    me.locale();
        //    util.init();

        //    // Initialize the main view
        //    //Ext.Viewport.add(Ext.create('ChuangCai.view.Main'));
        //    Ext.Viewport.add({
        //        xtype: 'main'
        //    });
        //});
        //alert("clear end1");

        // Destroy the #appLoadingIndicator element

        ////解决点击穿透
        //Ext.Viewport.onBefore('activeitemchange', 'beforeActiveItemChange', this);
        //Ext.Viewport.onAfter('activeitemchange', 'afterActiveItemChange', this);
        //Ext.Viewport.on({
        //    delegate: 'mask',
        //    show: 'maskShow',
        //    hide: 'maskHide',
        //    scope: this
        //});
    },
    getTextVersion: function (callback) {
        if (util.getNetwork() != "none") {
            Ext.Ajax.request({
                url: "appversion.txt",
                async: false,
                success: function (resp) {
                    var txt = resp.responseText.trim(),
                        ps = txt.split('\n');
                    var p = ps[0].trim().split('=');


                    if (callback) callback(p[1].trim());
                    //for (var i = 0; i < ps.length; i++) {
                    //    var p = ps[i].trim().split('=');
                    //    if (p[0].trim() == 'version.name') {
                    //        if (p[1].trim() != config.version) {
                    //            alert("clear")
                    //            localStorage.clear();
                    //        }
                    //    }

                    //    if (callback) callback(p[1].trim());
                    //    //if (p[0].trim() == 'version.name' && type == 'name') {
                    //    //    success.call(this, p[1].trim());
                    //    //    break;
                    //    //}
                    //    //else if (p[0].trim() == 'version.code' && type == 'code') {
                    //    //    success.call(this, p[1].trim());
                    //    //    break;
                    //    //}
                    //}
                },
                failure: {
                }
            });
        }
    },
    locale: function () {
        if ((navigator.language || navigator.systemLanguage || navigator.userLanguage).split('-')[0] === 'zh') {
            Ext.Date.dayNames = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
            Ext.Date.monthNames = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
            Ext.Date.monthNumbers = {
                'Jan': 0,
                'Feb': 1,
                'Mar': 2,
                'Apr': 3,
                'May': 4,
                'Jun': 5,
                'Jul': 6,
                'Aug': 7,
                'Sep': 8,
                'Oct': 9,
                'Nov': 10,
                'Dec': 11
            };
            Ext.Date.getShortMonthName = function (month) {
                var n = Ext.Date.monthNames[month];
                return n.substr(0, n.length - 1);
            };
            Ext.Date.getShortDayName = function (day) {
                return Ext.Date.dayNames[day].substr(1, 1);
            };
            Ext.Date.getMonthNumber = function (name) {
                return Ext.Date.monthNumbers[name.substring(0, 1).toUpperCase() + name.substring(1, 3).toLowerCase()];
            };
            Ext.Date.parseCodes.S.s = '(?:st|nd|rd|th)';
            if (Ext.util.Format) {
                Ext.util.Format.defaultDateFormat = 'Y-m-d';
            }
            if (Ext.picker) {
                if (Ext.picker.Picker) {
                    var config = Ext.picker.Picker.prototype.config;
                    config.doneButton = '完成';
                    config.cancelButton = '取消';
                }
                if (Ext.picker.Date) {
                    var config = Ext.picker.Date.prototype.config;
                    config.doneButton = '完成';
                    config.cancelButton = '取消';
                    config.dayText = '日';
                    config.monthText = '月';
                    config.yearText = '年';
                    config.slotOrder = ['year', 'month', 'day'];
                }
            }
            if (ux) {
                if (ux.picker) {
                    if (ux.picker.Abstract) {
                        var config = ux.picker.Abstract.prototype.config;
                        config.doneButton = '完成';
                        config.cancelButton = '取消';
                    }
                    if (ux.picker.DateTime) {
                        var config = ux.picker.DateTime.prototype.config;
                        config.doneButton = '完成';
                        config.cancelButton = '取消';
                        config.dayText = '日';
                        config.monthText = '月';
                        config.yearText = '年';
                        config.hourText = '时';
                        config.minuteText = '分';
                        config.slotOrder = ['year', 'month', 'day', 'hour', 'minute'];
                    }
                }
                if (ux.field.DateTimePicker) {
                    ux.field.DateTimePicker.prototype.config.dateFormat = 'Y-m-d H:i';
                }
            }
            //Ext.define("Ext.zh.DatePicker", {
            //    override: "Ext.picker.Date",
            //    config: {
            //        yearFrom: 2000,
            //        yearText: '年',
            //        monthText: '月',
            //        dayText: '日'
            //    }
            //});
        }
    },
    onUpdated: function () {
        var logindata = util.getLoginData();
        localStorage.clear();
        loginDataTemp = null;
        util.clearCookie();
        if (logindata) {
            var login_data = Ext.decode(logindata);

            var logUser = Ext.create('ChuangCai.model.User', {
                id: 1,
                companyid: login_data["companyid"],
                userid: login_data["userid"],
                usercode: login_data["usercode"],
                username: login_data["username"],
                empid: login_data["empid"]
            });
            logUser.save();
        }
        window.location.reload();
        //Ext.Msg.confirm(
        //    "Application Update",
        //    "This application has just successfully been updated to the latest version. Reload now?",
        //    function (buttonId) {
        //        if (buttonId === 'yes') {
        //            window.location.reload();
        //        }
        //    }
        //);
        //Ext.Msg.show({
        //    title: "应用程序更新",
        //    message: '<span style="font-size: 14px;">这个应用程序已经成功被更新到最新版本。现在重新加载?</span>',
        //    width: "90%",
        //    cls: 'x-msgbox-uuchina',
        //    buttons: [{
        //        text: "取消",
        //        itemId: "no",
        //        flex: 1,
        //        cls: "msg-button msg-button-left"
        //    }, {
        //        text: "确定",
        //        itemId: "ok",
        //        flex: 1,
        //        cls: "msg-button msg-button-right"
        //    }],
        //    fn: function test(btn) {
        //Ext.Msg.show({
        //    title: "应用程序更新",
        //    msg: null,
        //    width: "90%",
        //    cls: 'x-msgbox-uuchina v-msg',
        //    buttons: [{
        //        text: "取消",
        //        itemId: "no",
        //        flex: 1,
        //        //pressedCls: "i-msg-show",
        //        cls: "msg-button msg-button-left"
        //    }, {
        //        text: "确定",
        //        itemId: "ok",
        //        flex: 1,
        //        //pressedCls: "i-msg-show",
        //        cls: "msg-button msg-button-right"
        //    }],
        //    items: [{
        //        xtype: "panel",
        //        id: "msgContent",
        //        cls: 'text-al-center mb-5',
        //        html: "这个应用程序已经成功被更新到最新版本。现在重新加载?"
        //    }],
        //    fn: function test(btn) {
        //        if (btn == 'ok') {
        //            var logindata = util.getLoginData();
        //            localStorage.clear();
        //            if (logindata) {
        //                var login_data = Ext.decode(logindata);

        //                var logUser = Ext.create('ChuangCai.model.User', {
        //                    id: 1,
        //                    companyid: login_data["companyid"],
        //                    userid: login_data["userid"],
        //                    usercode: login_data["usercode"],
        //                    username: login_data["username"],
        //                    empid: login_data["empid"]
        //                });
        //                logUser.save();
        //            }
        //            window.location.reload();
        //        }
        //    }
        //});
    }
});
