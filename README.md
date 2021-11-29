# PSSME - Pretty Soldier Sailor Moon Editor (Arcade)
An editor for the game Pretty Solider Sailor Moon (Arcade).
<br/>

You can access the editor [here](https://gamehackfan.github.io/pssme/).
<br/><br/>

Version 1.3 Changes:
- Fixed a bug that was causing the Level Editor and Randomizer patch to be generated bigger than it should (v1.2 changes brought this bug).
- Updated the FeaturesAndFixesPatch, see changes A to B.
- Change A: Removed 1 of the 2 old remaining code, it was forcing a new Queen Beryl to spawn for each enemy spawning in the final boss area in case 2 players are playing.
- Change B: Added assembly to allow Tesuni without racket to use her unused kick (50% probability?).
- Updated SailorColorExpansionPatch. see changes C to D.
- Change C: Updated the assembly to allow more 2 colors for all sailors, now it is original + 5.
- Change D: Added assembly to handle the player active flag, colors are not held forever anymore.
- Updated EnemyColorExpansionPatch. Improved Criminal and Kunzite colors.
- Added a delay of 20 frames after each 5 enemies spawn on randomizer to make it run smoother.
- Updated all text improvement patches, texts are now better aligned.
- Minor changes.
- Minor fixes.

See all changes made [here](https://github.com/GameHackFan/pssme/blob/main/changelog).
<br/><br/>

Known Bugs:
- Game Over on stage 2 and 4 can bug Morga / Garoben on the next gameplay (reset the game to fix it).
- If the game is overloaded with sprites, the color indicator might not be drawn.
- Sometimes shaders bugs on several cases and any character will end up holding weird color values for their palletes temporarily (bug present in the original game).
- Sometimes Zoisite goes under the screen (bug present in the original game).
- Sometimes if you die on a custscene, your character keeps being alive (bug present in the original game).
- Jupiter sometimes when she grabs and throws an enemy, if it hits her partner in the beginning
of the animation, it might do a lot of damage on her partner (bug present in the original game).
- Sometimes if you kill thetis using crystals, she won't drop an item (bug present in the original game, too much effects overwhelm the game?).
- Sometimes enemies move even taking hits, move faster than they should, a movement bug (bug present in the original game).
<br/><br/>

NOTE: after the v1.3 update, there are still a lot of unused stuff left, but most of them are not coded or only partially coded. There is also an unused ending, but I am more of a gameplay kind of guy. More bugs were fixed and the things look very good. Morga and Garoben are still bugged if they spawn in the 3rd stage boss area and 4th stage, unfortunately. Adding the data needed to edit the damage of all the other characters is a nice thing, adding the data to allow to edit the HP of the other characters is also very nice. Adding an editor that allows to edit how much crystals are spent could also be a good feature to have.