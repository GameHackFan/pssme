# PSSME - Pretty Soldier Sailor Moon Editor (Arcade)
An editor for the game Pretty Solider Sailor Moon (Arcade).
<br/>

You can access the editor [here](https://gamehackfan.github.io/pssme/).
<br/><br/>

Version 1.1 Changes:
- Updated the FeaturesAndFixesPatch, see changes A to L.
- Change A: Added / Changed / Removed most of the former assembly code.
- Change B: Updated the assembly to force Queen Beryl with color ID 4+ to spawn moving.
- Change C: Added assembly to fix a bug that was allowing Queen Beryl to grab her friends and cause several bugs.
- Change D: Updated the assembly to force Kunzite with color ID 4+ to spawn moving.
- Change E: Updated the assembly to force Zoisite with color ID 4+ to spawn moving.
- Change F: Added assembly that allows only Bakene's 3rd form to kill his friends when he dies.
- Change G: Updated the assembly to force only Garoben with posture ID 0 to ignore the rose.
- Change H: Added assembly to force Morga with color ID 4+ to spawn moving (avoid choking the girl).
- Change I: Updated the assembly to force Morga with color ID 4+ to avoid waiting for the rose.
- Change I: Updated the assembly to force Morga with color ID 4+ to accept taking damage until she dies.
- Change J: Added assembly to allow only Morga with color ID 3- to kill her friends when she dies.
- Change K: Added the assembly that was handling Castor & Pollux new health table.
- Change L: Added assembly to allow Castor & Pollux to kill their friends when they die only on stage 1.
- Created Queen Beryl Extra 0 added her to the Level Editor and Seed Randomizer.
- Created Kunzite Extra 0 added him to the Level Editor and Seed Randomizer.
- Created Zoisite Extra 0 added him to the Level Editor and Seed Randomizer.
- Created Morga Extra 0, Extra 1, Extra 2 and added them to the Level Editor and Seed Randomizer.
- Deleted CastorAndPolluxImprovementPatch. Its content was added to FeaturesAndFixesPatch.
- Updated EnemyColorExpansionPatch, see changes M to P.
- Change M: Added color for Queen Beryl Extra 0.
- Change N: Added color for Kunzite Extra 0.
- Change O: Added color for Zoisite Extra 0.
- Change P: Added colors for Morga Extra 0, Extra 1 and Extra 2.
- Updated SailorColorExpansionPatch. Replaced Sailor Moon D with a better color pallete.
- Created BakeneImprovementPatch. It changes 1st form minimum HP from 64 to 4, 2nd form starting HP from 64 to 96, 2nd form minimum HP from 32 to 4, 3rd form HP from 32 to 96.
- Added BakeneImprovementPatch to the PatchMap.
- Forced the Seed Randomizer to apply BakeneImprovementPatch.
- Removed final boss strategy from all random profiles (Queen Beryl is safe to be used together with enemies that can be grabbed now, so it will use the same strategy as any other group).
- Updated RandomizerEnemyStrategy, see changes P to S.
- Change P: Queen Beryl now can spawn everywhere like the other bosses.
- Change Q: Most bosses were replaced by their extra version, they behave better as normal enemy.
- Change R: Replaced bakene 3rd form by the 2nd form (2nd form has 1 less attack, but it can leave the screen, it already starts moving and it doesn't turn into a small cat after dying, overall it is better).
- Change S: Reworked the enemies being forbidden in some parts to fit better the new changes.
- Minor changes.
- Minor fixes.

See all changes made [here](https://github.com/GameHackFan/pssme/blob/main/changelog).
<br/><br/>

Known Bugs:
- Game Over on stage 2 and 4 can bug Morga / Garoben on the next gameplay (reset the game to fix it).
- Final Boss area is bugged and some times it spawns more bosses than it should.
- After a player selects a color, he will hold it forever until he picks another one (can be fixed).
- If the game is overloaded with sprites, the color indicator might not be drawn.
- Sometimes shaders bugs on several cases and any character will end up holding weird color values for their palletes temporarily (bug present on the original game).
- Sometimes Zoisite goes under the screen (bug present on the original game).
- Sometimes if you die on custscene, your character keeps being alive (bug present on the original game).
<br/><br/>

OBS: after the v1.1 update, I already knew about the unused stuff, but I never touched it, and I started looking at them now, need to see what can be done about them. Adding the data needed to edit the damage of all the other characters is a nice thing, adding the data to allow to edit the HP of the other characters is also very nice. Adding an editor that allows to edit how much crystals are spent could also be a good feature to have. Let's see what's next.