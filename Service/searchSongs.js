import axios from "axios";
import * as cheerio from "cheerio";
import qs from "qs";

const loginUrl = "https://www.tab4u.com/"; 
const searchUrl = "https://www.tab4u.com/resultsSimple"; // URL to fetch after login

// login data 
const loginData = qs.stringify({
  username: "danielmenahem90@gmail.com", 
  password: "D9874123",
});

const cookies = [];

async function searchSong(req, res) {
  const searchQuery = String(req.query.query);
  axios.defaults.headers.common["Accept-Charset"] = "utf-8";
  cookies.length = 0;

  const { userId } = req.body;
  console.log("userId:", userId);

  if (!searchQuery) {
    return res.status(400).send({ error: "Search query is required." });
  }

  try {
    // Log in to the site
    const loginResponse = await axios.post(loginUrl, loginData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      withCredentials: true, 
    });

    // Capture the cookies from the login response
    cookies.push(...loginResponse.headers["set-cookie"]);

    // Search for the song using the search query
    const response = await axios.get(`${searchUrl}?q=${encodeURIComponent(searchQuery.substring(0, 50))}`, {
        headers: {
          "Cookie": cookies.join("; "),
        },
      });

    const $ = cheerio.load(response.data);
    const songs = [];

    // Extracting songs data
    $("a.songLinkT").each((index, element) => {
      const songTitle = $(element).find(".sNameI19").text().trim();
      const artistName = $(element).find(".aNameI19").text().trim();
      const relativeUrl = $(element).attr("href");
      const songUrl = relativeUrl.startsWith("http") ? relativeUrl : `${loginUrl}/${relativeUrl}`
      const imageStyle = $(element).find(".ruArtPhoto").attr("style");
      const songImage = imageStyle
        ? imageStyle.match(/url\(([^)]+)\)/)[1]
        : null;

      const fullImageUrl = songImage
        ? `https://www.tab4u.com${songImage}`
        : null;

      songs.push({
        title: songTitle,
        artist: artistName,
        image: fullImageUrl,
        relativeUrl: relativeUrl, 
        url: songUrl,
      });
    });

    return res.json({ results: songs });
  } catch (error) {
    console.error("Error during login or search:", error);
    return res.status(500).send({ error: "Error while crawling the website" });
  }
}

export default searchSong;
