*-----------------------------------------------------------------------------------------------
* Title:        PSSME Bakene Improvement
* Written by:   GameHackFan
* Date:
* Description:  It forbids any posture ID that is not 40 to kill all
*               enemies when he dies.
*-----------------------------------------------------------------------------------------------

************************************************************************************************
* Code 1
************************************************************************************************

  JMP       $7E400.L                ; Replace 30380.
  NOP
  NOP
  NOP
  NOP

; ORG       $7E400

                                    ; Block of code that handles sailor randomization.
  MOVE.L    A0, D1                  ; Stores A0 inside D1, saves A0 value.
  LEA       ($1496, A6), A0         ; Stores ($1496 + A6) inside A0, player 1 memory address.
  BSR       $7E450                  ; Calls the code that randomizes the sailor and the color.
  BSR       $7E4C0                  ; Calls the code that sets the sailor ID in the character memory.
  LEA       ($1596, A6), A0         ; Stores ($1596 + A6) inside A0, player 2 memory address.
  BSR       $7E450                  ; Calls the code that randomizes the sailor and the color.
  BSR       $7E4C0                  ; Calls the code that sets the sailor ID in the character memory.
  MOVE.L    D1, A0                  ; Stores A0 inside D1, restores A0 value.
  CLR.L     D0                      ; Clears D0.

                                    ; Block of code from the original game that was replaced.
  MOVE.W    (A0)+, D0               ; Code from the original game that was replaced with the jump command to extend the code.
  MOVE.L    A0, -(A7)               ; Code from the original game that was replaced with the jump command to extend the code.
  JSR       $2054.L                 ; Code from the original game that was replaced with the jump command to extend the code.
  MOVE.L    (A7)+, A0               ; Code from the original game that was replaced with the jump command to extend the code.
  MOVEQ     #$0, D0                 ; Code from the original game that was replaced with the jump command to extend the code.
  JMP       $3038E                  ; Jumps back to the original code at 3038E.


************************************************************************************************
* Code 2
************************************************************************************************

; ORG       $7E430

                                    ; Block of code that saves the value from list of random values inside D0.
  ADD.W     ($194, A6), D0          ; Adds ($192 + A6) to D0, the amount of frames passed.  
  AND.L     #$1F, D0                ; D0 and 1F, using only 32 of 55 values from the list.
  ADD.B     D0, D0                  ; Adds D0 to D0, doubles it, the values are 2 bytes.
  ADD.W     #$7220, D0              ; Adds 7220 to D0, the shift to the list of values.
  MOVE.W    (A6, D0.W), D0          ; Stores (A6 + D0.W) inside D0, a value from the list.
  RTS                               ; Go back to the routine that called this code.


************************************************************************************************
* Code 3
************************************************************************************************

; ORG       $7E450

                                    ; Block of code that randomizes the sailor ID.
  TST.W     ($F4, A0)               ; Compares 0 and ($F4 + A0), random flag
  BEQ       $7E4B6                  ; If it is 0, don't randomize, go to the RTS line of code.               
  MOVE.W    A0, D0                  ; Stores A0 inside D0, to grab the first index value.
  LSR.W     #$4, D0                 ; Right bitshift D0 by 4.
  BSR       $7E430                  ; Calls the code that stores indide D0 a random value.
  BSR       $7E430                  ; Calls the code that stores indide D0 a random value.
  MOVE.W    D0, ($F8, A0)           ; Stores D0 inside ($F8 + A0), saves the index in the color address.  
  SWAP      D0                      ; Swaps D0 lower and higher bytes.
  CLR.W     D0                      ; Clears D0, clears the higher bytes so division can work properly.
  SWAP      D0                      ; Swaps D0 lower and higher bytes.
  DIVU.W    #5, D0                  ; Divides D0 by 5, amount of sailors.
  SWAP      D0                      ; Swaps D0 lower and higher bytes, to have the rest of division.
  ADDQ      #1, D0                  ; Adds 1 to D0, sailor IDs are in the 1 to 5 range.
  MOVE.W    D0, ($1A, A0)           ; Stores D0 inside ($1A + A0), the randomized sailor ID.

                                    ; Block of code that randomizes the color ID.
  MOVE.W    ($F8, A0), D0           ; Stores D0 inside ($F8 + A0), restore the index.
  BSR       $7E430                  ; Calls the code that stores indide D0 a random value.
  AND.W     #7, D0                  ; D0 and 7, colors go from 0 to 7.
  MOVE.W    D0, ($F8, A0)           ; Stores D0 inside ($F8 + A0), the randomized color ID.

                                    ; Block of code that fixes color conflict and set it.
  MOVE.W    A0, D0                  ; Stores A0 inside D0, the current player address.
  BCHG      #8, D0                  ; Toggle the 9th bit of D0, 9496 to 9596, 9596 to 9496, the other player.
  BCLR      #$F, D0                 ; Clears the 16th bit of D0, 9496 to 1496, 9596 to 1596.
  CMP.W     #$03, ($1C, A6, D0.W)   ; Compares 3 and ($1C + A6 + D0.W), the other player active flag.
  BNE       $7E4B6                  ; If it is not 3, go to the RTS line.
  MOVE.W    ($14B0, A6), D0         ; Stores ($14B0 + A6) inside D0, player active flag.
  CMP.W     ($15B0, A6), D0         ; Compares ($15B0 + A6) and D0, both players sailor ID.
  BNE       $7E4B6                  ; If not equals, go to the RTS line.
  MOVE.W    ($158E, A6), D0         ; Stores ($158E + A6) inside D0, player 1 color ID.
  CMP.W     ($168E, A6), D0         ; Compares ($168E + A6) and D0, both players color ID.
  BNE       $7E4B6                  ; If not equals, go to the RTS line.
  MOVE.W    ($F8, A0), D0           ; Stores D0 inside ($F8 + A0), the randomized color ID.
  ADDQ      #1, D0                  ; Adds 1 to D0, go to the next color to solve the conflict.
  AND.W     #7, D0                  ; D0 and 7, colors go from 0 to 7.
  MOVE.W    D0, ($F8, A0)           ; Stores D0 inside ($F8 + A0), the randomized color ID.
  RTS                               ; Go back to the routine that called this code.


************************************************************************************************
* Code 4
************************************************************************************************

; ORG       $7E4C0

                                    ; Block of code that sets the sailor ID inside the player character memory.
  CMP.W     #$3, ($1C, A0)          ; Compares 3 and ($1C + A0), player active falg.
  BNE       $7E4CE                  ; If it is not 3, don't set the sailor ID. 
  MOVE.W    ($1A, A0), (-$7496, A0) ; Stores ($1A + A0) inside (-$7496 + A6), the sailor ID inside the player character memory.
  RTS                               ; Go back to the routine that called this code.



*~Font name~Courier New~
*~Font size~10~
*~Tab type~1~
*~Tab size~4~