function Dictionary() {
    var me = this;			//将this指针保存到变量me中2

    this.CompareMode = 1;		//比较关键字是否相等的模式，0——二进制；1——文本

    this.Count = 0;			//字典中的项目数

    this.arrKeys = new Array();	//关键字数组

    this.arrValues = new Array();	//值数组

    this.ThrowException = true;	//遇到错误时，是否用throw语句抛出异常

    this.Item = function (key)		//Item方法，获取指定键对应的值。如果键不存在，引发异常
    {
        var idx = GetElementIndexInArray(me.arrKeys, key);
        if (idx != -1) {
            return me.arrValues[idx];
        }
        else {
            if (me.ThrowException)
                throw "在获取键对应的值时发生错误，键不存在。";
        }
    }

    this.Keys = function ()		//获取包含所有键的数组
    {
        return me.arrKeys;
    }

    this.Values = function ()		//获取包含所有值的数组
    {
        return me.arrValues;
    }

    this.Add = function (key, value)	//将指定的键和值添加到字典中
    {
        if (CheckKey(key)) {
            me.arrKeys[me.Count] = key;
            me.arrValues[me.Count] = value;
            me.Count++;
        }
        else {
            if (me.ThrowException)
                throw "在将键和值添加到字典时发生错误，可能是键无效或者键已经存在。";
        }
    }

    this.add = function (key, value)	//将指定的键和值添加到字典中
    {
        var idx = GetElementIndexInArray(me.arrKeys, key);
        if (idx != -1) {
            me.arrKeys.splice(idx, 1);
            me.arrValues.splice(idx, 1);
            me.Count--;
        }
        if (CheckKey(key)) {
            me.arrKeys[me.Count] = key;
            me.arrValues[me.Count] = value;
            me.Count++;
        }
        else {
            if (me.ThrowException)
                throw "在将键和值添加到字典时发生错误，可能是键无效或者键已经存在。";
        }
    }

    this.BatchAdd = function (keys, values)		//批量增加键和值数组项，如果成功，增加所有的项，返回true；否则，不增加任何项，返回false。
    {
        var bSuccessed = false;
        if (keys != null && keys != undefined && values != null && values != undefined) {
            if (keys.length == values.length && keys.length > 0)	//键和值数组的元素数目必须相同
            {
                var allKeys = me.arrKeys.concat(keys);	//组合字典中原有的键和新键到一个新数组
                if (!IsArrayElementRepeat(allKeys))	//检验新数组是否存在重复的键
                {
                    me.arrKeys = allKeys;
                    me.arrValues = me.arrValues.concat(values);
                    me.Count = me.arrKeys.length;
                    bSuccessed = true;
                }
            }
        }
        return bSuccessed;
    }

    this.Clear = function ()			//清除字典中的所有键和值
    {
        if (me.Count != 0) {
            me.arrKeys.splice(0, me.Count);
            me.arrValues.splice(0, me.Count);
            me.Count = 0;
        }
    }

    this.ContainsKey = function (key)	//确定字典中是否包含指定的键
    {
        return GetElementIndexInArray(me.arrKeys, key) != -1;
    }

    this.ContainsValue = function (value)	//确定字典中是否包含指定的值
    {
        return GetElementIndexInArray(me.arrValues, value) != -1;
    }

    this.Remove = function (key)		//从字典中移除指定键的值
    {
        var idx = GetElementIndexInArray(me.arrKeys, key);
        if (idx != -1) {
            me.arrKeys.splice(idx, 1);
            me.arrValues.splice(idx, 1);
            me.Count--;
            return true;
        }
        else
            return false;
    }

    this.TryGetValue = function (key, defaultValue)	//尝试从字典中获取指定键对应的值，如果指定键不存在，返回默认值defaultValue
    {
        var idx = GetElementIndexInArray(me.arrKeys, key);
        if (idx != -1) {
            return me.arrValues[idx];
        }
        else
            return defaultValue;
    }

    this.get = function (key, defaultValue)	//尝试从字典中获取指定键对应的值，如果指定键不存在，返回默认值defaultValue
    {
        var idx = GetElementIndexInArray(me.arrKeys, key);
        if (idx != -1) {
            return me.arrValues[idx];
        }
        else
            return defaultValue;
    }

    this.ToString = function ()		//返回字典的字符串值，排列为： 逗号分隔的键列表  分号  逗号分隔的值列表
    {
        if (me.Count == 0)
            return "";
        else
            return me.arrKeys.toString() + ";" + me.arrValues.toString();
    }

    function CheckKey(key)			//检查key是否合格，是否与已有的键重复
    {
        if (key == null || key == undefined || key == NaN)
            return false;
        return !me.ContainsKey(key);
    }

    function GetElementIndexInArray(arr, e)	//得到指定元素在数组中的索引，如果元素存在于数组中，返回所处的索引；否则返回-1。
    {
        var idx = -1;	//得到的索引
        var i;		//用于循环的变量
        if (!(arr == null || arr == undefined || typeof (arr) != "object")) {
            try {
                for (i = 0; i < arr.length; i++) {
                    var bEqual;
                    if (me.CompareMode == 0)
                        bEqual = (arr[i] === e);	//二进制比较
                    else
                        bEqual = (arr[i] == e);		//文本比较
                    if (bEqual) {
                        idx = i;
                        break;
                    }
                }
            }
            catch (err) {
            }
        }
        return idx;
    }

    function IsArrayElementRepeat(arr)	//判断一个数组中的元素是否存在重复的情况，如果存在重复的元素，返回true，否则返回false。
    {
        var bRepeat = false;
        if (arr != null && arr != undefined && typeof (arr) == "object") {
            var i;
            for (i = 0; i < arr.length - 1; i++) {
                var bEqual;
                if (me.CompareMode == 0)
                    bEqual = (arr[i] === arr[i + 1]);	//二进制比较
                else
                    bEqual = (arr[i] == arr[i + 1]);		//文本比较
                if (bEqual) {
                    bRepeat = true;
                    break;
                }
            }
        }
        return bRepeat;
    }
}
var isShowLoading = "N";
function beginLoad() {
    //layer.load();
    isShowLoading = "Y";
    setTimeout(function () {
        if (isShowLoading == "Y") {
            util.setMasked(true, "加载中...");
        }
    }, 500);

}
function endLoad() {
    util.setMasked(false);
    isShowLoading = "N";
}
function loginDirect(viewName) {
    var userId = util.getUserId();
    if (!userId) {
        var moveTo = util.getCmp('userLogin') || Ext.factory({ xtype: 'userLogin' });
        Ext.Viewport.add(moveTo);
        moveTo.show();
    } else {
        // util.showMessage(userId, true, 2);
        stObj.redirectTo('redirec/' + viewName);
    }
    dict.add("viewName", viewName);
}
//验证码倒计时
function setMiao(id) {
    var dom = Ext.getCmp(id);
    if (dom) {
        if (totalSecond > 0) {
            dom.setHtml("重新获取(" + totalSecond + "s)");
            totalSecond = totalSecond - 1;
        }
        else {
            dom.setHtml("获取验证码");
            dom.setDisabled(false);
            clearInterval(Vtimeout);
        }
    }
}
function VerificationF(id) {
    var me = this,
        dom = Ext.getCmp(id);
    dom.setDisabled(true);
    totalSecond = 60;
    Vtimeout = setInterval(function () {
        setMiao(id);
    },
        1e3)
}
function clearValid(id) {
    var dom = Ext.getCmp(id);
    if (dom) {
        dom.setHtml("获取验证码");
        dom.setDisabled(false);
        clearInterval(Vtimeout);
    }
}
//上传头像（phoneGap）
//function onTapUserPhoto() {
//    var userId = util.getUserId();
//    if (!userId) {
//        loginDirect("profile_card");
//        return;
//    }
//    //if (!Ext.browser.is.Cordova || !userId) return;
//    var sheet = Ext.Viewport.add({
//        xtype: 'actionsheet',
//        title: '选择头像',
//        modal: true,
//        cls: 'upload-photo-actionsheet br-0 b-0 bg-transparent',
//        hideOnMaskTap: true,
//        items: [{
//            xtype: 'button',
//            height: '40px',
//            cls: "take-photo-button br-0 b-0",
//            text: '<p>拍照</p>',
//            handler: function () {
//                sheet.hide();
//                navigator.camera.getPicture(function (URL) {
//                    uploadUserPhoto(URL);
//                }, function (message) {
//                    util.showMessage(message, true)
//                }, {
//                    sourceType: Camera.PictureSourceType.CAMERA,        //相机获取（默认的）
//                    destinationType: Camera.DestinationType.FILE_URI,    //返回图像文件的URI
//                    quality: 80,  //图像质量[0,100],必须低于50，否则可能会引起iPhone上内存不足
//                    allowEdit: true,//只有iPhone下true才有效
//                    targetWidth: 250,
//                    targetHeight: 250,
//                    saveToPhotoAlbum: true,
//                    encodingType: Camera.EncodingType.JPEG,
//                    cameraDirection: 1, // BACK (前置摄像头): 0, FRONT : 1
//                    correctOrientation: true
//                });
//            }
//        }, {
//            xtype: 'button',
//            height: '40px',
//            cls: "select-photo-button br-0 b-0",
//            text: '<p>从手机相册中选择</p>',
//            handler: function () {
//                sheet.hide();
//                navigator.camera.getPicture(function (URL) {
//                    uploadUserPhoto(URL);
//                }, function (message) {
//                    util.showMessage(message, true)
//                }, {
//                    quality: 80,
//                    allowEdit: true,
//                    targetWidth: 250,
//                    targetHeight: 250,
//                    destinationType: navigator.camera.DestinationType.FILE_URI,
//                    sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY,
//                    saveToPhotoAlbum: true
//                });
//            }
//        }, {
//            height: '40px',
//            cls: "photo-cancel-button mt-10 b-0",
//            text: '<p>取消</p>',
//            handler: function () {
//                sheet.hide();
//            }
//        }]
//    });
//    sheet.on({
//        hide: sheet.destroy,
//        scope: sheet
//    });
//    sheet.show();
//}
//function uploadUserPhoto(imageURI) {
//    var me = this;
//    var options = new FileUploadOptions();
//    options.fileKey = "fileAddPic";//用于设置参数，对应form表单里控件的name属性，这是关键，废了一天时间，完全是因为这里，这里的参数名字，和表单提交的form对应  
//    var imagefilename = Number(new Date()) + ".jpg";
//    options.fileName = imagefilename;
//    //options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);  
//    //如果是图片格式，就用image/jpeg，其他文件格式上官网查API  
//    options.mimeType = "image/jpeg";
//    options.mimeType = "multipart/form-data";//这两个参数修改了，后台就跟普通表单页面post上传一样 enctype="multipart/form-data"  
//    //这里的uri根据自己的需求设定，是一个接收上传图片的地址  
//    var url = util.getMobileSite() + "Mobile/Service/UploadUserPhoto";
//    options.chunkedMode = false;
//    var params = new Object();
//    params.fileAddPic = imageURI;
//    params.userId = util.getUserId();
//    options.params = params;
//    var ft = new FileTransfer();

