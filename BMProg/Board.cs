using System.Collections.Generic;
using System.Drawing;

namespace BMProg
{
	public class Board
	{
		public Instruction[,] Instructions;

		public List<Agent> Agents;

		public int Width;

		public int Height;

		public Board(int width, int height)
		{
			Instructions = new Instruction[width, height];
			Agents = new List<Agent>();
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

			// Initialize an agent in the top left facing right
			result.Agents.Add(new Agent() { Direction = Direction.Right, Position = new Point(0, 0) });

			return result;
		}
	}
}
