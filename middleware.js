const shortid = require('shortid');


const middleware = (app, codici) =>{
    const generateCod = () => shortid.generate();

    app.post("/cache/register", (request, response)=>{
        const {email} = request.body;
        if(email && email !== ""){
            const utente = codici.findIndex(element => element.email === email);
            const codice = generateCod();
            codici[utente !== -1 ? utente : codici.length - 1].codice = codice;
            response.json({response: "Ok", codice: codice})
        }else{
            response.json({response: "Ko", dettaglio: "Email non settata"})
        }
    })

    app.post("/cache/set", (request, response)=>{
        const {codice} = request.headers;
        const {key, value} = request.body;
        if(codice && codice !== ""){
            const utente = codici.findIndex(element => element.codice === codice);
            if(utente !== -1){
                codici[utente]['cache']['key'] = value;
                response.json({response: "Ok"});
            }else{
                response.json({response: "Ko", dettaglio: "Utente non esistente"})
            }
        }else{
            response.json({response: "Ko", dettaglio: "Codice non valido, verifica di averlo inserito nell'headers dell'HTTP_REQUEST"})
        }
    })

    app.post("/cache/get", (request, response)=>{
        const {codice} = request.headers;
        const {key} = request.body;
        if(codice && codice !== ""){
            const utente = codici.findIndex(element => element.codice === codice);
            if(utente !== -1){
                const value = codici[utente]['cache']['key'];
                response.json({response: "Ok", value});
            }else{
                response.json({response: "Ko", dettaglio: "Utente non esistente"})
            }
        }else{
            response.json({response: "Ko", dettaglio: "Codice non valido, verifica di averlo inserito nell'headers dell'HTTP_REQUEST"})
        }
    })
}

module.exports = middleware;