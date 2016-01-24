using BMProg;
using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace BMProgTests
{
	[TestClass]
	public class LogicGateTests
	{
		[TestMethod]
		public void AndGateFalseFalseTest()
		{
			int result = RunProgram("LogicGateCode/and_gate.bmp", 0);
			Assert.AreEqual(0, result);
		}

		[TestMethod]
		public void AndGateTrueFalseTest()
		{
			int result = RunProgram("LogicGateCode/and_gate.bmp", 1);
			Assert.AreEqual(0, result);
		}

		[TestMethod]
		public void AndGateFalseTrueTest()
		{
			int result = RunProgram("LogicGateCode/and_gate.bmp", 2);
			Assert.AreEqual(0, result);
		}

		[TestMethod]
		public void AndGateTrueTrueTest()
		{
			int result = RunProgram("LogicGateCode/and_gate.bmp", 3);
			Assert.AreEqual(1, result);
		}

		[TestMethod]
		public void OrGateFalseFalseTest()
		{
			int result = RunProgram("LogicGateCode/or_gate.bmp", 0);
			Assert.AreEqual(0, result);
		}

		[TestMethod]
		public void OrGateTrueFalseTest()
		{
			int result = RunProgram("LogicGateCode/or_gate.bmp", 1);
			Assert.AreEqual(1, result);
		}

		[TestMethod]
		public void OrGateFalseTrueTest()
		{
			int result = RunProgram("LogicGateCode/or_gate.bmp", 2);
			Assert.AreEqual(1, result);
		}

		[TestMethod]
		public void OrGateTrueTrueTest()
		{
			int result = RunProgram("LogicGateCode/or_gate.bmp", 3);
			Assert.AreEqual(1, result);
		}

		[TestMethod]
		public void NotGateFalseTest()
		{
			int result = RunProgram("LogicGateCode/not_gate.bmp", 0);
			Assert.AreEqual(1, result);
		}

		[TestMethod]
		public void NotGateTrueTest()
		{
			int result = RunProgram("LogicGateCode/not_gate.bmp", 1);
			Assert.AreEqual(0, result);
		}

		private static int RunProgram(string filePath, int input)
		{
			InterpreterSettings settings = new InterpreterSettings()
			{
				fileName = filePath,
				input = input,
				renderMode = RenderMode.None,
				millisecondsPerTick = 0
			};

			return BMProg.BMProg.CreateAndRun(settings);
		}
	}
}
