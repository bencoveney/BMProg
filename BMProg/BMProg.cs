using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Timers;

namespace BMProg
{
	public class BMProg
	{
		public static void RunFile(string fileName, bool renderToConsole = true)
		{
			Board board = Board.FromFile(fileName);
			IInterpreter interpreter = new OldInterpreter(board);

			if(renderToConsole)
			{
				RunInConsole(interpreter, board);
			}
			else
			{
				RunSilently(interpreter);
			}
		}

		private static void RunInConsole(IInterpreter interpreter, Board board)
		{
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

		private static void RunSilently(IInterpreter interpreter)
		{
			while(interpreter.Tick())
			{
			}
		}
	}
}
