using System.Drawing;

namespace BMProg
{
	internal class Signal
	{
		public Signal()
		{
			WaitState = WaitState.None;
		}
		public Point Position;
		public Direction Direction;
		public WaitState WaitState;
	}
}
