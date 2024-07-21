import axios from "axios";
import * as fs from 'fs';


function textPrompt(prompt: string) {
  axios
    .post("http://localhost:11434/api/generate", {
      model: "llama3",
      prompt,
      stream: false,
    })
    .then((res: any) => {
      console.log(
        `PROCESSED ${res.data.load_duration / 10 ** 9}secs. ${
          res.data.response
        }`
      );
    })
    .catch((error) => {
      console.error(error);
    });
}

// textPrompt("hello how are you??")

function convertImageToBase64(image: string): string {
    const imagePath = "image/" + image;
    const imageBuffer = fs.readFileSync(imagePath);
    const base64Image = imageBuffer.toString('base64');
    
    return base64Image;
}

function imagePrompt(image: string, prompt: string) {

    const base64Image = convertImageToBase64(image)
  
    axios
    .post("http://localhost:11434/api/generate", {
      model: "llava:7b",
      images: [base64Image],
      prompt,
      stream: false,
    })
    .then((res: any) => {
      console.log(
        `PROCESSED ${res.data.load_duration / 10 ** 6}secs. ${
          res.data.response
        }`
      );
    })
    .catch((error) => {
      console.error(error);
    });
}

// imagePrompt("effileindessert.jpg", "What is wrong about it...")
