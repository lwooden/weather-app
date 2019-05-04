//console.log("Client side javascript loaded")

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })

// })

const weatherForm = document.querySelector('form') // select the "form" element on the HTML page
const searchTerm = document.querySelector('input') // select the "input" element from the "form" element on the HTML page after the user submits
const messageOne = document.querySelector('#messageOne')
const messageTwo = document.querySelector('#messageTwo')
const test = 'This is a test'

weatherForm.addEventListener('submit',(e) => { // add a listerner event on the "form" element
    e.preventDefault() // prevent the default submit behavior from refreshing the page immediately after submission

    const location = searchTerm.value // store the value entered in the form and use it to dynamically build my API call
    
    messageOne.textContent ='Loading...'
    messageTwo.textContent = ''

    // cut out the domain entirely so that the app can run no matter what server Heroku provisions on
    fetch('/weather?address=' + location).then((response) => {
        
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
                messageTwo.textContent = ''
                //console.log(data.error)
            } else
                messageOne.textContent = data.location 
                messageTwo.textContent = data.forecast
                //console.log(data.location)
                //console.log(data.forecast)
        })
        
    })

})