*-------------------------------------------------------------------------------------------------
* Title:				PSSME Enemy Color Expansion Assembly
* Written by:		GameHackFan
* Date:					
* Description:	Forces every enemy with color IDs 4+ to use a color in a different location.
*-------------------------------------------------------------------------------------------------
	JMP				$7E900.L								; Jumps the execution to the instruction in the address (replace 8F4E with this code).



	MOVE.W			D7, D0								; Stores D7 inside D0 (D7 has the enemy ID, D0 is safe to use).
	MOVE.W			D6, D7								; Code from the original game that was replaced with the jump command to extend the code.
	ANDI.W			#$FFF, D6							; Code from the original game that was replaced with the jump command to extend the code.
	ANDI.W			#$F000, D7						; Code from the original game that needs to execute (jump back will escape them).
	LSR.W				#7, D7								; Code from the original game that needs to execute (jump back will escape them).
	ADD.W				D6, D6								; Code from the original game that needs to execute (jump back will escape them).
	MOVE.W			(A1,D6.w), D6					; Code from the original game that needs to execute (jump back will escape them).
	ADD.W				D7, D6								; Code from the original game that needs to execute (jump back will escape them).
	MOVEM.L			A0-A3, -(A7)					; Code from the original game that needs to execute (jump back will escape them).


																		; Block of code that handles if a shift to the value of the pallete should be added.
	CMPI.W			#$80, D7							; Compare D0 to 80 (D7 holds the pallete shift and 80+ is for pallete ID 4+).
	BCS.W				$7E944.W							; if D7 is smaller than 80, it will go to the last JMP (Less than 80 is id 3-, use original colors).
	CMPI.W			#$10, D0							; Compare D0 to 10.
	BCS.W				$7E944.W							; if D0 is smaller than 10, it will go to the last JMP (10 is furau, the first id that matters).
	CMPI.W			#$22, D0							; Compare D0 to 22.
	BHI.W				$7E944.W							; if D0 is bigger than 22, go to the last JMP (22 is queen beryl, the last id that matters).

																		; Block of code that handle the extra colors for the enemies.
	SUB.B				#$10, D0							; Subtracts 10 from D0 (if id 10, should pick the 1st value, 11 picks the 2nd).
	MULU.W			#$0002, D0						; Multiplicates the value of D0 by 2, since the difference/distance between palletes has 2 bytes.
	LEA					$7E94C, A0						; Stores the difference/distance between palletes start address inside the A0.
	ADD.W				D0, A0								; Adds D0 to A0 (A0 is safe to use).
	ADD.W				(A0), D6							; Adds the difference/distance between palletes of the selected sailor to D6.


	JMP					$8F66									; Returns back to the original code in case of being player 2 (original value is already set in D6).



; Put those values after the hex values of the last instruction.
; It is the difference/distance between the original to the new pallete.
; The values are little endian already, swapping bytes is not necessary.
;
; 0000 4020 E020 401F A021 0000 00FF 601C 001D 801C
; 0000 C01B 0000 0000 A01A 0000 0000 201A A01A 001B


*~Font name~Courier New~
*~Font size~10~
*~Tab type~1~
*~Tab size~4~
