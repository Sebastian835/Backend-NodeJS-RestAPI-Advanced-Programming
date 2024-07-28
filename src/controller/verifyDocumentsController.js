const { getDB } = require("./../config/db");
const { ObjectId } = require("mongodb");

const emailService = require("../services/emailService");
const endProcessSuccess = require("../emails/endProcessSuccess");

// Obtener todos los registros con datos relacionados
exports.getRelationsVerifyData = async (req, res) => {
  try {
    const db = getDB();
    const verifyData = await db
      .collection("fullVerifyDocument")
      .find()
      .toArray();
    res.status(200).json(verifyData);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ estado: "error", codigo: 500, mensaje: "Error del servidor" });
  }
};

exports.updateVerifyDocument = async (req, res) => {
  const { id } = req.params;
  const { updated_at } = req.body;
  try {
    const db = getDB();

    const searchName = await db
      .collection("fullVerifyDocument")
      .findOne({ _id: new ObjectId(id) });
    const htmlContent = endProcessSuccess(searchName.name);
    emailService.sendEmail(
      searchName.email,
      "Real Agency - Documentos Verificados",
      htmlContent
    );

    const updatedVerifyData = await db
      .collection("verifyDocument")
      .findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: { updated_at, id_state: 2 } },
        { returnOriginal: false }
      );

    res.json({
      estado: "exito",
      codigo: 200,
      mensaje: "Datos de verificación actualizados correctamente",
      data: updatedVerifyData.value,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ estado: "error", codigo: 500, mensaje: "Error del servidor" });
  }
};
