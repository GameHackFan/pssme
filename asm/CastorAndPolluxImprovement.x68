*-------------------------------------------------------------------------------------------------
* Title:				PSSME Castor & Pollux Improvement
* Written by:		GameHackFan
* Date:					
* Description:	Loads Castor & Pollux's health from a different table.
*-------------------------------------------------------------------------------------------------
	JMP				$7EA70.L								; Jumps the execution to the instruction in the address (replace 14D4A with this code).
	OR.B			D0, D0									; Junk code to fill the space that won't be used  (place it after the code above).

	LEA				$7EA86.L, A1						; Stores the HP table start address inside A1.
	MOVE.B		(A1, D1.W), D0					; Stores the HP value inside D0.
	MOVE.W		D0, ($30, A0) 					; Code from the original game that was replaced with the jump command to extend the code. It stores the HP in the memory.
	JMP				$14D52									; Returns back to the original code.


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
