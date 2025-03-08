*-----------------------------------------------------------------------------------------------
* Title:        PSSME Drop Improvement
* Written by:   GameHackFan
* Date:
* Description:  Changes the way item drops are handled.
*               It has a code that makes drops be based on the
*               color ID and a custom table.
*               It has codes that changes the item drop from
*               the falling move ID to the fallen move ID.
*               It has code that changes the impulse of the 
*               item drop.
*-----------------------------------------------------------------------------------------------

************************************************************************************************
* Code 1
************************************************************************************************

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


************************************************************************************************
* Code 2
************************************************************************************************

; ORG       $11D90                  ; Replace 11D90 (There is enough space for the new code).

                                    ; Block of code that disables the item drop for the falling action.
  NOP                               ; No operation, does nothing.
  NOP                               ; No operation, does nothing.
  NOP                               ; No operation, does nothing.
  NOP                               ; No operation, does nothing.
  NOP                               ; No operation, does nothing.
  NOP                               ; No operation, does nothing.
  NOP                               ; No operation, does nothing.
  NOP                               ; No operation, does nothing.
  NOP                               ; No operation, does nothing.


************************************************************************************************
* Code 3
************************************************************************************************

; ORG       $11E90                  ; Replace 11E90 (There is enough space for the new code).

                                    ; Block of code that removes the restriction for the fallen action to drop items.
  BEQ       $11E9A                  ; Removes the possibility of the item drop code to be ignored.


************************************************************************************************
* Code 4
************************************************************************************************

; ORG       $1225A                  ; Replace 1225A (There is enough space for the new code).

                                    ; Block of code that changes the item drop movement.
  BCS       $1228A                  ; Code from the original game readjusted.
  MOVE.W    ($26, A0), ($6A, A1)    ; Code from the original game.
  BCHG      #$3, ($6B, A1)          ; Code from the original game.
  MOVE.L    ($4C, A0), D0           ; Code from the original game.
  ASR.L     #$1, D0                 ; Shifts Right D0 bits by 1, reduces the X movement speed.
  NEG.L     D0                      ; Inverts all bits of D0, the enemy moving direction inverted.
  CLR.W     D0                      ; Clears D0, clear the first 2 bytes to ensure a good impulse.
  MOVE.L    D0, ($4C, A1)           ; Code from the original game.
  MOVE.W    D7, ($48, A1)           ; Code from the original game.
  MOVE.L    #$FFFFC400, ($60, A1)   ; Code from the original game.
  MOVE.L    #$6C000, ($54, A1)      ; Stores 6C000 inside ($54 + A1), the upwards movement speed to 6.



*~Font name~Courier New~
*~Font size~10~
*~Tab type~1~
*~Tab size~4~