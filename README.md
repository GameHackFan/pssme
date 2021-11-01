# PSSME - Pretty Soldier Sailor Moon Editor (Arcade)
An editor for the game Pretty Solider Sailor Moon (Arcade).
<br/>

You can access the editor [here](https://gamehackfan.github.io/pssme/).
<br/><br/>

Version 1.0 Changes:
- Renamed JumouDamageImprovementPatch to JumouImprovementPatch.
- Created ThetisImprovementPatch. It increases her HP from 16 to 48.
- Created CastorAndPolluxImprovementPatch. It has assembly code that will load their HP from a different table that can handle color IDs from 0 to 9.
- Changed Castor & Pollux: ID 6 back to ID 1, ID A back to ID 2, Extra 1 to ID 7, Extra 2 ID 9.
- Forced the Randomizer to apply CastorAndPolluxImprovementPatch and ThetisImprovementPatch.
- Forced the Level Editor to apply CastorAndPolluxImprovementPatch.
- Renamed Player Health Editor to Character Health Editor.
- Added a way to edit Thetis HP to the Character Health Editor.
- Added more colors in the SailorColorExpansionPatch, each sailor now has the original + 3 colors.
- Added assembly code to the SailorColorExpansionPatch, you can select the color pressing up and down.
- Added assembly code to the SailorColorExpansionPatch, prints the color indicator.
- Added assembly code to the SailorColorExpansionPatch, forbids duplicated colors to avoid pallete bugs.
- Fixed the pallete bug in the select screen, new palletes are ignored in the select screen.
- Created a DefaultTextPatch.
- Forced DefaultTextPatch to be applied when generating a ROM if no other text patch was applied before.
- Added the new patches to the PatchMap.
- Minor changes.
- Minor fixes.

See all changes made [here](https://github.com/GameHackFan/pssme/blob/main/changelog).
<br/><br/>

Known Bugs:
- Game Over on stage 2 and 4 can bug Morga / Garoben on the next gameplay (reset the game to fix it).
- Final Boss area is bugged and some times it spawns more bosses than it should.
- After a player selects a color, he will hold it forever until he picks another one (can be fixed).
- If the game is overloaded with sprites, the color indicator might not be drawn.
<br/><br/>

OBS: after the v1.0 update, the annoying pallete bug in the select screen is fixed, but new ones are there, the player holding a color forever after he selects it is just an example. Adding the data needed to edit the damage of all the other characters is a nice thing, adding the data to allow to edit the HP of the other characters is also very nice, but I am too lazy to search for those. Adding an editor that allows to edit how much crystals are spent could also be a good feature to have. Bakene is a nice boss, but fighting him and taking 33% of his HP makes him pretty weak, so a nice idea would be to spawn his 3rd form with full HP even on 7th stage. Besides that, this tool offers a lot of stuff already.