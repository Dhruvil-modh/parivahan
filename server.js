const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cookieParser = require("cookie-parser");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const UserProfile = require('./models/UserProfile');
const Cors = require('cors');
// const path = require("path");

const app = express();
const PORT = process.env.PORT || 4000;

// const MONGODB_URI = 'mongodb://localhost/parivahan';
const MONGODB_URI = 'mongodb+srv://adminParivahan:isNZi92u8P8WVMKI@cluster0.qfzin.mongodb.net/Parivahan?retryWrites=true&w=majority';


// MongoDB Connection
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
});

mongoose.connection.on('connected', () => {
    console.log('MongoDB Connected!!');
});

// Static Path
// app.use(express.static(path.join(__dirname, "..", "build")));
// app.use(express.static("public"));
app.use(express.static(__dirname, "./data/"));

// Data Parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(Cors({
    origin: "http://localhost:3000",
    credentials: true,
}));

// Cookie Parsing
app.use(cookieParser());

// PassportJS
app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);

app.get("/", (req, res) => {
    res.status(200).json({
        msg: "Team Parivahan"
    });
});

const bikes = require('./routes/bikes');
const ports = require('./routes/ports');
const rides = require('./routes/rides');
const users = require('./routes/users');
const wallet = require('./routes/wallet');

app.use(morgan('tiny'));

app.use('/bikes', bikes);
app.use('/ports', ports);
app.use('/rides', rides);
app.use('/users', users);
app.use('/wallet', wallet);

const signToken = userId => {
    return jwt.sign({
        iss: 'Parivahan',
        sub: userId
    }, 'q5gcejav4tz982r10dhz907f5ta6fdgg2800te3fc7ldm27qv3', { expiresIn: "7d" });
}

// Routes
app.post("/login", (req, res, next) => {
    if (req.body.username === undefined || req.body.username === "") {
        res.status(203).send("Email is required!!");
    } else if (req.body.password === undefined || req.body.password === "") {
        res.status(203).send("Password is required!!");
    } else {
        if (req.user === null || req.user === "" || req.user === undefined) {
            passport.authenticate("local", (err, user, info) => {
                if (err) throw err;
                if (!user) res.status(203).json({
                    isAuthenticated: false,
                });
                else {
                    req.logIn(user, (err) => {
                        if (err) throw err;

                        // New Try
                        const token = signToken(user._id);
                        res.cookie("access_token", token, {
                            httpOnly: true,
                            sameSite: true,
                            secure: true
                        }); // httpOnly and sameSite is must, to protect JWT token.
                        res.status(200).json({
                            isAuthenticated: true,
                            user: user
                        });
                    });
                }
            })(req, res, next);
        } else {
            res.status(200).send({ msg: "User Already Logged In!!", user: req.user.name });
        }
    }
});
app.get("/logout", passport.authenticate('jwt', { session: false }), (req, res) => {
    res.clearCookie('access_token');
    res.json({ user: { user: "" }, success: true });
})
app.post("/register", (req, res) => {
    if (req.body.username === undefined || req.body.username === "") {
        res.status(203).send("Email is required!!");
    } else if (req.body.password === undefined || req.body.password === "") {
        res.status(203).send("Password is required!!");
    } else {
        UserProfile.findOne({ email: req.body.username }, async (err, doc) => {
            if (err) throw err;
            if (doc) res.status(203).json({
                isRegisterd: false,
            });
            if (!doc) {
                const hashedPassword = await bcrypt.hash(req.body.password, 10);

                const newUser = new UserProfile({
                    name: req.body.name,
                    email: req.body.username,
                    contact: req.body.contact,
                    password: hashedPassword,
                    created: Date.now(),
                    visit: false,
                    active: true,
                    wallet: {
                        points: 0,
                        totalPointsUsed: 0,
                        cashTransections: []
                    }
                });
                await newUser.save();
                res.status(200).json({
                    isRegisterd: true,
                });
            }
        });
    }
});
app.get("/user", passport.authenticate('jwt', { session: false }), (req, res) => {
    if (req.user === null || req.user === "" || req.user === undefined) {
        res.status(203).send('User Data not found');
    }
    // res.status(200).send(req.user);
    res.status(200).json({
        user: req.user
    }); // The req.user stores the entire user that has been authenticated inside of it.
});
app.get("/authenticated", passport.authenticate('jwt', { session: false }), (req, res) => {
    if (req.user === null || req.user === "" || req.user === undefined) {
        res.status(203).send('User Data not found');
    }
    res.status(200).json({ isAuthenticated: true, user: req.user });
});
app.post("/forgetpassword", (req, res) => {
    const email = req.body.username;
    console.log(`Url: http://localhost:3000/newpassword?email=${email}`);
    var nodemailer = require('nodemailer');

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'parivahan.inc@gmail.com',
            pass: 'ParivahanInc@1'
        }
    });

    var mailOptions = {
        from: 'parivahan.inc@gmail.com',
        to: email,
        subject: 'Change Password',
        // text: ``
        html: `<div style='text-align:center;'><h1>Change Password</h1></div>
        <br><br>
        <div style='text-align:center;'><a href='http://localhost:3000/newpassword/${email}'><button>Change Password</button><a/></div> `
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.status(203).json({ isMailed: false, msg: 'Something went Wrong!!' });
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).json({ isMailed: true, msg: 'Please, Check your Email.' });
        }
    });
});
app.post("/changepassword", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newPassword = {
        password: hashedPassword,
        latestPasswordChange: Date.now()
    };
    UserProfile.updateOne({ email: username }, { $set: newPassword }, { upsert: true }, function (err, doc) {
        if (err) return res.status(500).send({ error: err });
        var nodemailer = require('nodemailer');

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'parivahan.inc@gmail.com',
                pass: 'ParivahanInc@1'
            }
        });

        var mailOptions = {
            from: 'parivahan.inc@gmail.com',
            to: username,
            subject: 'Password Changed Successfully!!',
            // text: ``
            html: `<div style='text-align:center;'><h1>Congratulations</h1></div>
        <br><br>
        <p>Password is updated Successfully!!<p/>`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                return res.status(200).json({
                    isPasswordChanged: true,
                    message: 'Password Change Failed!!'
                });
            } else {
                // console.log('Email sent: ' + info.response);
                return res.status(200).json({
                    isPasswordChanged: true,
                    message: 'Password Changed Successfully!!'
                });
            }
        });
    });
});

// app.use((req, res, next) => {
//     res.sendFile(path.join(__dirname, "..", "build", "index.html"));
// });

app.listen(PORT, console.log(`Backend Server is running on Port: ${PORT}`));