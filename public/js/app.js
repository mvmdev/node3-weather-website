console.log('client side javascript file is loaded!')
//we will use this js file to fetch data by 'fetch' as this is only client side loaded js file which is loaded in index.hbs 
//page only and node js does not provide us a method for non client side loaded js files to fetch data

//fetch() function is also asynchronous, it has 2 parameters-first is url from which we will fetch json and then
//run callback by then()
fetch('http://puzzle.mead.io/puzzle').then((response)=>
{
    //response.json() will run when json has arrived and then it will run callback inside then()
    response.json().then((data)=>
    {
           console.log(data)
    })
})

//this document.queryselector() method helps us to take out a element from the linked html or hbs file
//and it returns a java script notation of the element by which we can access it properties 
//here we have taken out form element from index.hbs file by which we will takeout location
const weatherform=document.querySelector('form')
const search=document.querySelector('input') //also include the input element to take out location from input 

//the document.querySelector('element') method searches for the 'element' in the index.hbs file from top
//to bottom, but when it finds the element at the top it stops there and gives back the element in this file
//so for linking the paragraph element <p> which is after <form> element in index.hbs we will give the
//<p>  element a unique name

const messageOne=document.querySelector('#message-1') //'#'is used for id's
const messageTwo=document.querySelector('#message-2')


//this weatherform.addEventListener() will get executed when we click submit button  
weatherform.addEventListener('submit',(e)=>
{

    messageOne.textContent='Loading ...'  //.textcontent is used to set the value of paragraph inside the.hbs file
    messageTwo.textContent=''

    e.preventDefault()//this code will prevent submit button to reload the page and e is event 
    
    const location=search.value //take out value from input

    fetch('http://localhost:3000/weather?address='+location).then((response)=>
{
    //here u can use any paramter in then's callback function, we have used 'data' as a parameter
    //and 'data' is nothing but a object which get provided by response.json() when whole data is recieved by response
    //from the link inside fetch's url parameter
   response.json().then((data)=>
   {
       if(data.error)
       {
           messageOne.textContent=data.error
       }
       else
       {
           messageOne.textContent=data.location
           messageTwo.textContent=data.forecast
       }
   })
})

    //also put the code loading java script file in index.hbs file after form code so that javascript run after form loading
})