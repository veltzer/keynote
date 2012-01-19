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
        //This does not seem to work. We need to set it on each individual element
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
    public int getAlign(String align) {
    	if(align.equals("left")) {
    		return Element.ALIGN_LEFT;
    	}
    	if(align.equals("right")) {
    		return Element.ALIGN_RIGHT;
    	}
    	if(align.equals("center")) {
    		return Element.ALIGN_CENTER;
    	}
    	if(align.equals("top")) {
    		return Element.ALIGN_TOP;
    	}
    	if(align.equals("bottom")) {
    		return Element.ALIGN_BOTTOM;
    	}
    	if(align.equals("baseline")) {
    		return Element.ALIGN_BASELINE;
    	}
    	if(align.equals("middle")) {
    		return Element.ALIGN_MIDDLE;
    	}
    	if(align.equals("justified")) {
    		return Element.ALIGN_JUSTIFIED;
    	}
    	if(align.equals("justified_all")) {
    		return Element.ALIGN_JUSTIFIED_ALL;
    	}
    	if(align.equals("undefined")) {
    		return Element.ALIGN_UNDEFINED;
    	}
        throw new RuntimeException("not such align "+align);
    }
    public int getRunDirection(String rund) {
    	if(rund.equals("default")) {
    		return PdfWriter.RUN_DIRECTION_DEFAULT;
    	}
    	if(rund.equals("ltr")) {
    		return PdfWriter.RUN_DIRECTION_LTR;
    	}
    	if(rund.equals("rtl")) {
    		return PdfWriter.RUN_DIRECTION_RTL;
    	}
    	if(rund.equals("no_bidi")) {
    		return PdfWriter.RUN_DIRECTION_NO_BIDI;
    	}
        throw new RuntimeException("not such rund "+rund);
    }
    public PdfPCell make_cell(String rund) {
        PdfPCell c=new PdfPCell();
        c.setBorder(PdfPCell.NO_BORDER);
        c.setRunDirection(getRunDirection(rund));
        return c;
    }
    public void make_bullet(String content, String align,String rund) {
        Paragraph paragraph=new Paragraph(content,font_bullet);
        if(config.useBulletLeading()) {
            paragraph.setLeading(config.getBulletLeading());
        }
        if(config.useBulletSpaceAfter()) {
            paragraph.setSpacingAfter(config.getBulletSpaceAfter());
        }
        if(config.useBulletIndentationLeft()) {
            paragraph.setIndentationLeft(config.getBulletIndentationLeft());
        }
        if(config.useBulletIndentationRight()) {
            paragraph.setIndentationRight(config.getBulletIndentationRight());
        }
        paragraph.setAlignment(getAlign(align));
        PdfPCell c=make_cell(rund);
        c.addElement(paragraph);
        table.addCell(c);
    }
    public void make_header(String content, String align,String rund) {
    	Paragraph paragraph=new Paragraph(content,font_header);
        paragraph.setAlignment(getAlign(align));
        if(config.useHeaderSpacingBefore()) {
            paragraph.setSpacingBefore(config.getHeaderSpacingBefore());
        }
        if(config.useHeaderLeading()) {
            paragraph.setLeading(config.getHeaderLeading());
        }
        if(config.useHeaderSpacingAfter()) {
            paragraph.setSpacingAfter(config.getHeaderSpacingAfter());
        }
        if(config.useHeaderIndentationLeft()) {
            paragraph.setIndentationLeft(config.getHeaderIndentationLeft());
        }
        if(config.useHeaderIndentationRight()) {
            paragraph.setIndentationRight(config.getHeaderIndentationRight());
        }
        table=new PdfPTable(1);
        table.setWidthPercentage(config.getTablePercent());
        PdfPCell c=make_cell(rund);
        c.addElement(paragraph);
        table.addCell(c);
    }
    public void make_header_old(String content) {
    	Paragraph p=new Paragraph(content,font_header);
        if(config.useHeaderAlignment()) {
            p.setAlignment(config.getHeaderAlignment());
        }
        if(config.useHeaderSpacingBefore()) {
            p.setSpacingBefore(config.getHeaderSpacingBefore());
        }
        if(config.useHeaderLeading()) {
            p.setLeading(config.getHeaderLeading());
        }
        if(config.useHeaderSpacingAfter()) {
            p.setSpacingAfter(config.getHeaderSpacingAfter());
        }
        if(config.useHeaderIndentationLeft()) {
            p.setIndentationLeft(config.getHeaderIndentationLeft());
        }
        if(config.useHeaderIndentationRight()) {
            p.setIndentationRight(config.getHeaderIndentationRight());
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
