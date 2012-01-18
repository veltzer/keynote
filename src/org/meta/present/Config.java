package org.meta.present;

import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Font;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.BaseFont;
import com.itextpdf.text.pdf.PdfName;
import com.itextpdf.text.pdf.PdfWriter;

public class Config {
    // bullet stuff
	public String getBulletFontName() {
        return BaseFont.HELVETICA;
	}
	public String getBulletFontEncoding() {
        return BaseFont.CP1252;
	}
	public boolean getBulletFontEmbedded() {
        return BaseFont.NOT_EMBEDDED;
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
        return BaseFont.HELVETICA;
	}
	public String getHeaderFontEncoding() {
        return BaseFont.CP1252;
	}
	public boolean getHeaderFontEmbedded() {
        return BaseFont.NOT_EMBEDDED;
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
    	return false;
    }
	public float getHeaderLeading() {
        return 30;
	}
	public boolean useHeaderSpacingBefore() {
		return true;
	}
	public float getHeaderSpacingBefore() {
        return 50;
	}
	public boolean useHeaderSpacingAfter() {
		return true;
	}
	public float getHeaderSpacingAfter() {
        return 30;
	}
    // pdf version
	public boolean usePdfVersion() {
		return true;
	}
	public PdfName getPdfVersion() {
        return PdfWriter.PDF_VERSION_1_7;
	}
    // pdf compression
	public boolean getFullCompressin() {
		return true;
	}
}
