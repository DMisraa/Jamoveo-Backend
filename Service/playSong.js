import axios from "axios";
import * as cheerio from "cheerio";

export default async function playSong(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const songUrl = String(req.query.query);
  console.log('Song URL:', songUrl)
  
  if (!songUrl) {
    return res.status(400).json({ error: "Missing song URL" });
  }

  const instrumentParamMap = {
    piano: "?type=piano&cDeDi=2",
    ukulele: "?type=ukulele&cDeDi=3",
    lyrics: "/lyrics", // Different path for lyrics
  };
  
  const instrument = req.query.instrument || "guitar";
  const instrumentSuffix = instrumentParamMap[instrument] || "";
  const songUrlWithInstrument = songUrl.includes("/lyrics") ? songUrl : songUrl + instrumentSuffix;

  // song url https://www.tab4u.com//tabs/songs/6339_The_Beach_Boys_-_California_Feelin%26%2339%3B.html
   // https://www.tab4u.com/tabs/songs/6339_The_Beach_Boys_-_California_Feelin%26%2339%3B.html?type=piano&cDeDi=2 url for piono

   // snow
   // song url guitar : https://www.tab4u.com//tabs/songs/3225_Red_Hot_Chili_Peppers_-_Snow.html
   // sonn url pioni: https://www.tab4u.com/tabs/songs/3225_Red_Hot_Chili_Peppers_-_Snow.html?type=piano&cDeDi=2
   // song ulr yukalele: https://www.tab4u.com/tabs/songs/3225_Red_Hot_Chili_Peppers_-_Snow.html?type=ukulele&cDeDi=3
   // song url only lyrics: https://www.tab4u.com/lyrics/songs/3225_Red_Hot_Chili_Peppers_-_Snow.html#song
  try {
    // Fetch the song page
    const response = await axios.get(songUrlWithInstrument);
    const $ = cheerio.load(response.data);
    console.log('response Data:', response.data)

    // Extract song title
    const title = $("h1.song-title").text().trim() || $("title").text().trim();

    // Extract artist name
    const artist = $(".artist-name").text().trim();

  // Initialize arrays to hold lyrics and chords
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

   const imageUrl = $("span.artPicOnTop").css("background-image");

   // Debug the raw image URL extracted
   console.log("Raw background-image URL:", imageUrl);

   // Clean the image URL
   const imageUrlCleaned = imageUrl ? imageUrl.replace(/^url\(["']?/, '').replace(/["']?\)$/, '') : null;
   console.log("Cleaned Image URL:", imageUrlCleaned);

    console.log("Song Title:", title);
    console.log("Lyrics:", lyrics);
    console.log("Chords:", chords);

    res.json({ title, artist, lyrics, chords, imageUrl: imageUrlCleaned });
  } catch (error) {
    console.error("Error fetching song details:", error);
    res.status(500).json({ error: "Failed to fetch song details" });
  }
}
