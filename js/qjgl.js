var detail_div = 1;
function add_div() {
        var e = document.getElementById("box");
        var div = document.createElement("tbody");
        div.id = "box" + detail_div;
        div.innerHTML = e.innerHTML;
        document.getElementById("table").appendChild(div);
        detail_div++;
		changebgc();
    }
function del_div() {
	        var id = "box" + (detail_div - 1).toString();
	        var e = document.getElementById(id);
	        document.getElementById("table").removeChild(e);
	        detail_div--;
			changebgc();
	    }
function changebgc(){
	
		if(document.getElementsByTagName){  
			var table = document.getElementById("table");  
			var rows = table.getElementsByTagName("tr"); 
			 
			for(i = 1; i < rows.length; i++){          
				if(i % 2 == 0){
					rows[i].className = "evenrowcolor";
				}else{
					rows[i].className = "oddrowcolor";
				}      
			}
		}
}
var timer=function(num){
	for(var j=0;j<num;j++){
		add_div();
	}
}