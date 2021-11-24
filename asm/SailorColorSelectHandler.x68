*-------------------------------------------------------------------------------------------------
* Title:				PSSME Sailor Color Select Handler.
* Written by:		GameHackFan
* Date:					
* Description:	Call all routines needed to handle the color selection properly.
*-------------------------------------------------------------------------------------------------


*-------------------------
* Code 1
*-------------------------

	JMP				$7E330.L								; Jumps the execution to the instruction in the address (replace 58CE with this code).

; ORG				$7E330

																		; Block of code that handles the color select for select screen.
	BSR				$7E300									; Go to the beginning of the color select code.
	BSR				$7E250									; Go to the beginning of the print color indicator code.
	MOVE.W		($4, A3), D6						; Code from the original game that was replaced with the jump command to extend the code.
	LSR.W			#2, D6									; Code from the original game that was replaced with the jump command to extend the code.
	JMP				$58D4										; Returns back to the original code.


*-------------------------
* Code 2
*-------------------------

	JMP				$7E340.L								; Jumps the execution to the instruction in the address (replace 53BA with this code).
	NOP																; Junk code to fill the space that won't be used (place it after the code above).

	; ORG				$7E340

																		; Block of code that handles the color select for in game character select.
	BSR				$7E300									; Go to the beginning of the color select code.
	BSR				$7E250									; Go to the beginning of the print color indicator code.
	MOVE.W		($1E, A5), D5						; Code from the original game that was replaced with the jump command to extend the code.
	CMPI.W		#$100, D5								; Code from the original game that was replaced with the jump command to extend the code.
	JMP				$53C2										; Returns back to the original code.


*~Font name~Courier New~
*~Font size~10~
*~Tab type~1~
*~Tab size~4~