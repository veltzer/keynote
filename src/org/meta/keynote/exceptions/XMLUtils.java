package org.meta.keynote.exceptions;

import java.io.IOException;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import org.w3c.dom.Document;
import org.xml.sax.SAXException;

public class XMLUtils {
    public static Document parse(String filename) {
    	DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
    	DocumentBuilder dBuilder;
		try {
			dBuilder = dbFactory.newDocumentBuilder();
		} catch (ParserConfigurationException e) {
            throw new RuntimeException(e);
		}
    	Document doc;
		try {
			doc = dBuilder.parse(filename);
		} catch (SAXException e) {
            throw new RuntimeException(e);
		} catch (IOException e) {
            throw new RuntimeException(e);
		}
        return doc;
    }
}
