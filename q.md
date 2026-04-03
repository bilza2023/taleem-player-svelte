New Alignment
We are working on player-svelte project 
The mission is to have a completely wired ready player page (player - syllabus bar bottom nar bar all) as 1 svelte compoenent that we can later use as svelte componenet exported OR as compiled 
----> IMPORTANT : The component is 95% functional  --THERE ARE JUST FEW MINOR TWEEKS ---so longgggggggggggg discussions and then code-snippets.
NO BREAKGE is the mission.
LEts me explain once again
1: minor tweeks related to functionality 
2: css alignment --- for now we are using compiled css from other places not i have copied all css (1 file for each slide) since css must live where player lives. we have to test css here such that it is fine for mobile as well as large screens -- once again THIS IS DONE just need tweeking. 
here are css files
/home/bilal-tariq/00--TALEEM/taleem-player-svelte/src/css/barChart.css
All we have are 3 files
/home/bilal-tariq/00--TALEEM/taleem-player-svelte/src/player/Player.svelte
/home/bilal-tariq/00--TALEEM/taleem-player-svelte/src/player/BottomNavBar.svelte
/home/bilal-tariq/00--TALEEM/taleem-player-svelte/src/player/SyllabusBar.svelte

other than tweeking 1 major feature remains ---> clicking on syllabus link should load a new deck (this is obviously App.svelte responsisiblity) --this is easy nothing big about it. 

Please read the code above in detail this is what we work with with out major changes.
This is a very focused chat with concret steps 
minor tweeks  / bugs
1: When the player is running the range element is the lower nav bar does not follow time . HOWEVER when the range is scrubbed then it correctly move the time fwd/backward which is fine BUT when the player is running normal then it should follow time . 
2: For some reason the "stop" button does not work but pasue do .....
That it these are the 2 tweeks no more. 
3: NEXT : syllabus bar reloads new deck --minifeature
4: css tweeking 
End




