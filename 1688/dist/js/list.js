define(["parabola", "jquery", "jquery-cookie"], function (parabola, $) {
  function list(){
    $.ajax({
      url: "./data/list.json",
      success: function (arr) {
        var str = ``;
        for (var i = 0; i < arr.length; i++) {
          str = $(`<div class="main-list">
          <a href="./goods.html?id=${i}"><img src="${arr[i].img}">
          <p>${arr[i].intro}</p>
          <b>￥${arr[i].price}</b><br>
          <span>${arr[i].number}</span>
          <div>${arr[i].site}</div>
          </div></a>`)
          str.appendTo($(".list-c"));}
        
      },
      error: function (msg) {
        console.log(msg);
      }
    });
  }
  return{
    list
  }
});