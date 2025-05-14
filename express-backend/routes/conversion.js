import { Router } from 'express';

const router = Router();
const TASA = 0.85;

//localhost:5000/api/v1/conversion/usd/50
router.get('/usd/:valor', async (req, res) => {
    const {valor} = req.params;
    var mensaje = {};
    if (isNaN(valor)) {
        mensaje = {resultado: "error al convertir."};
    }    
    else {
        const resultado = parseFloat(valor) * TASA;
        mensaje = {resultado : `${resultado} EUR`}
    }
    res.json(mensaje)   
})

//localhost:5000/api/v1/conversion/eur/42.5
router.get('/eur/:valor', async (req, res) => {
    const {valor} = req.params;
    var mensaje = {};
    if (isNaN(valor)) {
        mensaje = {resultado: "error al convertir."};
    }    
    else {
        const resultado = parseFloat(valor) / TASA;
        mensaje = {resultado : `${resultado} USD`}
    }
    res.json(mensaje)   
})

//localhost:5000/api/v2/conversion/usd/50
router.get('/usd/:valor', async (req, res) => {
    const {valor} = req.params;
    var mensaje = {};
    if (isNaN(valor)) {
        mensaje = {resultado: "error al convertir."};
    }    
    else {
        const resultado = parseFloat(valor) * TASA;
        mensaje = {resultado : `${resultado} EUR`}
    }
    res.json(mensaje)   
})


export default router;
