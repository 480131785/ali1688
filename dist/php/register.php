<?php
     header("Content-type:text/html;charset=utf-8");
     $responseData = array("code"=>0,"msg"=>"");
     $username = $_POST["username"];
     $password = $_POST["password"];
     $repassword = $_POST["repassword"];
     $createtime = $_POST["createtime"];
      
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
     if($password!=$repassword){
         $responseData['code']=3;
         $responseData['msg']="两次密码不一致";
         echo json_encode($responseData);
         exit;
     }
 
     $link = mysql_connect("127.0.0.1","root","123456");
 
     if(!$link){
        $responseData['code']=4;
        $responseData['msg']="服务器忙";
        echo json_encode($responseData);
        exit;
     }
 
     mysql_set_charset("utf-8");
 
     mysql_select_db("al1688");
 
     $sql1 = "SELECT * FROM user WHERE username='{$username}'";
     $res = mysql_query($sql1);
     $row = mysql_fetch_assoc($res);
     if($row){
         $responseData['code'] = 5;
         $responseData['msg'] = "用户名已存在";
         echo json_encode($responseData);
         exit;
     }
 
     $str = md5(md5(md5($password).'beijing').'shanghai');
 
     $sql2 = "INSERT INTO user(username,password,createtime) VALUES('{$username}','{$str}',{$createtime})";
     $res2 = mysql_query($sql2);
 
     if(!$res2){
         $responseData['code'] = 6;
         $responseData['msg'] = "注册失败";
         echo json_encode($responseData);
         exit;
     }
 
     $responseData['msg'] = "注册成功";
 
     echo json_encode($responseData);
 
     mysql_close($link);
?>