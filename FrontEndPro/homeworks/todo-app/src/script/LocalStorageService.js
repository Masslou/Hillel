class LocalStorageService {

    getState() {
        const data = localStorage.getItem('todo');
        return data ? JSON.parse(data) : [];
    }

    setState(data) {
        localStorage.setItem('todo', JSON.stringify(data));
    }
}


export default LocalStorageService;
