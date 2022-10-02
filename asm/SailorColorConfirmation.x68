*-----------------------------------------------------------------------------------------------
* Title:        PSSME Sailor Color Confirmation
* Written by:   GameHackFan
* Date:
* Description:  Forbid the player confirming a color that is already selected.
*               Removes the color indicator.
*-----------------------------------------------------------------------------------------------

  JMP       $7E370.L                ; Jumps the execution to the instruction in the address (replace 6374 with this code).
  NOP                               ; Junk code to fill the space that won't be used (place it after the code above).

; ORG       $7E370
                                    ; Block of code that sets the random select flag, and call sailor randomizer.
  CLR.W     D0                      ; Clears D0.
  MOVE.B    ($1, A3), D0            ; Stores ($1 + A3) inside D0, player input.
  LSR.B     #7, D0                  ; Right bitshift D0 by 7, 0 if start is not pressed, 1 if pressed.
  MOVE.W    D0, ($F4, A5)           ; Stores D0 inside ($F4, A5), the random select flag.
  MOVE.L    A5, A0                  ; Stores A5 inside A0, current player memory region.    
  BSR       $7E450                  ; Call the sailor randomizer code.
  TST.B     D0                      ; Compares 0 and D0
  BNE       $7E3BA                  ; If it is not 0, go to the set active flag block of code.

                                    ; Block of code that calculates the other player address.
  MOVE.W    A4, D0                  ; Stores A4 inside D0, P1 is 2000, P2 is 2100.
  EOR.W     #$2100, D0              ; D0 exclusive or 2100, 2000 to 100, 2100 to 0.
  ADD.W     D0, D0                  ; Adds D0 to D0, doubles it.
  LEA       (-$100, A4), A0         ; Stores (-$100 + A4) inside A0, 100 before current player.
  ADD.W     D0, A0                  ; Adds D0 to A0, the shift to the other player.

                                    ; Block of code that checks if the color ID should change.
  CMPI.W    #$03, ($74B2, A0)       ; Compares 3 and (A0 + $74B2), the other player active flag.
  BNE       $7E3BA                  ; If they aren't equal, go to the set active flag block of code.
  MOVE.W    ($74B0, A4), D0         ; Stores the player character ID inside D0.
  CMP.W     ($74B0, A0), D0         ; Compares (A0 + $74B0) and D0 (both players character IDs).
  BNE       $7E3BA                  ; If they aren't equal, go to the set active flag block of code.
  MOVE.W    ($758E, A4), D0         ; Stores the player color ID to D0.
  CMP.W     ($758E, A0), D0         ; Compares (A0 + $758E) and D0 (both players color IDs).
  BNE       $7E3BA                  ; If they aren't equal, go to the set active flag block of code.

                                    ; Block of code that handles the color ID change.
  ADDQ.W    #$01, D0                ; Adds 1 to D0 (go to the next color).
  AND.W     #$07, D0                ; D0 and 7, to put it in the valid color range 0 to 7.
  MOVE.W    D0, ($758E, A4)         ; Stores DO inside ($758E + A4), the new color ID.

                                    ; Block of code that sets sets the active flag and removes the color label from the screen.
  MOVE.W    #$03, ($74B2, A4)       ; Stores 3 in (A4 + $74B2), the player active flag.
  BSR       $7E250                  ; Calls the color indicator handler code.

                                    ; Block of code from the original game that was replaced.
  LEA       ($144E, A6), A0         ; Code from the original game that was replaced with the jump command to extend the code.
  MOVE.W    ($1A, A5), D0           ; Code from the original game that was replaced with the jump command to extend the code.
  JMP       $637C                   ; Returns back to the original code.



; The player active flag once set never resets (bug?).
;
; D0 is safe to use.
; A0 is safe to use.
; A4 has the player memory start.


*~Font name~Courier New~
*~Font size~10~
*~Tab type~1~
*~Tab size~4~