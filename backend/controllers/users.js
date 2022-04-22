const UserLogin = require("../models/userlogin.js");
const bcrypt = require("bcrypt");
const Joi = require("joi");

class UsersController {
    static async authenticateUser(req, res) {
        const body = req.body;

        const inputs = {
            email: body.email,
        }

        try {
            const userLogin = await UserLogin.findOne(inputs);
            console.log(userLogin);

            if(!await bcrypt.compare(body.password, userLogin.password)) throw new Error("Nesprávné heslo");
            if (!userLogin) throw new Error("Tento email není registrován"); 
            
            const token = jwt.sign({_id: userLogin._id}, process.env.TOKEN_SECRET);
            console.log(token);

            res.header("auth-token", token);

            res.render("index", {
                userId: userLogin.id
            });

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

        const validationSchema = Joi.object({
            email: Joi.string().min(6).max(255).required().email(),
            password: Joi.string().min(6).required(),
            repassword: Joi.string().min(6).required()
        });        

        const userLogin = new UserLogin({
            email: body.email,
            password: body.password
        });
    
        try {
            const unique = UserLogin.findOne({email: userLogin.email});
            console.log(unique);

            const {error} = validationSchema.validate(body);


            if (!unique) {
                throw new Error("Tento email je již registrován");
            }

            if (body.password !== body.repassword) {
                throw new Error("Hesla se neshodují");
            }

            if (error) {
                throw new Error(error.details[0].message);
            }

            userLogin.password = await bcrypt.hash(body.password, 10);
            await userLogin.save();
            // res.redirect(`reviews/${newReview.id}`);
            res.redirect("/");
        } catch (err) {
            res.render("users/register", {
                userLogin: userLogin,
                errorMessage: err
            });
        }
    }
}

module.exports = UsersController;