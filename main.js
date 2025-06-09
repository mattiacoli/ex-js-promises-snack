/* // Testa Croce con promise

function lanciaMoneta(result) {
  return new Promise((resolve, reject) => {
    console.log('Sto lanciando la moneta');
    setTimeout(() => {
      const valore = Math.round(Math.random())
      const lancio = valore === 0 ? 'testa' : 'croce'

      if (result === lancio) {
        resolve('Hai vinto !')
      } else {
        reject('Hai perso')
      }

    }, 3000)
  })

}

lanciaMoneta('testa')
  .then(messaggio => console.log(messaggio))
  .catch(error => console.error(error)) */



// Geolocalizzazione

/* navigator.geolocation.getCurrentPosition(
  (position)=>{
    console.log(position);
  },
  (error)=>{
    console.error(error)
  }
) */

// scritta come una promise

/* function getCurrentPosition(){
  return new Promise((resolve, reject)=>{
    navigator.geolocation.getCurrentPosition(resolve, reject)
  })
}

getCurrentPosition()
.then(position =>console.log(position))
.catch(error => console.error(error)) */



/* -----------------------------------------------------------------------------------------------------------------------------------------------
  Ottieni il titolo di un post con una Promise.

  Crea una funzione getPostTitle(id) che accetta un id e restituisce una Promise che recupera il titolo di un post dal link https://dummyjson.com/posts/{id}
  🎯 Bonus: Ottieni l'intero post con l'autore
  Crea una funzione getPost(id) che recupera l'intero post. Concatena una seconda chiamata che aggiunge una proprietà user che contiene i dati dell'autore, recuperati dalla chiamata https://dummyjson.com/users/{post.userId}.
*/

/* function getPost(id) {
  return new Promise((resolve, reject) => {
    fetch(`https://dummyjson.com/posts/${id}`)
      .then(res => res.json())
      .then(post => fetch(`https://dummyjson.com/users/${post.userId}`)
        .then(res => res.json())
        .then(user => resolve({ ...post, user }))
      )
      .catch(reject)
  })
}

getPost(1)
  .then(post => console.log('post:', post))
  .catch(error => console.log(error)) */



/*--------------------------------------------------------------------------------------------------------------------------------------------------
  Crea la funzione lanciaDado() che restituisce una Promise che, dopo 3 secondi, genera un numero casuale tra 1 e 6. Tuttavia, nel 20% dei casi, il dado si "incastra" e la Promise va in reject.

*/

/* function lanciaDado() {
  return new Promise((resolve, reject) => {

    setTimeout(() => {
      const bug = Math.random() < 0.2
      if (bug) {
        reject('il dado si è buggato')
      } else {
        const result = Math.floor(Math.random() * 6 + 1)
        resolve(result)
      }
    }, 3000)

  })
} */



/*
  🎯 Bonus: HOF con closure per memorizzare l'ultimo lancio
  Modifica la funzione in creaLanciaDado(), che restituisce una closure che memorizza l'ultimo risultato. Se il numero esce due volte di fila, stampa "Incredibile!".
*/

/* function creaLanciaDado() {
  let ultimoRisultato = null

  return function () {
    return new Promise((resolve, reject) => {
      const bug = Math.random() < 0.2
      if (bug) {
        ultimoRisultato = null,
          console.log('il dado si è buggato')
      } else {
        const result = Math.floor(Math.random() * 6 + 1)
        if (result === ultimoRisultato) {
          console.log('Incredibile');
        }
        ultimoRisultato = result
        resolve(result)
      }
    })
  }
}


const lancia = creaLanciaDado()

lancia()
  .then(risultato => console.log('è uscito il numero', risultato))
  .catch(err => console.log(err))
 */



/* -------------------------------------------------------------------------------------------------------------------------------------------
  Obiettivo: Crea una funzione controllaTemperatura() che restituisce una Promise che si risolve dopo 2 secondi solo se la temperatura generata casualmente è inferiore a 30°C. Altrimenti va in reject con "Troppo caldo".
  Bonus: usa Math.random() per generare la temperatura.
*/

/* function controllaTemperatura() {

  const temp = Math.floor(Math.random() * 40)

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (temp > 30) {
        reject('Troppo Caldo')
      } else {
        resolve(temp)
      }
    }, 2000)
  })
}

controllaTemperatura()
  .then(temp => console.log('la temperatura attuale e` di :', temp))
  .catch(err => console.error(err)) */


/*-----------------------------------------------------------------------------------------------------------------------------------------------------
  Obiettivo: Crea una funzione creaAccumulatore() che restituisce una funzione che somma ogni numero ricevuto al totale precedente. Deve mantenere il totale in una closure.
 */

function creaAccumulatore() {
  let parziale = 0;

  return function (n) {
    parziale += n;
    console.log(parziale);
    return parziale
  }
}

const somma = creaAccumulatore();
somma(5); // 5
somma(3); // 8
somma(10); // 18





/* ---------------------------------------------------------------------------------------------------------------------------------------------------
  Obiettivo: Scrivi una funzione creaFiltro(messaggio, condizione) che restituisce una funzione che filtra un array di stringhe in base a una condizione custom e stampa un messaggio finale.
  const filtraLunghe = creaFiltro("Filtrando parole lunghe...", parola => parola.length > 5);
  filtraLunghe(["ciao", "javascript", "ecma", "promise"]);
*/
const parole = [
  "ciao",
  "javascript",
  "funzione",
  "if",
  "else",
  "closure",
  "promessa",
  "array",
  "filter",
  "ordine",
  "superiore",
  "hof",
  "callback"
];

function creaFiltro(message, condition) {
  return function (arr) {
    const filteredResults = arr.filter(condition)
    return console.log(`${message}\nRisultato: ${filteredResults.join(', ')}`);

  }
}

const filtraLunghe = creaFiltro("Filtrando parole lunghe...", parola => parola.length > 5);
filtraLunghe(["ciao", "javascript", "ecma", "promise"]);

/* ---------------------------------------------------------------------------------------------------------------------------------------------------
  Obiettivo: Dato un oggetto persona, crea una funzione che restituisce una copia profonda e ti permette di modificare in modo immutabile nome o età.
  const persona = { nome: "Luca", età: 28 };

  const nuovaPersona = copiaConModifica(persona, { età: 29 });
  console.log(persona);       // Non deve cambiare
  console.log(nuovaPersona);  // Deve mostrare età: 29
*/
const persona = { nome: "Luca", età: 28 };

function copiaConModifica(obj, edit) {
  edit = ``
  const newObj = { ...obj, }
  return newObj
}
const nuovaPersona = copiaConModifica(persona, { età: 29 });
console.log(persona);       // Non deve cambiare
console.log(nuovaPersona);  // Deve mostrare età: 29


/* ----------------------------------------------------------------------------------------------------------------------------------------------------
  Obiettivo: Crea una funzione creaLogin() che restituisce una funzione login(username, password) che:

  Memorizza il numero di tentativi falliti in una closure.

  Usa una Promise per simulare un login (es: se username === 'admin' e password === '1234' va in resolve, altrimenti in reject).

  Dopo 3 tentativi falliti, rifiuta automaticamente con "Account bloccato".
*/
