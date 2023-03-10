const itemsContainer = document.querySelectorAll('.items-container') as NodeListOf<HTMLDivElement>

let actualContainer : HTMLDivElement,
actualBtn : HTMLButtonElement,
actualUl : HTMLUListElement,
actualForm : HTMLFormElement,
actualTextInput : HTMLInputElement,
actualValidation : HTMLSpanElement;



function addContainerListeners(currentContainer : HTMLDivElement){                          // Fonction parent qui va permettre de mettre les event listener sur nos elements

    const currentContainerDeletionBtn = currentContainer.querySelector('.delete-container-btn') as HTMLButtonElement; // Recherche des croix pour permettre la suppresion des containers
    const currentAddItemBtn = currentContainer.querySelector('.add-item-btn') as HTMLButtonElement;
    const currentCloseFormBtn = currentContainer.querySelector('.close-form-btn') as HTMLButtonElement;
    const currentForm = currentContainer.querySelector('form') as HTMLFormElement;

    deleteBtnListeners(currentContainerDeletionBtn)                                 // On ajoute l'event listeners sur les btns de suppression 
    addItemListeners(currentAddItemBtn)
    closingFormBtnListeners(currentCloseFormBtn);
    addFormSubmitListeners(currentForm);
}





itemsContainer.forEach((container : HTMLDivElement) => {
    addContainerListeners(container);
})




function deleteBtnListeners( btn: HTMLButtonElement){ // Cette fonction permet de rajouter l'event listener sur les buttons de suppresions
    btn.addEventListener('click', handleContainerDeletion)
}

function addItemListeners(btn : HTMLButtonElement){
    btn.addEventListener('click', handleAddItem)
}
function closingFormBtnListeners (btn : HTMLButtonElement){
    btn.addEventListener('click', () => toggleForm(actualBtn, actualForm, false))
}
function addFormSubmitListeners(form : HTMLFormElement){
    form.addEventListener('submit', createNewItem)
}





function handleAddItem(e : MouseEvent){
    const btn = e.target as HTMLButtonElement;
    if (actualContainer) toggleForm(actualBtn, actualForm, false);
    setContainerItems(btn);
    toggleForm(actualBtn, actualForm, true)
}

function toggleForm(btn : HTMLButtonElement,form : HTMLFormElement, action : Boolean){
    if(!action){
        form.style.display = "none";
        btn.style.display = "block";
    } else if( action){
        form.style.display = "block";
        btn.style.display = "none";
    }
}

function setContainerItems(btn : HTMLButtonElement){
    actualBtn = btn;
    actualContainer = btn.parentElement as HTMLDivElement;
    actualUl = actualContainer.querySelector('ul') as HTMLUListElement;
    actualForm = actualContainer.querySelector('form') as HTMLFormElement;
    actualTextInput = actualContainer.querySelector('input') as HTMLInputElement;
    actualValidation = actualContainer.querySelector('span') as HTMLSpanElement;

}


function handleContainerDeletion(e : MouseEvent){
    const btn = e.target as HTMLButtonElement;
    
    const btnsArray = [...document.querySelectorAll('.delete-container-btn')] as HTMLButtonElement[];       // on récupere tous les buttons de suppresion 
    const containers = [...document.querySelectorAll('.items-container')] as HTMLButtonElement[];           // on récupére tous les containers

    containers[btnsArray.indexOf(btn)].remove();        // On supprime 
}

function createNewItem(e : Event){
    e.preventDefault()

    // validation 
    if(actualTextInput.value.length === 0){
        actualValidation.textContent = "Must be at least 1 character long"
        return;
    } else{
        actualValidation.textContent = ""
    }

    //Creation

    const itemContent = actualTextInput.value;
    const li = `
    <li class="item" draggable="true">
    <p>${itemContent}</p>
    <button> X </button>
    </li>
    `
    actualUl.insertAdjacentHTML('beforeend', li);
    const item = actualUl.lastElementChild as HTMLLIElement;
    const liBtn = item.querySelector('button') as HTMLButtonElement;

    handleItemDeletion(liBtn)
    actualTextInput.value = "";
}

function handleItemDeletion( btn : HTMLButtonElement){
    btn.addEventListener('click', () => {
        const elToRemove = btn.parentElement as HTMLLIElement;
        elToRemove.remove();
    })
}

//Add new container

const addContainerBtn = document.querySelector('.add-container-btn') as HTMLButtonElement;
const addContainerForm = document.querySelector('.add-new-container form') as HTMLFormElement;
const addContainerFormInput = document.querySelector('.add-new-container input') as HTMLInputElement;
const validationNewContainer = document.querySelector('.add-new-container .validation-msg') as HTMLSpanElement;
const addContainerClose = document.querySelector('.close-add-list') as HTMLButtonElement;
const containerList = document.querySelector('.main-content');

addContainerBtn.addEventListener('click', () => {
    toggleForm(addContainerBtn, addContainerForm, true);
})

addContainerClose.addEventListener('click', () => {
    toggleForm(addContainerBtn, addContainerForm, false);
})

addContainerForm.addEventListener('submit', createNewContainer);

function createNewContainer(e : Event){
    e.preventDefault()

    // validation 
    if(addContainerFormInput.value.length === 0){
        validationNewContainer.textContent = "Must be at least 1 character long"
        return;
    } else{
        validationNewContainer.textContent = ""
    }

    const itemsContainer = document.querySelector('.items-container') as HTMLDivElement;

    const newContainer = itemsContainer.cloneNode() as HTMLDivElement;
    const newContainerContent = `
    <div class="items-container" draggable="true">
        <div class="top-container">
            <h1>${addContainerFormInput.value}</h1>
            <button class="delete-container-btn">X</button>
        </div>
        <ul></ul>
        <button class="add-item-btn">Add an item</button>
        <form autocomplete="off">
            <div class="top-form-container">
                <label for="item"> Add a new item</label>
                <button type="button" class="close-form-btn">X</button>
            </div>
            <input type="text" id="item">
            <span class="validation-msg"></span>
            <button type="submit">Submit</button>
        </form>
    </div>`

    newContainer.innerHTML = newContainerContent;
    containerList?.insertBefore(newContainer , addNew)
}

