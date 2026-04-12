import { prisma } from "../config/db.js";

const addToWatchList = async(req,res) =>{
    const {movieId,status, rating,notes,userId} = req.body;
    //verify movie exist
    const movie = await prisma.movies.findUnique({
        where: {id: movieId}
    });
    if(!movie){
        return res.status(404).json({"Message":"Movie not found"})
    }
    //Check if already added in watchlist
    const existingInWatchlist = await prisma.watchlistItem.findUnique({
        where: {
          userId_movieId: {
            userId: req.user.id,
            movieId: movieId,
          },
        },
      });
    
      if (existingInWatchlist) {
        return res.status(400).json({ error: "Movie already in the watchlist" });
      }

    const movieWatchAdd = await prisma.watchListItem.create({
        data: {
            userId: req.user.id,
            movieId,
            status: status || "PLANNED",
            rating,
            notes,
        },
    })
    res.status(201).json({
        status: "Success",
        data: {
          watchlistItem,
        },
      });
    // res.status(200).json({"message":"success","body":movieWatchAdd.id});
}

const getAllMovies = async(req,res) =>{
    // const movie = await prisma.movies
    // res.status(200).json({"body": body});
    try {
        const movies = await prisma.movies.findMany({
          orderBy: {
            releaseYear: "desc",
          },
        });
    
        res.status(200).json(movies);
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch movies" });
      }
}


export {addToWatchList, getAllMovies}