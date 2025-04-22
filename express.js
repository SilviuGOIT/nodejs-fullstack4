const express = require("express");
const app = express();

app.use(express.json());

const agenda = [
  {
    nume: "Paul",
    adresa: "Str Stirbei Voda 16",
    tel: "0732 022 113",
  },
  {
    nume: "Ion",
    adresa: "Str Mihail Sebastian 33",
    tel: "0711 422 413",
  },
  {
    nume: "Mihai",
    adresa: "Str Stefan cel Mare 88",
    tel: "0788 088 993",
  },
  {
    nume: "Alex",
    adresa: "Str Calea Lui Traian 44",
    tel: "0711 324 999",
  },
  {
    nume: "Silviu",
    adresa: "Str Narciselor 113",
    tel: "0788 911 000",
  },
];

// o ruta '/info' care o sa ne afiseze toate persoanele din agenda
app.get("/info", (request, response) => {
  console.log("Aceasta este ruta de info");
  response.json(agenda);
});

// o ruta '/info/:nume' care sa ne afiseze toate detaliile unei persoane
app.get("/info/:nume", (request, response) => {
  // console.log(request);
  const nume = request.params.nume;

  const contact = agenda.find((element) => element.nume === nume); // -> o sa extragem informatiile din Baza de Date si o sa le stocam intr-o variabila -> functie

  if (contact) {
    response.json(contact);
  } else {
    response.json({ message: `${nume} Nu exista in Lista de Contacte` });
  }
});

// o ruta 'info/:nume' care sa ne stearga un anumit nume din agenda
app.delete("/info/:nume", (req, res) => {
  const nume = req.params.nume;
  const contact = agenda.filter((element) => element.nume === nume);
  res.json(contact);
});

// o ruta care accepta 2 parametrii si care returneaza Suma lor /adunare/1/2 , /adunare/39/4 , /adunare/x1/x2
app.get("/adunare/:numar1/:numar2", (req, res) => {
  const numar1 = Number(req.params.numar1);
  const numar2 = Number(req.params.numar2);

  const suma = numar1 + numar2;
  res.send(`Suma este ${suma}`);
});

// o ruta care afiseaza ora curenta
app.get("/ora", (req, res) => {
  const oraCurenta = new Date().toLocaleTimeString();
  res.send(`Acesta este ora curenta: ${oraCurenta}`);
});

// o ruta -> cream un formular de contact simplu cu user si parola, afisam aceste informatii inapoi pe ecran
app.post("/contact", (req, res) => {
  const nume = req.body.nume;
  const parola = req.body.parola;
  console.log(req);
  //interactionam cu o baza de date si cream resursa respectiva
  res.send(`Datele trimise spre procesare sunt: ${nume} si ${parola}`);
});

app.listen(4000, () => {
  console.log(`Example app listening on port 4000`);
});
