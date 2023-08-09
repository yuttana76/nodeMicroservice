import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js";
import usersRoutes from "./routes/user.js";
import reportsRoutes from "./routes/reports.js";
// import authRoutes from "./routes/auth.js";


import logger from "./logger.js";

// data imports
import User from "./models/User.js"
import Product from "./models/Product.js";
import Transaction from "./models/Transaction.js"
import OverallStat from "./models/OverallStat.js"
import AffiliateStat from "./models/AffiliateStat.js"

import ProductStat from "./models/ProductStat.js";
import {dataUser,dataProduct,dataProductStat, dataTransaction,dataOverallStat,dataAffiliateStat} from "./data/index.js" 

// CONFIGURATION
dotenv.config();
const app = express();
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// app.set('view engine', 'ejs');

// ROUTES
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);
app.use("/users", usersRoutes);
app.use("/reports", reportsRoutes);
// app.use("/auth", authRoutes);

// MONGOOSE SETUP
const PORT = process.env.PORT || 9000;
mongoose.connect(process.env.MONGO_URL, {  
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => {
        logger.info(`Server Port: ${PORT}`)
        let today = new Date().toISOString().split("T")[0]
        console.log('TODAY>',today)
})

    // ONLY ADD DATA ONE TIME
    // AffiliateStat.insertMany(dataAffiliateStat)
    // OverallStat.insertMany(dataOverallStat)
    // Product.insertMany(dataProduct)
    // ProductStat.insertMany(dataProductStat)
    // Transaction.insertMany(dataTransaction)
    // User.insertMany(dataUser)
    
}).catch(error => console.log(`${error} did not connect`))