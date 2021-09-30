# PSSME - Pretty Soldier Sailor Moon Editor (Arcade)
An editor for the game Pretty Solider Sailor Moon (Arcade).
<br/>

You can access the editor [here](https://gamehackfan.github.io/pssme/).
<br/><br/>

Version 0.7 Changes:
- New colors added for the sailors. Player 2 now is forced to play with the 2nd color.
- The new colors automatically fix a color pallete bug that happened when 2 of the same sailor was picked and then after dying, one of the players switches to another sailor, making one of the players use a wrong pallete.
- Renamed NormalRandomProfile to MidRandomProfile so it can be less than 5 letters to fit the title screen (Mid).
- Renamed SavageRandomProfile to WildRandomProfile so it can be less than 5 letters to fit the title screen (Wild).
- Added one more RandomProfile called WeakRandomProfile (Weak).
- Copied all the data from EasyRandomProfile to WeakRandomProfile (Easy was too easy).
- Changed the value for EasyRandomProfile, it is now a new level with different values (a little bit harder).
- Cleaned data that shouldn't be in the New Features Patch.
- Forced the Level Editor to apply the New Features Patch.
- Added code to fix the HP for the randomizer because of the changes made to the New Features Patch.
- Fixed pallete start address in the Color Pallete Editor.
- Added hints for the sailor colors in the Color Pallete Editor.
- Expanded the pallete amount in the color pallete editor to include the sailor extra palletes.
- Created the Sailor Color Expansion Patch with the new palletes and the assembly code to handle it.
- Added the Sailor Color Expansion Patch to the patchmap.
- Forced the randomizer and the Level Editor to apply the sailor color expansion patch.

See all changes made [here](https://github.com/GameHackFan/pssme/blob/main/changelog).
<br/><br/>

Known Bugs:
- Game Over on stage 2 and 4 can bug Morga / Garoben on the next gameplay (reset the game to fix this).
- Maybe some of the palletes used by the extra enemies that looked empty might actually be in use, changing the colors of some objects (might be true or not).
- Because of where the cursor starts in the select screen of the original game, Mercury has player 2 flags set on her and Moon has player 1 flags set on her. This makes mercury load the alternative color since the code is forcing player 2 to always spawn with the alternative color.
<br/><br/>

OBS: With the v0.7 update, maybe doing the same thing done for the sailors could allow more extra colors for the enemies. Changing the way crystals are spent could also be a good feature to have. I feel like there is not much to be done anymore.
