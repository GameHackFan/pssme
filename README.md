# PSSME - Pretty Soldier Sailor Moon Editor (Arcade)
An editor for the game Pretty Solider Sailor Moon (Arcade).
<br/>

You can access the editor [here](https://gamehackfan.github.io/pssme/).
<br/><br/>

Version 0.8 Changes:
- Added a simple check to see if it is a valid ROM when cloning the ROM.
- Fixed the hint of one of Criminal's color pallete in the Color Pallete Editor.
- Fixed the hint of Queen Beryl's color pallete in the Color Pallete Editor.
- Fixed Yasha Witch 2, 3 and 4 all drawing the sprites of Yasha Witch 2 in the Level Editor.
- Fixed a bug where Garoben had less probability of being spawned in the Seed Randomizer.
- Fixed a bug in the Seed Randomizer, 1st and 7th boss could spawn in the 2nd boss area and they were allowing Morga to be killed before the rose, soft locking the game (they are now forbidden to spawn there).
- Updated the EnemyColorExpansionPatch. Added new colors and assembly code to handle it in a place that is really empty.
- Added new enemy colors for most of the enemies. Check enemy changes to see the extra enemies.
- Changed Furau: ID 2 to ID 4, Extra 1 to ID 6, Extra 2 to ID 8.
- Changed Oniwabandana: ID 1 to ID 5, ID 2 to ID 7, Extra 1 to ID 8, Extra 2 to ID 9.
- Changed Tesuni: ID 1 to ID 5, ID 4 to ID 7, Extra 1 to ID 9.
- Changed Castor & Pollux: ID 1 to ID 6, ID 2 to ID A, Extra 1 to ID 1, Extra 2 ID 2.
- Changed Thetis: Extra 1 to ID 4, Extra 2 to ID 6.
- Changed Jumou: ID 1 to ID 5, ID 3 to ID 7, Extra 1 to ID 8, Extra 2 to ID 9.
- Changed Criminal: Extra 1 to ID 4, E2 Extra 2 to ID 6.
- Changed Kyurene: Extra 1 to 4, Extra 2 to 5, Extra 3 to 6.
- Changed Bakene: Extra 1 to 4, Extra 2 to 5.
- Changed Zoisite: Extra 1 to 4, Extra 2 to 5.
- Changed Kunzite: Extra 1 to 4, Extra 2 to 5.
- Changed Queen Beryl: Extra 1 to 4, Extra 2 to 5.
- Most enemies with color IDs 4+ will have HP and AI affected. Bosses are not affected.
- Added all new enemies inside the Level Editor and the Seed Randomizer.
- Minor changes.
- Minor fixes.

See all changes made [here](https://github.com/GameHackFan/pssme/blob/main/changelog).
<br/><br/>

Known Bugs:
- Game Over on stage 2 and 4 can bug Morga / Garoben on the next gameplay (reset the game to fix this).
- Final Boss area is bugged and some times it spawns more bosses than it should.
- Because mercury uses the same memory space as the player 2, she ends up loading the alternative color in the select screen.
<br/><br/>

OBS: With the v0.8 update, I think I found the bytes to change how much each food heals, since they have no balance,
they heal like 10 for the bad food, 20 for the average food and 30 for the ice cream cup,
changing how much each one heal is a good thing to do. Also most enemies does the same damage, I agree for most of the cases,
but Jumou is a special case, she is way too slow, it feels like a useless enemy, if I find where her data is located,
I will increase her damage by a huge margin, turning her into a more dangerous character.
Changing the way crystals are spent could also be a good feature to have.
Besides all that, I don't think there is much to be done. Maybe nerf garoben a little?
