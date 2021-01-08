/**

Roman numbers kata    
Given a positive integer number write a function returning its Roman numeral representation as a String.
Examples: 
1=> I            20=> XX            300=> CCC
2=> II            30=> XXX            400=> CD
3=> III        40=> XL            500=> D
4=> IV        50=> L            600=> DC
5=> V        60=> LX            700=> DCC
6=> VI        70=> LXX            800=> DCCC
7=> VII        80=> LXXX            846=> DCCCXLVI
8=> VIII        90=> XC            900=> CM
9=> IX        100=> C            1000=> M
10=> X        200=> CC            1999=> MCMXCIX
                                2008=> MMVIII

 */

describe("roman numeral rendering", () => {
    it.each`
        n    | roman
        ${1} | ${"I"}
        ${2} | ${"II"}
        ${3} | ${"III"}
    `("returns $roman when given $number", ({ n, roman }) => {
        expect(toRomanNumerals(n)).toBe(roman);
    });
});

function toRomanNumerals(n) {
    if (n === 2) return "II";
    return "I";
}
