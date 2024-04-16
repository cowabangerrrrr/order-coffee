function addEventCloseButton(node) {
    node.querySelector('.close-button').addEventListener('click', (event) => {
        const parent = event.target.parentNode;
        if (parent.parentNode.querySelectorAll('.beverage').length !== 1) {
            parent.remove();
        }
    })
}

addEventCloseButton(document);

const addButton = document.querySelector('.add-button')
let number = 1;
addButton.addEventListener('click', () => {
    const fieldsets = document.querySelectorAll('.beverage');
    const fieldset = fieldsets[fieldsets.length - 1];
    const newNode = fieldsets[0].cloneNode(true);

    newNode.querySelector('.beverage-count').textContent = `Напиток №${++number}`;
    addEventCloseButton(newNode);
    fieldset.after(newNode);
})

const submitButton = document.querySelector('.submit-button');

submitButton.addEventListener('click', (event) => {
    event.preventDefault();

    const overlay = document.querySelector('.overlay');
    overlay.style.visibility = 'visible';

    const modalBlock = document.querySelector('.status-order');
    const num = document.querySelectorAll('fieldset').length;
    const mod = num % 10;
    modalBlock.textContent = `Заказ принят! Вы заказали ${num} ${num !== 11 && mod === 1 ?
        'напиток'
        : (num > 20 && (mod === 2 || mod === 3 || mod === 4)) || (num >= 2 && num <= 4) ?
            'напитка'
            : 'напитков'}`;
})

const closeNodeButton = document.querySelector('.close-modal');
closeNodeButton.addEventListener('click', () => {
    let overlay = document.querySelector('.overlay');
    overlay.style.visibility = 'hidden';
})