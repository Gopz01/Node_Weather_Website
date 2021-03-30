// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

//Things to do with the location search input
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('p.message-1')
const messageTwo = document.querySelector('p.message-2')


weatherForm.addEventListener('submit', (event) => {
    event.preventDefault() //To stop the browser from refreshing
    
    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('/weather?address='+location).then((response,callback) => {
        response.json().then((data) => {
            if(data.error){
                messageOne.textContent = data.error
            }else{
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
})