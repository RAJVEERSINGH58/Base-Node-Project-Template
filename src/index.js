const express = require('express');

const { ServerConfig , Logger } = require('./config');
const apiRoutes = require('./routes');
const { where } = require('sequelize');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api' , apiRoutes);

app.listen(ServerConfig.PORT , async ()=>{
  console.log("app is listening");

  const { City , Airport } = require('./models');
  const New_Delhi = await City.findByPk(3);
  console.log(New_Delhi);
  // const airport = await Mumbai.create({name: 'Chhatrapati Shivaji Maharaj International Airport' , code: 'BOM' , city_Id: 2});
  
  // const airport = await New_Delhi.createAirport({name: 'Safdarjung Airport' , code: 'SDJ'});
  // console.log(airport);

  // const sfairport = await Airport.findByPk(3);
  // console.log(sfairport);

  await City.destroy({
    where : {
      id: 3
    }
  });
});

