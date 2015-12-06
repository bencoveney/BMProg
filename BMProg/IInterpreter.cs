using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BMProg
{
	internal class IInterpreter
	{
		/// <summary>
		/// Performs a single tick.
		/// </summary>
		/// <returns>True if execution will continue. False if execution has ended.</returns>
		bool Tick();
	}
}
