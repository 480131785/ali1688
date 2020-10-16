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

        $("#main-login").click(function(){   
            $.ajax({
                type:"post",
                url:"./php/login.php",
                data:{
                    username:$("input").eq(0).val(),
                    password:$("input").eq(1).val()
                },
                success:function(result){
                    // var oBtn=document.getElementById("main-login")
                    // var oInputs1=document.getElementById("login_username")
                    // var oInputs2=document.getElementById("login_password")
                    var oAlert=document.getElementById("login_alert") 
                    var obj=JSON.parse(result)
                oAlert.style.display = 'block';
                oAlert.innerHTML = obj.msg;
                if(obj.code){
                    oAlert.style.width="257px"
                    oAlert.style.margin="10px auto"
                    oAlert.style.color="red"
                    oAlert.style.border="1px solid red"
                }else{
                    oAlert.style.color="green"
                    oAlert.style.border="1px solid green"
                    oAlert.style.width="257px"
                    oAlert.style.margin="10px auto"
                    var timer=setTimeout(function(){
                        window.location.href=`./index.html?username=${obj.name}`
                    },2000)
                }
                },
                error:function(msg){
                    console.log(msg);
                }
            })
        })
    }

        

    return {
        login
    }
});