*-------------------------------------------------------------------------------------------------
* Title:				PSSME Title Screen Text Improvement
* Written by:		GameHackFan
* Date:					
* Description:	It allows a bigger text to the title screen.
*-------------------------------------------------------------------------------------------------
	JMP				$7EF00.L								; Jumps the execution to the instruction in the address (replace 23D88 with this code).
	NOP
	NOP
	NOP
	NOP
	NOP
	NOP
	NOP
	NOP
	NOP
	NOP

; ORG				$7EF00

																		; Block of code that handles the new text address.
	LEA				$7EF30, A3							; Stores $7EF90 inside A3, the address of the new text.

																		; Block of code from the original game that was replaced.
	JSR				$14FE.L									; Code from the original game that was replaced with the jump command to extend the code.
	ADD.W			#$10, D2								; Code from the original game that was replaced with the jump command to extend the code.
	JSR				$14FE.L									; Code from the original game that was replaced with the jump command to extend the code.
	ADD.W			#$10, D2								; Code from the original game that was replaced with the jump command to extend the code.
	JSR				$14FE.L									; Code from the original game that was replaced with the jump command to extend the code.

																		; Block of code that restores the A3 value and returns to the original code.
	LEA				$23E24, A3							; Stores $23E24 inside A3, the old text address.
	JMP				$23DA2.L								; Returns back to the original code.



; Add the customized text inside 7EF90 to 7EFFF bytes
;
; D7 is safe to use.
; A3 contains the address of the text.


*~Font name~Courier New~
*~Font size~10~
*~Tab type~1~
*~Tab size~4~