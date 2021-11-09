*-------------------------------------------------------------------------------------------------
* Title:				PSSME Bakene Improvement
* Written by:		GameHackFan
* Date:					
* Description:	It forbids any posture ID that is not 40 to kill all enemies when he dies.
*-------------------------------------------------------------------------------------------------
	JMP				$7DBE0.L								; Jumps the execution to the instruction in the address (replace 1D13E with this code).

;	ORG				$7DBE0

																		; Block of code that handles if he should kill his friends or not.
	CMPI.W		#$40, ($02, A0)					; Compares 40 and ($02 + A0), his initial posture (40 is 3rd form).
	BEQ				$7DBF4									; If it is equal 40, go to the block of code from the original game.

																		; Block of code that ignores requesting enemies to die.
	JSR				$121D6									; Jumps to a part of the original code after requesting enemies to die.
	JMP				$1D144									; Returns back to the original code.

																		; Block that executes the same code the game would execute.
	JSR				$121CC									; Code from the original game that was replaced with the jump command to extend the code.
	JMP				$1D144									; Returns back to the original code.



; Since the 3rd form is his last time he appears,
; having only the 3rd form killing all enemies when 
; he dies is actually perfect, so the other forms 
; can be properly used as non bosses enemies and the 
; 3rd form is the one that will keep bevaving like a 
; real boss, killing all enemies after he dies.



*~Font name~Courier New~
*~Font size~10~
*~Tab type~1~
*~Tab size~4~
