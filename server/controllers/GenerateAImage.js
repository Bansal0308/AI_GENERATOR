import { HfInference } from "@huggingface/inference";
import * as dotenv from "dotenv";
import { createError } from "../error.js";
import { Buffer } from "buffer";

dotenv.config();

// Setup Hugging Face Inference with the API key
const hf = new HfInference(process.env.HF_ACCESS_TOKEN);

// Function to convert Blob to Base64
const blobToBase64 = async (blob) => {
  const arrayBuffer = await blob.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  return buffer.toString('base64');
};

// Controller to generate Image
export const generateImage = async (req, res, next) => {
  try {
    const { prompt } = req.body;

    // Query the Hugging Face API using the `fetch` function
    const response = await fetch(
      "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell",
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ inputs: prompt }),
      }
    );

    if (!response.ok) {
      // Handle HTTP errors
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Convert response to Blob
    const imageBlob = await response.blob();
    const base64Image = await blobToBase64(imageBlob);

    // Return the base64 string in the response
    //return res.status(201).json({ photo: `data:image/jpeg;base64,${base64Image}` });
    return res.status(201).json({ photo:base64Image})
  } catch (error) {
    next(createError(error.status, error?.message));
  }
};


// import { HfInference } from "@huggingface/inference";
// import * as dotenv from "dotenv";
// import { createError } from "../error.js";

// dotenv.config();

// // Function to query the Hugging Face API
// async function query(data) {
//   try {
//     const response = await fetch(
//       "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell",
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.HF_ACCESS_TOKEN}`,
//           "Content-Type": "application/json",
//         },
//         method: "POST",
//         body: JSON.stringify(data),
//       }
//     );

//     if (!response.ok) {
//       // Handle HTTP errors
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }

//     // Convert response to Blob
//     const result = await response.blob();
//     return result;
//   } catch (error) {
//     console.error("Error fetching image:", error.message);
//     throw error;
//   }
// }

// // Controller to generate Image
// export const generateImage = async (req, res, next) => {
//   try {
//     const { prompt } = req.body;

//     // Query the Hugging Face API using the `fetch` function
//     const imageBlob = await query({ inputs: prompt });

//     // Convert Blob to base64 data URL for usage
//     const reader = new FileReader();
//     reader.onloadend = function () {
//       const base64String = reader.result;
//       // Return the base64 string in the response
//       return res.status(201).json({ photo: base64String });
//     };
//     reader.readAsDataURL(imageBlob);

//   } catch (error) {
//     next(createError(error.status, error?.message));
//   }
// };



// import * as dotenv from "dotenv";
// import { createError } from "../error.js";

// dotenv.config();

// // Setup Hugging Face Inference with the API key
// const hf = new HfInference(process.env.HF_ACCESS_TOKEN);

// // Controller to generate Image
// export const generateImage = async (req, res, next) => {
//   try {
//     const { prompt } = req.body;

//     const model = "black-forest-labs/FLUX.1-schnell"; // Hugging Face model identifier
//     const imageBlob=await prompt.blob();

//     const result = await hf.textToImage({
//       inputs: imageBlob,  // Use the prompt provided by the client
//       model: model,
//       // n: 1,
//       // size: "1024x1024",
//       // response_format: "b64_json",
//     });

//     console.log(result);
//     const generatedImage = result.image; // Assuming the response includes the image in the `image` field

//     return res.status(201).json({ photo: generatedImage });
//   } catch (error) {
//     next(createError(error.status, error?.response?.data?.error?.message || error?.message));
//   }
// };




// import axios from "axios";
// import { createError } from "../error.js";

// export const generateImage = async (req, res, next) => {
//   try {
//     const { prompt } = req.body;
//     const options = {
//       method: 'POST',
//       url: `https://ai-text-to-image-generator-api.p.rapidapi.com/realistic`,
//       headers: {
//         'x-rapidapi-key': '656b7ac054msh6aa344fa99ecc81p13514fjsn9c9809e3d82a',
//         'x-rapidapi-host': 'ai-text-to-image-generator-api.p.rapidapi.com',
//         'Content-Type': 'application/json',
//       },
//       data: { prompt },
//     };

//     const response = await axios.request(options);

//     if (response.data && response.data.imageUrl) {
//       return res.status(200).json({ photo: response.data.imageUrl });
//     } else {
//       throw new Error('No image URL returned from API');
//     }
//   } catch (error) {
//     console.error('API call error:', error);
//     return next(createError(500, 'Failed to generate image. Please try again later.'));
//   }
// };

