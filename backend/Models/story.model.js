import mongoose from "mongoose"

const storySchema = new mongoose.Schema({
    title: { type: String, required: true },
    story: { type: String, required: true },
    visitedLocation: { type: [String], default: [] },
    isFavourite: { type: Boolean, default: false },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    imageURL: { type: String, required: true },
    visitedDate: { type: Date, required: true }
}, { timestamps: true })

const Story = mongoose.model("Story", storySchema);

export default Story;