console.log("加载成功");
//一个.html页面独享一个js，配置要引入的js文件
require.config({
  paths: {
    "jquery": "jquery-1.11.3",
    "jquery-cookie": "jquery.cookie",
    "parabola": "parabola",
    "login": "login",
    "list":"list",
    "goods":"goods",
    "goodscar":"goodscar",
    "carousel":"carousel",
    "register":"register"
  },
  shim: {
    //设置依赖关系
    "jquery-cookie": ['jquery'],
    //parabola 不遵从amd规范
    parabola: {
      exports: "_"
    }
  }
})


require(["login","list","goods","goodscar","carousel","register"], function(login,list,goods,goodscar,carousel,register){
  login.login();
  list.list();
  goods.goods();
  goods.download();
  goodscar.goodscarData();
  goodscar.checkFunc();
  goodscar.isCheckAll();
  goodscar.changeCars();
  carousel.carousel();
  register.register();
})
