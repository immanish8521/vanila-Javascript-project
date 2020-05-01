//selectors
const nishinput = document.querySelector('.nish-input');
const nishButton = document.querySelector('.nish-button');
const nishlist = document.querySelector('.nish-list');
const filterOption = document.querySelector('.filter-nish');

//Event Listeners
document.addEventListener('DOMContentLoaded', getNishs)
nishButton.addEventListener('click', addNish);
nishlist.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterNish);
//Functions

function addNish(event) {
    //prevent form submitting
    event.preventDefault();

    //Nish Div
    const nishDiv = document.createElement("div");
    nishDiv.classList.add("nish");

    //Create li

    const newNish = document.createElement('li');
    newNish.innerText = nishinput.value;
    newNish.classList.add('nish-item');
    nishDiv.appendChild(newNish);

    //ADD TO LOCALSTORAGE
    saveLocalNishs(nishinput.value);

    //check mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class= "fa fa-check"></i>';
    completedButton.classList.add("complete-btn");
    nishDiv.appendChild(completedButton);
    //Trass button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class= "fa fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    nishDiv.appendChild(trashButton);

    //Append list

    nishlist.appendChild(nishDiv);

    nishinput.value = "";
}

function deleteCheck(e) {
    const item = e.target;
    //delete nish
    if (item.classList[0] === "trash-btn") {
        const nish = item.parentElement;
        //Animation
        nish.classList.add("fall");
        removeLocalNishs(nish);
        nish.addEventListener('transitionend', function () {
            nish.remove();
        })
    
    }


    //check mark
    if (item.classList[0] === "complete-btn") {
        const nish = item.parentElement;
        nish.classList.toggle('completed');
    }
}

function filterNish(e) {
    const nish = nishlist.childNodes;
    nish.forEach(function (nish) {
        switch (e.target.value) {
            case "all":
                nish.style.display = 'flex';
                break;
            case "completed":
                if (nish.classList.contains('completed')) {
                    nish.style.display = "flex";
                } else {
                    nish.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!nish.classList.contains("completed")) {
                    nish.style.display = "flex";
                } else {
                    nish.style.display = "none";
                }
                break;
        }
    });
}


function saveLocalNishs(nish) {
    let nishs;
    if (localStorage.getItem('nishs') === null) {
        nishs = [];
    } else {
        nishs = JSON.parse(localStorage.getItem("nishs"));
    }
    nishs.push(nish);
    localStorage.setItem("nishs", JSON.stringify(nishs));
}

function getNishs() {
    let nishs;
    if (localStorage.getItem('nishs') === null) {
        nishs = [];
    } else {
        nishs = JSON.parse(localStorage.getItem("nishs"));
    }
    nishs.forEach(function (nish) {
        const nishDiv = document.createElement("div");
        nishDiv.classList.add("nish");

        //Create li

        const newNish = document.createElement('li');
        newNish.innerText = nish;
        newNish.classList.add('nish-item');
        nishDiv.appendChild(newNish);


        //check mark button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class= "fa fa-check"></i>';
        completedButton.classList.add("complete-btn");
        nishDiv.appendChild(completedButton);
        //Trass button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class= "fa fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        nishDiv.appendChild(trashButton);

        //Append list

        nishlist.appendChild(nishDiv);
    })
}

function removeLocalNishs(nish) {
    let nishs;
    if (localStorage.getItem('nishs') === null) {
        nishs = [];
    } else {
        nishs = JSON.parse(localStorage.getItem("nishs"));
    }
    const nishIndex = nish.children[0].innerText;
    nishs.splice(nishs.indexOf(nishIndex), 1);
    localStorage.setItem("nishs", JSON.stringify(nishs));
}