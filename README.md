# PSSME - Pretty Soldier Sailor Moon Editor (Arcade)
An editor for the game Pretty Solider Sailor Moon (Arcade).
<br/>

You can access the editor [here](https://gamehackfan.github.io/pssme/).
<br/><br/>

Extra Features:
- Select your sailor pressing Start to random select her.
- Press Punch + Jump (Piano Input) / Start to change the amount of crystals to use in case the ROM is a randomizer or it has a crystal patch applied.

Version 1.7 Changes:
- Changed from React.js to Svelte.
- Improved Sailor Moon D, E, F (4, 5, 6) color.
- Added Sailor Moon G and H (7, 8) color.
- Improved Sailor Mercury B, D (2, 4) color.
- Added Sailor Mercury G, H (7, 8) color.
- Added Sailor Mars G, H (7, 8) color.
- Improved Sailor Jupiter B (2) color.
- Added Sailor Jupiter G, H (7, 8) color.
- Improved Sailor Venus B, C, D, E, F (2, 3, 4, 5, 6) color.
- Added Sailor Venus G, H (7, 8) color.
- Updated EnemyColorExpansionPatch, SailorColorExpansionPatch to better support the new colors.
- Updated the PalleteEditor to better support the color changes.
- Updated SailorColorExpansionPatch, added support to random select a sailor (select pressing start).
- The new random select feature randomly change the sailor every time a new area starts.
- Created FairRandomProfile, it is like easy, but a little harder because of the change in food drops.
- Some bug fixes to the code in general.
- Small changes to the UI.
- Minor changes and fixes.

See all changes made [here](https://github.com/GameHackFan/pssme/blob/main/changelog).
<br/><br/>

Known Bugs:
- Game Over on stage 2 and 4 can bug Morga / Garoben on the next gameplay (reset the game to fix it).
- If the game is overloaded with sprites, the color indicator might not be drawn.
- Sometimes shader bugs happen on several cases and any character will end up holding weird color values for their palletes temporarily (bug present in the original game).
- Sometimes Zoisite goes under the screen (bug present in the original game).
- Sometimes if you die on a custscene, your character keeps being alive (bug present in the original game).
- Jupiter and Moon (maybe all of them?) sometimes when she grabs and throws an enemy, if it hits her partner in the beginning of the animation, it might do a lot of damage to the partner (bug present in the original game).
- Sometimes if you kill thetis using crystals, she won't drop an item (bug present in the original game, too much effects overwhelm the game?).
- Sometimes enemies move even taking hits, move faster than they should, a movement bug? (bug present in the original game, maybe it is an emulation bug?).
<br/><br/>

NOTE: After the v1.7 update, I found a decent way of adding Sailor V, but I would have to force Sailor V clothes' pallete to be loaded at the start of all levels, and also force an extra sprite to be drawn in the player character memory region, it needs some effort and I am a lazy person, but I might do it in the future. There are still a lot of unused stuff left, but most of them are not coded or only partially coded. There is also an unused ending, but I am more of a gameplay kind of guy, I might consider making it, but lazyness is a big deal. Morga and Garoben are still bugged if they spawn in the 3rd stage boss area and 4th stage, unfortunately. By touching the item drop code, I think it is kind of easy to make any character drop food or crystal. Adding the data needed to edit the damage dealt by all the other characters is a nice thing, adding the data to allow to edit the HP of the other characters is also very nice. With the crystal patch, the idea of a crystal editor doesn't make sense, so it is not in my plans anymore.