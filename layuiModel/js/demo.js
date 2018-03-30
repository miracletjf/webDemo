/**
 * Created by MiracleTJF on 2018/1/15.
 */
//javascript区域
layui.define(['element','jquery','layer','form'],function (exports) {

    var $ = layui.jquery;
    var element = layui.element;
    var layer = layui.layer;
    var form = layui.form;



    
    exports('demo',function() {

        //页面id数组
        var navArrs = {};

        /** 页面切换
         *   1.点击左侧导航，获取跳转信息（id，url，title）
         *   2.判断右侧主显示栏是否存在改tab页面
         *       存在：  跳转到对应的tab页面
         *       不存在：新创建一个tab页面，再打开
         * */
        element.on('nav(navLink)',function (elem) {
            var othis = $(elem).find('a')
                ,id = othis.attr('id')
                ,active =  navArrs[id] || false
                ,src = othis.attr('frameSrc')
                ,iframeHeight = $(window).height()-150
                ,iframeWidth = $(window).width() - 210;


            if(!active){
                element.tabAdd('navTab',{
                    title: elem.text()+'<i class="layui-icon layui-tab-close">&#x1006;</i>'
                    ,content: '<iframe name="111" src='+src+' width="100%" height="'+iframeHeight+'" frameborder="0"></iframe>' //支持传入html
                    ,id: id
                });
                navArrs[othis.attr('id')] = true;
            }

            element.tabChange('navTab',id) //xxx 代表 layid的值
        });

        /** 监听选项卡切换
         *  1.点击右侧选项卡，改变左侧nav导航选中
         *  2.判断显示形式
         *      存在      切换
         *      不存在    不切换
         * */

        element.on('tab(navTab)',function (data) {
            /**
             *  this        当前tab标题所在的原始DOM
             *  data
             *      elem        当前的tab元素
             *      index       得到当前tab的下标
             * */

            var id = this.getAttribute('lay-id');
            var items = document.getElementById('slide_tree').getElementsByClassName('layui-nav-item');
            mRemoveClass(items,'layui-this');

            var actieveElement = document.getElementById(id);
            if(actieveElement){
                actieveElement.parentNode.className = "layui-this";
            }
        });

        /** 选项卡删除操作
         *      1.确定当前选项卡lay-id
         *      2.触发tabDelete事件
         *          element.tabDelete(过滤器名称,对应的lay-id);
         * */

        $('.layui-tab-title').on('click','.layui-tab-close',function () {
            var id = $(this).parent().attr('lay-id');
            element.tabDelete('navTab',id);
            navArrs[id] = false;
        });

        $('#icon_layout').on('click',function () {
            if(!$(this).hasClass('active')){
                $('#mr_side').css({'left': -200+'px'});
                $('#mr_body').css({'left': 0});
                $('#my_tab_title').css({'left':0});
                $(this).addClass('active');
            }else {
                $('#mr_side').css({'left': 0});
                $('#mr_body').css({'left': 200+'px'});
                $('#my_tab_title').css({'left':200+'px'});
                $(this).removeClass('active');
            }
        });

        /** 常用函数
         *      1.id,class,标签选择器
         *      2.删除某个class 从 菜单树中
         * */

        //id,class,标签选择器
        function $m(selector){
            var c = selector.substring(0,1);

            if(c  == '#'){
                return document.getElementById(selector.substring(1));
            }else if(c == '.'){
                var classElemnts = [];
                var reg = new RegExp('(\\s|^)'+selector.substring(1)+'(\\s|$)');

                var elements = document.getElementsByTagName("*");

                console.log(elements);

                for(var i=0;i<elements.length; i++){
                    if(reg.test(elements[i].className)){
                        classElemnts.push(elements[i]);
                    }
                }
                return classElemnts;

            }else {
                return document.getElementsByTagName(selector);
            }
        }

        //删除某个class，在菜单树中
        function mRemoveClass(items,name) {
            var reg = new RegExp('(\\s|^)'+name+'(\\s|$)');

            for(var i=0; i<items.length; i++){
                var item = items[i];
                item.className = item.className.replace(reg,'');

                var ddItems = item.getElementsByTagName('dd');

                for(var j = 0;j<ddItems.length; j++ ){
                    ddItems[j].className = ddItems[j].className.replace(reg,'');
                }
            }
        }
    });


});