//    //ft.onprogress = me.showUploadingProgress;
//    //navigator.notification.progressStart("", "当前上传进度");
//    //ft.onprogress = function (progressEvent) {
//    //    if (progressEvent.lengthComputable) {
//    //        //已经上传  
//    //        var loaded = progressEvent.loaded;
//    //        //文件总长度  
//    //        var total = progressEvent.total;
//    //        //计算百分比，用于显示进度条  
//    //        var percent = parseInt((loaded / total) * 100) + "%";
//    //        //换算成MB  
//    //        loaded = (loaded / 1024).toFixed(2);
//    //        total = (total / 1024).toFixed(2);
//    //        util.showWarning(loaded + 'KB/' + total + 'KB', true);
//    //        //Ext.getCmp('selectPhotoBtn').setBadgeText(percent);
//    //    }
//    //};
//    util.setMasked(true, "上传中...");
//    ft.upload(imageURI, url,
//        function (result) {
//            util.setMasked(false);
//            //navigator.notification.progressStop();
//            //me.deletePictureFromCache(imageURI);
//            result = result.response;
//            dict.add("userImageUrl", result);
//            var path = util.getImageSite() + result;
//            if (dict.get("uploadPhotoFlag")) {
//                //Ext.getCmp('userPhoto').setHtml('<div class="fl mt-10"><p class="font-s14">头像</p></div><div class="fr mr-20"><img class="br-percent50" src="' + path + '" width="40" height="40" style="float:left;" /></div>')
//                dict.add("uploadPhotoFlag", null);
//            }
//            $("#user-img-url").attr('src', path);
//            $("#user-card-img-url").attr('src', path);
//            util.showMessage("头像上传成功！", true, 1);
//        },
//        function (error) {
//            util.setMasked(false);
//            //alert(error.code);
//            /*
//       FileTransferError.FILE_NOT_FOUND_ERR：1 文件未找到错误。
//      •FileTransferError.INVALID_URL_ERR：2  无效的URL错误。
//      •FileTransferError.CONNECTION_ERR：3  连接错误。
//      FileTransferError.ABORT_ERR = 4;  程序异常
//      */
//            util.showMessage("网络异常,请重新上传！", true, 1);
//        },
//        options
//    );

//}

function bdmap(ad, city) {
    window.plugins.BaiduMap.baiduad(
        ad, city,
        function (success) {
            // alert(“encode success: ” + success);
        }, function (fail) {
            // alert(“encoding failed: ” + fail);
        }
    );
}
//微信上传图片
function uploadImageTap(value) {
    //wx.getNetworkType({
    //    success: function (res) {
    //        var networkType = res.networkType; // 返回网络类型2g，3g，4g，wifi
    //        alert(networkType);
    //    }
    //});
    chooseImage(value);
}
function chooseImage(value) {
    images = {
        localId: [],
        serverId: []
    };
    if (value != "User") {
        wx.chooseImage({
            //count: 1, // 默认9
            //sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            //sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                images.localId = res.localIds;
                //alert('已选择 ' + res.localIds.length + ' 张图片');
                uploadImage(value)
            }
        });
    } else {
        wx.chooseImage({
            count: 1, // 默认9
            //sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            //sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                images.localId = res.localIds;
                // alert('已选择 ' + res.localIds.length + ' 张图片');
                uploadImage(value)
            }
        });
    }

}
function uploadImage(value) {
    if (images.localId.length == 0) {
        alert('请先使用 chooseImage 接口选择图片');
        return;
    }
    var i = 0, length = images.localId.length;
    images.serverId = [];
    function upload() {
        wx.uploadImage({
            localId: images.localId[i],
            isShowProgressTips: 1, // 默认为1，显示进度提示
            success: function (res) {
                i++;
                images.serverId.push(res.serverId);
                if (i < length) {
                    upload();
                } else {
                    //alert(value);
                    //alert(images.serverId);
                    Ext.Ajax.request({
                        url: util.getMobileSite() + "Business/UploadWeixinImage.ashx",
                        //url:  "http://192.168.4.102:80/WK/Mobile/Business/UploadWeixinImage.ashx",
                        params: {
                            imageServerId: images.serverId, directoryName: value,
                            userId: util.getUserId(), processId: dict.get("processId")
                        },
                        headers: { 'X-Requested-With': 'XMLHttpRequest' },
                        success: function (result, context) {
                            var result = result.responseText;
                            if (value == "Process") {
                                onReloadProcessActualList();
                            } else if (value == "User") {
                                onReloadPersonalInfo()
                            }
                            util.showMessage("成功", true);
                        },
                        failure: function (result, context) {
                            var msg = result.responseText;
                            util.showMessage(msg, true);
                        },
                        method: "POST"
                    });
                }
            },
            fail: function (res) {
                alert(JSON.stringify(res));
            }
        });
    }
    upload();
}

