*-------------------------------------------------------------------------------------------------
* Title:				PSSME Morga Improvement
* Written by:		GameHackFan
* Date:					
* Description:	It forces color ID 4+ to spawn moving (avoid chocking the girl).
								It forbids any color ID 4+ to wait for the rose.
								It forces any color ID 4+ to keep accepting damage to death.
								It also forces any color ID 4+ to stop killing friends when she dies.
*-------------------------------------------------------------------------------------------------


*-------------------------
* Code 1
*-------------------------

	JMP				$7DC10.L								; Jumps the execution to the instruction in the address (replace 19B10 with this code).

; ORG				$7DC10

																		; Block of code that handles if she should spawn like a boss or already moving.
	MOVE.W		($2, A0), D0						; Stores ($2 + A0) inside D0, it has the posture ID and color ID.
	ANDI.W		#$0F, D0								; F and D0 (it removes the posture ID, only color ID is left).
	CMPI.W		#$4, D0									;	Compares 4 and D0.
	BCS				$7DC24									; If it is less than 4, go to the block of code from original game.
	JMP				$19FD4									; Jump to the block of code that runs after the chocking animation.

																		; Block of code from the original that was replaced.
	MOVE.W  #$1, ($4, A0)							; Code from the original game that was replaced with the jump command to extend the code.
	JMP			$19B1A										; Jumps back to the original code at 19B1A.


; D0 is safe to use


*-------------------------
* Code 2
*-------------------------

	JMP				$7DC40.L								; Jumps the execution to the instruction in the address (replace 19A2E with this code).

; ORG				$7DC40
																		; Block of code that handles if she should wait for the rose or not.
	MOVE.W		($2, A0), D0						; Stores ($2 + A0) inside D0, it has the posture ID and color ID.
	ANDI.W		#$0F, D0								; F and D0 (it removes the posture ID, only color ID is left).
	CMPI.W		#$4, D0									;	Compares 4 and D0.
	BGE				$7DC5A									; If it is 4+, go to the last JMP.

																		; Block of code from the original that was replaced.
	MOVE.W		($30, A0), D0						; Code from the original game that was replaced with the jump command to extend the code.
	LSR.W			#1, D0         					; Code from the original game that was replaced with the jump command to extend the code.
	JMP				$19A34.L								; Jumps back to the original code at 19A34 (normal execution).

																		; Block of code that ignores the rose.
	JMP				$19A6A.L								; Jumps back to the original code at 19A6A.


; D0 is safe to use


*-------------------------
* Code 3
*-------------------------

	JMP				$7DC70.L								; Jumps the execution to the instruction in the address (replace 91D6 with this code).

; ORG				$7DC70

																		; Block of code that handles if it is Morga or not.
	CMPI.W		#$19, (A0)							; Compares 19 and (A0), 19 is Morga's ID.
	BNE				$7DC8A									; If it is not 19, go to the last JMP.

																		; Block of code that handles if she should keep losing HP or lock it at 50%.
	MOVE.W		($2, A0), D3						; Stores ($2 + A0) inside D3, it has the posture ID and color ID.
	ANDI.W		#$0F, D3								; F and D3 (it removes the posture ID, only color ID is left).
	CMPI.W		#$4, D3									;	Compares 4 and D3.
	BGE				$7DC8A									; If it is 4+, go to the last JMP.

																		; Block of code that lock the HP at 50%.
	JMP				$91E6										; Jumps back to the original code at 91E6.

																		; Block of code that accepts taking damage to death.
	JMP				$9208										; Jumps back to the original code at 9208.


; D3 is safe to use


*-------------------------
* Code 4
*-------------------------

	JMP				$7DCA0.L								; Jumps the execution to the instruction in the address (replace 19A92 with this code).

; ORG				$7DCA0

																		; Block of code that handles if she should kill her friends or not.
	MOVE.W		($2, A0), D2						; Stores ($2 + A0) inside D2, it has the posture ID and color ID.
	ANDI.W		#$0F, D2								; F and D2 (it removes the posture ID, only color ID is left).
	CMPI.W		#$4, D2									;	Compares 4 and D2.
	BCS				$7DCBA									; If it is less than 4, go to the last JMP.

																		; Block of code that ignores requesting enemies to die.
	JSR				$121D6									; Jumps to a part of the original code after requesting enemies to die.
	JMP				$19A98									; Returns back to the original code.

																		; Block that executes the same code the game would execute.
	JSR				$121CC									; Code from the original game that was replaced with the jump command to extend the code.
	JMP				$19A98									; Returns back to the original code.


; D2 is safe to use


*~Font name~Courier New~
*~Font size~10~
*~Tab type~1~
*~Tab size~4~
