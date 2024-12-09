const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("YOUR_API_KEY"); // Replace with your API key
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Use the appropriate model version

exports.getData = async (template, code, description) => {
    const prompt = `
    ${template}

    Here is the code snippet: ${code.slice(0, -1)} \n and here is the code description: ${description.slice(0, -1)}

    Please generate output in GitHub Flavored Markdown. To create lists in Markdown, use this format '- 1', '- 2', etc.
    `;

    try {
        // Generating content with the updated Gemini model
        const result = await model.generateContent(prompt);

        // Accessing the generated response and cleaning it
        const output = result.response.text().slice(3).slice(0, -3);
        return output;

    } catch (error) {
        console.error("Error fetching data from Gemini API:", error);
        throw error; // Handle the error appropriately
    }
};
