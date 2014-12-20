package org.meta.keynote.exceptions;

import java.io.IOException;
import java.io.OutputStream;

import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Element;
import com.itextpdf.text.pdf.BaseFont;
import com.itextpdf.text.pdf.PdfWriter;

public abstract class ItexUtils {
	public static PdfWriter create(Document d, OutputStream os) {
		try {
			return PdfWriter.getInstance(d, os);
		} catch (DocumentException e) {
			throw new RuntimeException(e);
		}
	}
	public static BaseFont createFont(String arg0, String arg1, boolean arg2) {
		try {
			return BaseFont.createFont(arg0, arg1, arg2);
		} catch (DocumentException e) {
			throw new RuntimeException(e);
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}
	public static void add(Document document, Element element) {
		try {
			document.add(element);
		} catch (DocumentException e) {
			throw new RuntimeException(e);
		}
	}
	public static void add(PdfWriter writer, Element element) {
		try {
			writer.add(element);
		} catch (DocumentException e) {
			throw new RuntimeException(e);
		}
	}
}
