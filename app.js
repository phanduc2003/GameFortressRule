const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose'); 

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

const connDb = async () => {
    let uri = "mongodb+srv://phanvanduc:duc12345@fortressrulle.qbyqrcx.mongodb.net/?retryWrites=true&w=majority"
    try{
        await mongoose.connect(uri);
        console.log("connect successful!..")
    }catch(error){
        console.error(error);
    }
} 
connDb();

app.get('/', (req, res, next) => {
    res.redirect('/login'); 
});

let AuthRouter = require('./routers/AuthRouter');
app.use('/', AuthRouter);

let UserRouter = require('./routers/UserRouter');
app.use('/user', UserRouter);

let EnemyRouter = require('./routers/EnemyRouter');
app.use('/enemy', EnemyRouter);

let ItemRouter = require('./routers/ItemRouter');
app.use('/items', ItemRouter);

let CurrencyRouter = require('./routers/CurrencyRouter');
app.use('/currencies', CurrencyRouter);

let TowerRouter = require('./routers/TowerRouter');
app.use('/towers', TowerRouter);

let MapRouter = require('./routers/MapRouter');
app.use('/maps', MapRouter);

let LibraryRouter = require('./routers/LibraryRouter');
app.use('/library', LibraryRouter);

let RechangeRouter = require('./routers/RechangeRouter');
app.use('/rechange', RechangeRouter);

let HistoryRouter = require('./routers/HistoryRouter');
app.use('/history', HistoryRouter);

app.listen('3000', () =>{
    console.log("http://localhost:3000/");
})