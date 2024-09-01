export async function getLinks(query) {
    const apiKey = '2b310ae0-67ce-11ef-9233-77e943c14913';
    const MisUrl = `https://app.zenserp.com/api/v2/search?q=${encodeURIComponent(query)}&apikey=${apiKey}`;

    const query1 = 'diamond sword wiki';
    const wikiUrl = `https://app.zenserp.com/api/v2/search?q=${encodeURIComponent(query1)}&apikey=${apiKey}`;
    try {
        //extract URL wikipedia
        const response1 = await fetch(wikiUrl);
        const data1 = await response1.json();
        const results1 = data1.organic || [];
        const wikiUrls = results1.slice(0, 1).map(result1 => result1.url);

        //extract URLs of other two search results
        const response = await fetch(MisUrl);
        const data = await response.json();
        const results = data.organic || [];
        const topTwoUrls = results.slice(0, 2).map(result => result.url);

        //concat results
        const finalList = [topTwoUrls[0], topTwoUrls[1], wikiUrls[0]]
        return finalList
    } catch (error) {
        console.error('Error fetching search results:', error);
        return ['', '', '']
    }
}