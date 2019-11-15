class LocalStorageService {

    getState() {
        const data = localStorage.getItem('todo');
        return data ? JSON.parse(data) : [];
    }

    saveState(...elements) {
        localStorage.setItem('todo', JSON.stringify(elements));
    }
}


export default LocalStorageService;
