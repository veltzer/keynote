package org.meta.present;

import org.meta.present.exceptions.IOUtils;
import org.meta.present.exceptions.ItexUtils;

import com.itextpdf.text.Document;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.FontFactory;
import com.itextpdf.text.List;
import com.itextpdf.text.ListItem;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Rectangle;
import com.itextpdf.text.pdf.BaseFont;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;

public class Creator {
    private Document d;
    private PdfWriter writer;
    private Config config;
    //private PdfContentByte canvas;
    private Font font_header;
    private Font font_bullet;
    private PdfPTable table;
    private List l;
 
    public Creator(String output_file,Config config) {
        if(config.getUseRectange()) {
            Rectangle r=new Rectangle(config.getRectangleSize());
            if(config.getUseBackgroundColor()) {
                r.setBackgroundColor(config.getPdfBackgroundColor());
            }
            d=new Document(r);
        } else {
            d=new Document();
        }
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
        if(config.getTagged()) {
            writer.setTagged();
        }
        if(config.useRunDirection()) {
            writer.setRunDirection(config.getRunDirection());
        }
        if(config.getLinearPageMode()) {
            writer.setLinearPageMode();
        }
        if(config.useCompressionLevel()) {
            writer.setCompressionLevel(config.getCompressionLevel());
        }
        d.open();
        // I did not see a difference between the next two...
        //canvas=writer.getDirectContent();
        //canvas=writer.getDirectContentUnder();
        this.config=config;
        create_fonts();
    }
    private void create_fonts() {
        font_header=FontFactory.getFont(
            config.getHeaderFontName(),
            config.getHeaderFontEncoding(),
            config.getHeaderFontEmbedded(),
        	config.getHeaderFontSize(),
        	config.getHeaderFontStyle(),
        	config.getHeaderFontColor(),
            BaseFont.CACHED
        );
        font_bullet=FontFactory.getFont(
            config.getBulletFontName(),
            config.getBulletFontEncoding(),
            config.getBulletFontEmbedded(),
        	config.getBulletFontSize(),
        	config.getBulletFontStyle(),
        	config.getBulletFontColor(),
            BaseFont.CACHED
        );
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
	public void make_bullet_old(String content) {
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
    public void make_bullet(String content, String align) {
        Paragraph par=new Paragraph(content,font_bullet);
        PdfPCell p=new PdfPCell();
        if(align.equals("left")) {
            par.setAlignment(Element.ALIGN_LEFT);
            p.setRunDirection(PdfWriter.RUN_DIRECTION_LTR);
        } else {
            par.setAlignment(Element.ALIGN_RIGHT);
            p.setRunDirection(PdfWriter.RUN_DIRECTION_LTR);
        }
        p.setBorder(PdfPCell.NO_BORDER);
        p.addElement(par);
        table.addCell(p);
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
        table=new PdfPTable(1);
        table.setWidthPercentage(100);
    }
    public void make_header_old(String content) {
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
        //ItexUtils.add(d,l);
        ItexUtils.add(d, table);
        d.newPage();
    }
	public void finish() {
        d.close();
	}
	public void start() {
	}
}
