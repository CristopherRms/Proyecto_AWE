const jwt = require("jsonwebtoken");

const generateJWT = (username) => {
    return new Promise((resolve, reject) => {
        const payload = { username };

        jwt.sign(
            payload,
            process.env.JWT_SECRET || "secret", // Asegúrate de configurar `JWT_SECRET` en tu entorno
            { expiresIn: "1h" }, // Duración del token
            (err, token) => {
                if (err) {
                    console.error("Error al generar el token:", err);
                    reject("No se pudo generar el token");
                } else {
                    resolve(token);
                }
            }
        );
    });
};

module.exports = {
    generateJWT,
};
