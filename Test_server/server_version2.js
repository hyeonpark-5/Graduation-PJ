const express = require('express');
const spawn = require('child_process').spawn;
const fs = require('fs')

const date = new Date();
const app = express();


const year = date.getFullYear();
const month = ('0' + (date.getMonth() + 1)).slice(-2);
const day = ('0' + date.getDate()).slice(-2);
const dateStr = year + '-' + month + '-' + day;
const hours = ('0' + date.getHours()).slice(-2);
const minutes = ('0' + date.getMinutes()).slice(-2);
const seconds = ('0' + date.getSeconds()).slice(-2);
const timeStr = hours + ':' + minutes + ':' + seconds;
const date_time = 'date: ' + dateStr + ' time: ' + timeStr;


app.set('port',process.env.PORT || 3330);
app.get('/', (req, res) => {
    res.json({
        success: true,
    })
})


setInterval(function(){
  
    const result = spawn('py',['./test2.py'])
    result.stdout.on('data',function(data) {
        Float_value = parseFloat(data.toString());
        var value = date_time + ' value: ' + data.toString();
        console.log(Float_value);
        console.log(typeof Float_value);
        console.log(data.toString());
        fs.writeFile('./test.txt', value,{flag: 'a+'}, err => {
            if (err) {
                console.error(err);
                return 
            }
        });
    });
}, 3000);


app.listen(app.get('port'),() => {console.log(app.get('port'),'번 포트에서 대기 중');});
