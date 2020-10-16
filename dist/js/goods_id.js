define(["parabola", "jquery", "jquery-cookie"], function (parabola, $) {
    function download(){
        var id = valueId(location.search,"id");
        alert(id);
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
        download
      }
});