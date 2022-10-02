*-----------------------------------------------------------------------------------------------
* Title:        PSSME Drop Improvement
* Written by:   GameHackFan
* Date:
* Description:  Changes the way item drops are handled.
*               Drops are now based on the color ID and a custom table.
*-----------------------------------------------------------------------------------------------

  JMP       $7DD50.L                ; Jumps the execution to the instruction in the address (replace 1222A with this code).
  NOP
  NOP
  NOP
  NOP

; ORG       $7DD50

                                    ; Block of code that handles the item drop based on color ID, from a different table.
  ADD.W     ($196, A6), D1          ; Adds (196 + A6) to D1, the current frame id.
  ANDI.W    #$F, D1                 ; F and D1, the food table is only 16 bytes now.
  ADD.B     ($16, PC, D0.W), D1     ; Adds ($16 + PC + D0.W) to D1, the offset of the item table.
  MOVE.W    #$0E, D0                ; Code from the original game that was replaced with the jump command to extend the code.
  MOVEQ     #0, D4                  ; Code from the original game that was replaced with the jump command to extend the code.
  MOVE.B    ($1C, PC, D1.W), D4     ; Stores ($1C + PC + D1.W) inside D4, the food ID, similar to what the original code does.
  JMP       $12238                  ; Returns back to the original code.


; This code changes the way thetis drops items
; based on her color ID.
;
; Table 1 drops crystal 5/16 and every food from piece of cake and below at 11/16 (1/16 each).
; Table 2 drops meatball at 2/16, chocolate bar at 2/16 and the rest at 12/16 (1/16 each).
; Table 3 drops every food from piece of cake and over. Best 4 foods at 3/16, the rest at 2/16.
; Table 4 is just a copy of Table 3.
;
; Thetis Color ID 0 (Light Blue) drops crystal.
; Thetis Color ID 1 (Dark Blue) drops from table 1.
; Thetis Color ID 2 (Light Pink) drops from table 2.
; Thetis Color ID 3 (Dark Pink) drops from table 2.
; Thetis Color ID 4 (Extra 1) drops from table 3
; Thetis Color ID 6 (Extra 2) drops from table 3.
;
; Put those values after the hex values of the last instruction.
;
; 00 00 10 10 20 20 20 20 30 30 30 30 30 30 30 30
; FF 01 02 04 FF 05 08 0A FF 0B 0C 0D FF 02 0D FF
; 09 00 01 02 03 04 05 06 07 08 09 0A 0B 0C 0D 00
; 06 09 00 03 05 06 07 09 00 03 05 06 07 09 00 03
; 06 09 00 03 05 06 07 09 00 03 05 06 07 09 00 03



*~Font name~Courier New~
*~Font size~10~
*~Tab type~1~
*~Tab size~4~