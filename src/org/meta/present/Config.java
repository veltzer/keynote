package org.meta.present;

import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Font;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Rectangle;
import com.itextpdf.text.pdf.BaseFont;
import com.itextpdf.text.pdf.PdfName;
import com.itextpdf.text.pdf.PdfWriter;

public class Config {
    // bullet stuff
	public String getBulletFontName() {
        //return BaseFont.HELVETICA;
        //return BaseFont.TIMES_ROMAN;
        //return "Yehuda";
        //return "Arial";
        return "/usr/share/fonts/truetype/msttcorefonts/arialbd.ttf";
	}
	public String getBulletFontEncoding() {
        //return BaseFont.CP1250;
        //return "Cp1255";
        //return "UTF-8";
        return BaseFont.IDENTITY_H;
	}
	public boolean getBulletFontEmbedded() {
        //return BaseFont.NOT_EMBEDDED;
        return BaseFont.EMBEDDED;
	}
    public float getBulletFontSize() {
    	return 30;
    }
	public int getBulletFontStyle() {
        return Font.NORMAL;
	}
	public BaseColor getBulletFontColor() {
        return BaseColor.BLACK;
	}
	public boolean useBulletAlignment() {
    	return false;
    }
    public int getBulletAlignment() {
    	return Paragraph.ALIGN_JUSTIFIED;
    }
	public boolean useBulletLeading() {
		return true;
	}
	public float getBulletLeading() {
        return 35;
	}
	public boolean useBulletSpaceAfter() {
        return true;
	}
	public float getBulletSpaceAfter() {
        return 15;
	}
    // header stuff
	public String getHeaderFontName() {
        return getBulletFontName();
        //return BaseFont.HELVETICA;
	}
	public String getHeaderFontEncoding() {
        return getBulletFontEncoding();
        //return BaseFont.CP1252;
	}
	public boolean getHeaderFontEmbedded() {
        return getBulletFontEmbedded();
        //return BaseFont.NOT_EMBEDDED;
	}
    public float getHeaderFontSize() {
    	return 40;
    }
	public int getHeaderFontStyle() {
        return Font.BOLD;
	}
	public BaseColor getHeaderFontColor() {
        return BaseColor.BLACK;
	}
    public boolean useHeaderAlignment() {
    	return true;
    }
    public int getHeaderAlignment() {
    	return Paragraph.ALIGN_CENTER;
    }
	public boolean useHeaderLeading() {
    	return true;
    }
	public float getHeaderLeading() {
        return 35;
	}
	public boolean useHeaderSpacingBefore() {
		return false;
	}
	public float getHeaderSpacingBefore() {
        return 100;
	}
	public boolean useHeaderSpacingAfter() {
		return true;
	}
	public float getHeaderSpacingAfter() {
        return 35;
	}
    // pdf version
	public boolean usePdfVersion() {
		return true;
	}
	public PdfName getPdfVersion() {
        return PdfWriter.PDF_VERSION_1_7;
        //return PdfWriter.VERSION_1_7;
	}
    // over all pdf options
	public boolean getFullCompressin() {
		return true;
	}
    public boolean getTagged() {
    	return true;
    }
	public boolean getUseRectange() {
        return true;
	}
	public Rectangle getRectangleSize() {
        return PageSize.LETTER.rotate();
	}
	public boolean getUseBackgroundColor() {
        return true;
	}
	public BaseColor getPdfBackgroundColor() {
        return BaseColor.WHITE;
	}
	public boolean getLinearPageMode() {
        return true;
	}
	public boolean useRunDirection() {
        return true;
	}
	public int getRunDirection() {
        return PdfWriter.RUN_DIRECTION_RTL;
	}
	public boolean useCompressionLevel() {
        return true;
	}
	public int getCompressionLevel() {
        return 9;
	}
}