////微信支付
//function wxPayRequest(orderNo, subject, body, total_fee) {
//    openid = dict.get("openId");
//    var code = dict.get("url_code");
//    if (!openid) {
//        alert("用户支付ID已经过期，请关闭微信后重新进入！");
//    }
//    else {
//        var url = cc.getCrmUrl() + "/Weixin/Advanced/GetWxPaySign?mchId=1415130202&url=" + location.href.split('#')[0] + "&openid=" + openid + "&order_no=" + orderNo + "&subject=" + subject + "&body=" + body + "&total_fee=" + total_fee;
//        Ext.Ajax.request({
//            url: cc.getCrmUrl() + "/Weixin/Advanced/GetAuthorizeUrl",
//            params: {
//                mchId: '1415130202', returnUrl: url
//            },
//            success: function (result, context) {
//                Ext.Ajax.request({
//                    url:result,
//                    //url: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx7b8483c183b1eb7f&redirect_uri=' + cc.getCrmUrl() + "/Weixin/Advanced/GetWxPaySign?mchId=1415130202&response_type=code&scope=snsapi_userinfo&state=1&connect_redirect=1#wechat_redirect",
//                    //params: {
//                    //    mchId: '1415130202',code:code, url: location.href.split('#')[0], openid: openid, order_no: orderNo, subject: subject, body: body, total_fee: total_fee
//                    //},
//                    //params: {
//                    //    url: location.href.split('#')[0], openid: openid, order_no: orderNo, subject: subject, body: body, total_fee: total_fee
//                    //},
//                    success: function (result, context) {
//                        var json = result.responseText;
//                        alert(json);
//                        json = Ext.decode(json);
//                        var appId = json.appId;
//                        var nonceStr = json.nonceStr;
//                        var packages = json.packages;
//                        var paySign = json.paySign;
//                        var timeStamp = json.timeStamp;
//                        alert(paySign);
//                        wx.chooseWXPay({
//                            "timestamp": timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
//                            "nonceStr": nonceStr, // 支付签名随机串，不长于 32 位
//                            "package": packages, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
//                            "signType": "MD5", // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
//                            "paySign": paySign, // 支付签名
//                            success: function (res) {
//                                //成功之后的处理//回调支付确认
//                                alert("支付成功！")
//                                onSurePay(orderNo);
//                                alert("支付成功！")
//                            }
//                        });
//                    },
//                    failure: function (result) {
//                        alert(result);
//                        var msg = result.responseText;
//                        util.showMessage(msg, true);
//                    },
//                    method: "POST"
//                });
//            },
//            failure: function (result) {
//                alert(result);
//                var msg = result.responseText;
//                util.showMessage(msg, true);
//            },
//            method: "POST"
//        });
//    }
//}
//function onSurePay(rowId) {
//    Ext.Ajax.request({
//        url: util.getMobileSite() + "Shop/PaySecurityDeposit.ashx",
//        params: {
//            rowId: rowId, delFlag: "updateIsPay", payType: "weiXin"
//        },
//        headers: { 'X-Requested-With': 'XMLHttpRequest' },
//        success: function (result, context) {
//            Ext.getCmp('submitEnsureMon').setHidden(true);
//            Ext.getCmp('submitOfferRecord').setHidden(false);
//        },
//        failure: function (result, context) {
//            var msg = result.responseText;
//            util.showMessage(msg, true);
//        },
//        method: "POST"
//    });
//}

function TestAlipay(partner, seller, private_key, public_key, tradeNO, productName, productDescription, amount, me) {
    if (Ext.os.is.iOS) {
        navigator.alipay.nativeFunction("alipayVlinker",
            [partner, seller, private_key, public_key, tradeNO, productName, productDescription, amount],
            function (result) {
                if (dict.get("payViewName") == "book_list") {
                    me.reserveRoomSuccess(result, tradeNO);
                } else if (dict.get("payViewName") == "reserve_pay") {
                    me.reserveRoomSuccess(result, tradeNO);
                }
            },
            function (error) {
                alert("Error: \r\n" + error);
            }
        );

    } else if (Ext.os.is.Android) {
        pay.pay(partner, seller, private_key, public_key, tradeNO, productName, productDescription, amount, function (result) {
            //支付成功：9000，取消支付：6001
            //util.showWarning("Success: \r\n" + e)
            if (dict.get("payViewName") == "book_list") {
                me.reserveRoomSuccess(result, tradeNO);
            } else if (dict.get("payViewName") == "reserve_pay") {
                me.reserveRoomSuccess(result, tradeNO);
            }
        }, function (e) {

        });
    }
}

//支付宝支付
function alipay(tradeNO, productName, productDescription, amount, me) {
    //tradeNO = "447791694247160";
    //productName = "测试";
    //productDescription = "测试测试测试测试";
    //amount = "0.01";
    var partner = "2088121579081839";
    var seller = "gfzc668@sina.com";
    var private_key = "MIICdQIBADANBgkqhkiG9w0BAQEFAASCAl8wggJbAgEAAoGBAMM8VWtPlAzAZojCQJw7HbVrfvKkY2V4wPKtufIrcUvykNYIikJF8vvioDZMK16FmX9xPVaI/ExRQHnW2K86W5ZOXXwkeW2XCOGfy7L8QTKoZ0nq+qD7z0pEA/i7aZcHrrI0/QA9Czrkx0bDEGZR1JWPydfxHSd8ly/HBfcrMVEhAgMBAAECgYAiH+aSRiuLewmw97sRU6fisPJUePVCpDOdd04cDQnVi4VTU9TOtqk866SzOOcPs2xcATAGcxUeRcluQmZHYnzlXxBKQHtDBS7k7piLSCn6OMBHPpKcTcnFQzWZqMrH57XoyX8EBVKRj3g1gkiHfmABI/WE7kjrWbL11P9q8aIq7QJBAPpLYtOluSbNuBl+idz+4yaye7wN6VfiRAb/lzWWp61aUOdxuj4a5m1JKRtiY1vvGClTxglSfJ6KiSbHWOSIp8sCQQDHr6XB9wx1X4U1dPc5jqTQ9u8mgKp9mMrb+9jJdmW4jeS/JRuSOTAmX5ao/1eSyvkkyX+pk8nC46b2TWoGRVVDAkAxcUbabDhA9A5T6u0s3KTedg9/PHhFxgqOH1stWM9SrS6iKZMSxZmTKQqXwD3EYVyyfTv3h3Xak584K9ThgCU1AkAz7oZZT3q5+8GVCXpSSbqrbcz8YnH0gAwh8fmLS3Ng7+YRoADvolfXYvy3rtCDqK3q10yQOZM7UCFX5QIx504pAkB48bDBNnCTQR6r6ZPckYmqR7cCO1JoCVqdPCTu7SAUyVT+IBKs2x/Kef836vZPBwZeJ8y3WPk6ytG6pWtF6p9I";
    var public_key = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCnxj/9qwVfgoUh/y2W89L6BkRAFljhNhgPdyPuBV64bfQNN1PjbCzkIM6qRdKBoLPXmKKMiFYnkd6rAoprih3/PrQEB/VsW8OoM8fxn67UDYuyBTqA23MML9q1+ilIZwBC2AQ2UBVOrFXfFl75p6/B5KsiNG9zpgmLCUYuLkxpLQIDAQAB";

    var vals = {
        "tradeNo": tradeNO,
        "type": "2"
    }
    //me.reserveRoomSuccess("6001", tradeNO);
    //支付成功：9000，取消支付：6001
    util.Invoke("Mobile/Service/GetPayInfo", vals, "", {
        loadTarget: true,
        maskTarget: "加载中...",
        success: function (result) {
            if (result) {
                var json = Ext.decode(result);
                partner = json[0].partner;
                seller = json[0].seller;
                private_key = json[0].privateKey;
                public_key = json[0].publicKey;
                productName = json[0].name;
                productDescription = json[0].body;
                amount = json[0].price;
                if (Ext.os.is.iOS) {
                    navigator.alipay.nativeFunction("alipayVlinker",
                        [partner, seller, private_key, public_key, tradeNO, productName, productDescription, amount],
                        function (result) {
                            if (dict.get("payViewName") == "book_list") {
                                me.reserveRoomSuccess(result.resultStatus, tradeNO);
                            } else if (dict.get("payViewName") == "reserve_pay") {
                                me.reserveRoomSuccess(result.resultStatus, tradeNO);
                            } else if (dict.get("payViewName") == "pay_list") {
                                me.paySuccess(result.resultStatus, tradeNO);
                            }
                        },
                        function (error) {
                            alert("Error: \r\n" + error);
                        }
                    );
                } else if (Ext.os.is.Android) {
                    pay.pay(partner, seller, private_key, public_key, tradeNO, productName, productDescription, amount, function (result) {
                        if (dict.get("payViewName") == "book_list") {
                            me.reserveRoomSuccess(result.resultStatus, tradeNO);
                        } else if (dict.get("payViewName") == "reserve_pay") {
                            me.reserveRoomSuccess(result.resultStatus, tradeNO);
                        } else if (dict.get("payViewName") == "pay_list") {
                            me.paySuccess(result.resultStatus, tradeNO);
                        }
                    }, function (e) {

                    });
                }
            } else {
                util.showMessage("未配置支付信息！")
            }
        }
    });
}
//二维码
function barCode() {
    if (Ext.os.is.iOS) {
        navigator.BarcodeScan.nativeFunction("BarcodeScanner",
            ['参数1', "参数2"],
            function (result) {
                //alert("Success: \r\n ddddd" + result);
                barCodeSuccess(result);
            },
            function (error) {
                alert("Error: \r\n" + error);
            }
        );

        // cordova.plugins.barcodeScanner.scan(
        //    function (result) {
        //        alert("Scanned Code: " + result.text
        //                + ". Format: " + result.format
        //                + ". Cancelled: " + result.cancelled);
        //    }, function (error) {
        //        alert("Scan failed: " + error);
        //    }
        //);

    } else if (Ext.os.is.Android) {
        scan.scan("1", function (result) {
            //util.showWarning("Success: \r\n" + a);
            barCodeSuccess(result);
        }, function (result) {
        });
    }
}
function barCodeSuccess(value) {
    if (util.getUserId() == null) {
        var moveTo = util.getCmp('userLogin') || Ext.factory({ xtype: 'userLogin' });
        Ext.Viewport.add(moveTo);
        moveTo.show();
        dict.add("viewName", "barCode");
        dict.add("barCodeValue", value);
    } else {
        //alert(value);
        var a = dict.get("locationVal");
        if (a) {
            //alert(a.Latitude);
            lon = a.Longitude;
            lat = a.Latitude;
        }
        var lon;
        var lat;
        var vals = {
            "userId": util.getUserId(),
            "barcode": value,
            "lon": lon,
            "lat": lat
        };

        util.Invoke("Mobile/Service/ActivitySignIn", vals, "", {
            loadTarget: null,
            maskTarget: "处理中...",
            success: function (result) {
                var json = Ext.decode(result);

                util.showMessage(json[0].text, true, 2);
            }
        });
    }

}
//摇一摇
function shakeAgain(title) {
    //if (Ext.os.is.iOS) {
    //    navigator.shake.nativeFunction("shakeHandle",
    //        ['HelloWorld222', "hahahaha"],
    //        function (result) {
    //            alert("Success: \r\n" + result);
    //        },
    //        function (error) {
    //            alert("Error: \r\n" + error);
    //        }
    //    );

    //} else if (Ext.os.is.Android) {
    //    shake.shake("abcde", "name");
    //}

}

