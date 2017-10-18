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
			IEnumerable<bool> inputSignals = Convert.ToString(input, 2).Select(s => s.Equals('1')).Reverse();
			this.input = starterSignal.Concat(inputSignals);

			// Prep the output area. This can only be as tall as the board.
			this.output = Enumerable.Repeat(false, this.board.Height).ToArray();
		}

		public int Output
		{
			get
			{
				int value = 0;

				for (int i = 0; i < output.Count(); i++)
				{
					if (output[i])
					{
						value += Convert.ToInt16(Math.Pow(2, i));
					}
				}

				return value;
			}
		}

		public bool Tick()
		{
			if(isFirstTick)
			{
				// For the first tick all we will ever need to do is move the starter signals onto the board.
				this.board.Signals = AddStarterInput();

				isFirstTick = false;
				return true;
			}

			// Process the signals in each cell depending on their instructions.
			List<Signal> newSignals = new List<Signal>();
			for (int x = 0; x < board.Width; x++)
			{
				for (int y = 0; y < board.Height; y++)
				{
					// TODO can't use concat?
					foreach(Signal signal in GetNewSignalsForCell(x, y))
					{
						newSignals.Add(signal);
					}
				}
			}

			// Move each signal in the correct direction.
			newSignals.ForEach(MoveSignal);

			// Signals off of the left hand side of the screen should be removed.
			newSignals.RemoveAll(signal => signal.Position.X < 0);
			
			bool continueInterpreting = true;

			// Signals off of the right hand side of the screen should be converted to output.
			IEnumerable<Signal> offRightSignals = newSignals.Where(signal => signal.Position.X >= board.Width);
			foreach(Signal offRightSignal in offRightSignals)
			{
				// Check for a signal in the termination position.
				if(offRightSignal.Position.Y == 0)
				{
					continueInterpreting = false;
				}
				else
				{
					// Shift the position by 1 as the top spot is the termination signal.
					int position = offRightSignal.Position.Y - 1;

					// Toggle the bit.
					output[position] = !output[position];
				}
			}

			// The off right signals are out of the simulation.
			newSignals.RemoveAll(signal => offRightSignals.Contains(signal));

			// If there are no signals left don't bother continuing.
			if (newSignals.Count <= 0)
			{
				continueInterpreting = false;
			}
			
			// Now that all processing has been done, update the board state with the new signals;
			board.Signals = newSignals;

			return continueInterpreting;
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
			IEnumerable<Signal> waitingSignals = signals.Where(signal => signal.WaitState != WaitState.None);
			IEnumerable<Signal> freshSignals = signals.Where(signal => signal.WaitState == WaitState.None);

			// Start collecting confirmed resultant signals.
			List<Signal> result = new List<Signal>(waitingSignals);

			// Process hoizontally moving signals.
			// These are replaced by a 2 waiting signals, one moving up and one moving down.
			if (freshSignals.Any(signal => signal.Direction == Direction.Left || signal.Direction == Direction.Right))
			{
				// Select a sample to know which position to place the new signals in
				Signal sample = freshSignals.First();

				result.Add(new Signal
				{
					Direction = Direction.Up,
					WaitState = WaitState.StartingWaiting,
					Position = new Point
					{
						X = sample.Position.X,
						Y = sample.Position.Y
					}
				});

				result.Add(new Signal
				{
					Direction = Direction.Down,
					WaitState = WaitState.StartingWaiting,
					Position = new Point
					{
						X = sample.Position.X,
						Y = sample.Position.Y
					}
				});
			}

			// Process vertically moving signals.
			// These are replaced by a 2 waiting signals, one moving left and one moving right.
			if (freshSignals.Any(signal => signal.Direction == Direction.Up || signal.Direction == Direction.Down))
			{
				// Select a sample to know which position to place the new signals in
				Signal sample = freshSignals.First();

				result.Add(new Signal
				{
					Direction = Direction.Left,
					WaitState = WaitState.StartingWaiting,
					Position = new Point
					{
						X = sample.Position.X,
						Y = sample.Position.Y
					}
				});

				result.Add(new Signal
				{
					Direction = Direction.Right,
					WaitState = WaitState.StartingWaiting,
					Position = new Point
					{
						X = sample.Position.X,
						Y = sample.Position.Y
					}
				});
			}

			return result;
		}

		private void MoveSignal(Signal signal)
		{
			switch(signal.WaitState)
			{
				case WaitState.StartingWaiting:
					// Cannot move this tick.
					signal.WaitState = WaitState.FinishingWaiting;
					return;

				case WaitState.FinishingWaiting:
					// We can revert to the ordinary wait state, but should perform movement.
					signal.WaitState = WaitState.None;
					break;

				case WaitState.None:
				default:
					// No specific action to take
					break;
			}

			if (signal.WaitState == WaitState.StartingWaiting)
			{
				return;
			}

			switch (signal.Direction)
			{
				case Direction.Right:
					signal.Position.X = signal.Position.X + 1;
					break;

				case Direction.Left:
					signal.Position.X = signal.Position.X - 1;
					break;

				case Direction.Up:
					signal.Position.Y = signal.Position.Y - 1;
					break;

				case Direction.Down:
					signal.Position.Y = signal.Position.Y + 1;
					break;

				case Direction.Unknown:
				default:
					break;
			}
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
