package org.meta.keynote;

import java.util.List;

import org.meta.keynote.exceptions.OdfUtils;
import org.odftoolkit.simple.PresentationDocument;
import org.odftoolkit.simple.PresentationDocument.PresentationClass;
import org.odftoolkit.simple.draw.FrameRectangle;
import org.odftoolkit.simple.draw.Textbox;
import org.odftoolkit.simple.presentation.Slide;
import org.odftoolkit.simple.presentation.Slide.SlideLayout;
import org.odftoolkit.simple.style.StyleTypeDefinitions.SupportedLinearMeasure;

public class Test_odf {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
        PresentationDocument pd=OdfUtils.createPresentation();
        //Iterator<Slide> slideList=pd.getSlides();
        Slide slide=pd.newSlide(1,"first slide",SlideLayout.TITLE_SUBTITLE);
        slide.setSlideName("This is the slide name");
        List<Textbox> tbl=slide.getTextboxByUsage(PresentationClass.TITLE);
        for(Textbox tb: tbl) {
        	tb.setTextContent("foobar");
            OdfUtils.printRectangle(System.out,tb.getRectangle());
        }
        Textbox tb=slide.addTextbox();
        tb.setRectangle(new FrameRectangle(2, 6.6, 23, 4.2, SupportedLinearMeasure.CM));
        tb.setTextContent("this is my content");
        
        pd.deleteSlideByIndex(0);
        int numSlides=pd.getSlideCount();
        System.out.println("num slides is "+numSlides);
        OdfUtils.save(pd, "/tmp/out.odp");
        pd.close();
	}

}
