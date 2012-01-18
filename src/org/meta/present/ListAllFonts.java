package org.meta.present;

import java.awt.Font;
import java.awt.GraphicsEnvironment;
import java.nio.charset.Charset;

public class ListAllFonts {

	public static void main(String[] args) {
        Font fonts[]=GraphicsEnvironment.getLocalGraphicsEnvironment().getAllFonts();
        for(Font f:fonts) {
            if(f.canDisplayUpTo("שלום")==-1) {
                System.out.println(f);
            }
        }
        for(String s:Charset.availableCharsets().keySet()) {
        	System.out.println(s);
        }
	}
}
