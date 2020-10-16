define(["parabola", "jquery", "jquery-cookie"], function (parabola, $) {
    
    function carousel(){
        var oUl = $(".main-carousel-ul");
        var aBtns = $(".point li")
        var iNow = 0;
        var timer = null;
        
        aBtns.click(function(){
            iNow = $(this).index()
            tab();
        })

        timer = setInterval(function(){
            iNow++;
            tab();
        },3000)

        function tab(){
             aBtns.removeClass("active").eq(iNow).addClass("active")
             if(iNow == aBtns.size()){
                 aBtns.eq(0).addClass("active")
             }
             oUl.animate({left:-700 * iNow},1000,function(){
                 if(iNow == aBtns.size()){
                     iNow = 0;
                     oUl.css("left",0)
                 }
             });
        }

        $(".main-carousel-ul").mouseenter(function(){
            clearInterval(timer);
        })
        $(".main-carousel-ul").mouseleave(function(){
            timer = setInterval(function(){
                iNow++;
                tab();
            },3000)
        })

    }


    return{
        carousel
    }
});