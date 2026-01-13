import Gig from "../models/Gig.js";

export const createGig = async (req, res) => {
  try {
    const { title, description, budget } = req.body;

    const gig = await Gig.create({
      title,
      description,
      budget,
      ownerId: req.user._id,
    });

    res.status(201).json(gig);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getGigs = async (req, res) => {
  try {
    const keyword = req.query.search
      ? {
          title: { $regex: req.query.search, $options: "i" },
        }
      : {};

    const gigs = await Gig.find({
      ...keyword,
      status: "open",
    }).populate("ownerId", "name");

    res.status(200).json(gigs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
