let btn = document.querySelector("button");
let ol = document.querySelector("ol");
let input = document.querySelector("input");

let count = 2;


input.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        btn.click();
    }
});

btn.addEventListener("click", function () {
    if (input.value.trim() != 0) {
        count++;

        let newLi = document.createElement('li');
        let newLabel = document.createElement("label");
        let newInput = document.createElement("input");
        let newButton = document.createElement("button");

        let outerTaskHolder = document.createElement("div");
        let innerTaskHolder = document.createElement("div");

        let outerDiv = document.querySelector("#outer-box");

        newLabel.setAttribute("for", `li${count}`);
        newLabel.innerText = `${input.value}`;

        newInput.setAttribute("type", `checkbox`);
        newInput.setAttribute("id", `li${count}`);
        newInput.setAttribute("class", `task-checkbox`);

        newButton.setAttribute("class", "dlt");
        newButton.innerText = "Delete";

        innerTaskHolder.setAttribute("class", "task-holder-inner");
        innerTaskHolder.appendChild(newLabel);
        innerTaskHolder.appendChild(newInput);

        outerTaskHolder.setAttribute("class", "task-holder-outer");
        outerTaskHolder.appendChild(innerTaskHolder);

        
        newLi.appendChild(outerTaskHolder);
        newLi.appendChild(newButton);
        newLi.setAttribute("type", "none");

        ol.appendChild(newLi);
        outerDiv.style.height = `${8 + document.querySelectorAll("li").length * 3.2}rem`;
        input.value = '';
    } else {
        alert("Do not add only spaces as task.");
    }
});


ol.addEventListener("click", function (event) {
    if(event.target.nodeName === "BUTTON") {
        let listItem = event.target.parentElement;
        listItem.remove();
        
        let outerDiv = document.querySelector("#outer-box");
        outerDiv.style.height = `${8 + document.querySelectorAll("li").length * 3.2}rem`;
    }
});
