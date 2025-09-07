const Travel=require("../models/looping.js");

module.exports.index = async (req, res) => {
  try {
    const { category } = req.query; // get category from query string
    let alltravel;

    if (category) {
      // Filter travels by category
      alltravel = await Travel.find({ category: { $regex: new RegExp(`^${category}$`, 'i') } });
    } else {
      // If no category filter, show all travels
      alltravel = await Travel.find({});
    }

    res.render("index.ejs", { alltravel });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};
