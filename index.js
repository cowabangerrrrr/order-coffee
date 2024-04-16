function addEventCloseButton(node) {
    node.querySelector('.close-button').addEventListener('click', (event) => {
        const parent = event.target.parentNode;
        if (parent.parentNode.querySelectorAll('.beverage').length !== 1) {
            parent.remove();
        }
    })
}

dict = {'обычном молоке': 'обычное', 'обезжиренном молоке': 'обезжиренное',
    'соевом молоке' : 'соевоe', 'кокосовом молоке' : 'кокосовое',
    'взбитых сливок': 'взбитые сливки', 'зефирок': 'зефирки',
    'шоколад' : 'шоколад', 'корицу' : 'корица'}
addEventCloseButton(document);

const addButton = document.querySelector('.add-button')
let number = 1;
addButton.addEventListener('click', () => {
    const fieldsets = document.querySelectorAll('.beverage');
    const fieldset = fieldsets[fieldsets.length - 1];
    const newNode = fieldsets[0].cloneNode(true);

    newNode.querySelector('.beverage-count').textContent = `Напиток №${++number}`;
    const radios = newNode.querySelectorAll("input[type='radio']");
    for(radio of radios){
        radio.name = `milk${number}`;
    }
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
    addTable();
})

const closeNodeButton = document.querySelector('.close-modal');
closeNodeButton.addEventListener('click', () => {
    let overlay = document.querySelector('.overlay');
    overlay.style.visibility = 'hidden';
})

function addTable(){
    const closeNodeButton = document.querySelector('.body-table');
    closeNodeButton.innerHTML ="";
    const listFieldSets = document.querySelectorAll('.beverage')
    for (var fieldSet of listFieldSets){
        const selectElement = fieldSet.querySelector("select");
        const nameCoffe = selectElement.options[selectElement.selectedIndex].textContent;
        let typeMilk = undefined;

        var radioInputs = fieldSet.querySelectorAll("input[type='radio']");

        for (var i = 0; i < radioInputs.length; i++) {
            if (radioInputs[i].checked) {
                typeMilk = dict[radioInputs[i].parentNode.querySelector("span").textContent];
            }
        }


        var checkboxInputs = fieldSet.querySelectorAll("input[type='checkbox']");
        var selectedValues = [];
        for (var i = 0; i < checkboxInputs.length; i++) {
            if (checkboxInputs[i].checked) {
                var selectedValue = dict[checkboxInputs[i].parentNode.querySelector("span").textContent];
                selectedValues.push(selectedValue);
            }
        }


        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        td1.textContent = nameCoffe;

        let td2 = document.createElement("td");
        td2.textContent = typeMilk;

        let td3 = document.createElement("td");
        td3.textContent = selectedValues.join(", ");

        tr.append(td1);
        tr.append(td2);
        tr.append(td3);
        closeNodeButton.append(tr);
    }

}



