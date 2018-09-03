$(function() {
    //执行动画
    // 控制视频的尺寸为9/16
    if (navigator.userAgent.toLowerCase().indexOf('mac') > -1) {
        $('.iframe').css({ 'transform': 'scale(1.12)', '-webkit-transform': 'scale(1.12)', '-moz-transform': 'scale(1.12)' });
        $('.iframe').css('top', '-20px');
        // $('title').css('left','23px');
        // $('.connect').css({'margin-top':'45%','padding-left':'12%'});
        // $('.title').css({'right':'-86%'});
    }
    var h = $('.iframe').innerWidth() * 16 / 9;
    $('.iframe').height(h);
    //视频播放
    play();
    if (navigator.userAgent.toLowerCase().indexOf('iphone') > -1) {
        $('#play').css('opacity', 0);
    }

    // 初始化样式
    var viewPort = $(document).innerWidth();
    var stepWidth = viewPort / 5;
    var cur = 0; //刚开始是index为0
    var gutter = viewPort / 14;
    //定位手机模型上icon的位置
    $('ul li').css('margin-top', $('ul').innerHeight() * 3 / 20);
    //禁止文字 a标签 拖动变蓝
    $('a,p').on('dragstart', function() {
        return false;
    })
    if (viewPort < 768) {
        stepWidth = viewPort / 2;
    }
    $('.title').css('opacity', 0);
    $('.title').eq(0).css('opacity', 1);
    // var moveStep =0;
    $('ul li').each(function(i, val) {
        val.style['webkitTransform'] = 'translate(' + (stepWidth * i - gutter * (i - 1)) + 'px,0) scale(0.5)';
        val.style['mozTransform'] = 'translate(' + (stepWidth * i - gutter * (i - 1)) + 'px,0) scale(0.5)';
        val.style['transform'] = 'translate(' + (stepWidth * i - gutter * (i - 1)) + 'px,0) scale(0.5)';
        if (i == 0) {
            val.style['webkitTransform'] = 'translate(' + stepWidth * i + 'px,0) scale(1)';
            val.style['mozTransform'] = 'translate(' + stepWidth * i + 'px,0) scale(1)';
            val.style['transform'] = 'translate(' + stepWidth * i + 'px,0) scale(1)';
        }

    });
    var pre = 0; //用来存上一个的变量
    var hammerNum = 0;
    $('iframe').css('display', 'none');
    $('ul li').on('click', slide);

    function slide() {
        cur = $(this).index(); //判断点击的是第几个 
        hammerNum = cur;
        if (cur == 1) {
            $('iframe').css('display', 'block');
        } else {
            $('iframe').css('display', 'none');
        }
        $('ul li').each(function(i, val) {
            gutter = cur - i > 1 ? -viewPort / 14 : viewPort / 14;
            //当前cur 前后不变 0 1 0 1 2;

            if (Math.abs(cur - i) <= 1) {
                var speed1 = (i - cur) * stepWidth;
                val.style['mozTransform'] = 'translate(' + speed1 + 'px,0) scale(0.5)';
                val.style['webkitTransform'] = 'translate(' + speed1 + 'px,0) scale(0.5)';
                val.style['transform'] = 'translate(' + speed1 + 'px,0) scale(0.5)'
            } else {
                var speed = (i - cur) * stepWidth - gutter * (Math.abs(cur - i) - 1);
                val.style['mozTransform'] = 'translate(' + speed + 'px,0) scale(0.5)';
                val.style['webkitTransform'] = 'translate(' + speed + 'px,0) scale(0.5)';
                val.style['transform'] = 'translate(' + speed + 'px,0) scale(0.5)';

            }
        });
        $(this).get(0).style['mozTransform'] = 'translate(0,0) scale(1)';
        $(this).get(0).style['webkitTransform'] = 'translate(0,0) scale(1)';
        $(this).get(0).style['transform'] = 'translate(0,0) scale(1)';
        $(this).get(0).style['z-index'] = 0;
        if (pre != cur) {
            $('.title').css('opacity', 0);
        }
        pre = cur;
        setTimeout(function() {
            console.log(cur)
            $('.title').css('opacity', 0);
            $('.title').eq(cur).css('opacity', 1);
        }, 500)
    }
    setTimeout(function() {
            $('ul li').css('-webkit-transition', "all 0.5s");
            $('ul li').css('-moz-transition', "all 0.5s");
            $('ul li').css('transition', "all 0.5s");
            $('.title').css('-webkit-transition', "all 0.4s");
            $('.title').css('-moz-transition', "all 0.4s");
            $('.title').css('transition', "all 0.4s");

        }, 20)
        //通过手势左右滑动查看作品
    var container = document.getElementsByClassName('container')[0];
    var hammer = new Hammer(container);
    hammer.on('swipeleft', function() {
        hammerNum++;
        $('ul li').eq(hammerNum).triggerHandler('click');
        if (hammerNum >= 5) {
            hammerNum = 5;
        }
    });
    hammer.on('swiperight', function() {

        hammerNum--;
        if (hammerNum <= 0) {
            hammerNum = 0;
        }
        $('ul li').eq(hammerNum).triggerHandler('click');
        console.log(hammerNum);
        console.log('right');

    })
})

function play() {
    var video = $('video');
    var play = $('#play');
    play.on('click', function() {
        video[0].play();
        play.css('opacity', 0);
    })
}