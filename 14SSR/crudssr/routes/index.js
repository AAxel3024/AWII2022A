const axios = require('axios');
var express = require('express');
var router = express.Router();


const httpAxios=axios.create({
  baseURL:`http://localhost:2500/v1/sextoa/api/`
})

/* GET home page. */
router.get('/', function(req, res, next) {
  httpAxios.get(`productos`).then(respuesta=>{
    // console.log(respuesta.data.productos));
  res.render('index', { productos:respuesta.data.productos });
  })
  .catch(error=>{
    console.log(error.response.data);
  })
});
router.get('/productos/nuevo', (req, res, next) => {
  res.render('productForm',{});
})
router.get('/productos/modificar/:id', (req, res, next) => {
  httpAxios.get(`productos/${req.params.id}`).then(respuesta=>{
  res.render('productForm',{productos : respuesta.data});
  })
  .catch(error=>{
    console.log(error.response.data);
  })
})
router.get('/productos/eliminar/:id', (req, res, next) => {
  httpAxios.delete(`productos/${req.params.id}`).then(respuesta=>{
  res.redirect('/');
  })
  .catch(error=>{
    console.log(error.response.data);
  })
})

module.exports = router;
