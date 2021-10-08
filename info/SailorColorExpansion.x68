*-------------------------------------------------------------------------------------------
* Title:				PSSME Sailor Color Expansion Assembly
* Written by:		GameHackFan
* Date:
* Description:	Code that forces the 2nd player's sailor to spawn with the 2nd color.
*-------------------------------------------------------------------------------------------
	JMP					$7E800.L							; Jumps the execution to the instruction in the address (replace 8FBA with this code).



	MOVE.W			(A1, D6.W), D6				; Code from the original game that was replaced with the jump command to extend the code.
	ADD.W				D7, D6								; Code from the original game that was replaced with the jump command to extend the code.
	MOVE.W			A0, D4								; Stores the content of A0 inside D4 (D4 is safe to use).
	CMPI.W			#$2100, D4						; Compares if half of the address used by player 2 is stored in D4.
	BNE.W				$7E828.W							; If not, it will jump to the last JMP.

	CMPI.W			#$0EC0, D6						; Compares if half of the value used by the cursor is stored in D6.
	BEQ.W				$7E828.W							; If yes, it will jump to the last JMP (to avoid changing its colors).

																		; Block of code that handles the select screen. It doesn't fix select screen bug 100%.
;	MOVE.L			D1, D4								; Stores D1 inside the D4 (cleans D4 previous value if it had one, also D4 is safe to use).
;	OR.L				D2, D4								; Bitwise or D2 to D4 (D2 has 0 when called by the select screen).
;	OR.L				D3, D4								; Bitwise or D3 to D4 (D3 has 0 when called by the select screen).
;	CMPI.L			#$0, D4								; Compares if the value of D4 is 0 because in the select screen D1, D2 and D3 is 0. 
;	BEQ.W				$7E834.W							; If yes, it will jump to the last JMP (to avoid changing its colors).

																		; Block of code that handles player 2.
	MOVE.W			(A0), D4							; Stores the id of the sailor inside D4 (A0 has the address of the sailor ID).
	MULU.W			#$0002, D4						; Multiplicates the value of D4 by 2, since the difference/distance between palletes has 2 bytes.
	LEA					$7E82E, A5						;	Stores the difference/distance between palletes start address inside the A5 (A5 is safe to use).
	ADD.W				D4, A5								; Adds D4 to A5 (the offset needed to get the difference/distance is in D4).
	ADD.W				(A5), D6							; Adds the difference/distance between palletes of the selected sailor to D6.


	JMP					$8FC0									; Returns back to the original code (the value is needed is already set in D6).



; Put those values after the hex values of the last instruction.
; It is the difference/distance between the original to the new pallete.
; The values are little endian already, swapping bytes is not necessary.
;
; 0000 A022 8021 8021 8021 8021


*~Font name~Courier New~
*~Font size~10~
*~Tab type~1~
*~Tab size~2~
