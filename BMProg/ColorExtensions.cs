using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BMProg
{
	public static class ColorExtensions
	{
		public static Instruction GetInstruction(this Color color)
		{
			switch (color.GetHexidecimal())
			{
				case "#FF0000":
					// Red
					return Instruction.Up;
				case "#00FF00":
					// Green
					return Instruction.Left;
				case "#0000FF":
					// Blue
					return Instruction.Right;
				case "#FF00FF":
					// Magenta
					return Instruction.Down;

				case "#00FFFF":
					// Cyan
					return Instruction.Split;
				case "#FFFF00":
					// Yellow
					return Instruction.Comment;
				case "#000000":
					// Void
					return Instruction.Void;

				default:
					return Instruction.Unknown;
			}
		}

		public static string GetHexidecimal(this Color color)
		{
			return "#" + color.R.ToString("X2") + color.G.ToString("X2") + color.B.ToString("X2");
		}
	}
}
