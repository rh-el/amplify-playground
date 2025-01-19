
## IRCAM AMPLIFY PLAYGROUND

run:

```bash
npm i --legacy-peer-deps
```

exercice for IRCAM Amplify using their API.

modules used:
  timepitchcontrol
  stereotospatial

  
click on init audio button

select a track from the catalogue, or upload yours


### signal flow
the raw audio is first stretched down
then the raw, as well as the stretched audio, are being spatialized using presets 1, 3 and 5


### track from the catalogue:
the tracks from the catalogue are already processed, their IAS is stored in a supabase db.
on a track selection, related samples are requested from the ircam amplify server
please wait for the loader to disapear before starting clicking on the playground buttons

aisha devi's stretched factor is a bit too high (0.8) to really be felt as slowed down if user doesn't know the original track
the effect has been pushed further on haley blais's one (0.5)


### file upload
the file upload takes few minutes to process the track through the whole chain
user has an indication of the current step of the process above the 'go to playground' button
the process is finished when there is no more text
atm, please reload the page and select the newly updated track from the catalogue


### playground
on a button click, a new audio source is initialized with corresponding button combination
