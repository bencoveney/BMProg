using System;
namespace BMProg
{
	class Program
	{
		static void Main(string[] arguments)
		{
			InterpreterSettings settings = processCliArguments(arguments);

			BMProg.CreateAndRun(settings);

			Console.ReadKey(true);
		}

		/// <summary>
		/// Processes the arguments.
		/// </summary>
		/// <param name="arguments">The arguments.</param>
		/// <returns>A parsed settings model.</returns>
		static InterpreterSettings processCliArguments(string[] arguments)
		{
			// Initialize the settings with the default values
			InterpreterSettings settings = new InterpreterSettings
			{
				fileName = "sample.bmp",
				input = 0,
				renderToConsole = false,
				millisecondsPerTick = 100,
			};

			// Iterate through passed arguments
			foreach(string argument in arguments)
			{
				// Expects a key/value pairing combined by "=" eg: "render=true"
				string[] argumentParts = argument.Split('=');

				if(argumentParts.Length != 2)
				{
					Console.WriteLine("Unable to parse argument: {0}", argument);
				}
				else
				{
					string key = argumentParts[0];
					string value = argumentParts[1];

					switch(key)
					{
						case "file":
						case "f":
							settings.fileName = value;
							break;

						case "input":
						case "i":
							if (!int.TryParse(value, out settings.input))
							{
								Console.WriteLine("Unknown integer input: {0}", value);
							}
							break;

						case "render":
						case "r":
							switch(value)
							{
								case "1":
								case "true":
									settings.renderToConsole = true;
									break;

								case "0":
								case "false":
									settings.renderToConsole = false;
									break;
								
								default:
									Console.WriteLine("Unknown console render value: {0}", value);
									break;
							}
							break;

						case "millis":
						case "m":
							if (!int.TryParse(value, out settings.millisecondsPerTick))
							{
								Console.WriteLine("Unknown integer number of milliseconds per tick: {0}", value);
							}
							break;

						default:
							Console.WriteLine("Unknown argument: {0}", key);
							break;
					}
				}
			}

			return settings;
		}
	}
}