//微信端登录
function weinxinLogin(openId, me) {
    var user = util.isLogin();
    if (!user) {
        if (openId) {
            Ext.Ajax.request({
                url: util.getMobileSite() + "WuKong/WeixinLogin.ashx",
                async: false,
                params: {
                    openId: openId
                },
                headers: { 'X-Requested-With': 'XMLHttpRequest' },
                success: function (result) {

                    var localUserId = "1";
                    if (config.clientType == "B") {
                        localUserId = "2";
                    }
                    json = Ext.decode(result.responseText);
                    if (json[0]["userId"]) {
                        dict.add("userType", json[0]["userType"])
                        var logUser = Ext.create('ChuangCai.model.User', {
                            id: localUserId,
                            //id: 1,
                            companyid: '20080101',
                            userid: json[0]["userId"],
                            usercode: json[0]["userCode"],
                            username: json[0]["userName"],
                            usertype: json[0]["userType"],
                            empid: json[0]["employeeId"]
                        });
                        logUser.save();
                        Ext.Viewport.setActiveItem('main', { type: 'slide', direction: 'left' });
                    } else {
                        if (config.clientType == "B") {
                            Ext.Viewport.setActiveItem('userLogin', { type: 'slide', direction: 'left' });
                        } else {
                            Ext.Viewport.setActiveItem('main', { type: 'slide', direction: 'left' })
                        }
                    }
                },
                failure: function (result, context) {
                    var msg = result.responseText;
                    util.showMessage(msg, true);
                },
                method: "POST"
            });
        } else {
            Ext.Viewport.setActiveItem('userLogin', { type: 'slide', direction: 'left' });
        }
    }
    endLoad();
}
//记录日志
function recordOpertionLog(viewName) {
    //var _hmt = _hmt || [];
    //(function () {
    //    var hm = document.createElement("script");
    //    hm.src = "//hm.baidu.com/hm.js?b605ba9e714c71c29ee3842b8e865694";
    //    var s = document.getElementsByTagName("script")[0];
    //    s.parentNode.insertBefore(hm, s);
    //})();
}

function initList(moduleCode, viewId, url, queryCodition, obj) {
    if (stObj) {
        dealModuleScript(moduleCode, "brw_" + moduleCode, false, false);
    }
    //store = Ext.getCmp(viewId).getStore();
    var token = util.getAccessToken();
    //if (moduleCode == "MOBILE_V_STORE_MNG") {
    //    store = dict.get("MOBILE_V_STORE_MNG");
    //    if (!store) {
    //        store = Ext.getCmp(viewId).getStore();
    //        dict.add("MOBILE_V_STORE_MNG", store);
    //    }
    //    Ext.getCmp(viewId).setStore(store);
    //}
    //else {
    store = Ext.getCmp(viewId).getStore();
    //}
    if (store._totalCount == null || dict.get("reloadModuleCode") == moduleCode) {
        if (moduleCode != "MVC_V_HOME_STORE_MNG") {
            beginLoad();
        }

        tempParams = { 'loadItemEl': '' };
        if (url) {
            //if (url.indexOf("?") > -1) {
            //    url = url + "&moduleCode=" + moduleCode + '&access_token=' + token + '&userId=' + util.getUserId() + '&platform=' + util.getClientPlatform() + '&newUserId=' + util.getUserId();
            //}
            //else {
            //    url = url + "?moduleCode=" + moduleCode + '&access_token=' + token + '&userId=' + util.getUserId() + '&platform=' + util.getClientPlatform() + '&newUserId=' + util.getUserId();
            //}
            Ext.getCmp(viewId).getStore()._proxy._url = url;
        }
        var proxy = store.getProxy();
        proxy.config.actionMethods.read = "POST";
        var enc = $('#encode');
        $.base64.utf8encode = true;
        var queryCodition1 = $.base64.btoa(queryCodition);

        proxy.setExtraParam('QueryCodition', queryCodition1);
        proxy.setExtraParam('moduleCode', moduleCode);
        proxy.setExtraParam('userId', util.getUserId());
        proxy.setExtraParam('newUserId', util.getUserId());
        proxy.setExtraParam('access_token', token);
        proxy.setExtraParam('platform', util.getClientPlatform());

        store.load(function (records, operation, success) {
            if (success) {
                if (operation._page > 1) {
                    if (Ext.getCmp(viewId)) {
                        Ext.getCmp(viewId).getStore().loadPage(1);
                    }
                }
                else {
                    if (records.length == 0) {
                        if (Ext.getCmp(viewId)) {
                            Ext.getCmp(viewId).getStore().setData(null);
                        }
                    }
                }
                endLoad();
                if (moduleCode == "MOBILE_V_STORE_MNG" && viewId == "mainTabHomeId") {
                    obj.saveHomeList(records);
                }
            }
            else {
                endLoad();
            }
        }, obj);
        if (dict) {
            dict.add("reloadModuleCode", null);
        }
        endLoad();
    } else {
        endLoad();
    }

}

//处理模块脚本
function evalModuleScript(controller, moduleCode, xtype, isCheckLogin, isRedirect, item) {
    var vals = {
        ModuelCode: moduleCode,
        Script: item.script,
        Css: item.css,
        Controller: controller,
        XType: xtype
    };
    util.evalCssModel(vals);
    util.evalScriptModel(vals);
    if (isRedirect) {
        dealModuleIsLogin(isCheckLogin, xtype)
    }
}
function dealModuleScript(moduleCode, xtype, isCheckLogin, isRedirect) {
    var controller = "control_" + moduleCode,
        app = stObj.getApplication();
    var cname = 'ChuangCai.controller.' + controller,
        instances = app.getControllerInstances(),
        moduleScriptData = localStorage.moduleScriptData,
        item;
    if (!instances.hasOwnProperty(cname)) {
        if (moduleScriptData) {
            moduleScriptData = moduleScriptData.split(",");
            for (var i = 0; i < moduleScriptData.length; i++) {
                if (moduleScriptData[i] == moduleCode) {
                    item = localStorage.getItem('moduleScriptData-' + moduleScriptData[i]);
                    item = Ext.decode(item);
                    evalModuleScript(controller, moduleCode, xtype, isCheckLogin, isRedirect, item)
                }
            }
        }
        if (!instances.hasOwnProperty(cname)) {
            var valsqqq = {
                moduleCode: moduleCode
            };
            util.Invoke("api/MService/GetModuleScript", valsqqq, "", {
                loadTarget: true,
                maskTarget: "加载中...",
                success: function (result) {
                    result = Ext.decode(result);
                    evalModuleScript(controller, moduleCode, xtype, isCheckLogin, isRedirect, result)
                    var moduleScript = Ext.create('ChuangCai.model.sys.ModuleScript', {
                        id: moduleCode,
                        script: result.script,
                        css: result.css
                    });
                    moduleScript.save();
                }
            });
        }
    } else {
        if (isRedirect) {
            dealModuleIsLogin(isCheckLogin, xtype)
        }
        else {
            if (moduleScriptData) {
                moduleScriptData = moduleScriptData.split(",");
                for (var i = 0; i < moduleScriptData.length; i++) {
                    if (moduleScriptData[i] == moduleCode) {
                        item = localStorage.getItem('moduleScriptData-' + moduleScriptData[i]);
                        item = Ext.decode(item);
                        evalModuleScript(controller, moduleCode, xtype, isCheckLogin, isRedirect, item)
                    }
                }
            }
        }
    }
}
function dealModuleIsLogin(isCheckLogin, xtype) {
    if (!isCheckLogin) {
        stObj.redirectTo("redirec/" + xtype);
    } else {
        if (util.getUserId() == null) {
            var moveTo = util.getCmp('userLogin') || Ext.factory({ xtype: 'userLogin' });
            Ext.Viewport.add(moveTo);
            dict.add("viewName", xtype);
            moveTo.show();
        } else {
            stObj.redirectTo("redirec/" + xtype);
        }
    }
}

