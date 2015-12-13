using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BMProg
{
	internal class NewInterpreter
		: IInterpreter
	{
		private Board board;

		private bool isFirstTick = true;

		private IEnumerable<bool> input;

		private bool[] output;

		public NewInterpreter(Board board, int input)
		{
			this.board = board;

			// There will always be a starter signal in the top left.
			IEnumerable<bool> starterSignal = new bool[] { true };

			// There could be other starter signals if there is an input to the interpreter.
			IEnumerable<bool> inputSignals = Convert.ToString(input, 2).Select(s => s.Equals('1'));
			this.input = starterSignal.Concat(inputSignals);

			// Prep the output area. This can only be as tall as the board.
			this.output = Enumerable.Repeat(false, this.board.Height).ToArray();
		}

		public bool Tick()
		{
			if(isFirstTick)
			{
				// For the first tick all we will ever need to do is move the starter signals onto the board.
				AddStarterInput();

				isFirstTick = false;
				return true;
			}

			// Process the signals in each cell depending on their instructions.
			List<Signal> newSignals = new List<Signal>();
			for (int x = -1; x < board.Width + 1; x++)
			{
				for (int y = 0; y < board.Height + 1; y++)
				{
					newSignals.Concat(GetNewSignalsForCell(x, y));
				}
			}

			// Move each signal in the correct direction
			
			// Handle termination

			board.Signals = newSignals;
			return true;
		}

		private IEnumerable<Signal> GetNewSignalsForCell(int x, int y)
		{
			IEnumerable<Signal> currentSignals = board.GetSignalsInCell(x, y);

			Instruction instruction = board.Instructions[x, y];

			switch (instruction)
			{
				case Instruction.Right:
					// Turn right unless theres multiple signals.
					return ProcessDirectionalCell(currentSignals, Direction.Right, Direction.Left);

				case Instruction.Left:
					// Turn left unless theres multiple signals.
					return ProcessDirectionalCell(currentSignals, Direction.Left, Direction.Right);

				case Instruction.Up:
					// Turn upwards unless theres multiple signals.
					return ProcessDirectionalCell(currentSignals, Direction.Up, Direction.Down);

				case Instruction.Down:
					// Turn down unless theres multiple signals.
					return ProcessDirectionalCell(currentSignals, Direction.Down, Direction.Up);

				case Instruction.Split:
					return ProcessSplitCell(currentSignals);

				case Instruction.Void:
					// Everything is removed.
					return new List<Signal>();

				case Instruction.Comment:
				case Instruction.Unknown:
				default:
					// No manipulation.
					return currentSignals;
					break;
			}
		}

		private IEnumerable<Signal> ProcessDirectionalCell(IEnumerable<Signal> signals, Direction singularDirection, Direction multipleDirection)
		{
			List<Signal> result = new List<Signal>();

			switch(signals.Count())
			{
				case 0:
					// Nothing to do.
					break;

				case 1:
					// Return a cell moving in the singular direction.
					Signal onlySignal = signals.ElementAt(0);
					onlySignal.Direction = singularDirection;
					result.Add(onlySignal);
					break;

				default:
					// Return a cell moving in the multiple direction.
					Signal anySignal = signals.ElementAt(0);
					anySignal.Direction = multipleDirection;
					result.Add(anySignal);
					break;;
			}

			return result;
		}

		private IEnumerable<Signal> ProcessSplitCell(IEnumerable<Signal> signals)
		{
			// Seperate the signals out into waiting and non-waiting signals.
			IEnumerable<Signal> waitingSignals = signals.Where(signal => signal.IsWaiting);
			IEnumerable<Signal> nonWaitingSignals = signals.Where(signal => !signal.IsWaiting);

			// The waiting cells are ready to move off.
			waitingSignals.ToList().ForEach(signal => signal.IsWaiting = false);

			// Start collecting confirmed resultant signals.
			List<Signal> result = new List<Signal>(waitingSignals);

			// Process hoizontally moving signals.
			// These are replaced by a 2 waiting signals, one moving up and one moving down.
			if (nonWaitingSignals.Any(signal => signal.Direction == Direction.Left || signal.Direction == Direction.Right))
			{
				// Select a sample to know which position to place the new signals in
				Signal sample = nonWaitingSignals.First();

				result.Add(new Signal
				{
					Direction = Direction.Up,
					IsWaiting = true,
					Position = new Point
					{
						X = sample.Position.X,
						Y = sample.Position.Y
					}
				});

				result.Add(new Signal
				{
					Direction = Direction.Down,
					IsWaiting = true,
					Position = new Point
					{
						X = sample.Position.X,
						Y = sample.Position.Y
					}
				});
			}

			// Process vertically moving signals.
			// These are replaced by a 2 waiting signals, one moving left and one moving right.
			if (nonWaitingSignals.Any(signal => signal.Direction == Direction.Up || signal.Direction == Direction.Down))
			{
				// Select a sample to know which position to place the new signals in
				Signal sample = nonWaitingSignals.First();

				result.Add(new Signal
				{
					Direction = Direction.Left,
					IsWaiting = true,
					Position = new Point
					{
						X = sample.Position.X,
						Y = sample.Position.Y
					}
				});

				result.Add(new Signal
				{
					Direction = Direction.Right,
					IsWaiting = true,
					Position = new Point
					{
						X = sample.Position.X,
						Y = sample.Position.Y
					}
				});
			}

			return result;
		}

		private bool IsTerminating(Signal signal)
		{
			// Top of the off-right pixels.
			return signal.Position.X >= board.Width && signal.Position.Y == 0;
		}

		private IEnumerable<Signal> AddStarterInput()
		{
			List<Signal> inputSignals = new List<Signal>(input.Count());

			// For each input bit, place it on the board (if its a 1). Ignore any overflow.
			for (int i = 0; i < Math.Min(input.Count(), board.Height); i++)
			{
				if(input.ElementAt(i))
				{
					inputSignals.Add(new Signal
					{
						Position = new Point
						{
							X = 0,
							Y = i
						},
						Direction = Direction.Right
					});
				}
			}

			return inputSignals;
		}
	}
}
