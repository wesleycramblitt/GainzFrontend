class Api {
    static getWorkoutRoutine(data) {
        var settings = {};
        settings.body = JSON.stringify(data);
        settings.headers = {
            'Content-Type': 'application/json',
        }
        settings.method = "POST";
        settings.mode = "cors";
        return fetch(process.env.REACT_APP_API_SERVER + "Generator", settings);
    }
}

export default Api;