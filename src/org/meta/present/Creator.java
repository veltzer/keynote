package org.meta.present;

import org.meta.present.exceptions.IOUtils;
import org.meta.present.exceptions.ItexUtils;

import com.itextpdf.text.Document;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.BaseFont;
import com.itextpdf.text.pdf.PdfContentByte;
import com.itextpdf.text.pdf.PdfWriter;

public class Creator {
    private Document d;
    private PdfWriter writer;
    private Config config;
    private PdfContentByte canvas;
    private Font font_header;
    private Font font_bullet;
    public Creator(String output_file,Config config) {
        d=new Document(PageSize.LETTER.rotate());
        //Document d=new Document();
        writer=ItexUtils.create(
        		d,
                IOUtils.open(output_file)
        );
        d.open();
        //canvas=writer.getDirectContent();
        canvas=writer.getDirectContentUnder();
        this.config=config;
        create_fonts();
    }
    private void create_fonts() {
        BaseFont bf=ItexUtils.createFont(
            BaseFont.HELVETICA,
            BaseFont.CP1252,
            BaseFont.NOT_EMBEDDED
		);
        font_header=new Font(bf,config.getHeaderSize());
        font_bullet=new Font(bf,config.getBulletSize());
    }
    // meta data functions
    public void addHeader(String key, String val) {
        d.addHeader(key, val);
    }
    public void addAuthor(String name) {
        d.addAuthor(name);
    }
    public void addCreator(String name) {
    	d.addCreator(name);
    }
    public void addKeywords(String arg) {
    	d.addKeywords(arg);
    }
    public void addTitle(String title) {
    	d.addTitle(title);
    }
    // real maker functions
    public void make_header(String name) {
        // need to create a new page and put the slide name up
        //Phrase p=new Phrase(
        //p.setFont(font_header);
        //canvas.saveState();
        canvas.beginText();
        canvas.moveText(20,300);
        canvas.setFontAndSize(font_header.getBaseFont(), font_header.getSize());
        canvas.showText(name);
        canvas.endText();
        //canvas.restoreState();
    }
	public void make_bullet(String textContent) {
        //Phrase p=new Phrase();
        //p.setFont(font_bullet);
        //canvas.saveState();
        canvas.beginText();
        canvas.moveText(20,20);
        canvas.setFontAndSize(font_bullet.getBaseFont(), font_bullet.getSize());
        canvas.showText(textContent);
        canvas.endText();
        //canvas.restoreState();
	}
    public void make_paragraph(String text) {
    	Paragraph p=new Paragraph();
        p.setAlignment(config.getParagraphAlignment());
        ItexUtils.add(d,p);
    }
    public void make_demo() {
        canvas.beginText();
        BaseFont bf=ItexUtils.createFont(
            BaseFont.HELVETICA,
            BaseFont.CP1252,
            BaseFont.NOT_EMBEDDED
		);
        canvas.setFontAndSize(bf, 39);
        canvas.setRGBColorFill(0xcc, 0x66, 0x66);
        canvas.showTextAligned(Element.ALIGN_LEFT, "Hello World :)", 36, 788, 0);
        canvas.endText();
        canvas.setRGBColorFill(0x9a, 0xe4, 0xe8);
        for (int i = 0, j = 55; i < (j * 8); i += j) {
            canvas.roundRectangle(36 + i, 718, 50, 50, 5);
        }
        canvas.eoFill();
	}
    public void finish_slide() {
        d.newPage();
    }
	public void finish() {
        d.close();
	}
	public void start() {
	}
}
