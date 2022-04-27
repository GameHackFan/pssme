*-------------------------------------------------------------------------------------------------
* Title:				PSSME Crystal Use
* Written by:		GameHackFan
* Date:					
* Description:	Changes the way sailor uses her crystals based 
*               on a index value in memory.
*-------------------------------------------------------------------------------------------------
	JMP				$7EE80.L								; Jumps the execution to the instruction in the address (replace A698 with this code).
	NOP
	NOP
	NOP
	NOP

;	ORG				$7EE80

																		; Block of code that handles the item drop based on color ID, from a different table.
	MOVE.W		($F6, A1), D0						; Stores ($F6 + A1) inside D0, the amount of crystals the player wants to use.
	ADD.W			#1, D0									; Adds 1 to D0, the value is index based, so it needs +1.
	MOVE.W		($2E, A1), D2						; Stores ($2E + A1) inside D2, the amount of crystals the player has.
	CMP.W			D0, D2									; Compares D0 and D2.
	BGT				$7EE90									; If D2 is greater than D0, ignore the next line.
	MOVE.W		D2, D0									; Stores ($2E + A1) inside D0, all crystals the player has.
	SUB.W			D0, D2									; Subtracts D0 from D2, Removes the amount of crystal used.
	MOVE.W		D2, ($2E, A1)						; Stores ($2E + A1) inside D2, the amount of crystals the player has.
	MOVE.W		D0, ($242A, A6)					; Code from the original game that was replaced with the jump command to extend the code.	
	JMP				$A6A2										; Returns back to the original code.




; This code changes the way crystals are handled. 
; It reads from memory the amount of crystal that 
; should be used when the player press the Crystal 
; button. The index saved in memory must be treated 
; inverted to ensure the code above works properly, 
; that's why the 5 - desired index.
; index based, it doesn't need to add one because 
; the press of the crystal button itself does that.


*~Font name~Courier New~
*~Font size~10~
*~Tab type~1~
*~Tab size~4~