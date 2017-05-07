xmlh = new XMLHttpRequest();
function getUsers(){
    xmlh.open('GET','http://localhost:8084/all');
    xmlh.send(null);
    xmlh.onreadystatechange= function(event){
        if(this.readyState === 4){
            users = JSON.parse(this.responseText);
            //console.dir(users);
            userstbl = document.getElementById('users').getElementsByTagName('tbody')[0];
            users.forEach(function(u) {
                userstbl.innerHTML += 
            '<tr><td>' + u._id + '</td><td>' + u.nom + '</td><td>' + u.prenom + '</td><td>'+
             '<a class="btn btn-danger" onclick="remove(' + u._id + ')">Delete</a></td></tr>';
            }, this);
        }
    }
}

function remove(id){
    console.log(id);
}

frmAdd = document.getElementById('addForm');
frmAdd.addEventListener('submit',function(e){
    e.preventDefault();
    data = new FormData(frmAdd);
    xmlh.open('POST','http://localhost:8084/insert',true);
    data2={};
    input = this.getElementsByTagName('input');
    for(i=0;i<input.length;i++){
        data2[input[i]['name']]=input[i]['value'];
    }
    xmlh.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlh.send(JSON.stringify(data2));
})
getUsers();

