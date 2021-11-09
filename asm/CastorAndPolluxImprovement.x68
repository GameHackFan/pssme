*-------------------------------------------------------------------------------------------------
* Title:				PSSME Castor & Pollux Improvement
* Written by:		GameHackFan
* Date:					
* Description:	Loads Castor & Pollux's health from a different table.
								Also forbids them to kill enemies if they are not in the first stage.
*-------------------------------------------------------------------------------------------------
; Code 1

	JMP				$7EA70.L								; Jumps the execution to the instruction in the address (replace 14D4A with this code).
	OR.B			D0, D0									; Junk code to fill the space that won't be used  (place it after the code above).

	LEA				$7EA86.L, A1						; Stores the HP table start address inside A1.
	MOVE.B		(A1, D1.W), D0					; Stores the HP value inside D0.
	MOVE.W		D0, ($30, A0) 					; Code from the original game that was replaced with the jump command to extend the code. It stores the HP in the memory.
	JMP				$14D52									; Returns back to the original code.



; Code 2

	JMP				$7DCD0.L								; Jumps the execution to the instruction in the address (replace 14CB4 with this code).

;	ORG				$7DCD0

																		; Code that handles if C&P should kill the enemies if they die.
	TST.W			($1384, A6)							; Compares 0 and ($1384, A6), 0 is the id of the area of the whole stage 1.
	BEQ				$7DCE2									; If it is equals, go to last JMP

																		; Block of code that ignores requesting enemies to die.
	JSR				$121EE									; Jumps to a part of the original code after requesting enemies to die.
	JMP				$14CBA									; Returns back to the original code.

																		; Block that executes the same code the game would execute.
	JSR				$121E4									; Code from the original game that was replaced with the jump command to extend the code.
	JMP				$14CBA									; Returns back to the original code.



; Code 1
; D0 is safe to use (D0 is used in the original code to store the HP value).
; A0 has the character memory start address.
; A1 is safe to use.


; Put those values after the hex values of the last instruction.
; The values are the new health table.
; The values are little endian already, swapping bytes is not necessary.
;
; 00 00 30 30 40 30 40 30 50 50 60 60
				 1  0  3  2  5  4  7  6  9  8




*~Font name~Courier New~
*~Font size~10~
*~Tab type~1~
*~Tab size~4~
