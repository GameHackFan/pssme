*-----------------------------------------------------------------------------------------------
* Title:        PSSME Tesuni Improvement
* Written by:   GameHackFan
* Date:
* Description:  It activates an unused kick tesuni has.
*               Only posture ID 0 (without racket) will kick.
*-----------------------------------------------------------------------------------------------

  JMP       $7DD20.L                ; Jumps the execution to the instruction in the address (replace 1416C with this code).

; ORG       $7DD20

                                    ; Block of code from the original that was replaced.
  JSR       $AE3C.L                 ; Code from the original game that was replaced with the jump command to extend the code.
  
                                    ; Block of that decides if she should punch or kick.
  CMPI.W    #$0F, ($2, A0)          ; Compares F and (2 + A0), 0F and below is posture ID 0.
  BHI       $7DD38                  ; If bigger than F, Goes to the last JMP.
  ANDI.W    #$1, D1                 ; And 1 and D1 (0 is punch, 1 is kick).
  JMP       $1417A                  ; Returns back to the original code at 1417A.
  JMP       $14172                  ; Returns back to the original code at 14172.



; Since Tesuni without racket has only 1 attack, I 
; decided this version must have the unused kick.
; The racket version already has a grab, 1 attack 
; with the racket, a jump attack  with the racket 
; and the punch the version without racket also uses,
; so the unused kick for her other version will bring 
; some differences. The kick will have a 50% (maybe?) 
; chance of being used by Tesuni without racket.


*~Font name~Courier New~
*~Font size~10~
*~Tab type~1~
*~Tab size~4~