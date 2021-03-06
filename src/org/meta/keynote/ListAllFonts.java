package org.meta.keynote;

import java.awt.Font;
import java.awt.GraphicsEnvironment;
import java.nio.charset.Charset;

abstract class ListAllFonts {
	public static void listFonts() {
		Font[] fonts = GraphicsEnvironment.getLocalGraphicsEnvironment().getAllFonts();
		for (Font f:fonts) {
			System.out.println(f);
		}
		/*
		for (Font f:fonts) {
			if (f.canDisplayUpTo("שלום") == -1) {
				System.out.println(f);
			}
		}
		*/
		for (String s:Charset.availableCharsets().keySet()) {
			System.out.println(s);
		}
	}
}
