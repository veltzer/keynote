package org.meta.keynote;

import com.beust.jcommander.JCommander;
import com.beust.jcommander.Parameter;
import com.beust.jcommander.ParameterException;
import com.beust.jcommander.Parameters;

public abstract class JCommanderContainer {
	public static class CommandMain {
		@Parameter(names = "--help", help = true)
		private boolean help;
	}
	private static CommandMain commandMain;
	public static CommandMain getCommandMain() {
		return commandMain;
	}
	public static CommandProcess getCommandProcess() {
		return commandProcess;
	}
	public static CommandListFonts getCommandListFonts() {
		return commandListFonts;
	}
	public static JCommander getJc() {
		return jc;
	}
	@Parameters(commandDescription = "Transform xml file to pdf")
	public static class CommandProcess {
		@Parameter(names = "--input", description = "XML Input file name", required = true)
		private String input;
		public String getInput() {
			return input;
		}
		@Parameter(names = "--output", description = "PDF Ouput file name", required = true)
		private String output;
		public String getOutput() {
			return output;
		}
	}
	private static CommandProcess commandProcess;
	@Parameters(commandDescription = "List all fonts")
	public static class CommandListFonts {
	}
	private static CommandListFonts commandListFonts;
	private static JCommander jc;
	public static void process(String[] args) {
		commandMain = new CommandMain();
		jc = new JCommander(commandMain);
		commandProcess = new CommandProcess();
		jc.addCommand("process", commandProcess);
		commandListFonts = new CommandListFonts();
		jc.addCommand("listfonts", commandListFonts);
		try {
                jc.parse(args);
		} catch (ParameterException pe) {
			System.err.println(pe.getMessage());
			jc.usage();
			System.exit(1);
		}
		if (commandMain.help) {
			jc.usage();
			System.exit(1);
		}
		/*
		System.out.println(jc.getParsedCommand());
		System.out.println(commandProcess.input);
		System.out.println(commandProcess.output);
		*/
	}
}
