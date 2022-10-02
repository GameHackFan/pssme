*-----------------------------------------------------------------------------------------------
* Title:        PSSME Character Drop Improvement
* Written by:   GameHackFan
* Date:         
* Description:  It reads if the character should drop an item from 
*               custom table.
*-----------------------------------------------------------------------------------------------

  JMP       $7EFB0.L                ; Jumps the execution to the instruction in the address (replace 25024 with this code).

; ORG       $7EFB0

  MOVE.W    (A0), D0                ; Stores (A0) inside D0, the enemy ID.
  AND.W     #$2F, D0                ; D0 and 2F, last drop flag index.
  MOVE.B    ($10, PC, D0.W), D0     ; Stores ($10 + PC + D0.B) inside D0, the drop flag.
  TST.B     D0                      ; Compares 0 and D0.
  BLT       $7EEC6                  ; If it is less than 0, go to the last line.
  JMP       $12218                  ; Jumps back to the original code, execute the drop code.
  JMP       $1228A                  ; Jumps back to the original code, ignore the drop.



; NOTE: It is not being used yet.


*~Font name~Courier New~
*~Font size~10~
*~Tab type~1~
*~Tab size~4~