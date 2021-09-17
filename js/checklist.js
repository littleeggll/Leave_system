// JavaScript Document
var xhr = new XMLHttpRequest();
xhr.open('post','http://127.0.0.1:5000/checklist');
xhr.setRequestHeader('content-Type','application/json');
var id = window.location.href.split("=")[1];
var version = String(window.location.href.split("=")[2]);
xhr.send(JSON.stringify({id:id,version:version}));

xhr.onload = function(){
	var s = JSON.parse(xhr.responseText);
	console.log(s);
	for(i = 0;i < s.name.split(' ').length;i++ )
		{
		var iteams = {'name':s.name.split(' ')[i],'time':s.time.split(' ')[i]};
		//从数据库读取的数据
		var ul = document.querySelector('.tzgg_content'); 
		var str = '';
		str += "<li><a class = " + "\" \"" + " onclick=" + "\"" + "showdiv('tzgg_card2',this.innerHTML);hidediv('tzgg_card1');" + "\"" + "><span class='tzgg_title'>" + iteams['name'] + "的请假申请</span></a>"; // 拼接li标签部分和字符串内容
		str += "<span class='tzgg_time'>" + iteams['time'] + "</span></li>"; // 拼接li标签部分和字符串内容
		ul.innerHTML += str;
		}
}