function dealServerScript(keyword, xtype, isCheckLogin, isRedirect, stObj) {
    //缓存
    var controller = "control_" + keyword,
        app = stObj.getApplication();
    var cname = 'ChuangCai.controller.' + controller,
        instances = app.getControllerInstances(),
        moduleScriptData = localStorage.moduleScriptData,
        item;
    if (!instances.hasOwnProperty(cname)) {
        if (moduleScriptData) {
            moduleScriptData = moduleScriptData.split(",");
            for (var i = 0; i < moduleScriptData.length; i++) {
                if (moduleScriptData[i] == keyword) {
                    item = localStorage.getItem('moduleScriptData-' + moduleScriptData[i]);
                    item = Ext.decode(item);
                    evalModuleScript(controller, keyword, xtype, isCheckLogin, isRedirect, item);
                }
            }
        }
        if (!instances.hasOwnProperty(cname)) {
            var valsqqq = {
                keyword: keyword
            };
            util.Invoke("api/MService/GetJavaScript", valsqqq, "", {
                loadTarget: true,
                maskTarget: "加载中...",
                success: function (result) {
                    result = Ext.decode(result);
                    evalModuleScript(controller, keyword, xtype, isCheckLogin, isRedirect, result);
                    var moduleScript = Ext.create('ChuangCai.model.sys.ModuleScript', {
                        id: keyword,
                        script: result.script,
                        css: result.css
                    });
                    moduleScript.save();
                }
            });
        }
    } else {
        if (isRedirect) {
            dealModuleIsLogin(isCheckLogin, xtype);
        }
        else {
            if (moduleScriptData) {
                moduleScriptData = moduleScriptData.split(",");
                for (var i = 0; i < moduleScriptData.length; i++) {
                    if (moduleScriptData[i] == keyword) {
                        item = localStorage.getItem('moduleScriptData-' + moduleScriptData[i]);
                        item = Ext.decode(item);
                        evalModuleScript(controller, keyword, xtype, isCheckLogin, isRedirect, item);
                    }
                }
            }
        }
    }
}

var firstPage;
var editPage;
var isDisplayAdd;
var isDisplayQuery;
function initListMenu(moduleCode, viewId, obj) {
    //var modulePrivId = localStorage.getItem('ModulePrivId');
    //var item;
    //if (modulePrivId) {
    //    item = localStorage.getItem('ModulePrivId-' + moduleCode);
    //}
    //if (item) {
    //    var menus = Ext.decode(item);
    //    var id = moduleCode;
    //    var isDisplayBatch = menus["IsDisplayBatch"];
    //    var addPriv = menus["AddPriv"];
    //    var queryPriv = menus["QueryPriv"];
    //    firstPage = menus["FirstPage"];
    //    editPage = menus["EditPage"];
    //    isDisplayAdd = menus["IsDisplayAdd"];
    //    isDisplayQuery = menus["IsDisplayQuery"];
    //    initListMenu1(moduleCode, viewId, obj, isDisplayBatch, addPriv, queryPriv);
    //}
    //else {
    //    if (util.getUserId()) {
    //        Ext.Ajax.request({
    //            url: util.getMobileSite() + "Sys/GetModulePriv.ashx",
    //            params: {
    //                moduleCode: moduleCode, usreId: util.getUserId()
    //            },
    //            headers: { 'X-Requested-With': 'XMLHttpRequest' },
    //            success: function (result, context) {
    //                var json = result.responseText;
    //                var isDisplayBatch;
    //                var addPriv;
    //                var queryPriv;
    //                if (json) {
    //                    var menus = Ext.decode(json);
    //                    isDisplayBatch = menus[0].IS_DISPLAY_BATCH;
    //                    addPriv = menus[0].AddPriv;
    //                    queryPriv = menus[0].QueryPriv;
    //                    firstPage = menus[0].FirstPage;
    //                    editPage = menus[0].EditPage;
    //                    isDisplayAdd = menus[0].IsDisplayAdd;
    //                    isDisplayQuery = menus[0].IsDisplayQuery;
    //                    var modulePriv = Ext.create('ChuangCai.model.sys.ModulePriv', {
    //                        id: moduleCode,
    //                        IS_DISPLAY_BATCH: isDisplayBatch,
    //                        AddPriv: addPriv,
    //                        QueryPriv: queryPriv,
    //                        FirstPage: firstPage,
    //                        EditPage: editPage,
    //                        IsDisplayAdd: isDisplayAdd,
    //                        IsDisplayQuery: isDisplayQuery,
    //                    });
    //                    modulePriv.save();
    //                }
    //                initListMenu1(moduleCode, viewId, obj, isDisplayBatch, addPriv, queryPriv);
    //            },
    //            failure: function (result, context) {
    //                var msg = result.responseText;
    //                util.showMessage(msg, true);
    //            },
    //            method: "POST"
    //        });
    //    }
    //}
}
function initListMenu1(moduleCode, viewId, obj, isDisplayBatch, addPriv, queryPriv) {
    var count = 0;
    if (isDisplayBatch == "Y") {
        globalBar.add({
            id: 'menuMoreId',
            xtype: 'img',
            right: count * 30,
            top: 10,
            centered: true,
            width: 45,
            height: 45,
            align: 'right',
            html: "<i class='icon-ellipsis cr-FFFFFF font-s20'></i>",
            listeners: {
                tap: function () {
                    var menuStore = Ext.create('Ext.data.Store', {
                        id: 'contactStoreId',
                        fields: ['name', 'icon', 'needsIcon'],
                    });
                    if (Ext.get('queryToolbarId') == null) {
                        menuStore.add({ "id": "queryId", "name": "查询", "icon": '5', "needsIcon": true });
                    }
                    else {
                        menuStore.add({ "id": "cancelQueryId", "name": "取消查询", "icon": '5', "needsIcon": true });
                    }
                    menuStore.add({ "id": "refreshId", "name": "刷新", "icon": '1', "needsIcon": true });
                    menuStore.add({ "id": "multiselectId", "name": "多选", "icon": '2', "needsIcon": true });
                    menuStore.add({ "id": "favoriteId", "name": "收藏", "icon": '4', "needsIcon": true });
                    menuStore.add({ "id": "sortId", "name": "首页", "icon": '3', "needsIcon": true });
                    Ext.create('Ext.dataview.List', {
                        centered: true,
                        modal: {
                            style: 'opacity: 0'
                        },
                        hideOnMaskTap: true,
                        width: '30%',
                        height: '250px',
                        //top: 10,
                        right: 0,
                        left: null,
                        //数据源
                        itemTpl: '<div class="font-s14"><tpl if="needsIcon"><img width="26" height="26" style="margin-left: 10px;" src="resources/images/setup/{icon}.png" align="absmiddle" />&nbsp;&nbsp;</tpl>{name}</div>',
                        store: menuStore,
                        listeners: {
                            itemsingletap: function (list, index, target, record, e) {
                                var id = record.data.id;
                                switch (id) {
                                    case 'queryId':
                                        if (record.data.name == "查询") {
                                            record.data.name = "取消查询";
                                        }
                                        if (Ext.get('queryToolbarId') == null) {
                                            var queryToolbar = Ext.create('Ext.Panel', {
                                                docked: 'top',
                                                id: 'queryToolbarId',
                                                height: '30px',
                                                layout: "hbox",
                                                cls: "ml-10 mt-5",
                                                width: document.documentElement.clientWidth,
                                                items: [{
                                                    xtype: "panel",
                                                    layout: "hbox",
                                                    style: "background-color:#EDEDED;border-radius: 20px;",
                                                    items: [{
                                                        xtype: 'panel',
                                                        width: '30px',
                                                        cls: "text-al-center",
                                                        html: "<i class='icon-search font-s14' style='color:#9999B2;line-height: 28px;'></i>"
                                                    }, {
                                                        xtype: 'textfield',
                                                        id: 'project_search_box',
                                                        inputCls: "input-cls",
                                                        clearIcon: false,
                                                        placeHolder: "请输入查询条件",
                                                        width: document.documentElement.clientWidth - 80,
                                                    }]
                                                }, {
                                                    xtype: 'image',
                                                    itemId: 'cancel_contact_search_box',
                                                    width: '40px',
                                                    //cls: "i-search-cancel-icon",
                                                    html: "<span style='line-height: 30px;color: #FF9E1B;'>取消</span>",
                                                    listeners: {
                                                        tap: function () {
                                                            Ext.getCmp('myProjectBrwId').remove(Ext.getCmp('queryToolbarId'));
                                                            //globalBar.setHidden(false);
                                                        }
                                                    }
                                                }]
                                            });
                                            //globalBar.setHidden(true);
                                            globalBar.add([queryToolbar]);
                                            Ext.getCmp(viewId).add([queryToolbar]);
                                        }
                                        break;
                                    case 'cancelQueryId':
                                        Ext.getCmp(viewId).getStore().clearFilter();
                                        Ext.getCmp(viewId).remove(Ext.getCmp('queryToolbarId'));
                                        break;
                                    case 'refreshId':
                                        Ext.getCmp(viewId).getStore().load();
                                        break;
                                    case 'multiselectId':
                                        Ext.getCmp(viewId).beginSimple("", "", "edit");
                                        break;
                                    default:
                                        null;
                                }
                                list.hide();
                            }
                        }
                    }).showBy(Ext.getCmp('menuMoreId'));
                }
            }
        });
        count += 1;
    }
    if (isDisplayAdd == "Y" && addPriv == "Y") {
        globalBar.add({
            id: 'menuAddId',
            xtype: 'img',
            right: count * 30,
            top: 10,
            centered: true,
            width: 45,
            height: 45,
            align: 'right',
            html: "<i class='icon-plus-thin cr-FFFFFF font-s20'></i>",
            listeners: {
                tap: function () {
                    util.showMessage("active success", true, 1);
                }
            }
        });
        count += 1;
    }
    if (isDisplayQuery == "Y" && queryPriv == "Y") {
        globalBar.add({
            id: 'menuQueryId',
            xtype: 'img',
            right: count * 30,
            top: 10,
            centered: true,
            width: 45,
            height: 45,
            align: 'right',
            html: "<i class='icon-search cr-FFFFFF font-s14'></i>",
            listeners: {
                tap: function () {
                    dict.add("searchReturnView", firstPage);
                    obj.redirectTo('redirec/searchBrw');
                }
            }
        });
        count += 1;
    }
}
function destroyList() {
    if (Ext.getCmp('menuMoreId')) {
        globalBar.remove(Ext.getCmp('menuMoreId'));
    }
    if (Ext.getCmp('menuAddId')) {
        globalBar.remove(Ext.getCmp('menuAddId'));
    }
    if (Ext.getCmp('menuQueryId')) {
        globalBar.remove(Ext.getCmp('menuQueryId'));
    }
}

