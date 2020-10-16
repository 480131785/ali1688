define(["jquery","jquery-cookie"], function ($) {
    function register(){
        $(".main-register").click(function(){
            $.ajax({
                type:"post",
                url:"./php/register.php",
                data:{
                    username:$("input").eq(0).val(),
                    password:$("input").eq(1).val(),
                    repassword:$("input").eq(2).val(),
                    createtime:(new Date()).getTime()
                },
                success:function(result){
                    console.log(result);
                    setInterval(function(){
                        alert("跳转登录页面")
                        location.assign("login.html")
                    },2000)
                },
                error:function(msg){
                    console.log(msg);
                }
            })
        })   
    }

    return{
        register
    }
})