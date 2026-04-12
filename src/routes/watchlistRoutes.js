import express from "express";
// import {register,login,logout} from "../controllers/authcontroller.js";
import {getAllMovies, addToWatchList} from "../controllers/watchlistController.js";

const router = express.Router();

router.post('/addToWatchList',addToWatchList)
router.get('/getAllMovies',getAllMovies)
// router.post('/register',register)
// router.post('/login',login)
// router.post('/logout',logout)


export default router;