/*
import { HfInference } from "@huggingface/inference";
import dotenv from "dotenv";

dotenv.config();

const HF_ACCESS_TOKEN=process.env.HF_ACCESS_TOKEN;

const hf=new HfInference(HF_ACCESS_TOKEN);

const model="black-forest-labs/FLUX.1-schnell";
const imageUrl="blob:https://huggingface.co/cabac0d0-f7dd-4c5a-a637-ba2a23b03e22";

const response =await fetch(imageUrl);
const imageBlob=await response.blob();

const result=await hf.textToImage({
  inputs: 'award winning high resolution photo of a giant tortoise/((ladybird)) hybrid, [trending on artstation]',
  model: model,
  parameters: {
    negative_prompt: 'blurry',
  }
})
  */

/*
import axios from "axios";
import { createError } from "../error.js";

export const generateImage = async (req, res, next) => {
  const { prompt } = req.body;  // Get the prompt from the request body

  const options = {
    method: 'POST',
    url: 'https://ai-text-to-image-generator-api.p.rapidapi.com/realistic',
    headers: {
      'x-rapidapi-key': '656b7ac054msh6aa344fa99ecc81p13514fjsn9c9809e3d82a',
      'x-rapidapi-host': 'ai-text-to-image-generator-api.p.rapidapi.com',
      'Content-Type': 'application/json'
    },
    data: {
      prompt,  // Use the prompt provided by the client
    }
  };

  try {
    const response = await axios.request(options);
    const imageUrl = response.data.imageUrl;  // Assuming the API returns the image URL

    return res.status(200).json({ photo: imageUrl });
  } catch (error) {
    next(createError(error?.status, error?.response?.data?.error?.message || error?.message));
  }
};
*/



/*
import * as dotenv from "dotenv";
import { createError } from "../error.js";
import OpenAI from "openai";

dotenv.config();

// Setup OpenAI API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Controller to generate Image
export const generateImage = async (req, res, next) => {
  try {
    const { prompt } = req.body;

    const response = await openai.images.generate({
      prompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });

    const generatedImage = response.data[0].b64_json;
    return res.status(201).json({ photo: generatedImage });
  } catch (error) {
    next(createError(error.status, error?.response?.data?.error?.message || error?.message));
  }
};
*/




// import * as dotenv from "dotenv";
// import { createError } from "../error.js";
// import OpenAI from "openai";

// dotenv.config();

// // Setup OpenAI API key
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// // Controller to generate Image
// export const generateImage = async (req, res, next) => {
//   try {
//     const { prompt } = req.body;

//     const response = await openai.images.generate({
//       prompt:"generate a scifi image of ${prompt}",
//       n: 1,
//       size: "512x512",
//       response_format: "b64_json",
//     });

//     const generatedImage = response.data[0].b64_json;
//     return res.status(200).json({ photo: generatedImage });
//   } catch (error) {
//     next(createError(error.status, error?.response?.data?.error?.message || error?.message));
//   }
// };

/*
import * as dotenv from "dotenv";
import { createError } from "../error.js";
import axios from "axios";

dotenv.config();

// Setup Limewire API URL and API key
const LIMEWIRE_API_URL = process.env.LIMEWIRE_API_URL;
const LIMEWIRE_API_KEY = process.env.LIMEWIRE_API_KEY;

// Controller to generate Image
export const generateImage = async (req, res, next) => {
  try {
    const { prompt } = req.body;

    const config = {
      method: 'POST',
      url: LIMEWIRE_API_URL,  // Use the URL from .env file
      headers: {
        'Authorization': `Bearer ${LIMEWIRE_API_KEY}`,
        'Content-Type': 'application/json'
      },
      data: {
        prompt: prompt,
        n: 1,
        size: "1024x1024",
        response_format: "b64_json"
      }
    };

    const response = await axios.request(config);
    const generatedImage = response.data.data[0].b64_json;
    return res.status(200).json({ photo: generatedImage });
  } catch (error) {
    // next(createError(error.response ? error.response.status : 500, error.response?.data?.message || error.message));
    console.error("API Request Error:", error.response ? error.response.data : error.message);
    next(createError(error.response ? error.response.status : 500, error.response?.data?.message || error.message));
  }
  
};
*/