const express = require("express");
const router = express.Router();
const TourPackage = require("../models/looping"); // adjust as needed

// Define main categories and synonyms
const categoriesMap = {
  adventure: ["adventure", "trekking", "rafting", "hiking", "thrill"],
  beach: ["beach", "coast", "seaside", "island"],
  pilgrimage: ["pilgrimage", "temple", "spiritual", "yatra"],
  wildlife: ["wildlife", "safari", "animals", "jungle"],
  heritage: ["heritage", "culture", "history", "monument"],
  luxury: ["luxury", "honeymoon", "premium", "resort"]
};

router.get("/", (req, res) => {
  res.render("chatbot");
});

router.post("/", async (req, res) => {
  try {
    const userMessage = req.body.message.toLowerCase();

    // Detect matching categories
    let matchedCategories = [];
    for (let cat in categoriesMap) {
      if (categoriesMap[cat].some(keyword => userMessage.includes(keyword))) {
        matchedCategories.push(cat);
      }
    }

    let recommendedTours = [];

    if (matchedCategories.length > 0) {
      // Search for tours matching any matched category in packageName or description
      recommendedTours = await TourPackage.find({
        $or: matchedCategories.map(cat => ({
          $or: [
            { packageName: { $regex: cat, $options: "i" } },
            { description: { $regex: cat, $options: "i" } }
          ]
        }))
      });
    }

    // Fallback: if no exact match, suggest top 3 tours
    if (recommendedTours.length === 0) {
      recommendedTours = await TourPackage.find().limit(3);
    }

    // Prepare rich response
    const botResponse = recommendedTours.map(t => ({
      name: t.packageName,
      description: t.description,
      price: t.price,
      imageURL: t.imageURL,
      link: `/travel/${t._id}`
    }));

    res.json({ botResponse });

  } catch (err) {
    console.error(err);
    res.json({ botResponse: [{ name: "Error", description: "Something went wrong!" }] });
  }
});

module.exports = router;
