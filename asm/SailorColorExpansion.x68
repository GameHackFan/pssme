*-----------------------------------------------------------------------------------------------
* Title:        PSSME Sailor Color Expansion
* Written by:   GameHackFan
* Date:
* Description:  Code that forces selected color ID 1+ to read
*               the pallete from a custom address.
*-----------------------------------------------------------------------------------------------

  JMP         $7E200.L              ; Jumps the execution to the instruction in the address (replace 8FBA with this code).

; ORG         $7E200

                                    ; Block of code from the original game that was replaced.
  MOVE.W      (A1, D6.W), D6        ; Code from the original game that was replaced with the jump command to extend the code.
  ADD.W       D7, D6                ; Code from the original game that was replaced with the jump command to extend the code.

                                    ; Block of code that handles the player indicator.
  CMPI.W      #$40, D4              ; Compares 40 and D4 (indicator has 40 inside D4).
  BEQ         $7E23E                ; If equals 40, it will jump to the last JMP (no change).

                                    ; Block of code that checks if it is a player.
  MOVE.W      A0, D4                ; Stores A0 inside D4.
  SUB.W       #$2000, D4            ; Subtracts 2000 from D4 (player 1 is 2000, player 2 is 2100).
  CMPI.W      #$100, D4             ; Compares 100 and D4 (player 1 will have 0, player 2 will have 100).
  BGT         $7E23E                ; If greater than 100, it will jump to the last JMP (no change).

                                    ; Block of code that handles the select screen.
  CMP.W       #$1C, ($1384, A6)     ; Compares 1C and (A6 + $1384), 1C is select screen area ID.
  BEQ         $7E23E                ; If it is 1C, it will go to the last JMP.

                                    ; Block of code that handles if color ID is 0.
  MOVE.W      ($758E, A0), D4       ; Stores ($758E, A0) inside D4, the player color ID.
  TST.W       D4                    ; Compares 0 and D4.
  BEQ         $7E23E                ; If it is 0, it will jump to the last JMP (no change).

                                    ; Block of code that handles the extra color.
  MULU.W      #$20, D4              ; Multiplies D4 by 20 (pallete shift, each pallete uses 32 bytes).
  ADD.W       D4, D6                ; Adds the color ID shift to D6.
  MOVE.W      (A0), D4              ; Stores the id of the sailor inside D4.
  MULU.W      #$0002, D4            ; Multiplies D4 by 2, since the difference/distance between palletes has 2 bytes.
  LEA         $7E244, A5            ;  Stores the difference/distance between palletes start address inside the A5.
  ADD.W       D4, A5                ; Adds D4 to A5 (the offset needed to get the difference/distance is in D4).
  ADD.W       (A5), D6              ; Adds the difference/distance between palletes of the selected sailor to D6.

  JMP         $8FC0                 ; Returns back to the original code (the value needed is already set in D6).



; Put those values after the hex values of the
; last instruction.
; It is the difference/distance between the 
; original to the new pallete.
; The values are little endian already, swapping
; bytes is not necessary.
;
; 0000 4022 8021 E021 4022 A022
;
; D4 is safe to use.
; D6 must hold the pallete shift.
; A0 has the player memory start. First word is the character ID
; A5 is safe to use.
; A6 has 108000.



*~Font name~Courier New~
*~Font size~10~
*~Tab type~1~
*~Tab size~2~