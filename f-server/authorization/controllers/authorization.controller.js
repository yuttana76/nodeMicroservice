// import jwtSecret  from ('../../common/config/env.config.js').jwt_secret
import app_env  from '../../common/config/env.config.js'

import jwt from 'jsonwebtoken'
import crypto from 'crypto'
// import {uuid} from 'uuid'
const jwtSecret = app_env.jwt_secret

export const login = async (req, res) => {
    // try {
    //     let refreshId = req.body.userId + jwtSecret;
    //     let salt = crypto.randomBytes(16).toString('base64');
    //     let hash = crypto.createHmac('sha512', salt).update(refreshId).digest("base64");
    //     req.body.refreshKey = salt;
    //     let token = jwt.sign(req.body, jwtSecret);
    //     let b = Buffer.from(hash);
    //     let refresh_token = b.toString('base64');
    //     res.status(201).send({accessToken: token, refreshToken: refresh_token});
    // } catch (err) {
    //     res.status(500).send({errors: err});
    // }
};

// export const refresh_token = (req, res) => {
//     try {
//         req.body = req.jwt;
//         let token = jwt.sign(req.body, jwtSecret);
//         res.status(201).send({id: token});
//     } catch (err) {
//         res.status(500).send({errors: err});
//     }
// };