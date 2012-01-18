package org.meta.present;

import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfName;
import com.itextpdf.text.pdf.PdfWriter;

public class Config {
    // bullet stuff
    public float getBulletFontSize() {
    	return 30;
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
    public float getHeaderFontSize() {
    	return 40;
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
