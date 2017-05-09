xmlh = new XMLHttpRequest();
function getUsers(){
    xmlh.open('GET','http://localhost:8084/all');
    xmlh.send(null);
    xmlh.onreadystatechange= function(event){
        if(this.readyState === 4){
            users = JSON.parse(this.responseText);
            //console.dir(users);
            if(users.length !== 0){
                userstbl = document.getElementById('users').getElementsByTagName('tbody')[0];
                            userstbl.innerHTML = '';
                            document.getElementById('count').innerHTML=users.length;
                            users.forEach(function(u) {
                                tr=document.createElement('tr');
                                tdNom = document.createElement('td');
                                tdPreom = document.createElement('td');
                                tdId = document.createElement('td');
                                tdOption = document.createElement('td');
                                tdNom.innerHTML = u.nom;
                                tdPreom.innerHTML=u.prenom;
                                tdId.innerHTML = u._id;
                                a = document.createElement('a');
                                a.text = "Supprimer";
                                a.setAttribute('class','btn btn-danger');
                                a.addEventListener('click',function(){
                                    remove(u._id)
                                });
                                
                                tr.appendChild(tdId)
                                tr.appendChild(tdNom)
                                tr.appendChild(tdPreom)
                                tdOption.appendChild(a);
                                tr.appendChild(tdOption)
                                userstbl.append(tr)
                            }, this);
                        }
            }
            
    }
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
    $('#addModal').modal('hide');
    //getUsers();
})

function remove(id){
    console.log(id);
    xmlh.open('GET','http://localhost:8084/delete/'+id);
    xmlh.send(null);
    setTimeout(getUsers(),100);
}
setTimeout(getUsers(),3000);



