# PSSME - Pretty Soldier Sailor Moon Editor (Arcade)
An editor for the game Pretty Solider Sailor Moon (Arcade).
<br/>

You can access the editor [here](https://gamehackfan.github.io/pssme/).
<br/><br/>

Version 1.6 Changes:
- Created CrystalImprovementPatch: See changes A to C.
- Change A: Coded a feature that alows players to change the amount of crystals they want to use by holding Punch and pressing Crystal, do it carefully because if the sailor is idle or walking she is going to spend the crystal, you can execute this on any attack, jump or run and it will not spend the crystals (Better way is to piano input this commando, so the sailor will punch).
- Change B: Coded a feature that will be the indicator, it will print the amount of crystals it will spend in red and the others in blue, so look at the HUD and you will know how much crystals it is set to use.
- Change C: The limit of crystals were increased from 5 to 7, but you can only spend 5 at max.
- Updated SailorColorExpansionPatch: See changes D to F.
- Change D: Replaced Sailor Venus B color, old was Brown and Black, new is Purple and Slate Blue.
- Change E: Replaced Sailor Mars E color, old was Orange and Brown, new is Gray and Green.
- Change F: Updated Sailor Jupiter E color, improved the color of her shirt.
- Improved the Seed Randomizer, see changes G to I:
- Change G: Added 2 Random Profiles, Meek and Kind, they are easier than Week.
- Change H: Added a Custom Random Profile specific for customizations. It was possible to customize before, but now it is better, but you can't customize the default profiles anymore.
- Change I: For customized profile, you can now inform the minimum and maximum amount, it works
just like the default profiles, based on minimum and maximum amount.
- Created a Modification Manager. All modifications made by all editors will now be put in a queue that will be executed when the ROM is generated. It avoids bugging the ROM if you apply the Seed Randomizer or Level Editor multiple times.
- Created CrystalImprovementPatch2, it is the same as the 1st one, but to change the amount of crystals to use you have to press the Start button.
- Forced the randomizer to apply the CrystalImprovementPatch.
- Updated all title screen text patches. They now support more characters and they support the inclusion of a hack author, except the randomizer text.
- Added a hack author field to the Edtior Manager Window.
- Improved the Color Pallete Editor. It has a better look and it is better to edit colors now.
- Changed the editor's appearance.
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

NOTE: After the v1.6 update, I found a decent way of adding Sailor V, but I would have to force Sailor V clothes' pallete to be loaded at the start of all levels, and also force an extra sprite to be drawn in the player character memory region, it needs some effort and I am a lazy person, but I might do it in the future. There are still a lot of unused stuff left, but most of them are not coded or only partially coded. There is also an unused ending, but I am more of a gameplay kind of guy, might consider it, but lazyness is a big deal. Morga and Garoben are still bugged if they spawn in the 3rd stage boss area and 4th stage, unfortunately. By touching the item drop code, I think it is kind of easy to make any character drop food or crystal, I just don't think I should change that. Adding the data needed to edit the damage dealt by all the other characters is a nice thing, adding the data to allow to edit the HP of the other characters is also very nice. With the crystal patch, the idea of a crystal editor doesn't make sense, so it is not in my plans anymore.