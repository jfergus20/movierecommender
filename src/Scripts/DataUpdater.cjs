const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');
require('dotenv').config();
const apiReadKey = process.env.TMDB_READ_API;

async function fetchTMDBData() {

    const endpoint = '/movie/popular';
    const baseUrl = 'https://api.themoviedb.org/3';
    const url = `${baseUrl}${endpoint}`;

    try {
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${apiReadKey}`,
                'Content-Type': 'application/json;charset=utf-8'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching data from TMDB:', error.message);
        process.exit(1);
    }
}
async function updateDataFile() {
    try {
        const data = await fetchTMDBData();
        //console.log("keys: " + Object.keys(data.results[1]))
        const formattedData = data.results.map(movie => ({
            id: movie.id,
            title: movie.title,
            //author: movie.original_language, // You might want to adjust this
            //country: movie.production_countries ? movie.production_countries[0]?.name : 'Unknown',
            //imageLink: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            //language: movie.original_language,
            link: `https://www.themoviedb.org/movie/${movie.id}`,
            //pages: movie.runtime || 0, // You might want to adjust this
            //year: new Date(movie.release_date).getFullYear()
        }));

        const projRoot = path.resolve(__dirname, '..', '..');
        const filePath = path.join(projRoot, 'src', 'Data.json');

        await fs.writeFile(filePath, JSON.stringify(formattedData, null, 2));
        console.log('Data.json has been updated successfully.');
    } catch (error) {
        console.error('Error updating Data.json:', error.message);
        process.exit(1);
    }
}
/*async function updateDataFile() {
    try {
        const data = await fetchTMDBData();
        console.log('\n\n\n')
        console.log("data: " + JSON.stringify(data, null, 3))
        const projRoot = path.resolve(__dirname)
        const filePath = path.join(projRoot, 'src', '../Data.json');

        await fs.writeFile(filePath, [JSON.stringify(data, null, 2)]);

        console.log('Data.json has been updated successfully.');

    } catch (error) {
        console.error('Error updating Data.json:', error.message);
        process.exit(1);
    }
}*/

updateDataFile();