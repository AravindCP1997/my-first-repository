

<!DOCTYPE html>
<html>
<head>
	<title>Sample</title>
	<style>
* {
  box-sizing: border-box;
  font-family: Trebuchet MS;
}

#myInput {
  background-image: url('/css/searchicon.png');
  background-position: 10px 10px;
  background-repeat: no-repeat;
  width: 100%;
  font-size: 16px;
  padding: 12px 20px 12px 40px;
  border: 1px solid #ddd;
  margin-bottom: 12px;
}

#json {
  border-collapse: collapse;
  width: 100%;
  border: 1px solid #ddd;
  font-size: 14px;
  font-family:Trebuchet MS;
}

#json th, #json td {
  text-align: left;
  padding: 12px;
}

#json tr {
  border-bottom: 1px solid #ddd;
}

#json tr.header, #json tr:hover {
  background-color: #F0F8FF;
}
</style>
</head>
<body>
<h3 style="color:#000080">Sample</h2>   
 <input type="text" id="myInput" onkeyup="myFunction()" placeholder="Search ...">
	<table id="json" >
<thead style="color:#000080">
 <tr><th>Sl No</th><th>Name</th><th>Age</th></tr>
		 </thead> 
 <tbody id="jsonTable"> 
<tr><td>1</td><td>A</td><td>10</td></tr>
<tr><td>2</td><td>B</td><td>15</td></tr>
<tr><td>3</td><td>C</td><td>20</td></tr>


 </tbody> 

	</table>
<h3 style="color:#000080"> © 2025 | Aravind </h3>
	
	<script>
        function myFunction(){
            var input, filter, table, tr, td, i, txtvalue,dis;
            dis = "none";
            input = document.getElementById("myInput");
            filter = input.value.toUpperCase();
            table = document.getElementById("jsonTable");
            tr = table.getElementsByTagName("tr");
            for (k=0;k<tr.length;k++){
                td = tr[k].getElementsByTagName("td");
                for (m=0;m<td.length;m++){
                    tchild = td[m];
                    if(tchild){
                        txtvalue= tchild.textContent || tchild.innerText;
                        if (txtvalue.toUpperCase().indexOf(filter)>-1){
                            dis = "";
                        }
                    }
                }
                tr[k].style.display= dis;
                dis="none"
            }
        }
        
	</script>
</body>

</html>
