using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BMProg
{
	public class Interpreter
	{
		private Board board;

		public Interpreter(Board board)
		{
			this.board = board;
		}

		public bool Tick()
		{
			List<Agent> newAgents = new List<Agent>();

			foreach (Agent agent in board.Agents)
			{
				if (agent.Position.X < 0 || agent.Position.X >= board.Width)
				{
					return false;
				}
				if (agent.Position.Y < 0 || agent.Position.Y >= board.Height)
				{
					return false;
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

			return true;
		}
	}
}
