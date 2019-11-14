class LocalStorageService {

    getState() {
        const data = localStorage.getItem('todo');
        return data ? JSON.parse(data) : [];
    }

    saveState() {
        localStorage.setItem('todo', JSON.stringify(this.lisOfTodos));
    }
}


export default LocalStorageService;
