const UserLogin = require("../models/userlogin.js");
const bcrypt = require("bcrypt");

class UsersController {
    static async authenticateUser(req, res) {
        const body = req.body;

        const inputs = {
            email: body.email,
        }

        try {
            const userLogin = await UserLogin.findOne(inputs);
            console.log(userLogin);

            res.render("index", {
                userId: userLogin.id
            });

            if(!await bcrypt.compare(body.password, userLogin.password)) throw new Error("Nesprávné heslo");
            if (!userLogin) throw new Error("Tento email není registrován"); 
        } catch (error) {
            res.render("users/login", {
                userLogin: inputs,
                errorMessage: error
            });
        }
    }

    static getLoginForm(req, res) {
        res.render("users/login");
    }

    static getRegisterForm(req, res) {
        res.render("users/register");
    }

    static async createUser(req, res) {
        const body = req.body;

        

        const userLogin = new UserLogin({
            email: body.email,
            password: body.password
        });
    
        try {
            if (body.password !== body.repassword) {
                throw new Error("Hesla se neshodují");
            }
            userLogin.password = await bcrypt.hash(body.password, 10);
            const newUserLogin = await userLogin.save();
            // res.redirect(`reviews/${newReview.id}`);
            res.redirect("/");
        } catch (error) {
            res.render("users/register", {
                userLogin: userLogin,
                errorMessage: error
            });
        }
    }
}

module.exports = UsersController;