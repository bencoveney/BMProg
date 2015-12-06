using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BMProg
{
	public class Interpreter
	{
		private Board board;

		public Interpreter(Board board)
		{
			this.board = board;
		}

		public bool Tick()
		{
			List<Signal> newSignals = new List<Signal>();

			foreach (Signal signal in board.Signals)
			{
				if (signal.Position.X < 0 || signal.Position.X >= board.Width)
				{
					return false;
				}
				if (signal.Position.Y < 0 || signal.Position.Y >= board.Height)
				{
					return false;
				}

				Instruction instruction = board.Instructions[signal.Position.X, signal.Position.Y];

				switch (instruction)
				{
					case Instruction.Comment:
					case Instruction.Unknown:
						// Move forward
						switch (signal.Direction)
						{
							case Direction.Right:
								signal.Position.X++;
								newSignals.Add(signal);
								break;
							case Direction.Left:
								signal.Position.X--;
								newSignals.Add(signal);
								break;
							case Direction.Up:
								signal.Position.Y--;
								newSignals.Add(signal);
								break;
							case Direction.Down:
								signal.Position.Y++;
								newSignals.Add(signal);
								break;
							default:
							case Direction.Unknown:
								break;
						}
						break;

					case Instruction.Right:
						// Go right
						signal.Direction = Direction.Right;
						signal.Position.X++;
						newSignals.Add(signal);
						break;

					case Instruction.Left:
						// Go left
						signal.Direction = Direction.Left;
						signal.Position.X--;
						newSignals.Add(signal);
						break;

					case Instruction.Up:
						// Go up
						signal.Direction = Direction.Up;
						signal.Position.Y--;
						newSignals.Add(signal);
						break;

					case Instruction.Down:
						// Go down
						signal.Direction = Direction.Down;
						signal.Position.Y++;
						newSignals.Add(signal);
						break;

					case Instruction.Split:
						if (signal.Direction == Direction.Down || signal.Direction == Direction.Up)
						{
							newSignals.Add(new Signal()
							{
								Position = new Point(signal.Position.X + 1, signal.Position.Y),
								Direction = Direction.Right
							});
							newSignals.Add(new Signal()
							{
								Position = new Point(signal.Position.X - 1, signal.Position.Y),
								Direction = Direction.Left
							});
						}
						else
						{
							newSignals.Add(new Signal()
							{
								Position = new Point(signal.Position.X, signal.Position.Y + 1),
								Direction = Direction.Down
							});
							newSignals.Add(new Signal()
							{
								Position = new Point(signal.Position.X, signal.Position.Y - 1),
								Direction = Direction.Up
							});
						}
						break;

					case Instruction.Void:
						break;

					default:
						break;
				}
			}

			board.Signals = newSignals;

			return true;
		}
	}
}
