const tourPackages = [
  {
    packageName: "Himalayan Escape",
    description: "Experience the serene beauty of the Himalayas with trekking, local cuisine, and traditional stays.",
    includes: [
      "Accommodation",
      "Local Transport",
      "Meals",
      "Tour Guide"
    ],
    imageFileName: "himalayan_escape.jpg",
   imageURL:"https://images.unsplash.com/photo-1559677963-cc2b7fae1a17?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"

,
    price: 15000,
    location: "Manali, Himachal Pradesh",
    country: "India"
  },
  {
    packageName: "Desert Safari Delight",
    description: "Ride camels and enjoy the golden dunes of Rajasthan with cultural shows and heritage hotels.",
    includes: [
      "Luxury Tents",
      "Camel Safari",
      "Folk Dance & Music",
      "Breakfast & Dinner"
    ],
    imageFileName: "desert_safari.jpg",
    imageURL:"https://images.unsplash.com/photo-1580036599210-4c8ad7b3a2c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",


    price: 12000,
    location: "Jaisalmer, Rajasthan",
    country: "India"
  },
  {
    packageName: "Swiss Alps Adventure",
    description: "Uncover the majestic Swiss Alps with train rides, chocolate factory visits, and mountain hiking.",
    includes: [
      "Hotel Stay",
      "Swiss Rail Pass",
      "Chocolate Tour",
      "Breakfast"
    ],
    imageFileName: "swiss_alps.jpg",
    imageURL:"https://images.unsplash.com/photo-1500829243549-3c24e9a9af27?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    
    price: 85000,
    location: "Interlaken",
    country: "Switzerland"
  },
  {
    packageName: "Zurich City Explorer",
    description: "Discover Zurich's urban charm, lakeside beauty, art galleries, and famous shopping streets.",
    includes: [
      "City Tour",
      "Lake Cruise",
      "Museum Pass",
      "Hotel with Breakfast"
    ],
    imageFileName: "zurich_explorer.jpg",
    imageURL:"https://images.unsplash.com/photo-1549640459-5266d971a1a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",

    price: 78000,
    location: "Zurich",
    country: "Switzerland"
  }
];

module.exports = { data:tourPackages };
