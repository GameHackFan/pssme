*-----------------------------------------------------------
* Title      : PSSME Sailor Color Expansion Code
* Written by : GameHackFan
* Date       :
* Description:
*-----------------------------------------------------------
	JMP					$7E800.W							; Jumps the execution to the instruction in the address (replace 8FBA with this code).


													
	MOVE.W			(A1, D6.W), D6				; Code from the original game that was replaced with the jump command to extend the code.
	ADD.W				D7, D6								; Code from the original game that was replaced with the jump command to extend the code.
	MOVE.L			A0, D4								; Stores the content of A0 inside D4 (D4 is safe to use).
	CMPI.W			#$2100, D4						; Compares if half of the address used by player 2 is stored in D4.
	BEQ.W				$7E816								; If yes, it will jump to the next CMPI.W.

																		; Block of code that handles player 1.
	JMP					$8FC0									; Returns back to the original code in case of being player 1 (original code is already executed).

	CMPI.W			#$0EC0, D6						; Compares if half of the value used by the cursor is stored in D6.
	BEQ.W				$7E834								; If yes, it will jump to the last JMP (to avoid changing its colors).

																		; Block of code that handles player 2.
	MOVE.L			#$0.L, D4							; Stores 0 inside D4 (cleans D4 previous value if it had one).
	MOVE.W			(A0), D4							; Stores the id of the sailor inside D4 (A0 has the address of the sailor ID).
	MULU.W			#$0002, D4						; Multiplicates the value of D4 by 2, since the difference/distance between palletes has 2 bytes.
	ADD.L				#$7E800.L, D4					; Adds the difference/distance between palletes start address inside the D4.
	MOVE.L			D4, A5								; Stores D4 inside A5 (A5 is safe to use).
	ADD.W				(A5), D6							; Adds the difference/distance between palletes of the selected sailor to D6.

																		; Block of code that handles the cursor on top of player 2 and also the last line of the player 2 block.
	JMP					$8FC0									; Returns back to the original code in case of being player 2 (original value is already set in D6).


; Put those values after the last instruction hex values
;	It is the difference/distance between the original to the new pallete.
; 0000 A022 8021 8021 8021 8021 (It is already little endian, switching bytes is not necessary)


*~Font name~Courier New~
*~Font size~10~
*~Tab type~1~
*~Tab size~2~
