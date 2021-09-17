// JavaScript Document
var infor = document.getElementsByClassName("infor");
var id = window.location.href.split("=")[1];
var xhr = new XMLHttpRequest();
xhr.open('post', 'http://127.0.0.1:5000/information');
xhr.setRequestHeader('content-Type', 'application/json');
xhr.send(JSON.stringify({
  id: id
}));
xhr.onload = function () {
  var s = JSON.parse(xhr.responseText);
  console.log(s);
  var id = s.stuID;
  var department = s.department;
  var major = s.major;
  var times = s.times;
  var tel = s.stuTel;
  var classes = s.classID;
  var names = s.name;
  var name = document.getElementById("name");
  name.innerHTML = names
  infor[0].innerHTML += id
  infor[1].innerHTML += department
  infor[2].innerHTML += major
  infor[3].innerHTML += classes
  infor[4].innerHTML += tel
  infor[5].innerHTML += times


}
