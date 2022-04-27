*-------------------------------------------------------------------------------------------------
* Title:				PSSME Crystal Control
* Written by:		GameHackFan
* Date:					
* Description:	It allows players to change the amount of crystals to use.
*-------------------------------------------------------------------------------------------------
	JMP				$7EE00.L								; Jumps the execution to the instruction in the address (replace 25024 with this code).

; ORG				$7EE00

																		; Block of code that executes the code that handles the amount of crystals to use.
	BRA				$7EE10									; Jumps to the player 1 amount of crystals to use change code.
	BRA				$7EE42									; Jumps to the player 2 amount of crystals to use change code.
	JSR				$3001C									;	Code from the original game that was replaced with the jump command to extend the code.
	JMP				$2502A									; Returns back to the original code.

																		; Block of code that handles P1 changing the amount of crystals to use.
	MOVE.W		#$50, D0								; Stores 50 inside D0, Punch + Crystal button flag.
	AND.W			($1AA, A6), D0					; D0 and ($1AA + A6), player 1 KeyDown/KeyUp.
	OR.W			#$10, D0								; D0 or 10, add a take Punch button KeyDown/KeyUp for easier input.
	AND.W			($1A8, A6), D0					; D0 and ($1A8 + A6), player 1 player KeyPress.
	CMP.W			#$50, D0								; Compares 50 and D0.
	BNE				$7EE02									; If it is 0, button isn't down without holding, go back to the first block of code.

																		; Block of code that changes P1 amount of crystal to use. (0 for 1, 1 for 2 ...).
	MOVE.W		($158C, A6), D0					; Stores ($158C + A6) inside D0, player 1 amount of crystal to use.
	ADD.W			#1, D0									; Adds 1 to D0.
	CMP.W			($14C4, A6), D0					; Compare ($14C4 + A6) to D0, the amount of crystals player 1 has.
	BGE				$7EE38									; If it is greater or equal, go to the line before the last lines.
	CMP.W			#5, D0									; Compare 5 to D0, the maximum amount of crystals that can be used.
	BLT				$7EE3C									; If it is less, ignore the line below.
	MOVE.W		#0, D0									; Stores 0 inside D0.
	MOVE.W		D0, ($158C, A6)					; Store D0 inside ($158C + A6).
	BRA				$7EE02									; Go back to the first block of code.


																		; Block of code that handles P2 changing the amount of crystals to use.
	MOVE.W		#$50, D0								; Stores 50 inside D0, Punch + Crystal button flag.
	AND.W			($1FA, A6), D0					; D0 and ($1FA + A6), player 2 KeyDown/KeyUp.
	OR.W			#$10, D0								; D0 or 10, add a take Punch button KeyDown/KeyUp for easier input.
	AND.W			($1F8, A6), D0					; D0 and ($1F8 + A6), player 2 player KeyPress.
	CMP.W			#$50, D0								; Compares 50 and D0.
	BNE				$7EE04									; If it is 0, button isn't down without holding, go back to the first block of code.

																		; Block of code that changes P1 amount of crystal to use. (0 for 1, 1 for 2 ...).
	MOVE.W		($168C, A6), D0					; Stores ($158C + A6) inside D0, player 1 amount of crystal to use.
	ADD.W			#1, D0									; Adds 1 to D0.
	CMP.W			($15C4, A6), D0					; Compare ($15C4 + A6) to D0, the amount of crystals player 2 has.
	BGE				$7EE6A									; If it is greater or equal, go to the line before the last lines.
	CMP.W			#5, D0									; Compare 5 to D0, the maximum amount of crystals that can be used.
	BLT				$7EE6E									; If it is less, ignore the line below.
	MOVE.W		#0, D0									; Stores 0 inside D0.
	MOVE.W		D0, ($168C, A6)					; Store D0 inside ($158C + A6).
	BRA				$7EE04									; Go back to the first block of code.


; This code will allow players to change the amout 
; of crystal they will use as they press the buttons 
; Punch + Jump. It handles a value in memory that 
; will be used to inform how much crystals the game 
; should use.
;
; D0 is safe to use.
; A0 is safe to use.


*~Font name~Courier New~
*~Font size~10~
*~Tab type~1~
*~Tab size~4~