namespace BMProg
{
	using BumpKit;
	using System;
	using System.Linq;
	using System.Drawing;

	class GifRenderer
		: IRenderer
	{
		private const int Scale = 5;

		private GifEncoder gifEncoder;
		private Board board;
		private int millisecondsPerTick;

		public GifRenderer(Board board, GifEncoder gifEncoder, int millisecondsPerTick)
		{
			this.gifEncoder = gifEncoder;
			this.board = board;
			this.millisecondsPerTick = millisecondsPerTick;
		}

		public void DrawStart()
		{
			FillColor(Color.CornflowerBlue);
		}

		public void DrawFrame()
		{
			using(Bitmap bitmap = new Bitmap(board.Width * Scale, board.Height * Scale))
			{
				using(Graphics graphics = Graphics.FromImage(bitmap))
				{
					graphics.Clear(Color.White);

					for(int x = 0; x < board.Width; x++)
					{
						for(int y = 0; y < board.Height; y++)
						{
							DrawBoardPixelToGraphics(graphics, x, y);
						}
					}

					gifEncoder.AddFrame(bitmap, 0, 0, TimeSpan.FromMilliseconds(millisecondsPerTick));
				}
			}
		}

		public void DrawEnd(int output)
		{
			FillColor(Color.Chocolate);
		}

		public void FillColor(Color color)
		{
			using (Bitmap bitmap = new Bitmap(board.Width * Scale, board.Height * Scale))
			{
				using (Graphics graphics = Graphics.FromImage(bitmap))
				{
					graphics.Clear(color);
					gifEncoder.AddFrame(bitmap, 0, 0, TimeSpan.FromMilliseconds(millisecondsPerTick));
				}
			}
		}

		private void DrawBoardPixelToGraphics(Graphics graphics, int x, int y)
		{
			Instruction instruction = board.Instructions[x, y];

			Color instructionColor;
			switch(instruction)
			{
				case Instruction.Right:
					instructionColor = Color.Blue;
					break;

				case Instruction.Left:
					instructionColor = Color.Green;
					break;

				case Instruction.Up:
					instructionColor = Color.Red;
					break;

				case Instruction.Down:
					instructionColor = Color.Magenta;
					break;

				case Instruction.Split:
					instructionColor = Color.Cyan;
					break;

				case Instruction.Void:
					instructionColor = Color.Black;
					break;

				case Instruction.Comment:
					instructionColor = Color.Yellow;
					break;

				case Instruction.Unknown:
				default:
					instructionColor = Color.White;
					break;
			}

			bool hasSignal = board.Signals.Any(signal => signal.Position.X == x && signal.Position.Y == y);

			if(hasSignal)
			{
				instructionColor = Color.FromArgb(instructionColor.ToArgb() ^ 0xFFFFFF);
			}

			Brush brush = new SolidBrush(instructionColor);
			Rectangle imageCell = new Rectangle(x * Scale, y * Scale, Scale, Scale);
			graphics.FillRectangle(brush, imageCell);
		}
	}
}
