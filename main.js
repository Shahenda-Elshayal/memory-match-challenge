// start the game
let control = document.querySelector(".control span");

control.addEventListener("click", () => {
    let name = prompt("What's your name?");

    if (name == null || name == "") {
        document.querySelector(".name span").innerHTML = `Unknown`;
    }
    else {
        document.querySelector(".name span").innerHTML = name;
    }
    control.parentElement.remove();
})

// *************************************************

let blocks = document.querySelectorAll(".container .game-block");
let parentDiv = document.querySelector(".container");
let duration = 1000;

let blockLength = blocks.length;

let newArr = Array(blockLength);

let orderRange = [...newArr.keys()];

// make the shuffle of element
function shuffle(arr) {
    let current = arr.length,
        temp,
        random;

    while (current > 0) {
        random = Math.floor(Math.random() * current);

        current--;

        temp = arr[current];

        arr[current] = arr[random];

        arr[random] = temp;
    }
    return arr;
}

// console.log(orderRange);
shuffle(orderRange);
console.log(orderRange);

// loop on block elements
blocks.forEach((e, i) => {
    e.style.order = orderRange[i];

    e.addEventListener("click", () => {

        flipBlock(e);


    })
})


// when clicking on the block element
function flipBlock(ele) {
    ele.classList.add("flipped");

    let allFlipped = [...blocks].filter(e =>
        e.classList.contains("flipped")
    )

    if (allFlipped.length === 2) {
        stopClicking();

        checkMatch(allFlipped[0], allFlipped[1]);
    }

}

function stopClicking() {
    parentDiv.classList.add("no-clicking")
    setTimeout(() => {
        parentDiv.classList.remove("no-clicking")
    }, duration)
}


function checkMatch(b1, b2) {
    let tries = document.querySelector(".tries span");
    if (b1.dataset.tech == b2.dataset.tech) {

        b1.classList.remove("flipped");
        b2.classList.remove("flipped");
        b1.classList.add("has-match");
        b2.classList.add("has-match");

        document.querySelector("#good").play();
    }
    else {
        tries.innerHTML = parseInt(tries.innerHTML) + 1;
        document.querySelector("#bad").play();
        setTimeout(() => {
            b1.classList.remove("flipped");
            b2.classList.remove("flipped");
        }, duration);
    }
    let allMatched = Array.from(blocks).every((e) => e.classList.contains("has-match"));


    if (allMatched) {
        document.querySelector("#win").play();
    }

}

