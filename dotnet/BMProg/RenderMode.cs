using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BMProg
{
	/// <summary>
	/// The mode in which to render output.
	/// </summary>
	public enum RenderMode
	{
		/// <summary>
		/// No rendering.
		/// </summary>
		None = 0,

		/// <summary>
		/// Render to console.
		/// </summary>
		Console = 1,

		/// <summary>
		/// Render to animated gif.
		/// </summary>
		Gif = 2
	}
}
