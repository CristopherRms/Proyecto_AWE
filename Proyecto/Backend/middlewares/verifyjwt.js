const { response, request } = require("express"); // Corrección en la desestructuración
const jwt = require("jsonwebtoken"); // Corrección del nombre del módulo
const { UserRepository } = require("../repositories/User");

const validateJWT = async (req = request, res = response, next) => {
    const token = req.header("Authorization"); // Leer el token del encabezado Authorization

    if (!token) {
        return res.status(401).json({
            msg: "Token no proporcionado",
        });
    }

    try {
        // Verificar y decodificar el token
        const { username } = jwt.verify(token, process.env.JWT_SECRET || "secret");

        // Buscar al usuario en la base de datos
        const user = await UserRepository.getOne({ username });
        if (!user) {
            return res.status(401).json({
                msg: "Token inválido: usuario no encontrado",
            });
        }

        // Pasar al siguiente middleware o controlador
        req.userActive = user; // Opcional: agregar datos del usuario a la solicitud
        next();
    } catch (error) {
        console.error("Error al verificar el token:", error);
        return res.status(401).json({
            msg: "Token inválido",
        });
    }
};

module.exports = {
    validateJWT,
};
