import OpenAI from 'openai';

// Initialize OpenAI API
const openai = new OpenAI({
    apiKey: 'sk-proj-PmRZheqLQuB191updPkNT3BlbkFJumzmIZDUSwa3pCanUONv', 
    dangerouslyAllowBrowser: true
});

const removeHtmlTags = (text) => {
    return text.replace(/<\/?[^>]+(>|$)/g, "");
};

const getFirstFourParagraphs = (text) => {
    const paragraphs = text.split('\n\n').slice(0, 4);
    return paragraphs.join('\n\n');
};

const summarizeText = async (text) => {
    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo', // Use the appropriate model
            messages: [
                { role: 'system', content: 'You are a helpful assistant who provides concise summaries.' },
                { role: 'user', content: `Being concise and possible, summarize the following text into a 3 main points: \n\n${text}` }
            ],
            max_tokens: 150,
        });
        return response.choices[0].message.content.trim();
    } catch (error) {
        console.error('Error summarizing text:', error);
        return 'An error occurred while summarizing the text.';
    }
};

export async function generate(topic) {
    try {
        const apiUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exintro=true&titles=${topic}&origin=*`;

        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.query && data.query.pages) {
            const pages = data.query.pages;
            const pageId = Object.keys(pages)[0];
            const extract = pages[pageId].extract;

            if (!extract || extract.trim() === "") {
                return "No summary available for this topic.";
            } else {
                // Remove HTML tags and extract the first four paragraphs
                const cleanedText = removeHtmlTags(extract);
                const firstFourParagraphs = getFirstFourParagraphs(cleanedText);

                // Summarize the first four paragraphs using OpenAI API
                const summary = await summarizeText(firstFourParagraphs);
                const p1 = summary.slice(summary.indexOf('1.'), summary.indexOf('2.'))
                const p2 = summary.slice(summary.indexOf('2.'), summary.indexOf('3.'))
                const p3 = summary.slice(summary.indexOf('3.'))
                const formatedText = `${p1}\n${p2}\n${p3}`
                return formatedText;
            }
        } else {
            return "No summary available for this topic.";
        }
    } catch (error) {
        console.error('Error:', error);
        return "An error occurred while fetching or summarizing the content.";
    }
}
