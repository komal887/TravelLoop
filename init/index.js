const mongoose = require("mongoose");
const initData = require("./data.js");
const Travel = require("../models/looping.js");

const dataStore = async () => {
  try {
    // optional: clear old data
    // await Travel.deleteMany({});

    // Map data and add owner ObjectId
    initData.data = initData.data.map((obj) => ({
      ...obj,
      owner: new mongoose.Types.ObjectId("68a14bad227c1f5f97e4cc61"),
    }));

    // Insert the updated data
    // await Travel.insertMany(initData.data);

    console.log("Database was reinitialized ✅");
  } catch (err) {
    console.error("Error initializing data:", err);
  }
};

// Just run the seeding logic (connection is already handled in app.js)
dataStore();
