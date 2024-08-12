const User = require("../models/User");
const generateOtp = require("../utils/otp_generate");
const sendEmail = require("../utils/smpt_function");
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");


module.exports = {

    createUser: async (req, res) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailRegex.test(req.body.email)) {
            return res.status(400).json({ status: false, message: "Email is not valid" });
        }
        const minPasswordLength = 8;
        if (req.body.password < minPasswordLength) {
            return res.status(400).json({ status: false, message: "Password should be at least " + minPasswordLength + "character" });
        }

        try {
            const emailExists = await User.findOne({ email: req.body.email });
            if (emailExists) {
                return res.status(400).json({ status: false, message: "Email already exists" });
            }
            // Todo Generate Otp
            const otp = generateOtp();
            const newUser = User(
                { username: req.body.username, email: req.body.email, password: CryptoJs.AES.encrypt(req.body.password, process.env.SECRET).toString(), otp: otp },
            );
            // Todo Save User
            await newUser.save();
            // Todo Send Otp To Email
            await sendEmail(newUser.email, otp);
            res.status(201).json({ status: true, message: "User successfully created" });

        } catch (error) {
            res.status(500).json({ status: 500, message: error.message });
        }
    },
    loginUser: async (req, res) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailRegex.test(req.body.email)) {
            return res.status(400).json({ status: false, message: "Email is not valid" });
        }
        const minPasswordLength = 8;
        if (req.body.password < minPasswordLength) {
            return res.status(400).json({ status: false, message: "Password should be at least " + minPasswordLength + "character" });
        }

        try {
            const user = await User.findOne({ email: req.body.email });
            if (!user) {
                return res.status(400).json({ status: false, message: "User not found" });
            }
            const decryptPassword = CryptoJS.AES.decrypt(user.password, process.env.SECRET);
            const dePassword = decryptPassword.toString(CryptoJS.enc.Utf8);
            if (dePassword !== req.body.password) {
                return res.status(400).json({ status: false, message: "Wrong Password" });
            }

            const userToken = jwt.sign({
                id: user._id,
                userType: user.userType,
                email: user.email,
            }, process.env.JWT_SECRET, { expiresIn: "21d" });

            const { password, createdAt, updatedAt, __v,otp, ...others } = user._doc;

            res.status(200).json({ status: true, data: { ...others, token: userToken } });

        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }

    },
    
};