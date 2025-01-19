
## IRCAM AMPLIFY PLAYGROUND

run:

```bash
npm i --legacy-peer-deps
```

exercice for IRCAM Amplify using their API. <br>

modules used:
  timepitchcontrol <br>
  stereotospatial <br>

  
click on init audio button <br>

select a track from the catalogue, or upload yours <br>


### signal flow
the raw audio is first stretched down <br>
then the raw, as well as the stretched audio, are being spatialized using presets 1, 3 and 5 <br>


### track from the catalogue:
the tracks from the catalogue are already processed, their IAS is stored in a supabase db <br>
on a track selection, related samples are requested from the ircam amplify server <br>
please wait for the loader to disapear before starting clicking on the playground buttons <br>
<br>
aisha devi's stretched factor is a bit too high (0.8) to really be felt as slowed down if user doesn't know the original track<br>
the effect has been pushed further on haley blais's one (0.5)<br>


### file upload
the file upload takes few minutes to process the track through the whole chain<br>
user has an indication of the current step of the process above the 'go to playground' button<br>
the process is finished when there is no more text<br>
atm, please reload the page and select the newly updated track from the catalogue<br>


### playground
on a button click, a new audio source is initialized with corresponding button combination
