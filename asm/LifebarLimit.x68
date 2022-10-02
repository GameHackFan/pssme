*-----------------------------------------------------------------------------------------------
* Title:        PSSME Lifebar Limit
* Written by:   GameHackFan
* Date:         
* Description:  It limits the size of the lifebar so the it doesn't 
*               bug the HUD.
*-----------------------------------------------------------------------------------------------

  JMP       $7EFA0.L                ; Jumps the execution to the instruction in the address (replace 5560, 560A with this code).

; ORG       $7EFA0

                                    ; Block of code that limits the size of the lifebar.
  MOVE.W    ($30, A4), D5           ; Code from the original game that was replaced with the jump command to extend the code.
  CMP.W     #$60, D5                ; Compares 60 and D5, maximum lifebar size.
  BLE       $7EFAE                  ; If it is less or equals 60, ignore the line below.
  MOVE.W    #$60, D5                ; Stores 60 inside D5, the maximum lifebar size.
  SWAP      D5                      ; Code from the original game that was replaced with the jump command to extend the code.



; NOTE: It is not being used yet.


*~Font name~Courier New~
*~Font size~10~
*~Tab type~1~
*~Tab size~4~