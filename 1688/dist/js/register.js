define(["parabola", "jquery", "jquery-cookie"], function (parabola, $) {
    function register(){
        $(".main-register").click(function(){
            $.ajax({
                type:"post",
                url:"/php/register.php",
                data:{
                    username:$("input").eq(0).val(),
                    password:$("input").eq(1).val(),
                    repassword:$("input").eq(2).val(),
                    createtime:(new Date()).getTime()
                },
                success:function(result){
                    console.log(result);
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