        //send check code and count down
        function fsyzm(obj){
            var phone = $(obj).prev().val();
            if(phone == ""){
                alert("请填写手机号")
                return false;
            }
            var onlineId = $(".form_box").find("input[name='onlineId']").val();
            $.ajax({
                type:'post',
                url:"http://occ07.offcn.com:9090/OCC/onlineApi/getCheckCode",
                data:{
                    "phone":phone,
                    "onlineId":onlineId
                },
                //设置跨域
                dataType:'jsonp',
                jsonp:"callback",
                success:function(data){
                    if (data.status==1) {
                        alert("验证码已发送");
                        var SysSecond;
                        var InterValObj
                        SysSecond=60;
                        InterValObj=window.setInterval(SetRemainTime,1000);
                        function SetRemainTime() {
                            if (SysSecond > 0) {
                                $('#getyzm2').hide();
                                $('#daojishi2').show();
                                SysSecond = SysSecond - 1;
                                var second = Math.floor(SysSecond % 60);
                                var minite = Math.floor((SysSecond / 60) % 60);
                                var hour = Math.floor((SysSecond / 3600) % 24);
                                var day = Math.floor((SysSecond / 3600) / 24);
                                $('#daojishi2').val(second + '秒');
                            } else {
                                $('#getyzm2').show();
                                $('#daojishi2').hide();
                                window.clearInterval(InterValObj);
                                $('#getyzm2').val('发送短信');
                                $('#getyzm2').attr('disabled', false);
                            }
                        }
                    }
                    else{
                        alert("获取失败");
                    }
                }
            });

        }

        //级联属性获取下一级
        function getNextJlpc(obj,level){
            var tableId = $(obj).attr("tableId");
            var levelVal = $(obj).val();
            var destLevel = $(obj).next("select").attr("levelName");
            $.ajax({
                type:'post',
                url:"http://occ07.offcn.com:9090/OCC/onlineSoundCode/getNextLevelData",
                data:{
                    "tableId":tableId,
                    "level":level,
                    "levelVal":levelVal,
                    "destLevel":destLevel
                },
                //设置跨域
                dataType:'jsonp',
                jsonp:"callback",
                success:function(data){
                    var results = JSON.parse(data.result);
                    var html = '<option value="">请选择</option>';
                    for(var i = 0;i<results.length;i++){
                        html += '<option value="'+results[i]+'">'+results[i]+'</option>'
                    }
                    $(obj).next("select").empty();
                    $(obj).next("select").append(html);
                }
            });

        }

        function submitPc(){
            var onlineId = $(".form_box").find("input[name='onlineId']").val();
            var param = {};
            param.onlineId = onlineId;
            var paramNameArray = new Array();
            var paramDoms = $(".form_box").find("[name^='field']");
            paramDoms.each(function () {
                paramNameArray.push($(".form_box").find("[name='"+$(this).attr("name")+"']").attr("name"))
            });
            var checkForm = true;
            $.unique(paramNameArray);
            for(var i = 0;i<paramNameArray.length;i++){
                var paramNode = $(".form_box").find("[name='"+paramNameArray[i]+"']")
                if(paramNode.length>1){
                    var dupliNodeVal = new Array();
                    paramNode.each(function () {
                        if($(this).val()!=''){
                            //判断是否为checkbox
                            if($(this).prop("type")=="checkbox"){
                                if($(this).is(":checked")){
                                    dupliNodeVal.push($(this).val())
                                }
                            }else{
                                dupliNodeVal.push($(this).val())
                            }
                        }
                    });
                    if(paramNode.hasClass("required")&&dupliNodeVal.length<1){
                        checkForm  =false;
                    }else{
                        param[paramNameArray[i]+''] = JSON.stringify(dupliNodeVal);
                    }
                }else{
                    var tagName = paramNode[0].tagName;
                    if(tagName=="INPUT" || tagName=="SELECT"){
                        var val = paramNode.val();
                        if(paramNode.hasClass("required")&&(val == ""||val==null||val == undefined)){
                            checkForm = false;
                        }else{
                            param[paramNameArray[i]+''] = val;
                        }
                    }else{
                        var text =paramNode.text();
                        if(paramNode.hasClass("required")&&(text == ""||text==null||text == undefined)){
                            checkForm = false;
                        }else{
                            param[paramNameArray[i]+''] = text;
                        }
                    }
                }
            }


            // 职位代码筛选
            var professional_include = function(item, target) {
                if(target.indexOf(item) != -1) {
                    return true
                } else {
                    return false
                }
            }
            var zwdm = $('.zwdm').val()
            var attr = [];
            $.each(dataList,function(idx,obj){
                if(professional_include(zwdm, obj.item1.toString())) {
                    attr.push(obj);
                }
            })
            if(attr.length == 0){
                alert('请填写正确的职位代码！')
                return false;
            }
            if(!checkForm){
                alert("请填写完整的表单数据！")
                return false;
            }
//            alert(JSON.stringify(param))
            // submit data jsoup
            // 准考证号位数的判断
            var zkz = $(".zkz").val();
            var zkzreg = /\d{12}/;
            if(!zkzreg.test(zkz)) {
                alert('准考证号为12位');
                return false;
            }

            // 准考证规则的判断
            var first_zkz = zkz.slice(0, 3);
            if(first_zkz !== "111"){
                alert('您填入的准考证号不正确，请重新输入！');
                return false;
            }
            $.ajax({
                type:'post',
                url:"http://occ07.offcn.com:9090/OCC/onlineApi/submitScore",
                data:{
                    "onlineScore":JSON.stringify(param)
                },
                //设置跨域
                dataType:'jsonp',
                jsonp:"callback",
                success:function(msg){
                    if(msg==1){
                        alert('恭喜您，晒分成功！');
                        //刷新本页面
                        window.location.reload();
                    }else if(msg==2){
                        alert('抱歉，该手机号已经晒过分了。');
                        return false;
                    }else if(msg==3){
                        alert('抱歉！晒分失败');
                        return false;
                    }else if(msg==4){
                        alert('抱歉！手机验证码不正确！');
                        return false;
                    }else if(msg==5){
                        alert('抱歉！输入的分数范围不对！');
                        return false;
                    }
                }
            });
        }


        function queryRankPc() {
            var query = {};
            var onlineId = $("#pcQueryBox").find("input[name='onlineId']").val();
            $("#pcQueryBox").find("input.inquiry_telbox").each(function (index,element) {
                var fieldName = $(element).attr("name");
                var fieldValue = $(element).val();
                query[fieldName] = fieldValue;
            });
            query.onlineId = onlineId;
            // submit data jsoup
            $.ajax({
                type:'post',
                url:"http://occ07.offcn.com:9090/OCC/onlineApi/queryRank",
                data:{
                    "query":JSON.stringify(query)
                },
                //设置跨域
                dataType:'jsonp',
                jsonp:"callback",
                success:function(data){
                    if (data.code==0) {
                        $("#pcQueryBox").find(".inquiry_result").find("td").parents("tr").remove();
                        $("#pcQueryBox").find(".inquiry_result").append(data.trHtml);
                        $("#pcQueryBox").find(".totalCount").text("共"+data.totalCount+"条数据");
                        $("#pcQueryBox").find(".totalCount").show();
                    }else if (data.code==1) {
                        alert("查询不到结果,请确认号码是否输入正确");
                    }
                }
            });
        }

        