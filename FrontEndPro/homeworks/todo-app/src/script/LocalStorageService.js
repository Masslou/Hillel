class LocalStorageService {

    setState(name, data) {
        localStorage.setItem(name, JSON.stringify(data))
    }

    getState(name) {
        console.log(name);
        const data = localStorage.getItem(name);
        return JSON.parse(data) || [];
    }
}


export default LocalStorageService;
