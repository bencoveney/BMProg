using System;

namespace BMProg
{
	internal class ConsoleRenderer
		: IRenderer
	{
		private Board board;

		private int frameCount;

		public ConsoleRenderer(Board board)
		{
			this.board = board;
			this.frameCount = 0;
		}

		public void DrawStart()
		{
			// Set to white
			Console.BackgroundColor = ConsoleColor.Gray;
			Console.ForegroundColor = ConsoleColor.Black;
			Console.Clear();

			// Draw borders
			Console.BackgroundColor = ConsoleColor.Black;
			Console.ForegroundColor = ConsoleColor.White;

			for (int x = 0; x < board.Width; x++)
			{
				Console.SetCursorPosition(x, board.Height);
				Console.Write("#");
			}

			for (int y = 0; y < board.Height; y++)
			{
				Console.SetCursorPosition(board.Width, y);
				Console.Write("#");
			}
		}

		public void DrawFrame()
		{
			Console.BackgroundColor = ConsoleColor.White;
			Console.ForegroundColor = ConsoleColor.Black;
			Console.SetCursorPosition(0, board.Height + 1);
			Console.Write("Frame: " + frameCount);

			for (int x = 0; x < board.Width; x++)
			{
				for (int y = 0; y < board.Height; y++)
				{
					Signal signalInPosition = board.Signals.Find(signal => signal.Position.X == x && signal.Position.Y == y);

					Console.SetCursorPosition(x, y);
					WriteCellContent(board.Instructions[x, y], signalInPosition);
				}
			}

			frameCount++;
		}

		public void DrawEnd()
		{
			// No specific ending logic

			return;
		}

		private void WriteCellContent(Instruction instruction, Signal signalInPosition)
		{
			bool hasSignal = signalInPosition != null;

			switch (instruction)
			{
				case Instruction.Right:
					Console.BackgroundColor = ConsoleColor.Blue;
					Console.ForegroundColor = hasSignal ? ConsoleColor.White : ConsoleColor.DarkBlue;
					Console.Write('>');
					return;

				case Instruction.Left:
					Console.BackgroundColor = ConsoleColor.Green;
					Console.ForegroundColor = hasSignal ? ConsoleColor.White : ConsoleColor.DarkGreen;
					Console.Write('<');
					return;

				case Instruction.Up:
					Console.BackgroundColor = ConsoleColor.Red;
					Console.ForegroundColor = hasSignal ? ConsoleColor.White : ConsoleColor.DarkRed;
					Console.Write('^');
					return;

				case Instruction.Down:
					Console.BackgroundColor = ConsoleColor.Magenta;
					Console.ForegroundColor = hasSignal ? ConsoleColor.White : ConsoleColor.DarkMagenta;
					Console.Write('V');
					return;

				case Instruction.Split:
					Console.BackgroundColor = ConsoleColor.Cyan;
					Console.ForegroundColor = hasSignal ? ConsoleColor.White : ConsoleColor.DarkCyan;
					Console.Write('*');
					return;

				case Instruction.Comment:
					Console.BackgroundColor = ConsoleColor.Yellow;
					Console.ForegroundColor = ConsoleColor.DarkYellow;
					Console.Write(hasSignal ? this.GetCharForDirection(signalInPosition.Direction) : '_');
					return;

				case Instruction.Void:
					Console.BackgroundColor = ConsoleColor.DarkGray;
					Console.ForegroundColor = hasSignal ? ConsoleColor.White : ConsoleColor.Black;
					Console.Write('@');
					return;

				case Instruction.Unknown:
				default:
					if (hasSignal)
					{
						Console.BackgroundColor = ConsoleColor.White;
						Console.ForegroundColor = ConsoleColor.Gray;
						Console.Write(this.GetCharForDirection(signalInPosition.Direction));
					}
					else
					{
						Console.BackgroundColor = ConsoleColor.Gray;
						Console.ForegroundColor = ConsoleColor.Black;
						Console.Write(' ');
					}
					return;
			}
		}

		public char GetCharForDirection(Direction direction)
		{
			switch (direction)
			{
				case Direction.Right:
					return '>';
				case Direction.Left:
					return '<';
				case Direction.Up:
					return '^';
				case Direction.Down:
					return 'V';
				default:
				case Direction.Unknown:
					return '?';
			}
		}
	}
}
