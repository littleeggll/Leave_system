// JavaScript Document
var btn = document.getElementById('submit')
		btn.onclick= function (){
			var nowtime=new Date();
			var year=nowtime.getFullYear();
			var month=nowtime.getMonth()+1;
			var date=nowtime.getDate();
			var time = year+"年"+month+"月"+date+" "+nowtime.toLocaleTimeString();
			var name =document.getElementById("name").value;
			var Stuno =document.getElementById("stuno").value;
			var s1 =document.getElementById("select1");
			var type1 = s1.options[s1.selectedIndex].text;
			var s2 =document.getElementById("select2");
			var type2 = s2.options[s2.selectedIndex].text;
			var phone = document.getElementById("phone").value;
			var begintime = document.getElementById("datetime1").value;
			var endtime = document.getElementById("datetime2").value;
			var reason = document.getElementById("detail").value;
			if(name.length == 0)
				alert("请输入姓名");
			else if(Stuno.length == 0)
				alert("请输入学号");
			else if (begintime.length == 0) 
				alert("请输入完整的起始日期");
			else if(endtime.length == 0)
				alert("请输入完整的结束日期");
			else if(phone.length == 0)
				alert("请输入完整的联系电话");
			else if(reason.length == 0)
				alert("请输入完整的请假原因");
			else
			{
				var xhr = new XMLHttpRequest();
				xhr.open('post','http://127.0.0.1:5000/leave');
				//设置请求参数格式的类型（post请求必须设置）
				xhr.setRequestHeader('content-Type','application/json');			xhr.send(JSON.stringify({name:name,Stuno:Stuno,phone:phone,reason:reason,begintime:begintime,endtime:endtime,submittime:time,type1:type1,type2:type2}));
				xhr.onload = function(){
					alert(xhr.responseText);
				}
			}	
		}