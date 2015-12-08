using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Timers;

namespace BMProg
{
	internal class BMProg
	{
		public static void CreateAndRun(InterpreterSettings settings)
		{
			Board board = Board.FromFile(settings.fileName);

			IInterpreter interpreter = new OldInterpreter(board);

			IRenderer renderer = null;
			if(settings.renderToConsole)
			{
				renderer = new ConsoleRenderer(board);
			}

			// Create and run
			BMProg program = new BMProg(interpreter, renderer, settings.millisecondsPerTick);
			program.Run();
		}

		private IInterpreter interpreter;
		private IRenderer renderer;
		private int millisecondsPerTick;

		public BMProg(IInterpreter interpreter, IRenderer renderer, int millisecondsPerTick)
		{
			this.interpreter = interpreter;
			this.renderer = renderer;
			this.millisecondsPerTick = millisecondsPerTick;
		}

		public void Run()
		{
			if (renderer != null)
			{
				renderer.DrawStart();
				renderer.DrawFrame();
			}

			// If a time was specified
			if(this.millisecondsPerTick != 0)
			{
				// Use a timer to delay stepping
				Timer timer = new Timer(millisecondsPerTick);
				timer.Elapsed += new ElapsedEventHandler((sender, e) =>
				{
					if(!DoSingleStep())
					{
						timer.Stop();
					}
				});
				timer.Start();
			}
			else
			{
				while (DoSingleStep())
				{
				}
			}
		}

		private bool DoSingleStep()
		{
			bool isStepsRemaining = interpreter.Tick();

			if (this.renderer != null)
			{
				renderer.DrawFrame();
			}

			return isStepsRemaining;
		}
	}
}
