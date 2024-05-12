var Name = document.getElementById("Name");
var url = document.getElementById("url");
var rows = document.getElementById("rows");
var mainBtn = document.getElementById("mainBtn");

var sites;

check();

function addItem() {
    if (nameregex() && urlregex() ) {
        var sitetobject = {
            sName: Name.value,
            sUrl: url.value,
        };
        sites.push(sitetobject);
        display(sites);
        localStorage.setItem("datau", JSON.stringify(sites));
        clear()
    }
}

function check() {
    if (localStorage.getItem("datau") == null) sites = [];
    else {
        sites = JSON.parse(localStorage.getItem("datau"));
        display(sites);
    }
}

function display(arr) {
    var box = "";
    for (i = 0; i <arr.length; i++) {
        box += `
        <tr>
            <td>${arr[i].sName}</td>
            <td>${arr[i].sUrl}</td>
            <td class="d-flex justify-content-center gap-2" ><button class="btn" onclick="visit(${i})"><i class="fa-solid fa-eye "></i></button>
            <button class="btn " onclick="Del(${i})"><i class="fa-solid fa-trash text-danger"></i></button>
            <button class="btn " onclick="Update(${i})"><i class="fa-solid fa-pen text-warning"></i></button>
            </td>
        </tr>
        `;
        
    }
    rows.innerHTML = box;
}

function Del(index) {
    sites.splice(index, 1);
    display(sites);
    localStorage.setItem("datau", JSON.stringify(sites));
}

var gIndex;

function Update(index) {
    gIndex = index;
    Name.value = sites[index].sName;
    url.value = sites[index].sUrl;
    
    mainBtn.innerHTML = "Update";
}

function edit() {
    if (nameregex() && urlregex() ) {
        sites[gIndex].sName = Name.value;
        sites[gIndex].sUrl = url.value;
        display(sites);
        localStorage.setItem('datau', JSON.stringify(sites))
        mainBtn.innerHTML = 'Add'
        clear()
    }
}

function clear() {
    Name.value = "";
    url.value = "";
}
mainBtn.onclick = () => {
    if (mainBtn.innerHTML == "Add") addItem();
    else edit();
};

function search(ele) {
    var searchedarr = [];
    for (i = 0; i < sites.length; i++){
        if (sites[i].sName.toLowerCase().includes(ele.value.toLowerCase())) {
            searchedarr.push(sites[i])
        }
    }
    display(searchedarr)
}


function nameregex() {
    var regex = /^[a-zA-Z]{1,20}$/
    if (regex.test(Name.value)) {
        return true;
    } else {
        alert("false pattern");
        return false;
    }
}
function urlregex() {
    var regex = /^[a-z]{3,20}\.(com)$/
    if (regex.test(url.value)) {
        return true;
    } else {
        alert("false pattern");
        return false;
    }
}

function visit(index) {
    var url = sites[index].sUrl;
    console.log(index)
    console.log(url);
    window.open(`http://${url}`);
}