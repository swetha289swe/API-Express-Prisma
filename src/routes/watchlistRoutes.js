import express from "express";
// import {register,login,logout} from "../controllers/authcontroller.js";
import {getAllMovies, addToWatchList, removeFromWatchlist, updateWatchlistItem} from "../controllers/watchlistController.js";
import {authMiddleware} from "../middleware/authMiddleware.js"
import { ValidateRequest } from "../middleware/validateRequest.js";
import {addToWatchListSchema} from "../validators/watchListValidators.js"
const router = express.Router();

router.use(authMiddleware)
router.post('/addToWatchList',ValidateRequest(addToWatchListSchema),addToWatchList)
// router.get('/getAllMovies', getAllMovies)
// adding middleware either u can implement use in line 7 or below format. If applied using use it applies to full file
// router.get('/getAllMovies',authMiddleware, getAllMovies)
router.get('/getAllMovies', getAllMovies)

//baseUrl/watchlist/deleteMovieWatchList/:id
router.delete('/deleteMovieWatchList/:id',removeFromWatchlist)

router.put('/updateMovieWatchList',updateWatchlistItem)


// router.post('/register',register)
// router.post('/login',login)
// router.post('/logout',logout)


export default router;