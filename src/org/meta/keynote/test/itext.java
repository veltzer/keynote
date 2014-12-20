package org.meta.keynote.tests;

import org.meta.keynote.exceptions.IOUtils;
import org.meta.keynote.exceptions.ItexUtils;

import com.itextpdf.text.Document;
import com.itextpdf.text.Element;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.pdf.BaseFont;
import com.itextpdf.text.pdf.PdfContentByte;
import com.itextpdf.text.pdf.PdfWriter;

/**
 * This class is here for testing purposes. The idea is that you could remark stuff and try stuff here without
 * the hassle of command line parsing, xml parsing and more.
 */
abstract class IText {
	public static void main(String[] args) {
		Document d = new Document(PageSize.LETTER.rotate());
		//Document d=new Document();
		PdfWriter writer = ItexUtils.create(
				d,
			IOUtils.open("/tmp/out.pdf")
		);
		d.open();
		PdfContentByte cb = writer.getDirectContent();
		cb.beginText();
		BaseFont bf = ItexUtils.createFont(
		    BaseFont.HELVETICA,
		    BaseFont.CP1252,
		    BaseFont.NOT_EMBEDDED
		);
		cb.setFontAndSize(bf, 39);
		cb.setRGBColorFill(0xcc, 0x66, 0x66);
		cb.showTextAligned(Element.ALIGN_LEFT, "Hello World :)", 36, 788, 0);
		cb.endText();
		cb.setRGBColorFill(0x9a, 0xe4, 0xe8);
		for (int i = 0, j = 55; i < (j * 8); i += j) {
		    cb.roundRectangle(36 + i, 718, 50, 50, 5);
		}
		cb.eoFill();
		d.close();
	}
}
