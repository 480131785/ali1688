define(["parabola", "jquery", "jquery-cookie"], function (parabola, $) {
    function login(){
        $(".login-top").click(function(){
            $(".login-c").hide();
            $(".login-top").hide();
            $(".login-c2").show();
            $(".login-top2").show();
        });
        $(".login-top2").click(function(){
            $(".login-c2").hide();
            $(".login-top2").hide();
            $(".login-c").show();
            $(".login-top").show();
        });

        $(".login-p2").click(function(){
            $(".login-input").hide();
            $(".login-p1").css("border-bottom","none");
            $(".login-input2").show();
            $(".login-p2").css("border-bottom","2px solid #000000");
        });
        $(".login-p1").click(function(){
            $(".login-input2").hide();
            $(".login-p2").css("border-bottom","none");
            $(".login-input").show();
            $(".login-p1").css("border-bottom","2px solid #000000");
        });
    }
    return {
        login
    }
});