# PSSME - Pretty Soldier Sailor Moon Editor (Arcade)
An editor for the game Pretty Solider Sailor Moon (Arcade).
<br/>

You can access the editor [here](https://gamehackfan.github.io/pssme/).
<br/><br/>

Version 1.5 Changes:
- Updated FoodImprovementPatch. See changes A to F.
- Change A: Round Cake Heal changed from 48 to 56.
- Change B: Meatball Heal changed from 40 to 48.
- Change C: Chocolate Bar Heal changed from 32 to 40.
- Change D: Piece of Pie Heal changed from 26 to 32.
- Change E: Piece of Cake Heal changed from 24 to 28.
- Change F: Soup Heal changed from 22 to 24.
- Updated FeaturesAndFixesPatch. See Changes G to S.
- Change G: Added a new item drop code, based on color ID and 4 different item table.
- Change H: Table 1: crystal 5/16 and every food from piece of cake and below at 11/16 (1/16 each).
- Change I: Table 2: meatball at 2/16, chocolate bar at 2/16 and the rest at 12/16 (1/16 each).
- Change J: Table 3: Every food from piece of cake and over. Best 4 foods at 3/16, the rest at 2/16.
- Change K: Table 4 is just a copy of Table 3 for now.
- Change L: For comparison, Original Table: ice cream cup 6/64 (1.5/16), crystal 6/64 (1.5/16) and the rest is 52/64 (1/16 each).
- Change M: Thetis 1 (Light Blue) didn't suffer any change.
- Change N: Thetis 2 (Dark Blue) will drop items from Table 1.
- Change O: Thetis 3 (Light Pink) will drop items from Table 2.
- Change P: Thetis 4 (Dark Pink) will drop items from Table 2.
- Change Q: Thetis Extra 1 (Gray) will drop items from Table 3.
- Change R: Thetis Extra 2 (Green) will drop items from Table 3.
- Change S: Changes were made only to reduce the table from 64 bytes to 4 tables of 16 bytes, allowing some thetis to drop better food and some to also never drop crytals.
- Buffed all Yasha Witches, changed their Posture IDs to bigger IDs that does the same thing, but also give them the ability to launch the stabbing attack at any moment.
- Created SailorImprovementPatch. It reduces all Sailors Desperation Attack (Attack + Jump) damage given and taken from 6 to 3 points.
- Added SailorImprovementPatch to the PatchMap.
- Forced the Seed Randomizer to apply the SailorImprovementPatch.
- Added Sailors Desperation Attack damage data to the CharacterDamageEditor.
- Updated SailorColorExpansionPatch. Improved Sailor Venus color F, Sailor Mars colors D, E and F.
- Improved all Random Profiles. See changes T to U.
- Change T: Removed food on the ground and added Thetis instead for all levels.
- Change U: Major improvement on several enemy strategies for all levels.
- Bakene is now forbidden to spawn at the Extra Stage Bank Street Area on randomizer (can softlock the game).
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

NOTE: After the v1.5 update, I found a decent way of adding Sailor V, but I would have to force Sailor V clothes' pallete to be loaded at the start of all levels, and also force an extra sprite to be drawn in the player character memory region, it needs some effort and I am a lazy person, but I might do it in the future. There are still a lot of unused stuff left, but most of them are not coded or only partially coded. There is also an unused ending, but I am more of a gameplay kind of guy. More improvemets were brought to improve the gameplay. Morga and Garoben are still bugged if they spawn in the 3rd stage boss area and 4th stage, unfortunately. By touching the item drop code, I think it is kind of easy to make any character drop food or crystal, I just don't think I should change that. Adding the data needed to edit the damage dealt by all the other characters is a nice thing, adding the data to allow to edit the HP of the other characters is also very nice. Adding an editor that allows to edit how much crystals are spent could also be a good feature to have.