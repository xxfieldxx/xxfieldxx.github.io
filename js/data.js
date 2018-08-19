
$(function() {
    // 加载中英文数据
    $(".box").on('click',function() {
        $.when($.ajax('../data/data.json')).done(function(data) {
        var content = data;
        var zh = content[0].zh;
        var en = content[1].en;
        var text = $(".background h2").html();
        var lang = null;
        console.log(111);
        if(text=="一些背景") {
            var lang = en;
            console.log(222);
            $('h2').css('font-family','HelveticalNeue_md');
            $('p,.aim ul li').css({'font-family':'HelveticaNeue-Light','font-weight':'normal'});
            $('.front img').attr('src','../asset/contentImg/en.png');
            $('.back img').attr('src','../asset/contentImg/zh.png');

        } else {
            var lang = zh;
            $('h2').css('font-family','PingFang Medium');
            $('p,.aim ul li').css({'font-family':'PingFang Light','font-weight':'bold'});
            $('.front img').attr('src','../asset/contentImg/zh.png');
            $('.back img').attr('src','../asset/contentImg/en.png');
        };
            console.log(lang);
            $('.footer p,.footer a').css('font-family','HelveticalNeue_md');
            $('.title h1').html(lang[0].title.h1);
            $('.title span').each(function(index,val) {
                $(this).html(lang[0].title.name[index]);
            });
            $('.behance').html(lang[0].title.behance);
            $('.background h2,.aim h2,.vision h2,.card h2,.effect h2').each(function(index,val) {
                $(this).html(lang[1].h2[index]);
            });
            $('.background p,.aim p,.vision p,.card p,.effect p').each(function(index,val) {
                $(this).html(lang[2].p[index]);
            });
            $('ul li').each(function(index,val) {
                $(this).html(lang[3].li[index]);
            })
        });

    })
})
