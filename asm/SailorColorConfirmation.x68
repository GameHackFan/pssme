*-------------------------------------------------------------------------------------------------
* Title:				PSSME Sailor Color Confirmation
* Written by:		GameHackFan
* Date:					
* Description:	Forbid the player confirming a color that is already selected. Removes the color indicator.
*-------------------------------------------------------------------------------------------------
	JMP				$7E960.L								; Jumps the execution to the instruction in the address (replace 6374 with this code).
	OR.B			D0, D0									; Junk code to fill the space that won't be used (place it after the code above).

; ORG				$7E960

																		; Block of code that handles the other player address colors.
	MOVE.W		A4, D0									; Stores A4 inside D0.
	CMPI.W		#$2100, D0							; Compares 2100 and D0 (102100 is player 2 memory start address).
	BNE				$7E96C									; If it is not player 2, jump to the ADD 100 instruction.
	SUB.W			#$0200, D0							; Removes 200 from D0 (with ADD 100, it will be 2000, player 1 address).
	ADD.W			#$0100, D0							; Adds 100 to D0 (if 2000, it be 2100, player 2 address).
	LEA				$100000, A0							; Stores 100000 inside A0.
	ADD.W			D0, A0									; Adds D0 to A0 (address of the other player memory start).

																		; Block of code that checks if the color ID should change.
	CMPI.W		#$03, ($74B2, A0)				; Compares 3 and (A0 + $74B2), the other player active flag.
	BNE				$7E99E									; If it is not 3, it will jump to original code at the end.
	MOVE.W		($74B0, A4), D0					; Stores the player character ID inside D0.
	CMP.W			($74B0, A0), D0					; Compares (A0 + $74B0) and D0 (both players character IDs).
	BNE				$7E99E									; If they aren't equal, it will jump to the set active flag code.
	MOVE.W		($758E, A4), D0					; Stores the player color ID to D0.
	CMP.W			($758E, A0), D0					; Compares (A0 + $758E) and D0 (both players color IDs).
	BNE				$7E99E									; If they aren't equal, it will jump to the set active flag code.

																		; Block of code that handles the color ID change.
	ADD.B			#$01, D0								; Adds 1 to D0 (go to the next color).
	AND.B			#$03, D0								; D0 and D0 (4 turns into 0, color range from 0 to 3).
	MOVE.W		D0, ($758E, A4)					;	Stores the new color ID in the color ID memory space.

																		; Block of code that sets the active flag and removes the label from the screen.
	MOVE.W		#$03, ($74B2, A4)				; Stores 3 in (A4 + $74B2), the player active flag.
	BSR				$7E850									; Calls the color indicator handler code.

																		; Block of code from the original game that was replaced.
	LEA				($144E, A6), A0					;	Code from the original game that was replaced with the jump command to extend the code.
	MOVE.W		($1A, A5), D0						;	Code from the original game that was replaced with the jump command to extend the code.
	JMP				$637C										; Returns back to the original code.



; D0 is safe to use.
; A0 is safe to use.
; A4 has the player memory start.
;
;	The player active flag once set never resets (bug?).


*~Font name~Courier New~
*~Font size~10~
*~Tab type~1~
*~Tab size~4~