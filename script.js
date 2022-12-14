const draggable_list = document.getElementById('draggable-list');
const check = document.getElementById('check');

const richestPeople=[
    'Jeff Bezos',
    'Bill Gates',
    'Warren Buffet',
    'Bernard Arnault',
    'Carlos Slim Helu',
    'Amancio Ortega',
    'Larry Ellison',
    'Mark Zuckerberg',
    'Michael Bloomberg',
    'Larry Page'
];

// Store list items
const listItems = [];

let dragStartIndex;

createList();

// Insert list items into DOM
function createList(){
    [...richestPeople]
    .map(a => ({ value: a, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(a => a.value)
    .forEach((person, index) =>{
        const listItem = document.createElement('li');
        listItem.setAttribute('data-index', index);
        listItem.innerHTML = `
            <span class="number">${index + 1}</span>
            <div class="draggable" draggable="true">
                <p class="person-name">${person}</p>
                <i class="fas fa-grip-lines"></i>
            </div>
        `;

        listItems.push(listItem);
        draggable_list.appendChild(listItem);
    });

    addEventListeners();
}

function dragStart(){
    //console.log('Event: ', 'dragstart');
    dragStartIndex = +this.closest('li').getAttribute('data-index');
}

function dragEnter(){
    //console.log('Event: ', 'dragenter');
    this.classList.add('over');
}

function dragLeave(){
    //console.log('Event: ', 'dragleave');
    this.classList.remove('over');
}

function dragOver(e){
    //console.log('Event: ', 'dragover');
    e.preventDefault();
}

function dragDrop(){
    //console.log('Event: ', 'drop');
    const dragEndIndex = +this.getAttribute('data-index');
    swapItems(dragStartIndex, dragEndIndex);
    this.classList.remove('over');
}

function swapItems(fromIndex, toIndex){
    const item1 = listItems[fromIndex].querySelector('.draggable');
    const item2 = listItems[toIndex].querySelector('.draggable');

    listItems[fromIndex].appendChild(item2);
    listItems[toIndex].appendChild(item1);
}

function checkOrder(){
    listItems.forEach((listItem, index) => {
        const personName = listItem.querySelector('.draggable').innerText.trim();

        if(personName !== richestPeople[index]){
            listItem.classList.add('wrong');
        } else {
            listItem.classList.remove('wrong');
            listItem.classList.add('right');
        }
    });

    checkGame();
}

function checkGame(){
    let totalCorrect = 0;

    listItems.forEach((listItem, index) => {
        const itemCheck = listItem.getAttribute('class');

        if(itemCheck == 'right'){
            totalCorrect++;
        }
    });

    if(totalCorrect == 10){
        console.log("Game Over!");
        check.innerText = 'Winner!';

        document.getElementById('my-canvas').style.zIndex = '10';
        var confettiSettings = { target: 'my-canvas' };
        var confetti = new ConfettiGenerator(confettiSettings);
        confetti.render();
    }
}

function addEventListeners(){
    // individual items
    const draggables = document.querySelectorAll('.draggable');
    // each li item in the ul
    const dragListItems = document.querySelectorAll('.draggable-list li');

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', dragStart);
    })

    dragListItems.forEach(item => {
        item.addEventListener('dragover', dragOver);
        item.addEventListener('drop', dragDrop);
        item.addEventListener('dragenter', dragEnter);
        item.addEventListener('dragleave', dragLeave);
    })
}

check.addEventListener('click', checkOrder);

