*-------------------------------------------------------------------------------------------------
* Title:				PSSME Sailor Color Select.
* Written by:		GameHackFan
* Date:					
* Description:	Allows the player to select the colors available to his sailor.
*-------------------------------------------------------------------------------------------------
; ORG				$7E330

																		; Block of code that handles if it was triggered by a player.
	MOVE.W		A4, D0									; Stores A4 inside D0.
	SUB.W			#$2000, D0							; Subtracts 2000 from D0 (P1 will have 2000, P2 2100, etc).
	CMPI.W		#$0300, D0							; Compares 300 and D0 (Being safe in case of 4 players).
	BGT				$7E364									; If D0 is bigger than 300, it is not a player, go to RTS.

																		; Block of code that checks if up or down KeyDown is triggered.
	MOVE.W		#03, D0									; Stores 3 inside D0 (1 is up and 2 is down, bits from up an down).
	AND.W			($2, A3), D0						; D0 and player KeyDown/KeyUp.
	AND.W			(A3), D0								; D0 and player KeyPress.
	TST.W			D0											; Compare 0 to D0.
	BEQ				$7E364									; If it is 0, There isn't up or down KeyDown, go to RTS.

																		; Block of code that handles selecting the colors.
	MULU.W		#$FFFE, D0							; Multiplies D0 by -2 (up will be -2 and down - 4).
	ADD.W			#0003, D0								; Adds 3 to D0. (up will be 1 and down -1).
	ADD.W			($758E, A4), D0					; Adds the current color ID to D0.
	CMPI.W		#$6, D0									; Compares 6 to D0.
	BCS				$7E360									; If it is less than 6, go to the line that sets the color ID in memory.
	LSR.W			#$4, D0									; Right bitshift D0 by 4 (15- turns into 0, -1 turns into 8191).
	AND.W			#$5, D0									; D0 and 5 (0 keeps being 0, 8191 turns into 5, color range from 0 to 5).
	MOVE.W		D0, ($758E, A4)					;	Stores the new color ID in the color ID memory space.
	RTS																; Go back to the routine that called this code.



; D0 is safe to use.
; A3 has the address of the player inputs.
; A4 has the player memory start.
;
; A3 + 0 has the player KeyPress
; A3 + 2 has the player KeyDown/KeyUp


*~Font name~Courier New~
*~Font size~10~
*~Tab type~1~
*~Tab size~4~