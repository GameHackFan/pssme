*-----------------------------------------------------------------------------------------------
* Title:        PSSME Time Improvement
* Written by:   GameHackFan
* Date:
* Description:  It forces the time to run 60% slower.
*-----------------------------------------------------------------------------------------------

  JMP       $7E0D0.L                  ; Jumps the execution to the instruction in the address (replace 2526C with this code).

; ORG       $7E0D0

                                      ; Block of code that handles if the time should run slower.
  MOVE.W    ($2416, A6), D0           ; Stores ($2416 + A6) inside D0, current time.
  CMP.B     ($72F3, A6), D0           ; Compares ($72F2 + A6) and D0, new time.
  BCC       $7E0E4                    ; If it is smaller or equal, go to the original block of code.

                                      ; Block of code that ensures that 99 is converted to F9, increasing time duration by 60%.
  TST.W     D0                        ; Compares 0 and D0 (new time will be FFFF, current will be 0).
  BEQ       $7E0E4                    ; If it is equals 0, ignore the line of code below.
  MOVE.B    #$F9, ($72F3, A6)         ; Stores F9 inside ($72F2 + A6), example 1700 will become 17FA.

                                      ; Block of code from the original game that was replaced.
  MOVE.W    ($72F2, A6), ($2416, A6)  ; Code from the original game that was replaced with the jump command to extend the code.
  JMP       $25272                    ; Returns back to the original code.


; The game handles the time as decimal, so it never
; sets A to F values into the time memory position,
; but if those values are set, it still works fine.
; If you replace 99 from the lower byte, which is the 
; first value of a specific game "second" by F9, the 
; game will process every "second" 60% slower than it 
; normally would, except for the first second, in case 
; it is not set as F9 from the start.
;
; D0 is safe to use.


*~Font name~Courier New~
*~Font size~10~
*~Tab type~1~
*~Tab size~4~