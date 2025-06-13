/* Snack 1
  Ottieni il titolo di un post con una Promise.

  Crea una funzione getPostTitle(id) che accetta un id e restituisce una Promise che recupera il titolo di un post dal link https://dummyjson.com/posts/{id}
  🎯 Bonus: Ottieni l'intero post con l'autore
  Crea una funzione getPost(id) che recupera l'intero post. Concatena una seconda chiamata che aggiunge una proprietà user che contiene i dati dell'autore, recuperati dalla chiamata https://dummyjson.com/users/{post.userId}.
*/

function getPost(id) {
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
  .then(post => console.log('Snack 1 post:', post))
  .catch(error => console.log(error))



/* Snack2
  Crea la funzione lanciaDado() che restituisce una Promise che, dopo 3 secondi, genera un numero casuale tra 1 e 6. Tuttavia, nel 20% dei casi, il dado si "incastra" e la Promise va in reject.

*/

function lanciaDado() {
  return new Promise((resolve, reject) => {

    setTimeout(() => {
      const bug = Math.random() < 0.2
      if (bug) {
        reject('il dado Snack 2 si è buggato')
      } else {
        const result = Math.floor(Math.random() * 6 + 1)
        resolve(result)
      }
    }, 3000)

  })
}

(async () => {
  const lancio = await lanciaDado()
  console.log('Snack 2 : ', lancio);

})()



/*
  🎯 Bonus: HOF con closure per memorizzare l'ultimo lancio
  Modifica la funzione in creaLanciaDado(), che restituisce una closure che memorizza l'ultimo risultato. Se il numero esce due volte di fila, stampa "Incredibile!".
*/

function creaLanciaDado() {
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
  .then(risultato => console.log('Snack 2 Bonus è uscito il numero', risultato))
  .catch(err => console.log(err))




