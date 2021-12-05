# PSSME - Pretty Soldier Sailor Moon Editor (Arcade)
An editor for the game Pretty Solider Sailor Moon (Arcade).
<br/>

You can access the editor [here](https://gamehackfan.github.io/pssme/).
<br/><br/>

Version 1.4 Changes:
- Updated SailorColorExpansionPatch, improved the color indicator.
- Fixed a bug with LevelExpansionData causing 1 CPU Demo pointer to crash (Level Editor ROM only).
- Created FixCPUDemoPatch, it brings back CPU gameplay demos. Before this fix, after putting coins, the game was starting automatically.
- Added FixCPUDemoPatch to the PatchMap.
- Forced Level Editor and Seed Randomizer to apply FixCPUDemoPatch.
- Removed RemoveCPUDemoPatch, FixCPUDemoPatch works way better.
- Minor changes.
- Minor fixes.

See all changes made [here](https://github.com/GameHackFan/pssme/blob/main/changelog).
<br/><br/>

Known Bugs:
- Game Over on stage 2 and 4 can bug Morga / Garoben on the next gameplay (reset the game to fix it).
- If the game is overloaded with sprites, the color indicator might not be drawn.
- Sometimes shaders bugs happen on several cases and any character will end up holding weird color values for their palletes temporarily (bug present in the original game).
- Sometimes Zoisite goes under the screen (bug present in the original game).
- Sometimes if you die on a custscene, your character keeps being alive (bug present in the original game).
- Jupiter sometimes when she grabs and throws an enemy, if it hits her partner in the beginning
of the animation, it might do a lot of damage on her partner (bug present in the original game).
- Sometimes if you kill thetis using crystals, she won't drop an item (bug present in the original game, too much effects overwhelm the game?).
- Sometimes enemies move even taking hits, move faster than they should, a movement bug (bug present in the original game).
<br/><br/>

NOTE: after the v1.4 update, there are still a lot of unused stuff left, but most of them are not coded or only partially coded. There is also an unused ending, but I am more of a gameplay kind of guy. More bugs were fixed and the things look very good. Morga and Garoben are still bugged if they spawn in the 3rd stage boss area and 4th stage, unfortunately. Adding the data needed to edit the damage of all the other characters is a nice thing, adding the data to allow to edit the HP of the other characters is also very nice. Adding an editor that allows to edit how much crystals are spent could also be a good feature to have.