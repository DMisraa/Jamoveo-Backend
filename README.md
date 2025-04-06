<h1> JaMoveo - Rehearsal Room Web App </h1>

<h2> Features </h2>

<h3> Authentication </h3>
<ul>
<li> <strong> Signup Page (Admin): </strong> Admins register through a dedicated URL to gain access to session management features. </li> 
  
<li> <strong> Signup Page: </strong> Users register with a username, password, and instrument. </li>

<li> <strong> Login Page: </strong> Users authenticate using their credentials. </li>
</ul>

<h3> Main Page </h3>

<ul> 
  <li> <strong> Main Page (Admin): </strong> The admin's main page allows them to search for songs in English (Hebrew not available yet). Once a song is selected from the results, all users are moved to the live page. </li> 
  <li> <strong> Main Page (Player): </strong> Players see a waiting screen with the message "Waiting for next song" until the admin selects a song, at which point they are redirected to the live page. </li>
</ul>

<h3> Live Page </h3>
<ul>
<li> Displays the song title and author. </li>

<li> Singers see lyrics + chords (not managed to fix this yet). </li>

<li> Instrumentalists see both lyrics and chords. </li>

<li> Includes a toggle for auto-scrolling. </li>
</ul>

<h3> Routes </h3>

<ul>

<li> <strong> "/" - </strong> Login </li>
<li> <strong> "/signup" - </strong> User signup page </li>
<li> <strong> "/adminSignup" - </strong> Admin signup page </li>
<li> <strong> "/playerMainPage"  - </strong> User Main Page waiting for a song to be picked </li>
<li> <strong> "/adminMainPage" - </strong> Admin Main Page - admin searches for a song for his session </li>
<li> <strong> "/adminMainPage/adminResultsPage" - </strong> Admin picks a song from his search list he got from the previous page </li>
<li> <strong> "/live" - </strong> live page, where all the magic happens ! </li>
  
</ul>

<h3> Technical Details </h3>

  <li> <strong> Stack: </strong> Node.js, Next.JS, Tailwind CSS</li>

  <li> <strong> Database: </strong> Stores users and roles via MongoDB. </li>

  <li> <strong> Deployment: </strong> Railway & Vercel </li>

  <li> <strong> PageUpdates: </strong> Real-time updates via WebSockets. </li>

<h3> Deployment & Access </h3>

<ul>
<li> Implement web crawling to fetch live song data from external sources (Tab4U). </li>

<li> Improve UI with animations and additional customization features.
</ul>




