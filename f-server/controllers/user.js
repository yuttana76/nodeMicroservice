import User from "../models/User.js";
import mongoose from "mongoose";
import crypto from "crypto";

export const userProfile = async (req, res) => {
    const url = req.protocol + '://' + req.get('host')
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        profileImg: url + '/public/' + req.file.filename
    });
    user.save().then(result => {
        res.status(201).json({
            message: "User registered successfully!",
            userCreated: {
                _id: result._id,
                profileImg: result.profileImg
            }
        })
    }).catch(err => {
        console.log(err),
            res.status(500).json({
                error: err
            });
    })
};


export const createUser = async (req, res) => {
    let salt = crypto.randomBytes(16).toString('base64');
    let hash = crypto.createHmac('sha512',salt)
                                        .update(req.body.password)
                                        .digest("base64");
    req.body.password = salt + "$" + hash;
    req.body.permissionLevel = 1;

    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        permissionLevel: req.body.permissionLevel,
    });
    user.save().then(result => {
        res.status(201).json({
            message: "User registered successfully!",
        })
    }).catch(err => {
        console.log(err),
            res.status(500).json({
                error: err
            });
    })
};

export const getById = async (req, res) => {
    
    try {
        const user = await User.find({ _id: req.params.userId });
        res.status(200).json(user);
      } catch (error) {
        res.status(404).json({ message: error.message });
      }
};

export const patchUser = async (req, res) => {
    try {
        if (req.body.password) {
            let salt = crypto.randomBytes(16).toString('base64');
            let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
            req.body.password = salt + "$" + hash;
        }

        const user = await User.findOneAndUpdate({ _id: req.params.userId},req.body).then((result) => {
            res.status(204).send({});
        });

      } catch (error) {
        res.status(404).json({ message: error.message });
      }
};

// getAll
export const getAll = async (req, res) => {
    let limitPerPage = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 2;
    let page = 0;
    if (req.query) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
            page = Number.isInteger(req.query.page) ? req.query.page : 0;
        }
    }

    try {
        const users = await User.find()
            .limit(limitPerPage)
            .skip(limitPerPage * page)

        res.status(200).json(users);
      } catch (error) {
        res.status(404).json({ message: error.message });
      }
};


export const removeById  = async (req, res) => {
    
    try {
        const user = await User.deleteMany({ _id: req.params.userId });
        res.status(204).json(user);
      } catch (error) {
        res.status(404).json({ message: error.message });
      }
};
