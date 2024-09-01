const apiKey = '2b310ae0-67ce-11ef-9233-77e943c14913';
const query = 'tennis';
const url = `https://app.zenserp.com/api/v2/search?q=${encodeURIComponent(query)}&apikey=${apiKey}`;

const query1 = 'diamond sword wiki';
const url1 = `https://app.zenserp.com/api/v2/search?q=${encodeURIComponent(query1)}&apikey=${apiKey}`;

const getWikiLinks = async () => {
    try {
        const response1 = await fetch(url1);
        const data1 = await response1.json();

        // Extract URLs of the first search result
        const results1 = data1.organic || [];
        const wikiUrls = results1.slice(0, 1).map(result1 => result1.url);

        const response = await fetch(url);
        const data = await response.json();

        // Extract URLs of the first 3 search results
        const results = data.organic || [];
        const topThreeUrls = results.slice(0, 2).map(result => result.url);

        const finalList = [topThreeUrls[0], topThreeUrls[1], wikiUrls[0]]
        console.log(finalList)
    } catch (error) {
        console.error('Error fetching search results:', error);
    }
}

// getWikiLinks(); // Uncomment to run the function
getWikiLinks();