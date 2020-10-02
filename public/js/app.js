

console.log('Client side js is loaded')

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

const weatherForm = document.querySelector('form');
const search = document.querySelector('input')
weatherForm.addEventListener('submit', (event)=>
{
    event.preventDefault()

    const loaction = search.value;

    messageOne.textContent = 'Loading....'
    messageTwo.textContent = ''

    fetch('/weather?address='+loaction).then((response)=>{
    response.json().then((data)=>
    {
        if(data.error)
        {
            console.log(data)
            messageOne.textContent = data.error
        }
        else
        {
            messageOne.textContent = data.location
            messageTwo.textContent = data.description
        }
        
    })
})

    
})