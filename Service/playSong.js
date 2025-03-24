import axios from "axios";
import * as cheerio from "cheerio";

export default async function playSong(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  let songUrlWithInstrument
  const songUrl = String(req.query.query);
  
  
  if (!songUrl) {
    return res.status(400).json({ error: "Missing song URL" });
  }

    const songIdentifier = songUrl.split("/tabs/songs/")[1].split(".html")[0]
    const lyricsUrl = `https://www.tab4u.com/lyrics/songs/${songIdentifier}.html#song`

  const instrumentParamMap = {
    piano: "?type=piano&cDeDi=2",
    ukulele: "?type=ukulele&cDeDi=3",
    vocals: lyricsUrl
  };

  const songURLs = {
    guitarURL: songUrl,
    pianoURL: songUrl + instrumentParamMap.piano,
    ukuleleURL: songUrl + instrumentParamMap.ukulele,
    vocalsURL: lyricsUrl
  }
  
  const instrument = req.query.instrument || "guitar";
  
  try {
    // Fetch the song page
    if (instrument === 'vocals') {
      songUrlWithInstrument = songURLs.vocalsURL
    } else if (instrument === 'piano') {
      songUrlWithInstrument = songURLs.pianoURL
    } else if (instrument === 'yukalele') {
      songUrlWithInstrument = songURLs.ukuleleURL
    } else {
      songUrlWithInstrument = songURLs.guitarURL
    }

    const response = await axios.get(songUrlWithInstrument);
    const $ = cheerio.load(response.data);

    // Extract song title
    const title = $("h1.song-title").text().trim() || $("title").text().trim();


  const lyrics = [];
  const chords = [];

  // Extract lyrics from <td class="song">
  $("td.song").each((index, element) => {
    let lyricText = $(element).text().trim();
    lyricText = lyricText.replace(/&nbsp;/g, ' '); // Replace &nbsp; with space

    if (lyricText) {
      lyrics.push(lyricText); // Add lyric line to lyrics array
    }
  });

  // Extract chords from <span class="c_C">
  $("span.c_C").each((index, element) => {
    const onmouseoverAttr = $(element).attr("onmouseover");

    if (onmouseoverAttr) {
      // Extract the chord string from the onmouseover attribute
      const chordData = onmouseoverAttr.match(/'([^']+)'/);
      if (chordData && chordData[1]) {
        chords.push(chordData[1]); // Add chord to chords array
      }
    }
  });

   // extract image
   const imageUrl = $("span.artPicOnTop").css("background-image");

   // Clean the image URL
   const imageUrlCleaned = imageUrl ? imageUrl.replace(/^url\(["']?/, '').replace(/["']?\)$/, '') : null;

    res.json({ title, lyrics, chords, imageUrl: imageUrlCleaned });
  } catch (error) {
    console.error("Error fetching song details:", error);
    res.status(500).json({ error: "Failed to fetch song details" });
  }
}
