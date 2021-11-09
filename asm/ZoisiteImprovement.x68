*-------------------------------------------------------------------------------------------------
* Title:				PSSME Zoisite Improvement
* Written by:		GameHackFan
* Date:					
* Description:	It adds the idea of any color ID 4+ to forbid him 
								to freeze for some time when he spawns.
*-------------------------------------------------------------------------------------------------
	JMP				$7DBA0.L								; Jumps the execution to the instruction in the address (replace 1DCE4 with this code).

; ORG				$7DBA0
																		; Block of code that handles if he should freeze for a short period of time after spawning.
	MOVE.W		($2, A0), D0						; Stores ($2 + A0) inside D0, it has the posture ID and color ID.
	ANDI.W		#$0F, D0								; F and D0 (it removes the posture ID, only color ID is left).
	CMPI.W		#$4, D0									;	Compares 4 and D0.
	BGE				$7DBB8									; If it is 4+, go to the JMP before the last JMP.

																		; Block of code from the original that was replaced.
	MOVE.L		($1386, A6), D0					; Code from the original game that was replaced with the jump command to extend the code.
	CMP.L			($13C4, A6), D0         ; Code from the original game that was replaced with the jump command to extend the code.
 	BNE     	$7DBBE             			; If not equals, go to the the last JMP.

																		; Block of code that ensures he will move.
	JMP				$1DCF0.L								; Jumps back to the original code at 1DCF0.

																		; Block of code that ensures he will freeze.
	JMP				$1DD16.L								; Jumps back to the original code at 1DD16.



*~Font name~Courier New~
*~Font size~10~
*~Tab type~1~
*~Tab size~4~
