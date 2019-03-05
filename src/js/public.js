
// require("expose-loader?$!jquery");


(function(){
	earlPublic={
        getAllValue(_thisKey){//获取页面所有自定义属性(如:data-name)的值,形成数组
            var allNodes=document.getElementsByTagName('*');
            var _allValueArr=[];
            for(var i=0; i<allNodes.length; i++){
                if(allNodes[i].getAttribute(_thisKey)){
                    _allValueArr.push(allNodes[i].getAttribute(_thisKey))
                }
            }
            return _allValueArr
        },
        getHtmlDocName() {//获取url中html或者PHP的文件名称
            var str = window.location.href;
            str = str.substring(str.lastIndexOf("/") + 1);
            str = str.substring(0, str.lastIndexOf("."));
            return str;
        },
        clickToshowPage:function(_id){//点击导航跳转到相应锚点
                _id=document.getElementById(_id);
                var tagA=$(_id).children('li').children('a');
                for(var i=0; i<tagA.length; i++){
                    tagA[i].onclick=function(){
                        for(var m=0; m<tagA.length; m++){
                            tagA[m].classList.remove('selected');
                        }
                        this.classList.add('selected');
                        var _thisId='#' + this.getAttribute('data-id');
                        var _thisToTop=$(_thisId).offset().top;            
                        $('html,body').animate({scrollTop: _thisToTop - 100}, 300);
                    }
                }
        },
        //点击展开，点击关闭
		clickBtnPop:function(_btn,_box,openFunc,closeFunc) {
            _btn=document.getElementById(_btn);
            _box=document.getElementById(_box);
            _btn.onclick=function(){
                if(_box.style.display=='block'){
                    closeFunc(_btn,_box);
                }else{
                    openFunc(_btn,_box);
                }
            }
       },
		//获取当前日期，格式YYYY-MM-DD
		getNowFormatDate:function() {
                var date = new Date();
                var seperator1 = "-";
                var year = date.getFullYear();
                var month = date.getMonth() + 1;
                var strDate = date.getDate();
                if (month >= 1 && month <= 9) {
                    month = "0" + month;
                }
                if (strDate >= 0 && strDate <= 9) {
                    strDate = "0" + strDate;
                }
                var currentdate = year + seperator1 + month + seperator1 + strDate;
                return currentdate;
           },
        //获取当前格式化后日期时间
        getNowDateTime:function() {
		    var nowDate = new Date();
		    var nowYear = nowDate.getFullYear();
		    var nowMonth = nowDate.getMonth() + 1;
		    var nowDay = nowDate.getDate();
		    if (nowMonth < 10) {
		        nowMonth = '0' + nowMonth;
		    } else {
		        nowMonth = nowMonth;
		    }
		    if (nowDay < 10) {
		        nowDay = '0' + nowDay;
		    } else {
		        nowDay = nowDay;
		    }
		    var time = nowDate.toString().split(' ')[4];
		    return nowYear.toString() + '-' + nowMonth.toString() + '-' + nowDay.toString() + ' ' + time;
		
		},
        //获取URL参数构造函数
        getUrlPara:function (variable) { //variable：url中的参数名
                var query = window.location.search.substring(1);
                var vars = query.split("&");
                for (var i = 0; i < vars.length; i++) {
                    var pair = vars[i].split("=");
                    if (pair[0] == variable) { return pair[1]; }
                }
                return (false);
            },
        //提交表单
        commitFormFn:function(attri, Func) {
                // attri: 'interfaceValue'   Func：回调
                var interfaceClassArr = [], interFaceArr = [];
                for (var i = 0; i < $('[' + attri + ']').length; i++) {
                    $('[' + attri + ']').eq(i).addClass($('[' + attri + ']').eq(i).attr(attri));
                    interfaceClassArr.push('.' + $('[' + attri + ']').eq(i).attr(attri));
                    interFaceArr.push($('[' + attri + ']').eq(i).attr(attri));
                }
                Func(interfaceClassArr , interFaceArr);
           },
        //生成特定数量的相同字符串
        createNo:function(str, num) {
                //如果生成5位字符串，num为4
                var NoStr = ''
                    , No
                for (var i = 0; i < num - str.length; i++) {
                    NoStr += '0';
                }
                return NoStr
            },
        //Ajax
        aj:function(sync, cache, type, url, datatype, data, func) {
			    $.ajax({
			        sync: sync,
			        cache: cache,
			        type: type,
			        url: url,
			        dataType: datatype,
			        data: data,
			        beforSend: function () {
			            // 禁用按钮防止重复提交  
			            // $("#submit").attr({ disabled: "disabled" });
			            ajBefore(data);
			        },
			        error: function (data) {
			            //请求失败时被调用的函数
			            //alert("Error:" + data);
			            ajError("Error:" + data);
			        },
			        success: function (data) {
			            func(data);
			        }
			    });
			},
		//关闭弹出层
		closePopBox:function(btn,popbox) {
                $(document).on('mousedown',function(e){
			        if(!$(e.target).is($(btn)) && !$(e.target).is($(popbox)) && $(e.target).parent(popbox).length === 0){
			        	$(popbox).fadeOut();
			        }
			    });
           },
        //弹出提示层（无关闭，显示2s自动关闭）
        testResultFn:function (loadValue, typeVal) {
        	
        		if(document.getElementById('loadPopTips') && document.getElementById('loadPopTipsMask')){
        			var eMaskBoxRemove = document.getElementById('loadPopTipsMask');
        			var ePopBoxRemove = document.getElementById('loadPopTips');
        			document.body.removeChild(eMaskBoxRemove);
        			document.body.removeChild(ePopBoxRemove);
        		}
			    var addMask=document.createElement('div'),
			    	addPopBox=document.createElement('div');
			    addMask.setAttribute('id','loadPopTipsMask');
			    addPopBox.setAttribute('id','loadPopTips');
			    addPopBox.innerHTML='<div id="ePopBox" class="ePopBox"><p>' + loadValue + '</p></div><div id="eMaskBox" class="eMaskBox"></div>';
			    document.body.appendChild(addMask);
			    document.body.appendChild(addPopBox);
			    if (typeVal == 0) {
			        $('.ePopBox').addClass('error');
			    } else {
			        $('.ePopBox').removeClass('error');
			    }
			    var wait = 2;
			    var ePopBox = document.getElementById('loadPopTips');
			    var eMaskBox = document.getElementById('loadPopTipsMask');
			    time();
			    function time() {
			        if (wait == 0) {
			            $(ePopBox).fadeOut();
			            $(eMaskBox).fadeOut();
			        } else {
			            $(eMaskBox).fadeIn();
			            $(ePopBox).fadeIn();
			            wait--;
			            setTimeout(function () {
			                time();
			            }, 1000)
			        }
			    }
			},
			//全选/全不选
			checkAllFn:function(checkAll, CheckBox, func) {
			    var checkAll = $('input[name="' + checkAll + '"]')
			
			    $(checkAll).click(function () {
			        var stuCheckBox = $('input[name="' + CheckBox + '"]')
			        var getIdArr = [];
			        if ($(this).is(':checked')) {
			
			            for (var i = 0; i < stuCheckBox.length; i++) {
			                $(stuCheckBox).eq(i).prop("checked", true);
			                getIdArr.push($(stuCheckBox).eq(i).val());
			            }
			            func(getIdArr);
			
			        } else {
			            for (var i = 0; i < stuCheckBox.length; i++) {
			                $(stuCheckBox).eq(i).removeAttr("checked", false);
			            }
			            var getIdArr = [];
			            func(getIdArr);
			        }
			
			    });
			
			    $(function () {
			        var stuCheckBox = $('input[name="' + CheckBox + '"]')
			        var getIdArr = [];
			        for (var i = 0; i < stuCheckBox.length; i++) {
			            $(stuCheckBox).eq(i).click(function () {
			                getIdArr = [];
			                for (var i = 0; i < stuCheckBox.length; i++) {
			                    if ($(stuCheckBox).eq(i).prop("checked") == true) {
			                        getIdArr.push($(stuCheckBox).eq(i).val());
			                    }
			                }
			                func(getIdArr);
			            });
			        }
			        
			    })
			},
			//按钮禁止点击
			disabled:function(id) {
				var obj=document.getElementById(id)||document.getElementsByClassName(id)[0]
			    	,objText = obj.value || obj.innerText;
			    obj.disabled=true;//禁止点击,回调函数或数据加载后解除;
			    obj.classList.className='disabled';//给按钮加disabled
			    
			    obj.setAttribute('dataValue', objText);
			    if (obj.getAttribute('type')=='button' || obj.getAttribute('type')=='text') {
			        obj.value='正在提交...';
			    }else if(obj.getAttribute('type')=='checkbox'){
			    	
			    } else{
			        obj.innerText='正在提交...';
			    }
			},
			//取消禁止点击
			cancelDisabled:function(id) {
				var obj=document.getElementById(id)||document.getElementsByClassName(id)[0]
			    	,objText = obj.getAttribute('dataValue');
			    obj.disabled= false;//取消禁止点击,回调函数或数据加载后解除;
			    obj.classList.className='disabled';//移除disabled 
			
			    obj.setAttribute('dataValue', objText);
			    if (obj.getAttribute('type')=='button' ||  obj.getAttribute('type')=='text') {
			        obj.value=objText;
			    } else {
			        obj.innerText=objText;
			    }
			},
			//url参数拼接
			splicParameterFn:function(Para) {
			var listParameterKey=Para.split(',');//url预设的参数数组
			var	queryParameter = String(window.location.search.substring(1)).substring(1)//重新获取url参数字符串
            	,qpArr = []
            	,qsStr = {};//提交参数对象;
            queryParameter = queryParameter.split('&');
            for (var i = 0; i < queryParameter.length; i++) {
                qpArr.push(queryParameter[i].split('='));
            }
            for (var y = 0; y < qpArr.length; y++) {
                for (var m = 0; m < qpArr[y].length; m++) {
                    for (var x = 0; x < listParameterKey.length; x++) {
                        if (qpArr[y][m] == listParameterKey[x]) {
                            qsStr[listParameterKey[x]] = qpArr[y][m + 1];
                        }
                    }
                }
            }
//          console.log(qsStr);
       },
       //搜索筛选
       screenFn:function(name, value) {
             var parameterArr, urlParameterStr = '', urlStr = '';
            queryParameter = window.location.search.substring(1);//重新获取url参数字符串
            urlStr = location.href.substring(0, location.href.indexOf(queryParameter) - 1);//获取当前url（不带参数）
            //console.log(queryParameter);
            if (queryParameter.indexOf(name) != -1) {
                parameterArr = queryParameter.split('&');
                for (var i = 0; i < parameterArr.length; i++) {
                    if (parameterArr[i].indexOf(name) != -1) {//判断数组i中是否含有参数
                        parameterArr[i] = name + '=' + value;//给序列i重新拼接赋值
                        var parameterIStr = parameterArr[i];//重新命名一个变量储存新值
                        parameterArr.splice(i, 1);//删除序列i
                        parameterArr.push(parameterIStr);//将新的值添加到数组中
                    }
                }
                urlParameterStr = parameterArr.join('&');
                location.href = urlStr + '?' + urlParameterStr;
            } else {
                if (location.href.indexOf('?') != -1) {
                    location.href = location.href + '&' + name + '=' + value;
                } else {
                    location.href = location.href + '?&' + name + '=' + value;
                }
            }
        },
        //日期对比大小
        getMinDateFn:function(setDate,NowDate) {
            var setDateStr = new Date(setDate.replace(/\-/g, "\/"))//格式化开始日期
                , localNoeDate = new Date(NowDate.replace(/\-/g, "\/"));//格式化当前日期

            if (setDateStr != "" && localNoeDate != "" && setDateStr >= localNoeDate) {
                return setDate
            } else {
            	return NowDate
            }
        },
        //给某个日期上加n天
        addDate:function(date, days) {
        	days=parseInt(days);
            if (days == undefined || days == '') {
                days = 1;
            }
            var date = new Date(date);
            date.setDate(date.getDate() + days);
            var month = date.getMonth() + 1;
            var day = date.getDate();
            return date.getFullYear() + '-' + this.getFormatDate(month) + '-' + this.getFormatDate(day);
        },
        //给个位数加0
        getFormatDate:function(arg) {// 日期月份/天的显示，如果是1位数，则在前面加上'0'
            if (arg == undefined || arg == '') {
                return '';
            }
            var re = arg + '';
            if (re.length < 2) {
                re = '0' + re;
            }
            return re;
        },
        //重新排版
        delHtmlTag:function(str) {
            var reHtml = /<[^>]+>/g;//去掉所有的html标记正则
            var re = /(\n(?=(\n+)))+/g || /\n/g //判断是否有换行符
            var reSpace = /^\s+|\s+$/g //判断是否有空格
            var arr;
            str = str.replace(reHtml, "");
            str = str.replace(reSpace, "");
            str = str.replace(/\n/g, "--,--");//此处加--是因为英文版使用的逗号冲突，导致断行不正确
            arr = str.split('--,--');//形成数组
            //console.log(arr);
            return arr;
        }
            
	}
})()
