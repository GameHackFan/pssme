*-------------------------------------------------------------------------------------------------
* Title:				PSSME Player Active Improvement
* Written by:		GameHackFan
* Date:					
* Description:	It better handles the player active flag, so a color can't be held forever.
*-------------------------------------------------------------------------------------------------
	JMP				$7E3D0.L								; Jumps the execution to the instruction in the address (replace BF08 with this code).
	JMP				$7E3D0.L								; Jumps the execution to the instruction in the address (replace D18A with this code).
	JMP				$7E3D0.L								; Jumps the execution to the instruction in the address (replace E3DC with this code).
	JMP				$7E3D0.L								; Jumps the execution to the instruction in the address (replace F658 with this code).
	JMP				$7E3D0.L								; Jumps the execution to the instruction in the address (replace 109AE with this code).

;	ORG				$7E3D0
																		; Block of code that sets player active flag back to 1
	MOVE.W		#$1, ($74B2, A0)				; Compares 3 and (A0 + $74B2), the other player active flag.

																		; Block of code from the original that was replaced.
	MOVE.W		#$0, (A0)								; Code from the original game that was replaced with the jump command to extend the code.
	JSR				$9022										; Code from the original game that was replaced with the jump command to extend the code.
	JMP				$F660										; Returns back to the original code.


*~Font name~Courier New~
*~Font size~10~
*~Tab type~1~
*~Tab size~4~
