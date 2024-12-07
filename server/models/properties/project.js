const mongoose = require("mongoose");
const slugify = require("slugify");

// Reusable sub-schema for gallery items
const galleryItemSchema = new mongoose.Schema(
  {
    path: { type: String, required: true },
   
  },
 
);

 

// Main Project Schema
const projectSchema = new mongoose.Schema(
  {
    RERA: { type: String, required: true },
    PropertySize: { type: String, required: true }, // Includes unit like sq ft
    ProjectStatus: { type: String, required: true },
    ProjectNameOnRera: { type: String, required: true },
    ProjectTypology: [{ type: String, required: true }],
    ProjectName: { type: String, required: true },
    slug: { type: String, unique: true },
    city: { type: String, required: true },
    locality: { type: String, required: true },
    BuilderName: { type: String, required: true }, // Builder's name
    QRCodeLink: { type: String, required: true }, // QR code URL
    price: {
      startingFrom: { type: Number },
      discount: { type: Number },
      basePrice: { type: Number },
      locationPremium: { type: Number },
      amenitiesCharge: { type: Number },
      tax: { type: Number },
      totalPrice: { type: Number },
    },
    projectLocation: {
      embedCode: { type: String },
      name: { type: String, required: true },
    },
    ContactNumber: { type: Number, required: true },
    thumbnail: { type: String, required: true },
    projectDescription: { type: String, required: true },
    amenities: [{ type: String, required: true }],
    floorPlan: {
      thumbnail: { type: String, required: true },
      floorPlan: { type: String, required: true },
    
    },
    AboutTheBuilder: {
      thumbnail: { type: String, required: true },
      description: { type: String, required: true },
    },
    Gallery: [galleryItemSchema],
    NearbyLocations:[{
      name: { type: String, required: true},
      distance: { type: String, required: true},
    }],
    Brochure: { type: String, required: true },
   
    YouTubeVideo: { type: String },
    WhereToShow: { type: String, required: true },
    PropertyCategory: { type: String, required: true },
    PropertyType: { type: String, required: true },
    Possesion: { type: String, required: true },
    Disclaimer: { type: String },
    metatitle: { type: String, required: true },
    metadescription: { type: String, required: true },
    metakeyword: { type: String, required: true },
    faqs: [
      {
        question: { type: String, required: true },
        answer: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

// Middleware to generate slug from ProjectName
projectSchema.pre("save", function (next) {
  if (this.isModified("ProjectName")) {
    this.slug = slugify(this.ProjectName, { lower: true, strict: true });
  }
  next();
});

// Create an index to improve search performance on frequently queried fields
projectSchema.index({ city: 1, locality: 1, ProjectName: 1 });

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
