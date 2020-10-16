<?php
    header("Content-type:text/html;charset=utf-8");
    

    $username = $_POST["username"];
    $password = $_POST["password"];
    $responseData = array("code"=>0,"msg"=>"","name"=>$username);
    if(!$username){
        $responseData['code']=1;
        $responseData['msg']="用户名不能为空";
        echo json_encode($responseData);
        exit;
    }
    if(!$password){
        $responseData['code']=2;
        $responseData['msg']="密码不能为空";
        echo json_encode($responseData);
        exit;
    }

    $link = mysql_connect("127.0.0.1","root","123456");
 
     if(!$link){
        $responseData['code']=3;
        $responseData['msg']="服务器忙";
        echo json_encode($responseData);
        exit;
     }
 
     mysql_set_charset("utf-8");
 
     mysql_select_db("al1688");

     $str = md5(md5(md5($password).'beijing').'shanghai');

     $sql1 = "SELECT * FROM user WHERE username='{$username}' AND password='{$str}'";

     $res = mysql_query($sql1);

     $row = mysql_fetch_assoc($res);

     if(!$row){
        $responseData['code'] = 4;
        $responseData['msg'] = "用户名或密码错误";
        echo json_encode($responseData);
        exit;
    }else{
        $responseData["msg"] = "登录成功";
        echo json_encode($responseData);
    }

    mysql_close($link);
?>