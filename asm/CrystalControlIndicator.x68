*-------------------------------------------------------------------------------------------------
* Title:				PSSME Crystal Control Indicator
* Written by:		GameHackFan
* Date:					
* Description:	Prints the crystals on HUD in a way the player can 
*								know the amount of crystals they selected to use.
*-------------------------------------------------------------------------------------------------
	JMP				$7EEB0.L								; Jumps the execution to the instruction in the address (replace 60CE with this code).
	NOP
	NOP
	NOP
	NOP
	NOP
	NOP
	NOP
	NOP
	NOP
	NOP
	NOP

;	ORG				$7EEB0

																		; Block of code that handles the item drop based on color ID, from a different table.
	MOVE.W		($F6, A5), D7						; Stores ($F6 + A5) inside D0, the desired amount of crystals to use.
	MOVE.W		#$1020, D3							; Stores 1020 inside D3, the pallete ID of the amount of crystals desired to use.
	MOVE.W		($2E, A5), D2						; Stores ($2E + A5) inside D2, the amount of crystals the player has.
	SUB.W			#1, D2									; Subtracts 1 from D2, loop ends in -1.
	BMI				$7EEE4									; Jumps to the last line of code.
	SWAP			D7											; Swap D7 bytes, the lower one is used.
	SWAP			D2											; Code from the original game. 
	MOVE.W		#$A5B, D0								; Code from the original game.
	JSR				$1264										; Code from the original game readjusted (JSR instead of BSR).
	ADD.W			#6,	D1									; Code from the original game.
	SWAP			D2											; Code from the original game.
	SWAP			D7											; Swap D7 bytes, so it can be used properly.
	SUB.W			#1, D7									; Subtracts 1 from D7, already printed 1 crystal.
	TST				D7											; Compares 0 and D7.
	BGE				$7EEE0									; If D7 is greater or equal than 0, ignore the 2 next lines.
	MOVE.W		#$1220, D3							; Stores 1220 inside D3, default pallete ID is 0C.
	MOVE.B		#9, D7									; Stores 9 inside D7, to ensure the the line above won't execute.
	DBRA			D2, $7EEC0							; Loops back, so it keep printing the crystals.
	JMP				$60EA										; Returns back to the original code.



; This code forces the game to print the crystals with 
; 2 different colors, red to indicate the amount of 
; crystals the player wants to use and the default 
; blue to indicate the crystals that won't be used.


*~Font name~Courier New~
*~Font size~10~
*~Tab type~1~
*~Tab size~4~
