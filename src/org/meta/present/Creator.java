package org.meta.present;

import org.meta.present.exceptions.IOUtils;
import org.meta.present.exceptions.ItexUtils;

import com.itextpdf.text.Document;
import com.itextpdf.text.Font;
import com.itextpdf.text.List;
import com.itextpdf.text.ListItem;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.BaseFont;
import com.itextpdf.text.pdf.PdfWriter;

public class Creator {
    private Document d;
    private PdfWriter writer;
    private Config config;
    //private PdfContentByte canvas;
    private Font font_header;
    private Font font_bullet;
    private List l;
    public Creator(String output_file,Config config) {
        d=new Document(PageSize.LETTER.rotate());
        //Document d=new Document();
        writer=ItexUtils.create(
        		d,
                IOUtils.open(output_file)
        );
        if(config.usePdfVersion()) {
            writer.setPdfVersion(config.getPdfVersion());
        }
        if(config.getFullCompressin()) {
            writer.setFullCompression();
        }
        d.open();
        // I did not see a difference between the next two...
        //canvas=writer.getDirectContent();
        //canvas=writer.getDirectContentUnder();
        this.config=config;
        create_fonts();
    }
    private void create_fonts() {
        BaseFont bf=ItexUtils.createFont(
            BaseFont.HELVETICA,
            BaseFont.CP1252,
            BaseFont.NOT_EMBEDDED
		);
        font_header=new Font(bf,config.getHeaderFontSize());
        font_bullet=new Font(bf,config.getBulletFontSize());
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
	public void make_bullet(String content) {
        ListItem li=new ListItem(content,font_bullet);
        if(config.useBulletAlignment()) {
            li.setAlignment(config.getBulletAlignment());
        }
        if(config.useBulletLeading()) {
            li.setLeading(config.getBulletLeading());
        }
        if(config.useBulletSpaceAfter()) {
            li.setSpacingAfter(config.getBulletSpaceAfter());
        }
        l.add(li);
	}
    public void make_header(String content) {
    	Paragraph p=new Paragraph(content,font_header);
        if(config.useHeaderSpacingBefore()) {
            p.setSpacingBefore(config.getHeaderSpacingBefore());
        }
        if(config.useHeaderAlignment()) {
            p.setAlignment(config.getHeaderAlignment());
        }
        if(config.useHeaderLeading()) {
            p.setLeading(config.getHeaderLeading());
        }
        if(config.useHeaderSpacingAfter()) {
            p.setSpacingAfter(config.getHeaderSpacingAfter());
        }
        ItexUtils.add(d,p);
        l=new List();
    }
    public void finish_slide() {
        ItexUtils.add(d,l);
        d.newPage();
    }
	public void finish() {
        d.close();
	}
	public void start() {
	}
}
