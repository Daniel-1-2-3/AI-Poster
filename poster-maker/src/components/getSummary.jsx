import puppeteer from 'puppeteer'
import OpenAI from 'openai'

// Initialize OpenAI API
const openai = new OpenAI({
    apiKey: 'sk-proj-PmRZheqLQuB191updPkNT3BlbkFJumzmIZDUSwa3pCanUONv', // Replace with your actual API key
});

// Function to fetch and extract the first 4 paragraphs from a URL
const fetchFirstFourParagraphs = async (url) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    // Extract the first 4 paragraphs
    const paragraphs = await page.evaluate(() => {
        const paraElements = Array.from(document.querySelectorAll('p'));
        return paraElements.slice(0, 4).map(p => p.innerText).join('\n\n');
    });

    await browser.close();
    return paragraphs;
};

// Function to summarize text using OpenAI API
const summarizeText = async (text) => {
    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo', // Use the appropriate chat model
            messages: [
                { role: 'system', content: 'You are a helpful assistant.' },
                { role: 'user', content: `Summarize the following text into dot jots:\n\n${text}` }
            ],
            max_tokens: 150,
        });
        return response.choices[0].message.content.trim();
    } catch (error) {
        console.error('Error summarizing text:', error);
        return '';
    }
};

// Function to summarize content from a URL
const summarizeFromURL = async (url) => {
    try {
        const textContent = await fetchFirstFourParagraphs(url);
        const summary = await summarizeText(textContent);
        console.log(`Summary for ${url}:`);
        console.log(summary);
        console.log('---');
    } catch (error) {
        console.error('Error summarizing content from URL:', error);
    }
};

// Example URL
const urlToSummarize = 'https://en.wikipedia.org/wiki/Tennis';

// Call the function to summarize the content from the URL
summarizeFromURL(urlToSummarize);