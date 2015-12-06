using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Timers;

namespace BMProg
{
	class Program
	{
		static void Main(string[] args)
		{
			Board board = Board.FromFile("prog/test2.bmp");
			Interpreter interpreter = new Interpreter(board);

			IRenderer renderer = new ConsoleRenderer(board);
			renderer.DrawStart();

			// Draw the pre-simulation state and wait for input
			renderer.DrawFrame();
			Console.ReadKey(true);

			// Main loop
			Timer timer = new Timer(100d);
			timer.Elapsed += new ElapsedEventHandler((sender, e) =>
			{
				if (!interpreter.Tick())
					timer.Stop();

				renderer.DrawFrame();
			});
			timer.Start();

			Console.ReadLine();
		}
	}
}
