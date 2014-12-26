package org.meta.keynote;

import org.kohsuke.args4j.CmdLineException;
import org.kohsuke.args4j.CmdLineParser;

abstract class Main {
	public static void oldmain(String[] args) {
		CmdLineValues values = new CmdLineValues();
		CmdLineParser parser = new CmdLineParser(values);
		//parser.setUsageWidth(80);
		try {
			parser.parseArgument(args);
		} catch (CmdLineException e) {
			if (values.isHelp()) {
				parser.printUsage(System.err);
				return;
			}
			System.err.println(e.getMessage());
            parser.printUsage(System.err);
			return;
		}
		if (values.isHelp()) {
			parser.printUsage(System.err);
			return;
		}
		switch (values.getOperation()) {
		case convert:
                Config config = new Config();
                Creator creator = new Creator(values.getOutputFile(), config);
                Emitter e = new Emitter(values.getInputFile(), config, creator);
                e.parse();
                break;
		case printfonts:
				ListAllFonts.listFonts();
				break;
		default:
		}
	}
	public static void main(String[] args) {
		JCommanderContainer.process(args);
		switch (JCommanderContainer.getJc().getParsedCommand()) {
		case "process":
                Config config = new Config();
                Creator creator = new Creator(JCommanderContainer.getCommandProcess().getOutput(), config);
                Emitter e = new Emitter(JCommanderContainer.getCommandProcess().getInput(), config, creator);
                e.parse();
			break;
		case "listfonts":
                ListAllFonts.listFonts();
                break;
		default:
		}
	}
}
