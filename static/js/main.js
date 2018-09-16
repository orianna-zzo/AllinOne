// smooth-scroll
$.smoothScroll({
    //滑动到的位置的偏移量
    offset: 0,
    //滑动的方向，可取 'top' 或 'left'
    direction: 'top',
    // 只有当你想重写默认行为的时候才会用到
    scrollTarget: null,
    // 滑动开始前的回调函数。`this` 代表正在被滚动的元素
    beforeScroll: function () { },
    //滑动完成后的回调函数。 `this` 代表触发滑动的元素
    afterScroll: function () { },
    //缓动效果
    easing: 'swing',
    //滑动的速度
    speed: 700,
    // "自动" 加速的系数
    autoCoefficent: 2
});


// Bind the hashchange event listener
$(window).bind('hashchange', function (event) {
    $.smoothScroll({
        // Replace '#/' with '#' to go to the correct target
        offset: $("body").attr("data-offset")? -$("body").attr("data-offset"):0 ,
        // offset: -30,
        scrollTarget: decodeURI(location.hash.replace(/^\#\/?/, '#'))
        
      });
});

// $(".smooth-scroll").on('click', "a", function() {
$('a[href*="#"]')
    .bind('click', function (event) {    
    // Remove '#' from the hash.
    var hash = this.hash.replace(/^#/, '')
    if (this.pathname === location.pathname && hash) {
        event.preventDefault();
        // Change '#' (removed above) to '#/' so it doesn't jump without the smooth scrolling
        location.hash = '#/' + hash;
    }
});

// Trigger hashchange event on page load if there is a hash in the URL.
if (location.hash) {
    $(window).trigger('hashchange');
}

// // $('[data-spy="scroll"]').each(function () {
// //     var $spy = $(this).scrollspy('refresh')
// //   })

// $('[data-spy="scroll"]').on('activate.bs.scrollspy', function () {
//     // do something…
//     var offset = $('[data-spy="scroll"]').attr("data-offset")
//   })