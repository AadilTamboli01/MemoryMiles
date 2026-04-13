import Story from "../Models/story.model.js";
import cloudinary from "../Lib/cloudinary.js";
export const addStory = async (req, res) => {
    try {
        const { title, story, visitedDate, imageURL, visitedLocation } = req.body;
        userId = req.userId;

        // verify required field 
        if (!title || !story || !visitedDate || !imageURL || !visitedLocation) {
            return res.status(400).json({ success: false, message: "All Fields are required  " })
        }

        // convert visited date 
        const parsedVisitedDate = new Date(parseInt(visitedDate));
        const newStory = new Story({
            visitedDate: parsedVisitedDate, title, story, imageURL, visitedLocation, userId
        })
        await newStory.save();
        res.status(201).json({ success: true, message: " New story created " })
    } catch (error) {
        console.log("error occure in the addstory")
    }
}

export const getAllStory = async (req, res) => {
    try {
        const userId = req.userId;

        const allstory = (await Story.find({ userId })).sort({ isFavourite: -1 })
        res.status(200).json({ stories: allstory })
    } catch (error) {
        console.log("Error Occure in the get all story controller ")
    }
}

export const imageUpload = async (req, res) => {
    try {
        // checking for file is uploaded or not 
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        //  upload to cloudinary
        const stream = cloudinary.uploader.upload_stream(
            { folder: "myapp" }, // 
            (error, result) => {
                if (error) {
                    return res.status(500).json({ error: error.message });
                }

                return res.status(200).json({
                    message: "Uploaded successfully",
                    ImageURL: result.secure_url,
                });
            }
        );

        //  send buffer to cloudinary
        stream.end(req.file.buffer);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}





module.exports = router;