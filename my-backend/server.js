const express=require('express');
const request=require('request');
app=express()
const port=3001;

app.get('/getWeather',async(req,res)=>{
    await request(`http://api.weatherstack.com/current?access_key=1414104df659b5fdf4fbd30229f7b970&query=New York`,
    function(error,response,body){
        if(!error && response.statusCode==200){
            let parsedBody=JSON.parse(body);
            console.log(parsedBody.current.temperature);
            res.send(parsedBody);
        }else{
            console.log(error)
        }
    })
})

app.get('/',(req,res)=>
    res.send("Hello World")
);

app.listen(port,()=>console.log(`Example running on port ${port}`));