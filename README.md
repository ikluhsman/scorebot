# ScoreBot

ScoreBot is an app for keeping score of card games, darts, dominoes, dice, or any other game where you keep a basic running total of points. It is easy to use on a tablet or cell phone at the game table.

The app is available at [https://scorebot.app](https://scorebot.app), and it is a PWA that is a web app but acts like a phone app.

## Install

### Web Browser
You can use the app in a web browser at https://scorebot.app

or

### Install App on Home Screen/Desktop

1. Visit https://scorebot.app

1. Using Google Chrome, click the three ellipses in the top-right corner of the browser, then choose "Install ScoreBot"

1. A desktop shortcut will be installed on your device's home screen or desktop.

### Usage

1. When you get to the page you'll find a blank scoreboard.

1. Click the user with the + sign in the upper-right corner to add players to the score board.

1. Enter scores for each player.

1. When you're done with the game, click the save button on the button bar. A link will be generated so you can re-load your game later. Keep the link in case you want to remember your game.

### Tips:

* Click each player name to change the name of the players, click on the game name to change it, or click on goal to change the winning point goal.
* As scores are entered, the current leader will be shown highlighted in green. If you have set a winning goal, the winner(s) will be highlighted when they reach the goal.
* The winners can gloat by saving a link and sharing it on social media with other players.
* Make sure to save frequently, and keep the link to the final game somewhere so you can get back to it easily.
* CAUTION: Refreshing the browser will cause the score card to revert back to the last saved snapshot. Save frequently!

## Developer Notes

### Contributing
If you want to contribute please simply fork the project, commit your features/fixes, and submit a pull request.

### Submitting Bugs
If you find a bug, have a good idea, or find that the app doesn't work on your device, let me know by creating an issue in the GitHub project.
### Architecture
* Nuxt.js 2.15.8 on Vue 2.6.14
* Nuxt.js build in static mode with SSR off, the app is client-only
* Uses Tailwind for most of the CSS styling
* Uses sass & sass-loader to load a global scss stylesheet
* Uses Nuxt pwa module to publish the pwa installer

### Conceptual Notes
The idea of the app is that you can create a basic score sheet for card games, dice games, darts, and many other games where tracking a score is necessary. You can load the app on a tablet or phone, and add scores for each player as you play the game with no pen or paper. You can save a game, which generates a link using the data you have entered on the score cards. It basically wraps the score card information into a json payload and converts it to a base64 string which is used in an id parameter in the URL. The app listens at `https://scorebot.app/scores` endpoint for an id parameter such as `https://scorebot.app/scores?id=base64String`. When this endpoint is loaded in the browser it unwinds the base64 object and loads the data into the ScoreBot component.

There are obvious issues with how this works, and this kind of saving of the scoreboards was a temporary shortcut to mimic storing and fetching the saved data from a CDN. See the next section on future plans for the project for more details on how a data store might be implemented in the future.

### Future Development Plans, Features, etc

* If a data back-end is implemented, it is likely a serverless solution would be used to either store the json payload directly or use the base64 string with a reference ID used in the URL that would load each record. Most likely platform would be firebase or something similar that would be on a free tier.
* Google user login to associate saved games with a user, so users can get back to their games easily. Consider other platform logins such as iCloud or Microsoft Live.


