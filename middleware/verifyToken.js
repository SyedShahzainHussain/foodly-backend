const jwt = require("jsonwebtoken");


const verifyToken = async (req, res) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.splie(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET, async (error, user) => {
            if (error) {
                return res.status(403).json({ status: false, message: "Invalid token" });
            }
            req.user = user;
            next();
        })
    } else {
        return res.status(401).json({ status: false, message: "You are not authenticated!" });
    }
}


const verifyTokenAndAuthorization = async (req, res, next) => {

    verifyToken(req, res, () => {
        if (req.user.userType === "Client" || req.user.userType === "Admin" || req.user.userType === "Vendor" || req.user.userType === "Driver") {
            next();
        } else {
            return res.status(403).json({ status: false, message: "You are not allowed to do that!" });
        }
    })
}

const verifyVender = async (req, res) => {
    verifyToken(req, res, () => {
        if (req.user.userType === "Admin" || req.user.userType === "Vendor") {
            next();
        } else {
            return res.status(403).json({ status: false, message: "You are not allowed to do that!" });
        }
    })
}


const verifyAdmin = async (req, res) => {
    verifyToken(req, res, () => {
        if (req.user.userType === "Admin") {
            next();
        } else {
            return res.status(403).json({ status: false, message: "You are not allowed to do that!" });
        }
    })
}

const verifyDriver = async (req, res) => {
    verifyToken(req, res, () => {
        if (req.user.userType === "Driver") {
            next();
        } else {
            return res.status(403).json({ status: false, message: "You are not allowed to do that!" });
        }
    })
}

module.exports = { verifyToken, verifyTokenAndAuthorization, verifyVender, verifyAdmin, verifyDriver };