# PSSME - Pretty Soldier Sailor Moon Editor (Arcade)
An editor for the game Pretty Solider Sailor Moon (Arcade).
<br/>

You can access the editor [here](https://gamehackfan.github.io/pssme/).
<br/><br/>

Version 1.2 Changes:
- Improved SailorColorExpansionPatch. Fixed a bug with the color expansion and indicator.
- Created AreaImprovementPatch. It has assembly code to handle customized areas and player spawning.
- Created TimeImprovementPatch. Time now runs 60% slower and will always start at 99.
- Created Level1RemakePatch. It is the Stage 1 with more areas.
- Created ExtraLevelPatch. It brings an Extra Level made with unused music and areas. It is the bank robbery, it comes before the 5th stage.
- Created the text improvement patches for the new levels.
- Added the new patches to the PatchMap.
- Forced the Level Editor and Seed Randomizer to apply the new patches.
- Added the new levels to the Level Editor and Seed Randomizer.
- Updated FeaturesAndFixesPatch. Updated the assembly to better adapt the new version, added things.
- Minor changes.
- Minor fixes.

See all changes made [here](https://github.com/GameHackFan/pssme/blob/main/changelog).
<br/><br/>

Known Bugs:
- Game Over on stage 2 and 4 can bug Morga / Garoben on the next gameplay (reset the game to fix it, maybe fixed already with the new boss code?).
- Final Boss area is bugged and some times it spawns more bosses than it should (maybe gone now?).
- After a player selects a color, he will hold it forever until he picks another one (can be fixed).
- If the game is overloaded with sprites, the color indicator might not be drawn.
- Sometimes shaders bugs on several cases and any character will end up holding weird color values for their palletes temporarily (bug present in the original game).
- Sometimes Zoisite goes under the screen (bug present in the original game).
- Sometimes if you die on a custscene, your character keeps being alive (bug present in the original game).
- Jupiter sometimes when she grabs and throws an enemy, if it hits her partner in the beginning
of the animation, it might do a lot of damage on her partner (bug present in the original game).
- Sometimes if you kill thetis using crystals, she won't drop an item (bug present in the original game, too much effects overwhelm the game?).
- Sometimes enemies move even taking hits, move faster than they should, a movement bug (bug present in the original game).
<br/><br/>

NOTE: after the v1.2 update, the unused stuff left to use are extra attacks some enemies have, and some look easy to activate, at least playing with them in memory. There is also an unused ending, but I am more of a gameplay kind of guy. Apparently the new code for Morga and garoben makes them pretty safe to use even on most of 2nd and 4th stage, which means that weird game over bug might be gone, I will test it better and see if I can let them spawn on most places. Adding the data needed to edit the damage of all the other characters is a nice thing, adding the data to allow to edit the HP of the other characters is also very nice. Adding an editor that allows to edit how much crystals are spent could also be a good feature to have. Let's see what's next.