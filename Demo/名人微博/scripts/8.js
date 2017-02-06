window.onload = function(){
   var ul_lists = document.getElementsByClassName('lists')[0];
   var oli = ul_lists.getElementsByTagName('li');
   var oimgs = ul_lists.getElementsByTagName('img');
   var inputs_Name = document.getElementById('userName');
   var inputs_contain = document.getElementById("contain");
   var maxNum = document.getElementsByClassName("maxNum")[0];
   var line3 = document.getElementsByClassName("line3")[0];
   var line3_span = line3.getElementsByTagName('span');
   var sayss = document.getElementsByClassName('sayss')[0];
   var btn = document.getElementById('sendbtn');
   var len1 = oli.length;
   var imgSrc ;
   var arr_Name = [
   "千古一帝毛润之",
   "我为我蛤续一秒",
   "宅心仁厚周伍豪",
   "日记强国蒋中正",
   "天下虽厚薄熙来",
   "爱民如子邓希贤",
   "千秋万代习大犬",
   "清廉如水好总理"
   ]

   var arr_yulu = [
    "宜将剩勇追穷寇，不可沽名学霸王",
    "苟利国家生死以，岂因祸福避趋之",
    "周公吐哺，天下归心",
    "地图开疆，日记强国",
    "我对着我爸就是一个飞踹",
    "大概你们闹得过坦克车？",
    "谁反对我连任，我就砸烂谁的狗头！",
    "一双破鞋穿十年"
   ]
   for(var i = 0;i<len1;i++){
   	oli[i].index = i;
   	oli[i].onclick = function(){
   		for(var i = 0;i<len1;i++){
   			oli[i].className ="";
   		}
        oli[this.index].className = "selectPics";
   		imgSrc = oimgs[this.index].getAttribute("src");
   		inputs_Name.value = arr_Name[this.index];
        inputs_contain.value = arr_yulu[this.index];
        testzishu();
   	}
   }
   inputs_contain.onkeyup = function(){
   	    testzishu();
   }


   function testzishu(){
   	var jmz = {};
   	jmz.GetLength = function(str){
   		return str.replace(/[\u0391-\uFFE5]/g,"aa").length;
   	}
   	maxNum.innerText= Math.round(140 - jmz.GetLength(inputs_contain.value)/2);
   	if(maxNum.innerText < 0){
         line3_span[0].innerText = "已超出";
         maxNum.innerText = -maxNum.innerText;
         maxNum.style.color = "red";
   	}else{
   		line3_span[0].innerText = "还能输入";
   		maxNum.style.color = "grey";
   	}
   }

   btn.onclick = function(){
    var myRegExp = /^\w{2,8}$|[\u0391-\uFFE5]/;
    var times = new Date();
    if(!inputs_Name.value){
    	alert("请输入姓名！");
    	return false;
    }
    if(!myRegExp.test(inputs_Name.value)){
       alert("请输入2-8位由字符，数字，下划线，汉字组成");
       return false;
    }
    // new Date()
    if(line3_span[0].innerText == '已超出'){alert("内容已超出限制，请检查后重新输入");return false;}
    if(inputs_contain.value){
        var olis = document.createElement("li");
        var str1 = "<img src ="+imgSrc+"><div class = 'contains'><div class = 'userNames'><a href = ''>"+inputs_Name.value+"</a></div><div class = 'words'>"+inputs_contain.value+"</div><div class = 'times'><span>"+(times.getMonth()+1)+"月"+times.getDate()+"日"+times.getHours()+":"+times.getMinutes()+"</span></div></div>";

        olis.innerHTML = str1;
        sayss.insertBefore(olis,sayss.firstChild);
    }else{
    	alert("说点什么吧");
    	return false;
    }
   }
}





