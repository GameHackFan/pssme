# PSSME - Pretty Soldier Sailor Moon Editor (Arcade)
An editor for the game Pretty Solider Sailor Moon (Arcade).
<br/>

You can access the editor [here](https://gamehackfan.github.io/pssme/).
<br/><br/>

Extra Features:
- Select your sailor pressing Start to random select her.
- Press Punch + Crystal (Piano Input) / Start to change the amount of crystals to use in case the ROM is a randomizer or it has a crystal patch applied.

Version 1.9 Changes:
- Created the Stage Order Editor, it allows you to edit the order of the stages.
- Created the InfiniteTimePatch, as the name says, it makes the time infinite.
- Created the MaximumTimePatch, it sets the starting and increasing time to 99.
- Created the SailorDashImprovementPatch, it changes the dash frame amount from 60 to 1200 frames.
- Created the ItemDropFixesPatch, it fixes the item not being droped when killing with crystals.
- Added a code to the ItemDropFixesPatch that increases the movement impulse of the item drop.
- Added a code to the SailorDashImprovementPatch that disables the clinch if you're doing the dash move.
- Added a code to the FeaturesAndFixesPatch that fixes the bug where Zoisite goes under the floor.
- Added the SailordDashImprovementPatch to the Seed Randomizer.
- Added the ItemDropFixesPatch to the Seed Randomizer.
- Added Yasha Witch No Dash Attack to the Level Editor.
- Added Castor & Pollux to the Character Health Editor.
- Improved Yasha Witch Falling images in the Level Editor.
- Fixed PlayerHealthImprovementPatch priority.
- Improved Sailor Mercury D (4) color.
- Improved Sailor Mercury E (5) color.
- Minor changes and fixes.

See all changes made [here](https://github.com/GameHackFan/pssme/blob/main/changelog).
<br/><br/>

Known Bugs:
- Game Over on stage 2 and 4 can bug Morga / Garoben on the next gameplay (reset the game to fix it).
- If the game is overloaded with sprites, the color indicator might not be drawn.
- Sometimes shader bugs happen on several cases and any character will end up holding weird color values for their palletes temporarily (bug present in the original game).
- Sometimes if you die on a custscene, your character keeps being alive (bug present in the original game).
- Jupiter and Moon (maybe all of them?) sometimes when she grabs and throws an enemy, if it hits her partner in the beginning of the animation, it might do a lot of damage to the partner (bug present in the original game).
- Sometimes enemies move even taking hits, move faster than they should, a movement bug? (bug present in the original game, maybe it is an emulation bug?).
<br/><br/>

NOTE: Morga and Garoben are still bugged if they spawn in the 3rd stage boss area and 4th stage, unfortunately. By touching the item drop code, I think it is kind of easy to make any character drop food or crystal. Adding the data needed to edit the damage dealt by all the other characters is a nice thing, adding the data to allow to edit the HP of the other characters is also very nice. There are more stuff that I might do, so maybe a 2.0 version might come in the future, but it also might never come.
