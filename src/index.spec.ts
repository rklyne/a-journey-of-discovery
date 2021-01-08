import { sum } from './index';
import { expect } from 'chai';

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

describe('sample test-suite', () => {
    it('sum 1 + 3 should be 4', () => {
        expect(sum(1, 3)).eql(4);
    });
});

