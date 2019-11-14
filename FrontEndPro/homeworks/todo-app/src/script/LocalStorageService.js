class LocalStorageService {

    static itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];

    localStorage.setItem('items', JSON.stringify(itemsArray))
    static data = JSON.parse(localStorage.getItem('items'));


    form.addEventListener('submit', function(e) {
        e.preventDefault();

        itemsArray.push(input.value);
        localStorage.setItem('items', JSON.stringify(itemsArray));
        liMaker(input.value);
        input.value = '';
    })

    data.forEach(item => {
    liMaker(item)
})

button.addEventListener('click', function() {
    localStorage.clear()
    while (ul.firstChild) {
        ul.removeChild(ul.firstChild)
    }
})
}

export default LocalStorageService;
