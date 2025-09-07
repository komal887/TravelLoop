const express = require("express");
const app = express();
const init = require("../init/index.js");
const { isLoggedIn, isOwner } = require("../middleware.js");
const listingController = require("../controllers/travels.js");
const Travel = require("../models/looping.js");
const mongoose = require("mongoose");
const router = express.Router();

// Home route - all travels
router.route("/")
  .get(listingController.index)
  .post(isLoggedIn, async (req, res, next) => {
    console.log("Body:", req.body);

    const newtravel = new Travel(req.body.newtravel);
    console.log(req.user);
    newtravel.owner = req.user._id;

    // Since you are storing image URLs directly, no need for req.file
    // newtravel.imageURL should already come from req.body.newtravel.imageURL

    await newtravel.save();
    req.flash("success", "New TravelPackage Created!");
    res.redirect("/travel");
  });

// New travel form
router.get("/new", isLoggedIn, (req, res) => {
  res.render("form.ejs");
});

// Search route
router.get("/search", async (req, res) => {
  const query = req.query.q;
  try {
    const results = await Travel.find({
      $or: [
        { packageName: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
        { location: { $regex: query, $options: "i" } }
      ]
    });

    res.render("searchResults.ejs", { results, query });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Show travel by ID
router.get("/:id", async (req, res) => {
  let { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    req.flash("error", "Invalid travel ID.");
    return res.redirect("/travel");
  }

  let travel = await Travel.findById(id)
    .populate("reviews")
    .populate("owner", "_id username");

  if (!travel) {
    req.flash("error", "Travel not found.");
    return res.redirect("/travel");
  }

  res.render("show.ejs", { travel });
});

// Edit form
router.get("/:id/edit", isLoggedIn, isOwner, async (req, res) => {
  let { id } = req.params;
  const newtravel = await Travel.findById(id);
  res.render("edit.ejs", { newtravel });
});

// Update travel
router.put("/:id", isLoggedIn, isOwner, async (req, res) => {
  let { id } = req.params;
  await Travel.findByIdAndUpdate(id, { ...req.body.newtravel });
  req.flash("success", "Listing updated");
  res.redirect(`/travel/${id}`);
});

// Delete travel
router.delete("/:id", isLoggedIn, isOwner, async (req, res) => {
  let { id } = req.params;
  await Travel.findByIdAndDelete(id);
  req.flash("success", "Listing deleted successfully!");
  res.redirect("/travel");
});

module.exports = router;
