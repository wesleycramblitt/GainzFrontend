self.addEventListener('message', (event) => console.log(event))

    // self.addEventListener('message', function (e) { // eslint-disable-line no-restricted-globals
    //     console.log("worker");
    //     switch (e.data[0]) {
    //         case "getAndSendRoutine":
    //             var routineData = e.data[1];
    //             var email = e.data[2];
    //             this.postMessage({progress:10});
    //             // var pdfDataURI = PDFCreator.getRoutinePDF(routineData, this);
    //             // Api.sendPDFToEmailAndSubscribe(email, pdfDataURI)
    //             // .then(
    //             //     (result) => {
    //             //         this.postMessage({progress:100});
    //             //     });
    //             break;
    //     }
    // });   

