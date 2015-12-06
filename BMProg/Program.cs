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

			// Draw the exectution pane to the console
			DrawPane(board);

			// Draw the pre-simulation state and wait for input
			int frameCount = 0;
			DrawFrame(board, frameCount);
			Console.ReadKey(true);

			// Game loop
			Timer timer = new Timer(100d);
			timer.Elapsed += new ElapsedEventHandler((sender, e) =>
			{
				frameCount++;
				Tick(board, timer);
				DrawFrame(board, frameCount);
			});
			timer.Start();

			Console.ReadLine();
		}

		public static void Tick(Board board, Timer timer)
		{
			List<Agent> newAgents = new List<Agent>();

			foreach (Agent agent in board.Agents)
			{
				if (agent.Position.X < 0 || agent.Position.X >= board.Width)
				{
					timer.Stop();
					return;
				}
				if (agent.Position.Y < 0 || agent.Position.Y >= board.Height)
				{
					timer.Stop();
					return;
				}

				Instruction instruction = board.Instructions[agent.Position.X, agent.Position.Y];

				switch (instruction)
				{
					case Instruction.Comment:
					case Instruction.Unknown:
						// Move forward
						switch (agent.Direction)
						{
							case Direction.Right:
								agent.Position.X++;
								newAgents.Add(agent);
								break;
							case Direction.Left:
								agent.Position.X--;
								newAgents.Add(agent);
								break;
							case Direction.Up:
								agent.Position.Y--;
								newAgents.Add(agent);
								break;
							case Direction.Down:
								agent.Position.Y++;
								newAgents.Add(agent);
								break;
							default:
							case Direction.Unknown:
								break;
						}
						break;

					case Instruction.Right:
						// Go right
						agent.Direction = Direction.Right;
						agent.Position.X++;
						newAgents.Add(agent);
						break;

					case Instruction.Left:
						// Go left
						agent.Direction = Direction.Left;
						agent.Position.X--;
						newAgents.Add(agent);
						break;

					case Instruction.Up:
						// Go up
						agent.Direction = Direction.Up;
						agent.Position.Y--;
						newAgents.Add(agent);
						break;

					case Instruction.Down:
						// Go down
						agent.Direction = Direction.Down;
						agent.Position.Y++;
						newAgents.Add(agent);
						break;

					case Instruction.Split:
						if (agent.Direction == Direction.Down || agent.Direction == Direction.Up)
						{
							newAgents.Add(new Agent()
							{
								Position = new Point(agent.Position.X + 1, agent.Position.Y),
								Direction = Direction.Right
							});
							newAgents.Add(new Agent()
							{
								Position = new Point(agent.Position.X - 1, agent.Position.Y),
								Direction = Direction.Left
							});
						}
						else
						{
							newAgents.Add(new Agent()
							{
								Position = new Point(agent.Position.X, agent.Position.Y + 1),
								Direction = Direction.Down
							});
							newAgents.Add(new Agent()
							{
								Position = new Point(agent.Position.X, agent.Position.Y - 1),
								Direction = Direction.Up
							});
						}
						break;

					case Instruction.Void:
						break;

					default:
						break;
				}
			}

			board.Agents = newAgents;
		}

		public static void DrawPane(Board board)
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

		public static void DrawFrame(Board board, int frameCount)
		{
			Console.BackgroundColor = ConsoleColor.White;
			Console.ForegroundColor = ConsoleColor.Black;
			Console.SetCursorPosition(0, board.Height + 1);
			Console.Write("Frame: " + frameCount);

			for(int x = 0; x < board.Width; x++)
			{
				for(int y = 0; y < board.Height; y++)
				{
					Agent agentInPosition = board.Agents.Find(agent => agent.Position.X == x && agent.Position.Y == y);

					Console.SetCursorPosition(x, y);
					board.Instructions[x, y].WriteToConsole(agentInPosition);
				}
			}
		}
	}

	public enum Instruction
	{
		Unknown,
		Right,
		Left,
		Up,
		Down,
		Split,
		Comment,
		Void
	}

	public enum Direction
	{
		Unknown,
		Right,
		Left,
		Up,
		Down
	}

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
			result.Agents.Add(new Agent() { Direction = Direction.Right, Position = new Point(0,0) });

			return result;
		}
	}

	public class Agent
	{
		public Point Position;
		public Direction Direction;
	}

	public static class ExtensionMethods
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

		public static char GetChar(this Direction direction)
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

		public static void WriteToConsole(this Instruction instruction, Agent agentInPosition)
		{
			bool hasAgent = agentInPosition != null;

			switch (instruction)
			{
				case Instruction.Right:
					Console.BackgroundColor = ConsoleColor.Blue;
					Console.ForegroundColor = hasAgent ? ConsoleColor.White : ConsoleColor.DarkBlue;
					Console.Write('>');
					return;

				case Instruction.Left:
					Console.BackgroundColor = ConsoleColor.Green;
					Console.ForegroundColor = hasAgent ? ConsoleColor.White : ConsoleColor.DarkGreen;
					Console.Write('<');
					return;

				case Instruction.Up:
					Console.BackgroundColor = ConsoleColor.Red;
					Console.ForegroundColor = hasAgent ? ConsoleColor.White : ConsoleColor.DarkRed;
					Console.Write('^');
					return;

				case Instruction.Down:
					Console.BackgroundColor = ConsoleColor.Magenta;
					Console.ForegroundColor = hasAgent ? ConsoleColor.White : ConsoleColor.DarkMagenta;
					Console.Write('V');
					return;

				case Instruction.Split:
					Console.BackgroundColor = ConsoleColor.Cyan;
					Console.ForegroundColor = hasAgent ? ConsoleColor.White : ConsoleColor.DarkCyan;
					Console.Write('*');
					return;

				case Instruction.Comment:
					Console.BackgroundColor = ConsoleColor.Yellow;
					Console.ForegroundColor = ConsoleColor.DarkYellow;
					Console.Write(hasAgent ? agentInPosition.Direction.GetChar() : '_');
					return;

				case Instruction.Void:
					Console.BackgroundColor = ConsoleColor.DarkGray;
					Console.ForegroundColor = hasAgent ? ConsoleColor.White : ConsoleColor.Black;
					Console.Write('@');
					return;

				case Instruction.Unknown:
				default:
					if (hasAgent)
					{
						Console.BackgroundColor = ConsoleColor.White;
						Console.ForegroundColor = ConsoleColor.Gray;
						Console.Write(agentInPosition.Direction.GetChar());
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
	}
}