function dealDeviceShare(title, imageUrl, link, type, desc) {
    var param = {
        title: title,
        imageUrl: imageUrl,
        link: link,
        type: type,
        desc: desc
    };
    var onSuccess = function (result) {
        //alert("Share completed? " + result); // On Android apps mostly return false even while it's true
        //alert("Shared to app: " + result); // On Android result.app is currently empty. On iOS it's empty when sharing is cancelled (result.completed=false)
        //alert("Share completed? " + result.completed); // On Android apps mostly return false even while it's true
        //alert("Shared to app: " + result.app); // On Android

        //alert(result.completed);
        //alert("true");
        if (result.completed) {
            //alert(result.app)
            wxShareSuccessBack(result, param);
        }
    }

    var onError = function (msg) {
        //alert("Sharing failed with message: " + msg);
    }
    if (Ext.os.is.Android) {
        //window.plugins.socialsharing.share(title, title, imageUrl, link, onSuccess, onError);
        MobShare.MobShare(title, desc, imageUrl, link,
            function (success) {
                // alert(success);
            },
            function (err) {

            });
        var result1 = {
            completed: true,
            app: "Android"
        }
        onSuccess(result1);
        //window.plugins.socialsharing.share('Message, image and link', "subject", null, 'https://www.baidu.com/');
        //window.plugins.socialsharing.share(title, title, imageUrl, link, onSuccess, onError);
    } else if (Ext.os.is.iOS) {
        var options = {
            message: title, // not supported on some apps (Facebook, Instagram)
            subject: title + "1", // fi. for email
            files: [imageUrl], // an array of filenames either locally or remotely
            //file: [imageUrl],
            image: imageUrl,
            url: link,
            chooserTitle: 'Pick an app' // Android only, you can override the default share sheet title
        }
        window.plugins.socialsharing.shareWithOptions(options, onSuccess, onError);
    }
}
//初始化微信分享
function wxShareSuccessBack() {
    //alert("succss");
}
function dealWeixinShare(title, imageUrl, link, type, desc) {
    if (util.isWeixin()) {
        wx.ready(function () {
            //分享到朋友圈
            wx.onMenuShareTimeline({
                title: title, // 分享标题
                link: link, // 分享链接
                imgUrl: imageUrl, // 分享图标
                success: function () {
                    // 用户确认分享后执行的回调函数
                    //alert("分享成功")
                    wxShareSuccessBack();
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                    //alert("share cancel!")
                }
            });
            //分享给朋友
            wx.onMenuShareAppMessage({
                title: title, // 分享标题
                desc: desc, // 分享描述
                link: link,// 分享链接
                imgUrl: imageUrl, // 分享图标
                type: "", // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function () {
                    // 用户确认分享后执行的回调函数
                    //alert("分享成功")
                    wxShareSuccessBack();
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                }
            });
            //分享到QQ
            wx.onMenuShareQQ({
                title: title, // 分享标题
                desc: desc, // 分享描述
                link: link, // 分享链接
                imgUrl: imageUrl, // 分享图标
                //link: 'http://www.wukongline.com/BMobile/index.html', // 分享链接
                //imgUrl: 'http://f.hiphotos.baidu.com/baike/w%3D268/sign=bab2492dc8fcc3ceb4c0ce35aa44d6b7/c995d143ad4bd1138e52723d5aafa40f4bfb0526.jpg', // 分享图标
                success: function () {
                    // 用户确认分享后执行的回调函数
                    //alert("分享成功")
                    wxShareSuccessBack();
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                    //alert("share success1!")
                }
            });
            //分享到腾讯微博
            wx.onMenuShareWeibo({
                title: title, // 分享标题
                desc: desc, // 分享描述
                link: link, // 分享链接
                imgUrl: imageUrl, // 分享图标
                success: function () {
                    // 用户确认分享后执行的回调函数
                    //alert("分享成功")
                    wxShareSuccessBack();
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                }
            });
            //分享到QQ空间
            wx.onMenuShareQZone({
                title: title, // 分享标题
                desc: desc, // 分享描述
                link: link, // 分享链接
                imgUrl: imageUrl, // 分享图标
                success: function () {
                    // 用户确认分享后执行的回调函数
                    //alert("分享成功")
                    wxShareSuccessBack();
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                }
            });
            wx.error(function (res) {
                // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
                //alert("errorMSG:" + res);
            });
        });
    }
}

