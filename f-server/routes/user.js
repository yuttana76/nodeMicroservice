import express  from "express";
import { userProfile,createUser,getById,getAll,patchUser,removeById } from "../controllers/user.js";
import multer  from "multer"
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

const DIR = './public/';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName)
    }
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

router.post("/user-profile", upload.single('profileImg'), userProfile);
router.post("/adduser", upload.single('profileImg'), createUser);
router.get("/all",  getAll);

// At the buttom
router.get("/:userId",  getById);
router.patch("/:userId",  patchUser );
router.delete("/:userId",  removeById );
export default router;