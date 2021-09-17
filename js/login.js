// JavaScript Document
var btn = document.getElementById('Button_login')
		btn.onclick= function (){
			var username = document.getElementById("user_id").value;
			var password = document.getElementById("user_password").value;
			if (username.length == 0) 
				alert("请输入用户名");
			else if (password.length == 0) 
				alert("请输入密码");
			else
			{
				var xhr = new XMLHttpRequest();
				var identity = '';
				var choice = document.getElementsByName("RadioGroup");
				for(var i=0;i<choice.length;i++){
					if(choice[i].checked){
						identity =choice[i].value;
					}	
				}
				xhr.open('post','http://127.0.0.1:5000/login');
				//设置请求参数格式的类型（post请求必须设置）
				xhr.setRequestHeader('content-Type','application/json');
				xhr.send(JSON.stringify({username:username,password:password,identity:identity}));
				xhr.onload = function(){
					alert(xhr.response);
					if(xhr.responseText.length != 4){
						var index =  String(document.getElementById("user_id").value)
						for(var i = 0; i < choice.length;i++)
						{
							if(choice[i].checked)
							{
								if(i <= 1)
								 	var url = "S_personinfo.html?index=" + index;
								else	
									if (i == 2)
										var url = "L_main.html?index=" + index + "=" + '1';
									else if (i == 3)
										var url = "A_main.html?index=" + index + "=" + '2';
									else if (i == 4)
										var url = "A_main.html?index=" + index + "=" + '3';
									window.location.replace(url);
							}
						
						}
					}
				}
			}	
		}