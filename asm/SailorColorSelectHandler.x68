*-------------------------------------------------------------------------------------------------
* Title:				PSSME Sailor Color Select Handler.
* Written by:		GameHackFan
* Date:					
* Description:	Call all routines needed to handle the color selection properly.
*-------------------------------------------------------------------------------------------------
	JMP				$7E930.L								; Jumps the execution to the instruction in the address (replace 58CE with this code).

	JMP				$7E940.L								; Jumps the execution to the instruction in the address (replace 53BA with this code).
	OR.B			D0, D0									; Junk code to fill the space that won't be used (place it after the code above).

; ORG				$7E930

																		; Block of code that handles the color select for select screen.
	BSR				$7E900									; Go to the beginning of the color select code.
	BSR				$7E850									; Go to the beginning of the print color indicator code.
	MOVE.W		($4, A3), D6						; Code from the original game that was replaced with the jump command to extend the code.
	LSR.W			#2, D6									; Code from the original game that was replaced with the jump command to extend the code.
	JMP				$58D4										; Returns back to the original code.

	; ORG				$7E940

																		; Block of code that handles the color select for in game character select.
	BSR				$7E900									; Go to the beginning of the color select code.
	BSR				$7E850									; Go to the beginning of the print color indicator code.
	MOVE.W		($1E, A5), D5						; Code from the original game that was replaced with the jump command to extend the code.
	CMPI.W		#$100, D5								; Code from the original game that was replaced with the jump command to extend the code.
	JMP				$53C2										; Returns back to the original code.



; D0 is safe to use.
; A3 has the address of the player inputs.
; A4 has the player memory start.




*~Font name~Courier New~
*~Font size~10~
*~Tab type~1~
*~Tab size~4~