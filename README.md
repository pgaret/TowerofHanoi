#Tower of Hanoi, Logic Puzzle
##Play the Tower of Hanoi puzzle or watch it be solved before your very eyes.

The Tower of Hanoi is a logic puzzle involving three stacks of items of unique sizes.

The puzzle starts with two empty stacks and one full one. The goal of the puzzle is to get all the items off one stack and onto another one.

There are, of course, a few restrictions.

- Only one item can be moved at a time
- Each move consists of taking the top item from one of the stacks and placing it on top of another stack
- No item may be placed on top of a smaller item

##Solution
This problem can be solved with a recursive function, which we can establish by breaking the problem into pieces.

At first, we want to move the full stack - say, 5 item, from Stack A to B. We can only move one at a time though.

So, we move 4 items. But we can't do that either. So 3? 2? 1! We can definitely move one item.

So, we move an item - but where to? The spot we're headed or the helper spot? Well, everything from here depends on the height of the stack. As we move our stacks (or, you could say, build new stacks with pieces from the old one), we'll need to make sure from the very beginning that we build in the right direction.

The theory being that we can never go directly where we're headed - the rules prohibit it. However, we can switch our pieces around in a circle of swapping the smaller ones around to put larger ones in their place until the dust settles and we have our new stack.

Thus, the algorithm is born - we start with a fromStack, a toStack, and a withStack. We swap, each step of the way down, the fromStack and toStack, and move the starting item accordingly. Then, we reverse, calling the function as withStack, toStack, and fromStack. And now we're headed to the rollercoaster of recursion, up and down as we mutate the board into the shape we need.

Thus, we swap pieces in a circle (Stack B->C, Stack B->A, Stack C->A, Stack B->C), accessing bigger numbers in the stack and opening up room for them to head to the next location where we'll building yet another stack, until eventually we reach the configuration that allows us to put the final pieces together.
