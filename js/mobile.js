/**
 * Created by sdfag on 2017/9/6.
 */
$(function() {

    var iNow = new Date();
    $('.year').text(iNow.getFullYear());

    // $('.sco_btn a').first().addClass('active');
    // $('.sco_ul .con_box').first().show().siblings('.con_box').hide();
    // $('.sco_btn a').each(function (i,e) {
    //     $(this).click(function () {
    //         if(i<$('.sco_btn a').length-1){
    //             $(this).addClass('active').siblings('a').removeClass('active');
    //             $('.sco_ul li.li').eq(i).stop(true,true).fadeIn().siblings('li.li').hide();
    //         }
    //     })
    // })
    $('.sco_btn').find('a').not('.not_btn').click(function(){
         $('.sco_btn').find('a').removeClass('active');
         $(this).addClass('active');
         $('.sco_ul').find('.con_box').hide().eq($(this).index()).slideDown();
        
    })

    $('.two_btn a').first().addClass('active').siblings('a').removeClass('active');
    $('.two_dl').first().show().siblings('.two_dl').hide();
    $('.two_dl').each(function () {
        $(this).find('dt a').first().addClass('active').siblings('a').removeClass('active');
        $(this).find('dd p').first().show().siblings('p').hide();
        $(this).find('dt').find('a').each(function (i,e) {
            $(this).mouseover(function () {
                $(this).addClass('active').siblings('a').removeClass('active');
                $(this).parent().next('dd').find('p').eq(i).stop(true,true).fadeIn().siblings('p').hide();
            })
        })
    })
    $('.two_btn a').each(function (i,e) {
        $(this).click(function () {
            $(this).addClass('active').siblings('a').removeClass('active');
            $('.two_dl').eq(i).stop(true,true).fadeIn().siblings('.two_dl').hide();
        })
    })

    /*$('.li1s_div dl dt').each(function () {
        $(this).click(function (e) {
            $(this).next('dd').toggle();
            $(this).parent().siblings('dl').find('dd').hide();
            e.stopPropagation();
            $('body').click(function(){
                $('.li1s_div dl dd').hide();
            })
        })
    })*/
    /*$('.li1s_div dl dd').each(function () {
        $(this).find('p').each(function () {
            $(this).click(function () {
                $("#zwdms_like").attr('placeholder','请输入部门关键词');
                $("#zwdm").html('<option disabled="" selected="">部门匹配</option>');
                $("#zpdw").html('<option disabled="" selected="">招聘单位</option>');
                $("#zpgw").html('<option disabled="" selected="">招聘岗位</option>');
                $(this).parent().siblings('dt').removeClass('active').text($(this).text());
                $(this).parents('dl').next('input').val($(this).text());
            })
        })
    })*/
    $('.dl_district').first().show();
    $('.dl_city dd p').each(function (i,e) {
        $(this).click(function () {
            $('.dl_district').eq(i).show().siblings('.dl_district').hide();
        })
    })


});
