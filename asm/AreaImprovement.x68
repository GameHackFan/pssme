*-------------------------------------------------------------------------------------------------
* Title:				PSSME Area Improvement
* Written by:		GameHackFan
* Date:					
* Description:	It allows custom area data from custom address to be used.
								If called, it changes the position X of both players.
								If called, it changes the position Y of both players.
								If called, it changes the looking direction of both players.
*-------------------------------------------------------------------------------------------------


*-------------------------
* Code 1
*-------------------------

	JMP				$7E000.L								; Jumps the execution to the instruction in the address (replace 1DCE4 with this code).

; ORG				$7E000

																		; Block of code that handles if he should freeze for a short period of time after spawning.
	MOVE.W		D0, ($1384, A6)					; Some screens don't have the value in memory, this solve bugs.
	LSR.W			#8, D0									; Right bitshift D0 by 8 (keeps only the value of the 2nd byte).
	MOVE.W		D0, ($1380, A6)					;	Stores D0 inside ($1380 + A6), region now used by custom areas.
	MOVE.W		($1384, A6), D0					; Stores ($1384 + A6) inside D0.
	ANDI.W		#$FF, D0								; And FF and D0 (keeps only the main byte of the area ID).
	MOVE.W		D0, ($1384, A6)					; Stores D0 inside ($1384 + A6).
	TST.W			($1380, A6)							; Compares 0 and ($1380 + A6).
	BEQ				$7E040									; If it is 0,it is not a custom area, go to the original code.

																		; Block of code that handles data from custom areas.
	MOVE.W		($1384, A6), D0					; Stores ($1384 + A6) inside D0, TODO: unnecessary line?.
	MULU.W		#$2, D0									; Multiply D0 by 2, area data offset is 2 bytes.
	LEA				$7E052, A0							; Stores 7E052 inside A0, the base area data offset.
	MOVE.W		(A0, D0.W), D0					; Stores (A0 + D0.W) inside D0, the area data offset.
	LEA				$30000, A0							; Stores 30000 inside A0.
	ADD.W			D0, A0									; Adds D0 to A0 (the area data offset).
	MOVE.W		($1384, A6), D0					; Stores the area ID inside D0 (original code has it there).
	JMP				$208C										; Returns back to the original code. 

																		; Block of code from the original that was replaced.
	LEA				$7A100, A0							; Code from the original game that was replaced with the jump command to extend the code.
	MULU.W		#$3A, D0								; Code from the original game that was replaced with the jump command to extend the code.
	ADD.W			D0, A0									; Code from the original game that was replaced with the jump command to extend the code.
	JMP				$208C										; Returns back to the original code.


; Area ID is 2 bytes word and the data depends on 
;	based on it, but there are less than 30 areas in 
; the game, so the second byte is always 0. This code 
; ignores the first byte and read the level data 
; from a different address if the second byte is 1+.
;
; Put those values after the hex values of the last instruction.
; The values are the area data offset.
; The values are little endian already, swapping bytes is not necessary.
;
; 0000 A0FB DAFB 14FC 4EFC 88FC C2FC FCFC 36FD 70FD AAFD
;
; A0 is safe to use.
; D0 is safe to use.


*-------------------------
* Code 2
*-------------------------

; ORG				$7E0A0

																		; Block of code that changes all players position X.
	MOVE.W		(A0)+, ($102040)				;	Store A0 inside ($102040). The desired position X for player 1.
	MOVE.W		(A0)+, ($102140)				;	Store A0 inside ($102040). The desired position X for player 2.
	RTS																; Go back to the routine that called this code.


*-------------------------
* Code 3
*-------------------------

; ORG				$7E0B0

																		; Block of code that changes all players position Y.
	MOVE.W		(A0)+, ($102044)				;	Store A0 inside ($102044). The desired position Y for player 1.
	MOVE.W		(A0)+, ($102144)				;	Store A0 inside ($102044). The desired position Y for player 2.
	RTS																; Go back to the routine that called this code.


*-------------------------
* Code 4
*-------------------------

; ORG				$7E0C0

																		; Block of code that changes all players looking direction.
	MOVE.W		(A0)+, ($102026)				;	Store A0 inside ($102026). The desired looking direction for player 1.
	MOVE.W		(A0)+, ($102126)				;	Store A0 inside ($102026). The desired looking direction for player 2.
	RTS																; Go back to the routine that called this code.


; Code 2, 3 and 4 are used as data inside the level script (the game will call it).
; A0 will have the address of the byte after the address of this routine.
;
; 00 00 07 00 C0 E0 00 08 00 08
;                   A0 


*~Font name~Courier New~
*~Font size~10~
*~Tab type~1~
*~Tab size~4~