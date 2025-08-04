const router = require("express").Router()
const User = require("../models/user")
const bcrypt = require("bcrypt")


router.get("/sign-up", (req, res) => {
    res.render("auth/sign-up.ejs", { error: null })
})

router.post("/sign-up", async (req, res) => {
    try {
        const { username,name,birthday,password} = req.body;

        // VALIDATION
        //  Check if all the necessary fields are there
        if (!username || !password) {
            return res.render("auth/sign-up", {
                error: "All fields are required."
            });
        }

        const passwordRegex=/([A-Z])+([0-9]{5})+[a-z]/
        if (!passwordRegex.test(password) ) {
            return res.render("auth/sign-up", {
                error: "Password must be contain capital letter in first, wirte any five number, and in the end small letter "
            });
        }

        // Do we already have this person in our database?
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.render("auth/sign-up.ejs", {
                error: "Username is already taken."

            });
        }


        // Hash password and create user
        const hashedPassword = bcrypt.hashSync(password, 10);
        const newUser = {
            username,
            name,
            birthday,
            password: hashedPassword,
        };

        await User.create(newUser);

        // Redirect to Login
        res.redirect("/auth/login");

    } catch (error) {
        console.error("Sign-up error:", error);
        res.render("auth/sign-up", {
            error: "Something went wrong. Please try again."
        });
    }
});



router.get("/login", (req, res) => {
    res.render("auth/login.ejs", { error: null })
})

router.post("/login", async (req, res) => {
    try {
        const userInDatabase = await User.findOne({ username: req.body.username });
         const { username, password } = req.body;
           if (!username || !password) {
            return res.render("auth/login", {
                error: "All fields are required."
            });
        }
       
        if (!userInDatabase) {
            return res.render("auth/login", { error: "Username not found." });
        }

        const validPassword = bcrypt.compareSync(
            req.body.password,
            userInDatabase.password
        );

        if (!validPassword) {
            return res.render("auth/login", { error: "Incorrect password." });
        }

        req.session.user = {
            username: userInDatabase.username,
            _id: userInDatabase._id,
        };

        res.redirect("/destinations/HomePage");
    } catch (error) {
        console.error("Error during sign-in:", error);
        res.render("auth/sign-in", { error: "An unexpected error occurred." });
    }
});



router.get("/logout", (req, res) => {
    req.session.destroy()
    res.redirect("/auth/login")
})

module.exports = router