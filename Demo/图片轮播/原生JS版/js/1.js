window.onload = function(){
    var show = document.getElementById('show');
    var show_width = show.offsetWidth;
    var img = document.getElementsByTagName('img');
    var v_length = img.length;
    var control = document.getElementsByClassName('control');
    var list = document.getElementById("list");
    var imgList = document.getElementsByClassName("imgs");
    var imgLists =[];
    var timer = null;
    var count;
    var time = null;
    var btn = document.getElementsByTagName("button");
    for(var i = 0;i<imgList.length;i++){
    	imgList[i].index = i;
    }

    for(var i = 0;i<btn.length;i++){
    	btn[i].index = i;
    	btn[i].onclick = function(){
            clearTimeout(time);
            clearInterval(timer);
            eval("showPics_"+this.index+"()");
       	}
    }
    function showPics_0(){
        var i = Math.round(Math.abs(list.offsetLeft)/show_width);
        if(imgList[0].index != 0){
            k = imgList[0].index;   
        }
        else{
            k = i;
        }
        var k ;
        var target =[];
        for(var m = 0;m<v_length;m++){target.push(-show_width*m);}
        timer = setInterval(showPics_00,30);
        function showPics_00(){
           	if(i == v_length){i = 0;}
            if(k == v_length){k = 0;}
            var ix = (target[i]-list.offsetLeft)/5;
            ix = ix>0?Math.ceil(ix):Math.floor(ix);
            list.style.left = list.offsetLeft + ix + "px";
            if(target[i] == list.offsetLeft){
             	clearInterval(timer);
                for(var j = 0;j<v_length;j++){
                 	control[j].className = "control";
                }
                control[k].className = "control current";
                time = setTimeout(function(){
                    timer = setInterval(showPics_00,30);  
                    clearTimeout(time);
                    },2500);
                i++;
                k++;
            }
       }
    }
    function showPics_1(){
    	if(list.offsetLeft%show_width!=0){
    		list.style.left = Math.floor(list.offsetLeft/show_width)*show_width+"px";
    	}
    	var page =Math.abs(list.offsetLeft)/show_width+1;
    	timer = setInterval(function(){
            if(page == v_length){
                list.style.left = 0+"px";
                page = 1;
            }else{
               list.style.left = list.offsetLeft - show_width +"px";
               page++;
            }
            for(var i = 0;i<v_length;i++){
             	control[i].className = "control";
            }
            control[page-1].className = "control current";
    	},2500);
    }
    function showPics_2(){
        timer = setInterval(showPics_02,30);
        
        function showPics_02(){
            var m = 0;
            var ix = (-960 - list.offsetLeft)/5;
            ix = ix>0?Math.ceil(ix):Math.floor(ix);
            list.style.left = list.offsetLeft+ix+"px";
            if(-960 == list.offsetLeft){
                clearInterval(timer);
                var ids = imgList[0].index;
                list.appendChild(list.firstChild);
                function pandun(obj){//判断是否执行完,因为重排需要时间
                    if(obj != imgList[0].index){
                        list.style.left = 0+"px";
                    }else{
                        list.appendChild(list.firstChild);
                        pandun(obj);
                    }
                }
                pandun(ids);
                for(var j = 0;j<v_length;j++){
                    control[j].className = "control";
                }
                var aa = imgList[0].index;
                control[imgList[0].index].className = "control current";
                time = setTimeout(function(){
                    timer = setInterval(showPics_02,30);
                    clearTimeout(time);
                },2500);                
            }
        }
    }
}