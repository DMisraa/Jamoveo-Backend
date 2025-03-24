<h1> JaMoveo - Rehearsal Room Web App </h1>

<h2> Features </h2>

<h3> Authentication </h3>
<ul>
<li> <strong> Signup Page (Admin): </strong> Admins register through a dedicated URL to gain access to session management features. </li> 
  
<li> <strong> Signup Page: </strong> Users register with a username, password, and instrument. </li>

<li> <strong> Login Page: </strong> Users authenticate using their credentials. /li>
</ul>

<h3> Main Page </h3>
<ul>
Players: Initially see "Waiting for next song" until the admin selects one.

Admin: Can search for songs in English or Hebrew.

Song Search (Admin)

Admin enters a search query and navigates to a results page.

Displays song name, artist, and image (if available).

Upon selection, moves all users to the live page.
</ul>

Live Page

Displays the song title and author.

Singers see only lyrics.

Instrumentalists see both lyrics and chords.

Includes a toggle for auto-scrolling.

Admin has a "Quit" button that ends the session for all users.

Technical Details

Stack: Client-server architecture with real-time updates via WebSockets.

Database: Stores users and roles.

Deployment: Includes setup for user registration, with a dedicated admin URL.

Styling: Optimized for readability in a smoky rehearsal environment.

Deployment & Access

User Registration: Users can sign up via the signup page.

Admin Access: Admin registration occurs via a separate URL.

Live Demo: [Provide deployed URL]

Future Enhancements

Implement web crawling to fetch live song data from external sources.

Improve UI with animations and additional customization features.
