const { getDB } = require('./../config/db');
const VerifyData = require('./../collections/VerifyData');
const { ObjectId } = require('mongodb');

// Obtener todos los registros
exports.getVerifyData = async (req, res) => {
  try {
    const db = getDB();
    const verifyData = await db.collection('verifyData').find().toArray();
    res.json({ estado: 'exito', codigo: 200, mensaje: 'Datos de verificación obtenidos correctamente', data: verifyData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ estado: 'error', codigo: 500, mensaje: 'Error del servidor' });
  }
};

// Crear un nuevo registro
exports.createVerifyData = async (req, res) => {
  const { id_register, created_at, updated_at } = req.body;
  try {
    const db = getDB();
    const verifyData = new VerifyData(id_register, created_at, updated_at);
    await db.collection('verifyData').insertOne(verifyData);
    res.status(201).json({ estado: 'exito', codigo: 201, mensaje: 'Datos de verificación creados correctamente', data: verifyData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ estado: 'error', codigo: 500, mensaje: 'Error del servidor' });
  }
};

// Actualizar un registro
exports.updateVerifyData = async (req, res) => {
  const { id } = req.params;
  const { id_register, created_at, updated_at } = req.body;
  try {
    const db = getDB();
    const updatedVerifyData = await db.collection('verifyData').findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { id_register, created_at, updated_at } },
      { returnOriginal: false }
    );
    res.json({ estado: 'exito', codigo: 200, mensaje: 'Datos de verificación actualizados correctamente', data: updatedVerifyData.value });
  } catch (err) {
    console.error(err);
    res.status(500).json({ estado: 'error', codigo: 500, mensaje: 'Error del servidor' });
  }
};

// Eliminar un registro
exports.deleteVerifyData = async (req, res) => {
  const { id } = req.params;
  try {
    const db = getDB();
    await db.collection('verifyData').deleteOne({ _id: new ObjectId(id) });
    res.json({ estado: 'exito', codigo: 200, mensaje: 'Datos de verificación eliminados correctamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ estado: 'error', codigo: 500, mensaje: 'Error del servidor' });
  }
};
