export const allSailorsDamageMap = 
{
  desperationAttackDamageGiven:
  {
    key: "desperationAttackDamageGiven",
    label: "Desperation Attack Damage Given (Attack + Jump)",
    filename: "bpsm945a.u45",
    byteIndexes: [40480],
    defaultValue: 6
  },
  desperationAttackDamageTaken:
  {
    key: "desperationAttackDamageTaken",
    label: "Desperation Attack Damage Taken (Attack + Jump)",
    filename: "bpsm945a.u45",
    byteIndexes: [40512, 44024],
    defaultValue: 6,
    byteFormat: "hex",
    apply:
    {
      "40508": ["06", "67", "68", "06", "06", "00", "34", "00"]
    },
    check:
    {
      "40508": ["00", "67", "06", "00", "68", "5C", "34", "00"]
    }
  }
}