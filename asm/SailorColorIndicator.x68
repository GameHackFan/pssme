*-------------------------------------------------------------------------------------------------
* Title:				PSSME Sailor Color Indicator.
* Written by:		GameHackFan
* Date:					
* Description:	Prints the current color being selected in the screen.
*-------------------------------------------------------------------------------------------------

; ORG				$7E250

																		; Block of code that calls the code that prints the color indicator.
	LEA				$4FC000, A0							; Stores 4FC000 inside A0 (later, + player memory address + 4000).
	ADD.W			A4, A0									; Adds 2 bytes of A4 to A0 (2000 or 2100).
	CMP.W			#$03, ($74B2, A4)				; Compares 3 and (A4 + $74B2), the player active flag.
	BGE				$7E266									; If it is greater or equal 3, go to the clean print memory code.
	BSR				$7E26C									; Call the code to print the indicator for even frames.
	BSR				$7E26C									; Call the code to print the indicator for odd frames.
	RTS																; Go back to the routine that called this code.
	BSR				$7E2D6									; Call the code to clean the print memory space for even frames.
	BSR				$7E2D6									; Call the code to clean the print memory space for odd frames.
	RTS																; Go back to the routine that called this code.

																		; Block of code that stores the color indicator values.
	MOVE.W		#$4000, D0							; Stores 4000 inside D0 (shift needed to print odd and even frames).
	ADD.W			D0, A0									; Adds D0 to A0 (the shift).
	MOVE.W		#$30, D0								; Stores 30 inside D0 ("A" sprite).
	ADD.W			($758E, A4), D0					; Adds ($758E, A4) to D0 (the color ID, so 0 = A, 1 = B, etc).
	MOVE.W		D0, ($06, A0)						; Stores D0 in the sprite to print memory space.
	MOVE.W		#$0210, ($04, A0)				; Stores 210 in the sprite to print memory space.
	MOVE.W		#$0100, ($08, A0)				; Stores 100 in the sprite to print memory space.
	MOVE.W		#$0100, ($0A, A0)				; Stores 100 in the sprite to print memory space.
	MOVE.W		#$0101, ($0C, A0)				; Stores 101 in the sprite to print memory space.
	MOVE.W		#$0000, ($0E, A0)				; Stores 0 in the sprite to print memory space.
	MOVE.W		A4, D0									; Stores A4 inside D0.
	CMP.W			#$1C, ($1384, A6)				; Compares 1C and (A6 + $1384), 1C is select screen area ID.
	BNE				$7E2BE									; If it is not 1C, go to the code that prints it for in game select.

																		; Block of code that stores the position of the color indicator for select screen.
	MOVE.W		#$0038, ($02, A0)				; Stores 38 in the sprite to print memory space (pos y).
	CMPI.W		#$2100, D0							; Compare 2100 and D0.
	BEQ				$7E2B8									; If it is 2100, player 2 go to the line that moves AE to D0.
	MOVE.W		#$0084, (A0)						; Stores 84 in the sprite memory (pos x for player 1).
	RTS																; Go back to the routine that called this code.
	MOVE.W		#$00AE, (A0)						; Stores AE in the sprite memory (pos x for player 2).
	RTS																; Go back to the routine that called this code.

																		; Block of code that stores the position of the color indicator mid game.
	MOVE.W		#$0001, ($02, A0)				; Stores 1 in the sprite to print memory space (pos y).
	CMPI.W		#$2100, D0							; Compare 2100 and D0.
	BEQ				$7E2D0									; If it is 2100, player 2 go to the line that moves 128 to D0.
	MOVE.W		#$0078, (A0)						; Stores 78 in the sprite memory (pos x for player 1).
	RTS																; Go back to the routine that called this code.
	MOVE.W		#$0128, (A0)						; Stores 128 in the sprite memory (pos x for player 2).
	RTS																; Go back to the routine that called this code.

																		; Block of code that cleans the print memory space.
	MOVE.W		#$4000, D0							; Stores 4000 inside D0 (shift needed to print odd and even frames).
	ADD.W			D0, A0									; Adds D0 to A0 (the shift).
	MOVE.W		#$0101, D0							; Stores 101 inside D0 (clean line is filled with 101).
	MOVE.W		D0, (A0)								; Stores D0 in the sprite to print memory space.
	MOVE.W		D0, ($02, A0)						; Stores D0 in the sprite to print memory space.
	MOVE.W		D0, ($04, A0)						; Stores D0 in the sprite to print memory space.
	MOVE.W		D0, ($06, A0)						; Stores D0 in the sprite to print memory space.
	MOVE.W		D0, ($08, A0)						; Stores D0 in the sprite to print memory space.
	MOVE.W		D0, ($0A, A0)						; Stores D0 in the sprite to print memory space.
	MOVE.W		D0, ($0C, A0)						; Stores D0 in the sprite to print memory space.
	MOVE.W		D0, ($0E, A0)						; Stores D0 in the sprite to print memory space.
	RTS																; Go back to the routine that called this code.


;	500000 is the start address used to print on screen (odd even frames).
;	504000 is the start address used to print on screen (odd even frames).
; If the game is overwhelmed, it might not read all lines.
;
; xxxx00:		Position X of the sprite.
; xxxx02:		Position Y of the sprite.
; xxxx04:		Pallete.
; xxxx05:		Sprite rotation.
; xxxx06:		Sprite offset. (30 for uppercase letter, 50 for uppercase).
; xxxx08:		Have no clue how to explain.
; xxxx0A:		Have no clue how to explain.
; xxxx0C:		Have no clue how to explain.
; xxxx0E:		?
;
; D0 is safe to use.
; A0 is safe to use.
; A4 has the player memory start.


*~Font name~Courier New~
*~Font size~10~
*~Tab type~1~
*~Tab size~4~