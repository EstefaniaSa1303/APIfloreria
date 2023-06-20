const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express();
app.use(cors());
const port = 3003;
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'api_floreria'
});

connection.connect((err) => {
  if (err) {
    console.error('No se puedo conectr a la BD', err);
    return;
  }
  console.log('conexion exitosa');
});

app.get('/floreria', (req, res) => { //obtener datos req lo que manda le usuario res lo que se muestra (se manda front)
  connection.query('SELECT * FROM floreria', (err, results) => {
    if (err) {
      console.error('Error al obtener las citas:', err);
      res.status(500).json({ error: 'Error al obtener las categorias' });
      return;
    }
    res.json(results);
  });
});
app.get('/floreria/:id_floreria', (req, res) => { //obtener datos req lo que manda le usuario res lo que se muestra (se manda front)
  const id_floreria_fany = req.params.id_floreria_fany;
  connection.query('SELECT * FROM floreria WHERE id_floreria_fany = ?' , [id_floreria_fany], (err, results) => {
    if (err) {
      console.error('Error al obtener las citas:', err);
      res.status(500).json({ error: 'Error al obtener las categorias' });
      return;
    }
    res.json(results);
  });
});


app.delete('/eliminar/:id_floreria_fany', (req, res) => {
  const id_floreria_fany = req.params.id_floreria_fany;
  connection.query('DELETE FROM floreria WHERE id_floreria_fany=?', [id_floreria_fany], (err, results) => {
    if (err) {
      console.error('Error al eliminar la cita', err);
      res.status(500).send('Error al eliminar tarea');
    }
  })
})

app.put('/editar/:id_floreria_fany',(req,res)=>{
  const id_floreria_fany=req.params.id_floreria_fany;
  const {nombre_flor_fany, tipo_flor_fany, precio_flor_fany } = req.body;
  console.log({nombre_flor_fany, tipo_flor_fany, precio_flor_fany } );
  connection.query('UPDATE floreria SET nombre_flor_fany = ?, tipo_flor_fany = ?, precio_flor_fany = ? WHERE id_floreria_fany = ?' , [nombre_flor_fany, tipo_flor_fany, precio_flor_fany, id_floreria_fany],(err,results)=>{
    if (err){
      console.error('Error al editar la cita', err);
      res.status(500).send('Error al editar cita');
    }
    res.status(200).json({message: `Actualizado exitosamente`})
  })
});

app.post('/agregarB', (req, res) => {
  const {nombre_flor_fany, tipo_flor_fany, precio_flor_fany} = req.body
  connection.query('INSERT floreria values(DEFAULT,?, ?, ?)', [nombre_flor_fany, tipo_flor_fany, precio_flor_fany], (err, results) => {
    if (err) {
      console.error('Error al agregar la cita', err);
      res.status(500).send('Error al agregar cita');
    }
    res.status(201).json({message: `Agregado exitosamente`})
  })
})



app.listen(port, () => {
  console.log('servidor escuchando mediante el puerto', port)
});


