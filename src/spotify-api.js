"use strict";
const request = require("request-promise");
const { Base64 } = require("js-base64");
const ytdl = require("ytdl-core-discord");
const YouTube = require("simple-youtube-api");

module.exports = class Spotify {
  constructor(details = {}) {
    this.details = details;
    if (!this.details.clientID)
      return console.error("You must specify a Spotify ID!");
    if (!this.details.clientSecret)
      return console.error("You must specify a Spotify Secret!");
    this.authOptions = {
      url: "https://accounts.spotify.com/api/token",
      headers: {
        Authorization: `Basic ${Base64.encode(
          this.details.clientID + ":" + this.details.clientSecret
        )}`,
      },
      form: {
        grant_type: "client_credentials",
      },
      json: true,
    };
  }

  async searchTrack(trackName, options = {}) {
    let APIOptions;
    await request.post(this.authOptions, async (error, response, body) => {
      if (error) return console.error(error);
      else if (response.statusCode === 429)
        return console.error("Too many requests!");
      else if (response.statusCode === 400)
        return console.error("Invalid arguments!");
      else if (options.limit && options.limit > 50)
        return console.error("The limit cannot be higher than 50!");
      var token = body.access_token;
      APIOptions = {
        url: `https://api.spotify.com/v1/search?q=${encodeURI(
          trackName
        )}&type=track&offset=0&limit=${options.limit || 1}`,
        headers: {
          Authorization: "Bearer " + token,
        },
        json: true,
      };
    });
    let data = await request.get(APIOptions);
    return data.tracks.items;
  }

  async searchPlaylist(playListName, options = {}) {
    let APIOptions;
    await request.post(this.authOptions, async (error, response, body) => {
      if (error) return console.error(error);
      else if (response.statusCode === 429)
        return console.error("Too many requests!");
      else if (response.statusCode === 400)
        return console.error("Invalid arguments!");
      else if (options.limit && options.limit > 50)
        return console.error("The limit cannot be higher than 50!");
      var token = body.access_token;
      APIOptions = {
        url: `https://api.spotify.com/v1/search?q=${encodeURI(
          playListName
        )}&type=playlist&offset=0&limit=${options.limit || 1}`,
        headers: {
          Authorization: "Bearer " + token,
        },
        json: true,
      };
    });
    let data = await request.get(APIOptions);
    return data.playlists.items;
  }

  async searchAlbum(albumName, options = {}) {
    let APIOptions;
    await request.post(this.authOptions, async (error, response, body) => {
      if (error) return console.error(error);
      else if (response.statusCode === 429)
        return console.error("Too many requests!");
      else if (response.statusCode === 400)
        return console.error("Invalid arguments!");
      else if (options.limit && options.limit > 50)
        return console.error("The limit cannot be higher than 50!");
      var token = body.access_token;
      APIOptions = {
        url: `https://api.spotify.com/v1/search?q=${encodeURI(
          albumName
        )}&type=album&offset=0&limit=${options.limit || 1}`,
        headers: {
          Authorization: "Bearer " + token,
        },
        json: true,
      };
    });
    let data = await request.get(APIOptions);
    return data.albums.items;
  }

  async searchArtist(artistName, options = {}) {
    let APIOptions;
    await request.post(this.authOptions, async (error, response, body) => {
      if (error) return console.error(error);
      else if (response.statusCode === 429)
        return console.error("Too many requests!");
      else if (response.statusCode === 400)
        return console.error("Invalid arguments!");
      else if (options.limit && options.limit > 50)
        return console.error("The limit cannot be higher than 50!");
      var token = body.access_token;
      APIOptions = {
        url: `https://api.spotify.com/v1/search?q=${encodeURI(
          artistName
        )}&type=artist&offset=0&limit=${options.limit || 1}`,
        headers: {
          Authorization: "Bearer " + token,
        },
        json: true,
      };
    });
    let data = await request.get(APIOptions);
    return data.artists.items;
  }

  async getTrack(trackID) {
    let APIOptions;
    await request.post(this.authOptions, async (error, response, body) => {
      if (error) return console.error(error);
      var token = body.access_token;
      APIOptions = {
        url: `https://api.spotify.com/v1/tracks/${trackID}`,
        headers: {
          Authorization: "Bearer " + token,
        },
        json: true,
      };
    });
    return await request.get(APIOptions);
  }

  async getPlaylist(playListID) {
    let APIOptions;
    await request.post(this.authOptions, async (error, response, body) => {
      if (error) return console.error(error);
      var token = body.access_token;
      APIOptions = {
        url: `https://api.spotify.com/v1/playlists/${playListID}`,
        headers: {
          Authorization: "Bearer " + token,
        },
        json: true,
      };
    });
    return await request.get(APIOptions);
  }

  async getAlbum(albumID) {
    let APIOptions;
    await request.post(this.authOptions, async (error, response, body) => {
      if (error) return console.error(error);
      var token = body.access_token;
      APIOptions = {
        url: `https://api.spotify.com/v1/albums/${albumID}`,
        headers: {
          Authorization: "Bearer " + token,
        },
        json: true,
      };
    });
    return await request.get(APIOptions);
  }

  async getArtist(artistID) {
    let APIOptions;
    await request.post(this.authOptions, async (error, response, body) => {
      if (error) return console.error(error);
      var token = body.access_token;
      APIOptions = {
        url: `https://api.spotify.com/v1/artists/${artistID}`,
        headers: {
          Authorization: "Bearer " + token,
        },
        json: true,
      };
    });
    return await request.get(APIOptions);
  }

  async getUser(userID) {
    let APIOptions;
    await request.post(this.authOptions, async (error, response, body) => {
      if (error) return console.error(error);
      var token = body.access_token;
      APIOptions = {
        url: `https://api.spotify.com/v1/users/${userID}`,
        headers: {
          Authorization: "Bearer " + token,
        },
        json: true,
      };
    });
    return await request.get(APIOptions);
  }

  async getTrackByURL(trackURL) {
    let regex = /(?<=https:\/\/open\.spotify\.com\/track\/)([a-zA-Z0-9]{15,})/g;
    let trackID = trackURL.match(regex)[0];
    return await this.getTrack(trackID);
  }

  async getAlbumByURL(albumURL) {
    let regex = /(?<=https:\/\/open\.spotify\.com\/album\/)([a-zA-Z0-9]{15,})/g;
    let albumID = albumURL.match(regex)[0];
    return await this.getAlbum(albumID);
  }

  async getPlaylistByURL(playlistURL) {
    let regex = /(?<=https:\/\/open\.spotify\.com\/playlist\/)([a-zA-Z0-9]{15,})/g;
    let playListID = playlistURL.match(regex)[0];
    return await this.getPlaylist(playListID);
  }

  async getUserByURL(userURL) {
    let regex = /(?<=https:\/\/open\.spotify\.com\/user\/)([a-zA-Z0-9]{15,})/g;
    let userID = userURL.match(regex)[0];
    return await this.getUser(userID);
  }

  async playTrack(trackURL, options = {}) {
    this.apiKey = options.apiKey;
    this.connection = options.connection;
    if (!this.apiKey) return console.error("Please provide an API Key!");
    if (!this.connection)
      return console.error("Please provide a voice connection!");
    const youtube = new YouTube(this.apiKey);
    const track = await this.getTrackByURL(trackURL);
    const ytSearch = await youtube.searchVideos(
      track.name + " " + track.artists[0].name,
      1
    );
    const ytTrackURL = ytSearch[0].url;
    return await this.connection.play(await ytdl(ytTrackURL), { type: "opus" });
  }

  async playList(playlistURL, options = {}) {
    let queue = [];
    this.apiKey = options.apiKey;
    this.connection = options.connection;
    if (!this.apiKey) return console.error("Please provide an API Key!");
    if (!this.connection)
      return console.error("Please provide a voice connection!");
    const youtube = new YouTube(this.apiKey);
    const playlist = await this.getPlaylistByURL(playlistURL);
    for (var i = 0; i < playlist.tracks.items.length; i++) {
      const track = playlist.tracks.items[i];
      let ytSearch = await youtube.searchVideos(
        track.track.name + " " + track.track.artists[0].name,
        1
      );
      queue.push(ytSearch[0].url);
    }
    return await play(queue, options.connection);
  }

  async playAlbum(albumURL, options = {}) {
    let queue = [];
    this.apiKey = options.apiKey;
    this.connection = options.connection;
    if (!this.apiKey) return console.error("Please provide an API Key!");
    if (!this.connection)
      return console.error("Please provide a voice connection!");
    const youtube = new YouTube(this.apiKey);
    const album = await this.getAlbumByURL(albumURL);
    for (var i = 0; i < album.tracks.items.length; i++) {
      const track = album.tracks.items[i];
      let ytSearch = await youtube.searchVideos(
        track.name + " " + track.artists[0].name,
        1
      );
      queue.push(ytSearch[0].url);
    }
    return await play(queue, options.connection);
  }
};

const play = async (queue, connection) => {
  connection
    .play(await ytdl(queue[0]), { type: "opus" })
    .on("finish", async () => {
      if (queue.length === 0) return;
      queue.shift();
      play(queue, connection);
    });
};
