import Story from "../Models/story.model.js";
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