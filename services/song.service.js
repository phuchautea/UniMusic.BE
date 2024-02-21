const songRepository = require('../repositories/song.repository');
const slugify = require('slugify');
const fs = require('fs');
const os = require('os');
const axios = require('axios');
const path = require('path');
const s3Service = require('./s3.service');


class SongService {
    async getAll(page = 1, limit = 10) {
        return songRepository.getFilteredSongs(page, limit);
        // return songRepository.getFilteredSongs(page, limit, { artist: 'someArtistId' }, { releaseDate: -1 });
        // return songRepository.getSongList(page, limit);
    }

    async getById(songId) {
        return songRepository.getById(songId);
    }

    async getBySlug(songSlug) {

        // const specificSongAnd = await songRepository.getFilteredSong({ 
        //     artist: 'specificArtistId',
        //     genre: 'specificGenreId'
        // });
        
        // // Example usage of fetching a single song with multiple filters using OR logic
        // const specificSongOr = await songRepository.getFilteredSong(
        //     { 
        //         title: 'Some Title',
        //         year: 2020
        //     }, 
        //     true // This boolean indicates that you want to use OR logic
        // );
        return songRepository.getFilteredSong({ slug: songSlug });
        // return songRepository.getBySlug(songSlug);
    }

    async getByArtist(artistId, page = 1, limit = 10) {
        return songRepository.getFilteredSongs(page, limit, { artist: artistId });
        // return songRepository.getByArtist(artistId, page, limit);
    }
    
    async getByAlbum(albumId, page = 1, limit = 10) {
        return songRepository.getFilteredSongs(page, limit, { album: albumId });
        // return songRepository.getByArtist(artistId, page, limit);
    }

    async uploadSong(filePath) {
        const fileUrl = await s3Service.uploadFile(filePath);
        return fileUrl;
    }

    async create(songData) {
        let slug = slugify(songData.title, { lower: true, locale: 'vi' });
        let isUnique = false;
        let counter = 1;

        while (!isUnique) {
            const existingSong = await songRepository.findBySlug(slug);
            if (!existingSong) {
                isUnique = true;
            } else {
                slug = `${slug}-${counter}`;
                counter++;
            }
        }

        songData.slug = slug;
        if(songData.lyrics) {
            const rawLyrics = await this.parseLyrics(songData.lyrics);
            songData.rawLyrics = rawLyrics;
        }
        return songRepository.create(songData);
    }

    async update(songId, songData) {
        return songRepository.update(songId, songData);
    }

    async delete(songId) {
        return songRepository.delete(songId);
    }

    async downloadFile(url) {
        const fileName = path.basename(url);
        const tempPath = path.join(os.tmpdir(), fileName);
    
        const response = await axios({
            method: 'GET',
            url: url,
            responseType: 'stream',
        });
    
        const writer = fs.createWriteStream(tempPath);
    
        response.data.pipe(writer);
    
        return new Promise((resolve, reject) => {
            writer.on('finish', () => resolve(tempPath));
            writer.on('error', reject);
        });
    }


    async parseLyrics(filePath) {
        // const data = fs.readFileSync(path.join(__dirname, filePath), 'utf8');
        // const data = fs.readFileSync(filePath, 'utf8');
        // const url = await this.downloadFile(filePath);
        // console.log(url);
        // const data = fs.readFileSync(url, 'utf8');
        // console.log("🚀 ~ file: song.service.js:75 ~ SongService ~ parseLyrics ~ data:", data)

        const response = await axios.get(filePath);
        const data = response.data;
        

        
        
        const lines = data.split('\n');
        let rawLyrics = '';
        const lyrics = lines.map(line => {
            
            const match = line.match(/\[(\d{2}):(\d{2})\.(\d{2})\](.+)/);
            if (match) {
                const minutes = parseInt(match[1]);
                const seconds = parseInt(match[2]);
                const milliseconds = parseInt(match[3]);
                const text = match[4].trim();
                const cleanText = text.replace(/\[.+\]/g, '').trim();
                if(cleanText != ''){
                    rawLyrics += cleanText+'<br>';
                }
                // return { time: minutes * 60 * 1000 + seconds * 1000 + milliseconds, cleanText };
            }
        }).filter(Boolean);
        return rawLyrics;
    }
}

module.exports = new SongService();