const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msgOne = document.querySelector('#msgOne')
const msgTwo = document.querySelector('#msgTwo')



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const loc = search.value
    msgOne.textContent = 'Loading...'
    msgTwo.textContent = ''
    fetch('/weather?address=' + loc).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                msgOne.textContent = data.error
            } else {
                msgOne.textContent='Today in '+ data.weatherIn.location
                msgTwo.textContent = 'It is a '+data.weatherIn.forecast+' day and the current temperature is '+data.weatherIn.current+' degrees farenheit.'
            }
        })
    })
})