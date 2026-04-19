import axiosInstance from "./axiosInstance"

const uploadImage = async (imageFile) => {
    const formdata = new FormData()

    formdata.append("image", imageFile)

    try {
        const response = await axiosInstance.post("/story/image", formdata, {
            headers: {
                // headers for file upload
                "Content-Type": "multipart/form-data"
            },
            timeout: 60000
        })
        return response.data;
    } catch (error) {
        console.log("Error in the uploading the image ", error)
    }
}

export default uploadImage;