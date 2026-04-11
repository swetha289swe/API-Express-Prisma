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
    const existingInWatchlist = await prisma.watchListItem.findFirst({
        where: {
          // userId_movieId: {
            userId: req.user.id,
            movieId: movieId,
          // },
        },
      });
      console.log(existingInWatchlist,"WATCHLIST")
      if (existingInWatchlist) {
        return res.status(400).json({ error: "Movie already in the watchlist" });
      }

    const movieWatchAdd = await prisma.watchListItem.create({
        data: {
            // userId: userId,
            //We can use below user id when middleware is integrated with auth token
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
          movieWatchAdd,
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

/**
 * Remove movie from watchlist
 * Deletes watchlist item
 * Ensures only owner can delete
 * Requires protect middleware
 */
const removeFromWatchlist = async (req, res) => {
  // Find watchlist item and verify ownership
  const watchlistItem = await prisma.watchlistItem.findFirst({
    where: { id: req.params.id },
  });

  if (!watchlistItem) {
    return res.status(404).json({ error: "Watchlist item not found" });
  }

  // Ensure only owner can delete
  if (watchlistItem.userId !== req.user.id) {
    return res
      .status(403)
      .json({ error: "Not allowed to update this watchlist item" });
  }

  await prisma.watchlistItem.delete({
    where: { id: req.params.id },
  });

  res.status(200).json({
    status: "success",
    message: "Movie removed from watchlist",
  });
};



////////UPDATE WATCHLIST
const updateWatchlistItem = async (req, res) => {
  const { status, rating, notes } = req.body;

  // Find watchlist item and verify ownership
  const watchlistItem = await prisma.watchlistItem.findFirst({
    where: { id: req.params.id },
  });

  if (!watchlistItem) {
    return res.status(404).json({ error: "Watchlist item not found" });
  }

  // Ensure only owner can update
  if (watchlistItem.userId !== req.user.id) {
    return res
      .status(403)
      .json({ error: "Not allowed to update this watchlist item" });
  }

  // Build update data
  const updateData = {};
  if (status !== undefined) updateData.status = status.toUpperCase();
  if (rating !== undefined) updateData.rating = rating;
  if (notes !== undefined) updateData.notes = notes;

  // Update watchlist item
  const updatedItem = await prisma.watchlistItem.update({
    where: { id: req.params.id },
    data: updateData,
  });

  res.status(200).json({
    status: "success",
    data: {
      watchlistItem: updatedItem,
    },
  });
};
export {addToWatchList, getAllMovies, removeFromWatchlist,updateWatchlistItem}
