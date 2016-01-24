using BumpKit;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Timers;

namespace BMProg
{
	public class BMProg
	{
		public static int CreateAndRun(InterpreterSettings settings)
		{
			return CreateAndRunAsync(settings).Result;
		}

		public static async Task<int> CreateAndRunAsync(InterpreterSettings settings)
		{
			Board board = Board.FromFile(settings.fileName);

			IInterpreter interpreter = new NewInterpreter(board, settings.input);

			switch(settings.renderMode)
			{
				case RenderMode.Console:
					return await CreateAndRunAsync(interpreter, new ConsoleRenderer(board), settings.millisecondsPerTick);

				case RenderMode.Gif:
					using (FileStream gifFile = File.OpenWrite("output.gif"))
					{
						using (GifEncoder gifEncoder = new GifEncoder(gifFile))
						{
							return await CreateAndRunAsync(interpreter, new GifRenderer(board, gifEncoder, settings.millisecondsPerTick), settings.millisecondsPerTick);
						}
					}

				case RenderMode.None:
				default:
					return await CreateAndRunAsync(interpreter, null, settings.millisecondsPerTick);
			}
		}

		private static async Task<int> CreateAndRunAsync(IInterpreter interpreter, IRenderer renderer, int millisecondsPerTick)
		{
			BMProg program = new BMProg(interpreter, renderer, millisecondsPerTick);

			return await program.Run();
		}

		private IInterpreter interpreter;
		private IRenderer renderer;
		private int millisecondsPerTick;

		internal BMProg(IInterpreter interpreter, IRenderer renderer, int millisecondsPerTick)
		{
			this.interpreter = interpreter;
			this.renderer = renderer;
			this.millisecondsPerTick = millisecondsPerTick;
		}

		internal async Task<int> Run()
		{
			TaskCompletionSource<int> interpreterResultSource = new TaskCompletionSource<int>();

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

						Stop();

						interpreterResultSource.SetResult(interpreter.Output);
					}
				});
				timer.Start();
			}
			else
			{
				while (DoSingleStep())
				{
				}

				Stop();

				interpreterResultSource.SetResult(interpreter.Output);
			}

			return await interpreterResultSource.Task;
		}

		private void Stop()
		{
			if(renderer != null)
			{
				renderer.DrawEnd(interpreter.Output);
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
