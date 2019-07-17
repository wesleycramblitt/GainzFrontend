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

    static sendPDFToEmailAndSubscribe(email,datauri) {
        var data = {};
        data.Email = email;
        data.Datauri = datauri;
        var settings = {};
        settings.body = JSON.stringify(data);
        settings.headers = {
            'Content-Type': 'application/json'
        }
        settings.method = "POST";
        settings.mode = "cors";
        return fetch(process.env.REACT_APP_API_SERVER + "Email", settings);
    }
}

export default Api;