/**
 * 没有模块化的jquery插件
 * jq上添加green()方法
 * */
(function ($) {
    $.fn.green = function () {
        $(this).each(function () {
            $(this).css('color', 'green');
        })
    }
})(jQuery);