define(["parabola", "jquery", "jquery-cookie"], function (parabola, $) {
    function goods(){
        $(".zoom-r-t-a1").click(function(){
            $(".zoom-r-t-a1").css("border-top","2px solid #FF6000");
            $(".zoom-r-t-a1").css("background","#FFFFFF");
            $(".zoom-r-t-a1").css("color","#FF6000");
            $(".zoom-r-t-a2").css("border-top","none");
            $(".zoom-r-t-a2").css("background","#F9F9FA");
            $(".zoom-r-t-a2").css("color","#000000");
        });
        $(".zoom-r-t-a2").click(function(){
            $(".zoom-r-t-a2").css("border-top","2px solid #FF6000")
            $(".zoom-r-t-a2").css("background","#FFFFFF");
            $(".zoom-r-t-a2").css("color","#FF6000");
            $(".zoom-r-t-a1").css("border-top","none");
            $(".zoom-r-t-a1").css("background","#F9F9FA");
            $(".zoom-r-t-a1").css("color","#000000");
        });

        $("#small").mouseenter(function(){
            $("#masked,#big").show()
        })
        $("#small").mouseleave(function(){
            $("#masked,#big").hide()
        })
        $("#small").mousemove(function(ev){
            var l = ev.clientX - $(this).offset().left -90
            var t = ev.clientY - $(this).offset().top -90
            l = Math.max(0,l)
            l = Math.min(l,180);
            t = Math.max(0,t)
            t = Math.min(t,180)
            $("#masked").css({
                left:l,
                top:t
            })
            $("#big img").css({
                left:-2*l,
                top:-2*t
            })
        })
    }

    function download(){
        var id = valueId(location.search,"id");
        $.ajax({
            url: "./data/list.json",
            success: function (arr) {
                var goodsMsg = arr.find(item => item.id == id);
                var node = $(`<img src="${goodsMsg.img}" alt="">`)
                var node1 = $(`<img src="${goodsMsg.img}" alt="">`)
                node.appendTo("#small")
                node1.appendTo("#big")
                
                var str = $(` <img class="pic1" src="./img/TB1Kh1sdND1gK0jSZFsXXbldVXa-114-56.jpg" alt=""><span class="main-span1">袋发帮</span>
                <p class="fl">${goodsMsg.intro}</p>
                <img class="pic2" src="./img/TB12vpBelWD3KVjSZKPXXap7FXa-90-90.png" alt="">
                <a href="javascript:;">举报</a><span class="main-span2">本产品支持七天无理由退货</span>`).appendTo(".main-t")
                var str = $(`<tr>
                <td class="td1">价格</td>
                <td class="td2"></td>
                <td class="td2">￥${goodsMsg.price}</td>
                </tr>
                <tr>
                    <td class="td1">起批</td>
                    <td class="td1"></td>
                    <td class="td1">≥2000</td>
                </tr>`).appendTo(".table1")
                
                var btn = $(`<a href="./goodscar.html"><button id="${goodsMsg.id}" class="addCart">加入进货单</button><a>`).insertAfter(".zoom-r-t .zoom-r-guige")
              
                $('.zoom-r-t').on('click','.addCart',function(){
                    var id = valueId(location.search,"id");
                    console.log(id)
                    for(let ii = 0;ii<arr.length;ii++){
                        if(id == arr[ii].id){
                            console.log(arr[ii])
                            var first = $.cookie("goods") == null ? true : false;
                
                            if(first){
                                var cookieArr = [{id: id,num: 1}];
                                $.cookie("goods",JSON.stringify(cookieArr),{
                                    expires: 7
                                })
                            }else{
                                var same = false;
                                var cookieStr = $.cookie("goods");
                                var cookieArr = JSON.parse(cookieStr);
                                for(var i=0;i<cookieArr.length;i++){
                                    if(cookieArr[i].id == id){
                                        console.log(cookieArr)
                                        cookieArr[i].num++;
                                        same = true;
                                        break;
                                    }
                                }
                                if(!same){
                                    var obj = {id: id,num:1};
                                    cookieArr.push(obj);
                                }
                                $.cookie("goods",JSON.stringify(cookieArr),{
                                    expires: 7
                                })
                            }
                        }
                    }
                })
            },
            
            error: function (msg) {
              console.log(msg);
            }
          });
    }

    function valueId(search,name){
        var start = search.indexOf(name + "=");
        if(start == -1){
            return null;
        }else{
            var end = search.indexOf("&",start);
            if(end == -1){
                end = search.length;
            }
            var str = search.substring(start,end);
            var arr = str.split("=");
            return arr[1];
        }
    }

    return{
        goods,
        download
    }
});