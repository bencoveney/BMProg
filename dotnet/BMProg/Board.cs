﻿using System.Collections.Generic;
using System.Drawing;

namespace BMProg
{
	internal class Board
	{
		public Instruction[,] Instructions;

		public IEnumerable<Signal> Signals;

		public int Width;

		public int Height;

		public Board(int width, int height)
		{
			Instructions = new Instruction[width, height];
			Signals = new List<Signal>();
			Width = width;
			Height = height;
		}

		public static Board FromFile(string fileName)
		{
			Bitmap bitmap = Bitmap.FromFile(fileName) as Bitmap;

			Board result = new Board(bitmap.Width, bitmap.Height);

			// Convert the pixels to instructions
			for (int x = 0; x < bitmap.Width; x++)
			{
				for (int y = 0; y < bitmap.Height; y++)
				{
					result.Instructions[x, y] = bitmap.GetPixel(x, y).GetInstruction();
				}
			}

			return result;
		}

		public IEnumerable<Signal> GetSignalsInCell(int x, int y)
		{
			foreach(Signal signal in this.Signals)
			{
				if(signal.Position.X == x && signal.Position.Y == y)
				{
					yield return signal;
				}
			}
		}
	}
}
