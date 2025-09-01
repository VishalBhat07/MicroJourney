import express from "express";
import generateTourStops from "../utils/generateTour.js";
import getPlaceInfo from "../utils/getPlaceInfo.js";

const tourRouter = express.Router();

tourRouter.post("/generate-tour", async (req, res) => {
  try {
    const { city, interests } = req.body;

    if (!city || typeof city !== "string" || !city.trim()) {
      return res
        .status(400)
        .json({ success: false, message: "City is required" });
    }
    if (!interests || typeof interests !== "string" || !interests.trim()) {
      return res
        .status(400)
        .json({ success: false, message: "Interests are required" });
    }

    console.log("Generating tour for:", city, "with interests:", interests);

    const stops = await generateTourStops(city.trim(), interests.trim());

    console.log("Generated stops:", stops);

    return res.status(200).json({ success: true, data: stops });
  } catch (error) {
    console.error("Error generating tour:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to generate tour",
      error: error.message,
    });
  }
});

tourRouter.post("/info", getPlaceInfo);

export default tourRouter;
