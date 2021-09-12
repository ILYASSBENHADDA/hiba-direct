//  Generate price per cent
export default function pricePerCent(goal, paid) {
     const perCent = (paid/(goal/100))

     return perCent.toFixed(1)
}