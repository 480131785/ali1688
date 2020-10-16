define(["parabola", "jquery", "jquery-cookie"], function (parabola, $) {

    function goodscarData() {
        var cookieStr = $.cookie("goods");
        if (!cookieStr) {
            return;
        }
        $.ajax({
            url: "./data/list.json",
            success: function (arr) {
                var cookieArr = JSON.parse(cookieStr);
                var newArr = [];
                for (var i = 0; i < arr.length; i++) {
                    for (var j = 0; j < cookieArr.length; j++) {
                        if (cookieArr[j].id == arr[i].id) {
                            arr[i].num = cookieArr[j].num;
                            newArr.push(arr[i]);
                            break;
                        }
                    }
                }
                var str = ``;
                for (var i = 0; i < newArr.length; i++) {
                    str += `<div class="main-goods" id="${newArr[i].id}">
                    <p class="main-top-p1 main-top-p"><a></a></p>
                    <p class="main-top-p2"><img src="${newArr[i].img}" alt=""> ${newArr[i].intro}</p>
                    <p class="main-top-p3">￥<span>${newArr[i].price}</span></p>
                    <p class="main-top-p4"><span><b class="main-reduce fl">-</b><a>${newArr[i].num}</a><b class="main-add fr">+</b></span></p>
                    <p class="main-top-p5 main-top-m">￥${(newArr[i].price * newArr[i].num).toFixed(1)}元</p>
                    <p class="main-top-p6 main-del">删除</p>
                </div>`;
                }
                $(".main-good").html(str);
            },
            error: function (msg) {
                console.log(msg);
            },
        });
    }


    function checkFunc() {
        $(".main-top .main-top-p1").find("a").click(function(){

            var allChecks = $(".main-good").find(".main-top-p1").find("a");

            if($(this).hasClass("main-top-a")){
                $(this).add(allChecks).removeClass("main-top-a");
            }else{
                $(this).add(allChecks).addClass("main-top-a");
            }
            isCheckAll();
        })

        $(".main-good").on("click","a",function(){
            if($(this).hasClass("main-top-a")){
                $(this).removeClass("main-top-a");
            }else{
                $(this).addClass("main-top-a");
            }
            isCheckAll();
        })
    }

    function isCheckAll() {
        
        var allChecks = $(".main-good").find(".main-goods");
        var isAll = true;
        var total = 0;
        allChecks.each(function(index,item){
            if(!$(item).find(".main-good a").hasClass("main-top-a")){
                isAll = false;
            }else{
                
            }
            total += (Number($(item).find(".main-top-p3 span").html().trim()) * Number($(this).find(".main-top-p4 a").html()));
        })

        $(".main-jiage a").html(total.toFixed(2));
        return false;
    }

    function changeCars(){
        $(".main-good").on("click",".main-del",function(){
            var id = $(this).closest(".main-goods").remove().attr("id");
            
            var cookieStr = $.cookie("goods");
            var cookieArr = JSON.parse(cookieStr);
            for(var i=0;i<cookieArr.length;i++){
                if(id == cookieArr[i].id){
                    cookieArr.splice(i,1);
                    break;
                }
            }
            cookieArr.length == 0 ? $.cookie("goods",null) : $.cookie("goods",JSON.stringify(cookieArr),{expires:7});
            isCheckAll();
        })

        $(".main-good").on("click",".main-reduce",function(){
            var id = $(this).closest(".main-goods").attr("id");
            var cookieStr = $.cookie("goods");
            var cookieArr = JSON.parse(cookieStr);

            for(var i=0;i<cookieArr.length;i++){
                if(cookieArr[i].id == id){
                    cookieArr[i].num == 1 ? alert("数量为1，不能减！！！") : cookieArr[i].num--;  
                    break;
                }
            }

            $(this).siblings("a").html(cookieArr[i].num);

            var price = parseFloat($(this).closest(".main-top-p4").siblings(".main-top-p3").find("span").html().trim())
            $(this).closest(".main-top-p4").siblings(".main-top-p5").html((price * cookieArr[i].num).toFixed(1) + "元")
        
            $.cookie("goods",JSON.stringify(cookieArr),{
                expires:7
            })
            isCheckAll();
        })

        $(".main-good").on("click",".main-add",function(){
            var id = $(this).closest(".main-goods").attr("id");
            var cookieStr = $.cookie("goods");
            var cookieArr = JSON.parse(cookieStr);

            for(var i=0;i<cookieArr.length;i++){
                if(cookieArr[i].id == id){
                    cookieArr[i].num++;  
                    break;
                }
            }

            $(this).siblings("a").html(cookieArr[i].num);

            var price = parseFloat($(this).closest(".main-top-p4").siblings(".main-top-p3").find("span").html().trim())
            $(this).closest(".main-top-p4").siblings(".main-top-p5").html((price * cookieArr[i].num).toFixed(1) + "元")
        
            $.cookie("goods",JSON.stringify(cookieArr),{
                expires:7
            })
            isCheckAll();
        })
    }

    return {
        changeCars,
        goodscarData,
        checkFunc,
        isCheckAll
    }
});