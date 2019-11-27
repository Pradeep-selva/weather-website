console.log('client-side javascript is running!')

const weatherForm= document.querySelector('form')
const search= document.querySelector('input')
const msgone= document.querySelector('#message-1')
const msgtwo= document.querySelector('#message-2')


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    const location= search.value

    msgone.textContent="Loading..."
    msgtwo.textContent=""

    
fetch('http://localhost:3000/weather?search='+encodeURIComponent(location)).then((response)=>{

    response.json().then((data)=>{

        if(data.error){
            
            msgone.textContent= data.error
            msgtwo.textContent=""
        }
        else{

            msgone.textContent="Location: "+data.location
            msgtwo.textContent="Forecast: "+data.forecast
        }


    })
})



})