package org.meta.keynote.exceptions;

import java.io.PrintStream;

import org.odftoolkit.simple.PresentationDocument;
import org.odftoolkit.simple.draw.FrameRectangle;

public class OdfUtils {
    public static PresentationDocument createPresentation() {
        try {
			PresentationDocument pd=PresentationDocument.newPresentationDocument();
            return pd;
		} catch (Exception e) {
            throw new RuntimeException(e);
		}
    }
    public static void save(PresentationDocument pd,String file) {
    	try {
			pd.save(file);
		} catch (Exception e) {
            throw new RuntimeException(e);
		}
    }
    public static void printRectangle(PrintStream os,FrameRectangle fr) {
        os.format("%f %s %f %s %f %s %f %s %s\n",
            fr.getX(),
            fr.getXDesc(),
            fr.getY(),
            fr.getYDesc(),
            fr.getWidth(),
            fr.getWidthDesc(),
            fr.getHeight(),
            fr.getHeigthDesc(),
            fr.getLinearMeasure()
        );
    }
}
