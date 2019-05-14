// //express only provides  functions in require
// const path=require('path')  //path is used for accessing directories, it is a core module 
// const express=require('express')
// const app=express()

//when someone tries to access our website by giving the url like app.com or app.com/help
//then we setup our server to send a response by using get() method
// app.get('',(req,res)=>
// {
    //app.get has two parameters-one is a string for url and other is a function with request and response 
    //as parameters.We send back data in res(response) object and req(request) contains the information about the 
    //incoming reqeust to the server
    // res.send('hello express!')
    
//in browser type localhost:3000 for running default page 

// })
// app.get('/help',(req,res)=>
// {
//      res.send('help page')
     //type  localhost:3000/help to open help page

// })

// app.get('/about',(req,res)=>
// {
//      res.send('about')

// })
// app.get('/weather',(req,res)=>
// {
//      res.send('weather page')

// })

//2.but in actual project we will never send messages to browser, we will send html and json 
// app.get('',(req,res)=>
//  {  
//       res.send('<h1>Weather</h1>')
 
// })

//2a.we can also send objects directly and the server will automatically stringify in JSON
// app.get('/help',(req,res)=>
//  {  
//       res.send(
//           {name:'Mayank',age:20}
//           )
 
// })
//2b.we can also send array of objects
// app.get('/help',(req,res)=>
// {
//    res.send(
//        [
//            {name :'Mayank'},{Name:'Mayank',Age:20}
//        ])   
// })
// app.get('/about',(req,res)=>
// {
//    res.send('<h1>About</h1>')   
// })
// app.get('/weather',(req,res)=>
// {
//    res.send({Location:'Indore',temperature:'40 degree'})   
// })

//5. Re-written code
const path=require('path')
const express=require('express')
const app=express()  //this express function returns a object 
const hbs=require('hbs')

//7.loading the functions
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

//3.node provides us with two variables- __dirname and __filename which provies us the path for directory
//and both of these values are provided by wrapper function. We use 'path' core module which has join() method
//to change the directory and return the path
//console.log(__dirname)
//console.log(__filename)
//console.log(path.join(__dirname,'../..'))
//console.log(path.join(__dirname,'../public')) 

const publicdirectorypath=path.join(__dirname,'../public')

//3a.To serve folders inside the server we use use() method instead of app.get() from now onwards
//this method has express.static(publicdirectorypath) function as a parameter which returns the path to use()
// function and when we open the default page by localhost:3000 or localhost:3000/index.html we will get the
//contents of our html file
//by this static method we serve static pages only
app.use(express.static(publicdirectorypath))
//static means not changable i.e the pages which we view in browser by the above method are static and
//will load same information we provided in public folder 

//5a-We can also change the name of views folder but for that we have to tell express also
const viewsPath=path.join(__dirname,'../templates/views')
//5b-partials path(with partials we can reuse headers,footers etc code in all html files)
const partialsPath=path.join(__dirname,'../templates/partials')
hbs.registerPartials(partialsPath)


//4.we use app.set() method to tell express which templating engine we installed
//also create a new folder views which will keep all the views(templates) of handle bar
//also delete index.html file from public folder as from now onwards we will use dynamic home page
//in views folder named as index.hbs
app.set('view engine','hbs')

//5.set path for views directory
app.set('views',viewsPath)

//4.to set the home page from views we need to serve a route by app.get() method
app.get('',(req,res)=>
{
    //instead of res.send() we will use res.render() method to render the view into html file
    // and pass the view's name as it is inside it as parameter  
   //res.render('index')
   //to provide a value to index.hbs we also pass values as object in second parameter of res.render and use them in .hbs file
   res.render('index',{title:'Weather',name:'Mayank Verma'})
})
//4b.we also make help and about page dynamic so delete their pages and make their .hbs files
app.get('/about',(req,res)=>
{
    res.render('about',{title:'about me',name:'Mayank Verma'})
})
app.get('/help',(req,res)=>
{
    res.render('help',{helptext:'this is help text',title:'Help',name:'Mayank Verma'})
})

//6-to handle search query from user, the query searches are present in the url after? like this-
//'?search=games&rating=5' which are stored in req object
app.get('/product',(req,res)=>
{ 
    //we have taken a eg in which we will have to make sure that user searched something,thats why we have used
    //query.search, we could have also used other key which we want like rating,price,yearofrelease etc. of our
    //own choice
   if(!req.query.search)
   {
       return res.send({error:'You must provide a search term'})
   }
    console.log(req.query.search) //this will print the query in console
    res.send({products:[]})
})
//6.challenge
app.get('/weather',(req,res)=>
{ 
   if(!req.query.address)
   {
       return res.send({error:'You must provide a address'})
   }
   geocode(req.query.address,(error,{latitude,longitude,location}={})=>
   {
       if(error)
       {
           return res.send({error})  //{error:error} we used shorthand of obejct
       }
       forecast(latitude,longitude,(error,forecastData)=>
       {
           if(error)
           {
               return res.send({error})
           }
           res.send({forecast:forecastData,location,address:req.query.address})
       })
   })
})


app.get('/help/*',(req,res)=>
{
  res.render('404',{errormessage:'help article not found',name:'Mayank Verma',title:404})
})

//5c.setup response for invalid url, the '*' wildcard character checks for all other remaing url which are not listed above
app.get('*',(req,res)=>
{
  res.render('404',{errormessage:'page not found',name:'Mayank Verma',title:404})
})


//1.to start the server we use listen method with first parameter as port no and second is a callback function
//which prints something on console only,not on web browser.The above res.send() method in app.get() 
//method will send response message in browser
app.listen(3000,()=>
{
    console.log('Server is up on 3000')
})

//7.copy the utils folder from weather app inside src folder and also install request npm module
//7.then also grab the geocode and forecast function from their files by require and use them in route handler
//of weather link