function pushBaiduTest(a) {
    if (Ext.os.is.iOS) {
        PushNotification.parameter.nativeFunction("PushNotification", ["参数"],
            function (result) {
                alert("Success: \r\n" + result);
            }, function (error) {
                alert("Error: \r\n" + error);
            });
    }
    //alert(randomString(32));
}
function randomString(len) {
    len = len || 32;
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    var maxPos = $chars.length;
    var pwd = '';
    for (i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}

function clone(o) {
    if (!o || 'object' !== typeof o) {
        return o;
    }
    if ('function' === typeof o.clone) {
        return o.clone();
    }
    var c = '[object Array]' === Object.prototype.toString.call(o) ? [] : {};
    var p, v;
    for (p in o) {
        if (o.hasOwnProperty(p)) {
            v = o[p];
            if (v && 'object' === typeof v) {
                c[p] = Ext.ux.util.clone(v);
            }
            else {
                c[p] = v;
            }
        }
    }
    return c;
}; // eo function clone  

//首页广告
//function homeAdShow() {

//    var adPositionValue = "Home",
//        uuid = "123456";
//    if (Ext.os.is.Phone && Ext.browser.is.Cordova && (Ext.os.is.iOS || Ext.os.is.Android)) {
//        uuid = device.uuid
//    }
//    var vals = {
//        "adPosition": adPositionValue,
//        "userId": util.getUserId(),
//        "uuid": uuid,
//    };
//    util.Invoke("api/MService/GetAdData", vals, "", {
//        loadTarget: false,
//        maskTarget: "",
//        success: function (result) {
//            if (result) {
//                var json = Ext.decode(result);
//                if (json) {
//                    json = Ext.decode(json);
//                    if (json) {
//                        var updateVersion1 = new Ext.Panel({
//                            hidden: true,
//                            hideOnMaskTap: false,
//                            modal: true,
//                            width: "90%",
//                            height: "90%",
//                            top: "10%",
//                            cls: 'vlinker-version',
//                            left: "5%",
//                            // cls: "errorPrompt",
//                            html: '<div class="version" style="height: 80%">' +
//                                        '<img src="' + util.getMobileSite() + "Photos/Carousel/" + json[0].image_url + '" style="width:90%;height: 80%">' +
//                                        '<div id="homeAdId" row_id="' + json[0].row_id + '" title="' + json[0].title + '" link_url="' + json[0].link_url + '" open_link_mode="' + json[0].open_link_mode + '" style="font-size: 16px;color: #fff;letter-spacing: 2px;position: absolute;text-align: center;bottom: 25px;width: 100% !important;">' +
//                                            '<span id="homeAdBtnId" style="border: 1px solid;border-radius: 20px;padding: 5px 30px;">查看详情</span>' +
//                                        '</div>' +
//                                 '</div>' +
//                                 '<div id="closeHomeAdId" class="mt-20">' +
//                                       '<img src="' + util.getMobileSite() + 'Images/Mobie/version-02.png" style="width:45px">' +
//                                 '</div>'
//                        });
//                        Ext.Viewport.add(updateVersion1);
//                        updateVersion1.show();
//                        $("#homeAdBtnId").on('click', function () {
//                            var id = $("#homeAdId").attr("row_id"),
//                                vals = {
//                                    "adPosition": adPositionValue,
//                                    "adId": id,
//                                    "userId": util.getUserId(),
//                                    "uuid": uuid
//                                };
//                            util.Invoke("api/MService/RecordAd", vals, "", {
//                                loadTarget: false,
//                                maskTarget: "",
//                                success: function (result) {
//                                }
//                            });
//                            util.Invoke("api/MService/HiddenAd", vals, "", {
//                                loadTarget: false,
//                                maskTarget: "",
//                                success: function (result) {
//                                }
//                            });
//                            var linkUrl = $("#homeAdId").attr("link_url"),
//                                linkMode = $("#homeAdId").attr("open_link_mode"),
//                                adTitle = $("#homeAdId").attr("title");
//                            dict.add("adTitle", adTitle);
//                            dict.add("adId", id);
//                            updateVersion1.hide();
//                            if (linkMode != "self" && linkUrl) {
//                                if (Ext.os.is.iOS && Ext.browser.is.Cordova) {
//                                    util.openLink(linkUrl);
//                                } else if (Ext.os.is.Android && Ext.browser.is.Cordova) {
//                                    WebHtml.execute(linkUrl, newsTitle, function (result) {
//                                    }, function (e) {

//                                    });
//                                }
//                            } else {
//                                dealModuleScript("MVC_ADVERTISEMENT_MNG", "view_MVC_ADVERTISEMENT_MNG", false, true);
//                            }

//                        });
//                        $("#closeHomeAdId").on('click', function () {
//                            updateVersion1.hide();
//                            var id = $("#homeAdId").attr("row_id"),
//                             vals = {
//                                 "adPosition": adPositionValue,
//                                 "adId": id,
//                                 "userId": util.getUserId(),
//                                 "uuid": uuid
//                             };
//                            util.Invoke("api/MService/HiddenAd", vals, "", {
//                                loadTarget: false,
//                                maskTarget: "",
//                                success: function (result) {
//                                }
//                            });
//                        });
//                    }
//                }
//            }
//        }
//    });
//}

//function updateVersion() {
//    if (Ext.os.is.Phone && Ext.browser.is.Cordova && (Ext.os.is.iOS || Ext.os.is.Android)) {
//        if (util.getNetwork() != "none") {
//            var currentVersion = config.version;
//            //从服务器获取的版本
//            var serverVersion = '1.0',
//                url = '',
//                platform = "iOS";
//            if (Ext.os.is.Android) {
//                platform = "Android";
//            }
//            Ext.Ajax.request({
//                url: this.getMobileSite() + "api/MService/GetLatestVersion",
//                params: {
//                    currentVersion: currentVersion,
//                    platform: platform,
//                    uuid: device.uuid,
//                    channel: config.channel
//                },
//                success: function (result, context) {
//                    var temp = Ext.decode(result.responseText);
//                    serverVersion = temp.version;
//                    //alert(serverVersion);
//                    if (serverVersion) {
//                        if (serverVersion > currentVersion) {
//                            if (Ext.os.is.Android) {
//                                url = util.getMobileSite() + temp.url;
//                            } else {
//                                url = temp.url;
//                            }
//                            updateVersionShow(url, currentVersion);
//                        }
//                    }
//                },
//                failure: function (result, context) {
//                    //alert(result.responseText.toString());
//                    util.showMessage(result.responseText, true);

//                },
//                method: "POST"
//            });
//        }
//    }
//}
//function updateVersionShow(url, currentVersion) {
//    var platform = "iOS";
//    if (Ext.os.is.Android) {
//        platform = "Android";
//    }
//    Ext.Ajax.request({
//        url: this.getMobileSite() + "api/MService/GetVersion",
//        params: {
//            currentVersion: currentVersion,
//            platform: platform,
//            uuid: device.uuid,
//            channel: config.channel
//        },
//        success: function (result, context) {
//            var temp = Ext.decode(result.responseText),
//                updateType = temp.updateType,
//                buttonsItems = '<div class="version">' +
//                            '<img src="' + util.getMobileSite() + 'Images/Mobie/version-01.png" style="width:90%">' +
//                            '<div class="version-btn"><span>朕这就去</span></div>' +
//                      '</div>';
//            //alert(url);
//            if (updateType != "Force") {
//                buttonsItems = buttonsItems +
//                    '<div class="version-close-btn" class="mt-20">' +
//                            '<img src="' + util.getMobileSite() + 'Images/Mobie/version-02.png" style="width:45px">' +
//                      '</div>'
//            }
//            //alert(url);
//            //alert(updateType);

//            var updateVersion1 = new Ext.Panel({
//                hidden: true,
//                hideOnMaskTap: false,
//                modal: true,
//                width: "80%",
//                top: "15%",
//                cls: 'vlinker-version',
//                left: "10%",
//                // cls: "errorPrompt",
//                html: buttonsItems
//            });
//            Ext.Viewport.add(updateVersion1);
//            updateVersion1.show();

//            $(".version-btn").on('click', function () {
//                if (Ext.os.is.iOS == true) {
//                    window.open(url);
//                    if (updateType == "Force") {
//                        return;
//                    }
//                    updateVersion1.hide();
//                } else if (Ext.os.is.Android == true) {
//                    downloadAndroidApk(url);
//                    updateVersion1.hide();
//                }

//            });
//            if (updateType != "Force") {
//                $(".version-close-btn").on('click', function () {
//                    updateVersion1.hide();
//                });
//            }
//        }
//    });
//}
//function downloadAndroidApk  (url) {
//    var downloadAndroid = new Ext.Panel({
//        hidden: true,
//        hideOnMaskTap: false,
//        modal: true,
//        top: (util.getHeight() - 175) / 2,
//        cls: ' x-msgbox-dark x-msgbox x-has-width x-msgbox-uuchina v-msg',
//        left: "10%",
//        // cls: "errorPrompt",
//        html: '<div class="x-dock x-dock-vertical x-unsized">' +
//                    '<div class="x-container x-toolbar-dark x-toolbar x-stretched x-msgbox-buttons x-dock-item x-docked-bottom" style="border-bottom: 1px solid #ccc;">' +
//                        '<div class="x-inner x-toolbar-inner x-horizontal x-align-center x-pack-center x-layout-box">' +
//                            '<div class="x-button-normal x-button msg-button x-layout-box-item x-flexed x-stretched" style="-webkit-box-flex: 1;border: 0;">' +
//                                '<span class="x-button-label" style="text-align: left;color: #000;">下载中</span>' +
//                             '</div>' +
//                        '<div class="x-button-normal x-button msg-button x-layout-box-item x-flexed x-stretched" style="-webkit-box-flex: 1;width: 100px !important;">' +
//                            '<span id="progressDetail" class="x-button-label" style="text-align: right;color: #000;width: 100px !important;">2.1M/23M</span>' +
//                            '</div>' +
//                        '</div>' +
//                    '</div>' +
//                    '<div class="x-dock-body">' +
//                        '<div class="x-dock-body">' +
//                            '<div id="msgContent" style="margin-bottom: 10px; margin-left: 5%;width:90%;height: 80px;">' +
//                            '<div style="height:30px;"></div>' +
//                                '<div class="progress-bar-wrapper" style="height:5px;background-color: #EAEAEA;position: relative;border-radius: 5px">' +
//                                    '<div id="progressBarId" class="progress-bar" style="width:0%;background-color: #EF584F;height: 100%;border-radius: 5px"></div>' +
//                                '</div>' +
//                                '<div id="progressPercentId" style="text-align: center;margin-top: 20px;margin-bottom: 20px;color: #000;">0%</div>' +
//                            '</div>' +
//                        '</div>' +
//                    '</div>' +
//                    '<div class="x-container x-toolbar-dark x-toolbar x-stretched x-msgbox-buttons x-dock-item x-docked-bottom">' +
//                        '<div class="x-inner x-toolbar-inner x-horizontal x-align-center x-pack-center x-layout-box">' +
//                            '<div id="cancelDownloadApk" class="x-button-normal x-button msg-button msg-button-left x-layout-box-item x-flexed x-stretched" style="-webkit-box-flex: 1;">' +
//                                '<span class="x-button-label" style="color: #000;">取消</span>' +
//                            '</div>' +
//                            '<div id="backDownloadApk" class="x-button-normal x-button msg-button msg-button-right x-layout-box-item x-flexed x-stretched" style="-webkit-box-flex: 1;">' +
//                                '<span class="x-button-label">后台下载</span>' +
//                                '</div>' +
//                            '</div>' +
//                    '</div>' +
//                '</div>'
//    });
//    Ext.Viewport.add(downloadAndroid);
//    downloadAndroid.show();

//    var uri = encodeURI(url);
//    //alert(uri)
//    //var fileURL = "file:///mnt/sdcard/bear/bear.apk";
//    var fileURL = 'file:///mnt/sdcard/' + config.productName + '/' + config.productName + '.apk';
//    var fileTransfer = new FileTransfer();
//    fileTransfer.download(
//        uri,
//        fileURL,
//        function (entry) {
//            downloadAndroid.hide();
//            Install.execute('/sdcard/' + config.productName + '/' + config.productName + '.apk',
//                function (success) {
//                },
//                function (fail) {
//                }
//            );
//        },
//        function (error) {
//            //alert(error.source)
//            //alert(error.target)
//            //alert(error.code)
//            console.log("download error source " + error.source);
//            console.log("download error target " + error.target);
//            console.log("upload error code" + error.code);
//        },
//        false, {
//            headers: {
//                "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
//            }
//        }
//    );
//    fileTransfer.onprogress = function (progressEvent) {
//        var a,
//            b,
//            c,
//            percent;

//        a = parseFloat(progressEvent.loaded);
//        b = parseFloat(progressEvent.total);
//        c = parseFloat(1024) * parseFloat(1024);
//        percent = Math.round((a / b) * 100);
//        //alert(percent);

//        a = (a / c).toFixed(2);
//        b = (b / c).toFixed(2);
//        //alert(a + "M/" + b+"M");
//        $("#progressDetail").html(a + "M/" + b + "M");
//        $("#progressBarId").css("width", percent + "%");
//        $("#progressPercentId").html(percent + "%");

//        //util.showMessage(a + "M/" + b + "M", true);
//    };
//    $("#cancelDownloadApk, #cancelDownloadApk span").on('click', function () {
//        fileTransfer.abort();
//        downloadAndroid.hide();
//    });
//    $("#backDownloadApk, #backDownloadApk span").on('click', function () {
//        downloadAndroid.hide();
//    });
//}


//function homeWizardValsShow() {
//    var wizardVals = {
//        "type": "Wizard",
//        "uuid": util.getUuid()
//    };
//    util.Invoke("api/MService/CheckDisplayLog", wizardVals, "", {
//        loadTarget: false,
//        maskTarget: "",
//        success: function (result) {
//            if (result) {
//                result = Ext.decode(result);
//                if (result.loadFlag == "Y") {
//                    var guideShow = new Ext.Panel({
//                        hidden: true,
//                        hideOnMaskTap: false,
//                        modal: true,
//                        width: "100%",
//                        //height: util.getHeight(),
//                        top: "-6px",
//                        cls: 'vlinker-version',
//                        left: "-6px",
//                        right: "-6px",
//                        // cls: "errorPrompt",
//                        html: '<div class="version">' +
//                                '<img src="resources/images/main/guide-bg.png" style="width:' + util.getWidth() + 'px;height:' + util.getHeight() + 'px">' +
//                                '<div id="close-guide" style="font-size: 16px;color: #fff;position: absolute;text-align: center;top: ' + (util.getWidth() * 2 / 3 + 245) + 'px;width: 100% !important;"><span><img src="resources/images/main/guide_01.png" style="width:100px"></span></div>' +
//                          '</div>'
//                    });
//                    Ext.Viewport.add(guideShow);
//                    guideShow.show();
//                    $("#close-guide").on('click', function () {
//                        guideShow.hide();
//                        util.Invoke("api/MService/RecordDisplayLog", wizardVals, "", {
//                            loadTarget: false,
//                            maskTarget: "",
//                            success: function (result) {
//                            }
//                        });
//                    });
//                } else {

//                }
//            }
//        }
//    });
//}

//function getRegCoupon(phone) {
//    var couponVals = {
//        phone: phone
//    }
//    util.Invoke("api/Service/GetCouponByReg", couponVals, "", {
//        loadTarget: true,
//        maskTarget: "加载中...",
//        success: function (result) {
//            if (result) {
//                result = Ext.decode(result);
//                if (result.Code == "1") {
//                    var couponShow = new Ext.Panel({
//                        hidden: true,
//                        hideOnMaskTap: false,
//                        modal: true,
//                        width: "95%",
//                        height: "90%",
//                        //top: "30%",
//                        cls: 'vlinker-version coupon-top',
//                        left: "2.5%",
//                        // cls: "errorPrompt",
//                        html: '<div class="version" style="">' +
//                                    '<img src="' + util.getMobileSite() + '/Images/Mobie/coupon_01.png" style="width:100%;height: 80%">' +
//                                    '<div style="font-size: 14px;color: #fff;position: absolute;text-align: center;bottom: 62%;width: 75% !important;left: 12.5%;">' +
//                                        '<div style="font-size:18px;color: #E53F2C;font-weight: bold;">优惠券大礼包</div>' +
//                                    '</div>' +
//                                    '<div style="font-size: 14px;color: #000;position: absolute;text-align: left;bottom: 40%;left: 20%;width: 60%;">' +
//                                        '<div>您已获得价值<span style="color: #E53F2C;">50元</span>的优惠券大礼包一份，请到（我的-钱包）中查看</div>' +
//                                    '</div>' +
//                                    '<div style="font-size: 16px;color: #fff;position: absolute;text-align: center;bottom: 15%;width: 100% !important;">' +
//                                        '<span id="homeAdBtnId" style="font-weight: bold;">恭喜您，注册成功！</span>' +
//                                    '</div>' +
//                             '</div>' +
//                             '<div id="closeCouponId" class="mt-20">' +
//                                   '<img src="' + util.getMobileSite() + 'Images/Mobie/version-02.png" style="width:45px">' +
//                             '</div>'
//                    });
//                    Ext.Viewport.add(couponShow);
//                    couponShow.show();
//                    $("#closeCouponId").on('click', function () {
//                        couponShow.hide();
//                    });
//                }
//            }
//        }
//    });
//}
function socialLogin(type) {
    if (Ext.browser.is.Cordova) {
        if (Ext.os.is.Android) {
            //安卓
            if (type = "qq") {
                //phonegap_qq:function(type){
                //    login('18020278988',type);
                //}
            }
            else if (type = "weibo") {
            }
            else if (type = "weixin") {
            }
        } else {
            //iOS
            if (type = "qq") {
            }
            else if (type = "weibo") {
            }
            else if (type = "weixin") {
            }
        }
    } else {
        //H5
        if (type = "qq") {
        }
        else if (type = "weibo") {
        }
        else if (type = "weixin") {
        }
    }
}
