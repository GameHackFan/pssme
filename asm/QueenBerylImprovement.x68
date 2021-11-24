*-------------------------------------------------------------------------------------------------
* Title:				PSSME Queen Beryl Improvement
* Written by:		GameHackFan
* Date:					
* Description:	It adds the idea of any color ID 4+ to forbid her 
								to freeze for some time when she spawns.
								It also fixes a bug which was allowiong Queen Beryl 
								to grab her friends.
*-------------------------------------------------------------------------------------------------


*-------------------------
* Code 1
*-------------------------

	JMP				$7DB00.L								; Jumps the execution to the instruction in the address (replace 1EFE4 with this code).

; ORG				$7DB00
																		; Block of code that handles if she should freeze for a short period of time after spawning.
	MOVE.W		($2, A0), D0						; Stores ($2 + A0) inside D0, it has the posture ID and color ID.
	ANDI.W		#$0F, D0								; F and D0 (it removes the posture ID, only color ID is left).
	CMPI.W		#$4, D0									;	Compares 4 and D0.
	BGE				$7DB18									; If it is 4+, go to the JMP before the last JMP.

																		; Block of code from the original that was replaced.
	MOVE.L		($1386, A6), D0					; Code from the original game that was replaced with the jump command to extend the code.
	CMP.L			($13C4, A6), D0         ; Code from the original game that was replaced with the jump command to extend the code.
 	BNE     	$7DB1E             			; If not equals, go to the the last JMP.

																		; Block of code that ensures she will move.
	JMP				$1EFF0.L								; Jumps back to the original code at 1EFF0 (it will ignore freeze).

																		; Block of code that ensures she will freeze.
	JMP				$1F00A.L								; Jumps back to the original code at 1F00A.


; D0 is safe to use


*-------------------------
* Code 2
*-------------------------

	JMP				$7DB30.L								; Jumps the execution to the instruction in the address (replace 1F730 with this code).

																		; Block of code that fixes the bug.
	MOVE.W		#$01, ($0C, A0)					; Code from the original game that was replaced with the jump command to extend the code.
	MOVE.W		#$01, ($0E, A0)					; Stores 1 inside ($E, A0), this memory space must be 1.
	JMP				$1F736									; Returns back to the original code.


; The bug was happening when you knock her down, she was setting 
; 3 inside ($0E + A0), that allows her to grab her friends. Other 
; enemies like Garoben, everytime she executes her grab, she 
; sets ($0E + A0) with the value 1, but Queen Beryl doesn't do 
; do that, so after a knockdown, she ended up having 3 inside 
; ($0E + A0), allowing her to grab her friends. This code ensures 
; she sets 1 inside ($0E + A0), so she is not able to grab her 
; friends anymore.


*~Font name~Courier New~
*~Font size~10~
*~Tab type~1~
*~Tab size~4~
