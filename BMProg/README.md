BMProg
==============================
This project is a simple "programming language" comprising of coloured pixels in a bitmap image which is traversed by signals.

The repository includes a (currently incomplete) interpreter implementation written in C#.

The remainder of this document comprises of the language specification.

## Cycles and Signals
BMProg consists primarily of signals which move within the program 1 cell every cycle.
Each signal has an implicit position which is the cell of the program it is currently in.
Each signal has an explicit direction which defines which way it is travelling through the program.
The signal's direction is altered by any instruction cells it passes through.
It is possible for there to be two signals in one cell as long as they are not moving in the same direction.
Cycles are in no way bound to real time.

During each cycle each cell will evaluate its contents simultaneously.
Depending on the type of instruction the cell has, any signals within it could have their directions manipulated.
Once all new signal directions have been calculated the signals will move 1 cell forward in the direction they are facing, assuming they are not in the waiting state.
If a signal is in the **WAITING** state then it will have it's **WAITING** flag removed but will not move in its direction (during the current cycle).

## Instruction Set
The colour of the pixels in the bitmap image signifies the instruction they represent:
- **Red** cells are **UP** instructions (FF0000).
- **Green** cells are **LEFT** instructions (00FF00).
- **Blue** cells are **RIGHT** instructions (0000FF).
- **Magenta** cells are **DOWN** instructions (FF00FF).
- **Cyan** cells are **SPLIT** instructions (00FFFF).
- **Black** cells are **VOID** instructions (000000).
- **Yellow** cells are **COMMENT** instructions (FFFF00).
- **White** cells are **EMPTY** instuctions (FFFFFF).
- **Other** cells are **UNKNOWN** instructions (??????).

### UP - Red
If this cell contains 1 signal, that signal will be given the **UP** direction.
If this cell contains more than 1 signal, those signals will be replaced by a single signal with the **DOWN** direction.

### LEFT - Green
If this cell contains 1 signal, that signal will be given the **LEFT** direction.
If this cell contains more than 1 signal, those signals will be replaced by a single signal with the **RIGHT** direction.

### RIGHT - Blue
If this cell contains 1 signal, that signal will be given the **RIGHT** direction.
If this cell contains more than 1 signal, those signals will be replaced by a single signal with the **LEFT** direction.

### DOWN - Magenta
If this cell contains 1 signal, that signal will be given the **DOWN** direction.
If this cell contains more than 1 signal, those signals will be replaced by a single signal with the **UP** direction.

### SPLIT - Cyan
If this cell contains any signals with the **WAITING** flag:
- Those signals will have their **WAITING** flag removed during the normal cycle process but will not be manipulated any further this cycle.

If this cell contains any signals without the wait instruction:
- Any and all non-waiting signals with the **UP** or **DOWN** direction will be replaced by 2 single **WAITING** signals with the directions **LEFT** and **RIGHT**.
- Any and all non-waiting signals with the **LEFT** or **RIGHT** direction will be replaced by 2 single **WAITING** signals with the directions **UP** and **DOWN**.

### VOID - Black
Any signals within this cell will be destroyed.

### COMMENT, EMPTY, UNKNOWN - Yellow, White, Other
Any signals within these cells will not be manipulated.
Yellow and white cells have been distinguished as comments and "whitespace" to help you write documented and clear BMProg programs.
Other colors should be avoided as these colours may be assigned instructions in later versions of the specification.

## Initialization
The program will initialize itself with signals off to the left of the program which will enter into it during the first cycle.
There is always a starter signal in the top-most (1st) postition.

Subsequent positions (moving down from the 2nd-from-top position) are dictated by the optional integer input argument passed to the interpreter.
This integer is converted to binary and the bits are mapped smallest to largest from top to bottom.

The left border of the screen is only important during initialization and any signals which leave the screen later during the program's execution will be ignored.

### Examples
If 1 was passed as an argument the program would start with the signals in 1st and 2nd positions - the starter signal and the first bit.

If 2 was passed as an argument the program would start with the signals in 1st and 3rd positions - the starter signal and the second bit.

If 3 was passed as an argument the program would start with the signals in 1st, 2nd and 3rd positions - the starter signal and the first two bits.

## Termination
Whenever a signal leaves the program in the top-right position the program has finished.
If any signals have left the right of the screen prior to this in the lower positions these signals will be taken as a binary signal and converted to an integer, which will be the return code of the program.
If multiple signals leave the right of the program in the same position the value of the bit will be toggled each time.
Any signals which leave the screen at the same time as the termination signal (in the top-most position) will be considered in calculation of the return value.

### Example
A signal leaves the right of the program in the 2nd position (bit 1) - The return code would now be 1.

A subsequent signal leaves the right of the program in the 3rd position (bit 2) - The return code would now be 3.

A subsequent signal leaves the right of the program in the 2nd position (bit 1) - The return code would now be 2.

A subsequent signal leaves the right of the screen in the 1st position.
The program terminates and returns the current value of the return code (2).

## I/O
TODO.
Streaming input enters from above, leaves at the bottom.
