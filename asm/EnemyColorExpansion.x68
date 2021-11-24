*-------------------------------------------------------------------------------------------------
* Title:				PSSME Enemy Color Expansion
* Written by:		GameHackFan
* Date:					
* Description:	Forces every enemy with color IDs 4+ to use a color in a different location.
*-------------------------------------------------------------------------------------------------
	JMP					$7DE00.L							; Jumps the execution to the instruction in the address (replace 8F4E with this code).

;	ORG					$7DE00

	MOVE.W			D7, D0								; Stores D7 inside D0 (D7 has the enemy ID here).
	MOVE.W			D6, D7								; Code from the original game that was replaced with the jump command to extend the code.
	ANDI.W			#$FFF, D6							; Code from the original game that was replaced with the jump command to extend the code.
	ANDI.W			#$F000, D7						; Code from the original game that needs to execute (jump back will escape them).
	LSR.W				#7, D7								; Code from the original game that needs to execute (jump back will escape them).
	ADD.W				D6, D6								; Code from the original game that needs to execute (jump back will escape them).
	MOVE.W			(A1,D6.W), D6					; Code from the original game that needs to execute (jump back will escape them).
	ADD.W				D7, D6								; Code from the original game that needs to execute (jump back will escape them).
	MOVEM.L			A0-A3, -(A7)					; Code from the original game that needs to execute (jump back will escape them).


																		; Block of code that handles if a shift to the value of the pallete should be added.
	CMPI.W			#$80, D7							; Compare 80 and D7 (D7 has the pallete shift, 80+ is for color ID 4+).
	BCS					$7DE38								; if D7 is smaller than 80, it will go to the last JMP (Less than 80 is id 3-, use original colors).
	SUB.B				#$10, D0							; Subtracts 10 from D0 (first enemy id is now 0, last is now 12).
	CMPI.W			#$12, D0							; Compare 12 and D0 (last enemy will have 12 inside D0).
	BGT					$7DE38								; if D0 is bigger than 12, go to the last JMP.

																		; Block of code that handle the extra colors for the enemies.
	MULU.W			#$0002, D0						; Multiplicates the value of D0 by 2, since the difference/distance between palletes has 2 bytes.
	LEA					$7DE40, A0						; Stores the difference/distance between palletes start address inside the A0.
	ADD.W				D0, A0								; Adds D0 to A0.
	ADD.W				(A0), D6							; Adds the difference/distance between palletes of the selected sailor to D6.


	JMP					$8F66									; Returns back to the original code.



; First enemy ID is 10 (Furau) last is 22 (Queen Beryl).
;
; Put those values after the hex values of the last instruction.
; The values are the difference/distance between the original to the new pallete.
; The values are little endian already, swapping bytes is not necessary.
;
; 0000 4020 E020 401F A021 0000 00FF 601C 001D 801C
; 0000 C01B 0000 0000 A01A 0000 0000 201A A01A 001B
;
;	D0 is safe to use.
; D6 has the pallete shift.
;	D7 has the color ID pallete shift.
; A0 is safe to use.


*~Font name~Courier New~
*~Font size~10~
*~Tab type~1~
*~Tab size~4~