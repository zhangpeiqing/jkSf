/**

 * Created by ibm on 2018/1/3.

 */

//�ж��Ƿ�ΪPC

function IsPC() {

    var userAgentInfo = navigator.userAgent;

    var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");

    var flag = true;

    for (var v = 0; v < Agents.length; v++) {

        if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }

    }

    return flag;

}



//�ж��Ƿ���΢�������

function isWeiXin(){

    var ua = window.navigator.userAgent.toLowerCase();

    if(ua.match(/MicroMessenger/i) == 'micromessenger'){

        return true;

    }else{

        return false;

    }

}

//get url params

(function ($) {

    $.getUrlParam = function (name) {

        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");

        var r = window.location.search.substr(1).match(reg);

        if (r != null) return unescape(r[2]); return null;

    }

})(jQuery);



var province_type = $('#province_type').val();//province flag



var terminalFlag = 0;//terminal flag

var pageTerminalFlag = $('#pageTerminalFlag').val();//current page flag

var pageInfo = "";//page file

if(IsPC()){

    terminalFlag = 1;//PC

    pageInfo = "";

}else{

    terminalFlag = 2;//MOBILE

    pageInfo = "m";

}

$(function() {

    var isweixin = isWeiXin();

    //��ʶ��һ�� ���������ն�ҳ��

    if(pageTerminalFlag != terminalFlag) {

        location.href = "index" +pageInfo + ".html?&isweixin="+isweixin+"#jump";

    }



    //is redirect

    if(isWeiXin() && false){

        //one get userinfo

        var token = $("#token").val();

        var openid = $.getUrlParam("openid");

        if((openid == "" || openid == undefined) && token != "" && token != undefined){

            var url = "http://hd.offcn.com/WechatTransferServer/index.php?m=Transfers&c=Transfer&a=index&token=" + token;

            location.href = url;

        }



        //two deal userinfo

        var issend = $.getUrlParam("subscribe");

        if(issend != '1'){

            $('.mask').show();

            $('.dy_pop').show();

        }



        var subscribe = $.getUrlParam("subscribe");

        var nickname = $.getUrlParam("nickname");

        //var province_type = $('#province_type').val();

        //ͬ����¼

        $.ajax({

            type: "get",

            url: "http://hd.offcn.com/sydwsf/index.php/home/Indexzoneaction/getUserinfo",

            data: {openid: openid, province_type: province_type, callback: '?'},

            dataType: 'json',

            success: function (res) {

                if (res.status == 1) {

                    //alert('����ע�ᣬ��ֱ�Ӳ�ѯ');

                    //location.href = "indexm.html?phone="+res.data.phone+"&openid="+openid+"&subscribe="+subscribe+"#jump";

                    //return false;

                }

            }

        });

    }



    //var issend=$('#issend').val();



    var cityMsg = "��Ƹ����";

    var countyMsg = "��Ƹ��/��";

    var departmentMsg = "��Ƹ��λ";

    var positionMsg = "��Ƹ��λ";



    $.ajax({

        type: "get",

        url: "http://hd.offcn.com/sydwsf/index.php/home/Indexzoneaction/getcity",

        data: {province_type: province_type, cityMsg: cityMsg, callback: "?"},

        dataType: 'json',

        async: false,

        success: function (res) {

            if (res.status == '1') {

                $('#city').html(res.html);

            }

        }

    });



    $('#city').on('change',function(){

        var city=$(this).val();

        $.ajax({

            type: "get",

            url: "http://hd.offcn.com/sydwsf/index.php/home/Indexzoneaction/getcounty",

            data: {province_type: province_type, city: city, countyMsg: countyMsg, callback: '?'},

            dataType: 'json',

            async: false,

            success: function (res) {

                if (res.status == '1') {

                    $('#county').html(res.html);

                }

            }

        });

    });



    $('#county').on('change',function(){

        var city=$(this).val();

        $.ajax({

            type: "get",

            url: "http://hd.offcn.com/sydwsf/index.php/home/Indexzoneaction/getdepartment",

            data: {province_type: province_type, type_name: "county", value_data: city, departmentMsg: departmentMsg, callback: '?'},

            dataType: 'json',

            async: false,

            success: function (res) {

                if (res.status == '1') {

                    $('#department').html(res.html);

                }

            }

        });

    });



    $('#department').on('change',function(){

        var department=$(this).val();

        $.ajax({

            type: "get",

            url: "http://hd.offcn.com/sydwsf/index.php/home/Indexzoneaction/getzwname",

            data: {province_type: province_type, department: department, positionMsg: positionMsg, callback: "?"},

            dataType: 'json',

            async: false,

            success: function (res) {

                if (res.status == '1') {

                    $('#position').html(res.html);

                }

            }

        });

    });



    $('#btn').on('click', function () {

        var city = $("#city").val();

        var county = $("#county").val();

        var department = $("#department").val();

        var position = $("#position").val();

        var zkzh = $("#zkzh").val();

        var allscore = $("#allscore").val();

        var username = $("#username").val();

        var phone= $("#phone").val();

        var yzm = $("#yzm").val();



        var syscode = $('#syscode').val();



        if(city.length<1 || city.length>50) {

            alert('��ѡ����ȷ��' + cityMsg);

            return false;

        }

        if(county.length<1 || county.length>50) {

            alert('��ѡ����ȷ��' + countyMsg);

            return false;

        }

        if(department.length<1 || department.length>50) {

            alert('��ѡ����ȷ��' + departmentMsg);

            return false;

        }

        if(position.length<1 || position.length>50) {

            alert('��ѡ����ȷ��' + positionMsg);

            return false;

        }



        if (zkzh.length != 12){

            alert('��������ȷ��׼���ʺ�');

            $("#zkzh").focus();

            return false;

        }



        if(allscore < 1 || allscore > 300) {

            alert('��������ȷ�ķ���');

            $("#allscore").focus();

            return false;

        }



        if(username.length < 1 || username.length > 50) {

            alert("����������");

            $("#username").focus();

            return false;

        }

        var myReg = /^[\u4e00-\u9fa5]{2,4}$/;

        if(!myReg.test(username)) {

            alert("��������������");

            $("#username").focus();

            return false;

        }



        var pattern = /^0?1[345789]\d{9}$/;

        if(!phone) {

            alert("�������ֻ���");

            $("#phone").focus();

            return false;

        }

        if(!pattern.test(phone)) {

            alert("��������ȷ���ֻ���");

            $("#phone").focus();

            return false;

        }



        if(yzm != syscode || yzm==''){

            alert("��������ȷ����֤��");

            $("#yzm").focus();

            return false;

        }



        //$('#infoform').submit();

        //var openid = $.getUrlParam("openid");

        //var subscribe = $.getUrlParam("subscribe");

        //var nickname = $.getUrlParam("nickname");

        $.ajax({

            type: "post",

            url: "http://hd.offcn.com/sydwsf/index.php/home/Indexzoneaction/addshaifen",

            data: {

                city: city,

                county: county,

                //department: department,

                //position: position,

                zwid: position,



                zkzh: zkzh,

                allscore: allscore,

                username: username,

                phone: phone,

                yzm: yzm,

                province_type: province_type,

                openid: openid,

                callback: '?',

            },

            async: false,

            dataType: 'json',

            success: function (res) {

                if (res.isok == 'success') {

                    location.href="score_conse" + pageInfo + ".html?phone="+res.phone+"#jump";

                }else if (res.isok == 'repeat'){

                    alert('����ע�ᣬ��ֱ�Ӳ�ѯ');

                    location.href="score_conse" + pageInfo + ".html#jump";

                }else{

                    alert('���ݴ���');

                }

            }

        });

    });



    //����

    $('#sbtn').on('click',function(){

        var phone=$('#sphone').val();

        var urlhost=window.location.host;

        location.href = "score_conse" + pageInfo + ".html?phone="+phone+"#jump";

    });



    //��ȡ������֤��

    $("#yzm_btn").click(function (){

        var phone = $('#phone').val();

        if(phone == ''){

            alert('�ֻ��Ų���Ϊ�գ�');return false;

        }



        $.ajax({

            type:"get",

            url: "http://hd.offcn.com/sydwsf/index.php/home/Indexzoneaction/getcode",

            dataType:"json",

            data:{phone:phone, province_type: province_type, callback: '?'},

            success:function (res) {

                if (res.status == 4) {

                    alert('�Ƿ�ע��');

                    return false;

                }

                if (res.status == 3) {

                    alert('����ע�ᣬ��ֱ�Ӳ�ѯ');

                    window.location="score_conse" + pageInfo + ".html?phone=" + phone;

                    return false;

                }

                if (res.status == 1002) {

                    alert('���ŷ���ʧ��');

                    return false;

                }

                if (res.status == 1) {

                    $('#syscode').val(res.yzm);



                    timeDown();

                    $('#yzm_btn').attr("disabled","disabled");

                }

            }

        });

    })



    function timeDown() {

        var num = '60';

        var timer = setInterval(function() {

            num --;

            $('#yzm_btn').val( num+'s�����»�ȡ');

            if( num <= 0 ) {

                $('#yzm_btn').val('�����ȡ');

                $('#yzm_btn').attr('disabled',false);

                clearInterval( timer );

            }

        }, 1000);

    }

})

$(function(){

    var ctnmu=0;

    $('.add_btm').click(function(){

        ctnmu+=1;

        $(".zw_dm"+ctnmu+"").show();

        if(ctnmu>=2){

            $(this).hide();

        }

    });

});

