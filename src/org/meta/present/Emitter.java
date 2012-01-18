package org.meta.present;

import org.meta.present.exceptions.XMLUtils;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

public class Emitter {
    
    private String input_file;
    //private Config config;
    private Creator creator;
    public Emitter(String input_file,Config config,Creator creator) {
        this.input_file=input_file;
        //this.config=config;
        this.creator=creator;
    }

    public void parse() {
    	Document doc=XMLUtils.parse(input_file);
    	doc.getDocumentElement().normalize();
        creator.start();
        NodeList nList = doc.getElementsByTagName("slide");
        for (int temp = 0; temp < nList.getLength(); temp++) {
        	Element nNode = (Element)nList.item(temp);
            creator.make_header(nNode.getAttribute("name"));
            NodeList children=nNode.getChildNodes();
            for (int c = 0; c< children.getLength(); c++) {
                Node n=children.item(c);
            	if (n.getNodeType() == Node.ELEMENT_NODE) {
                	Element cNode = (Element)n;
                    if(cNode.getNodeName().equals("bullet")) {
                    	creator.make_bullet(cNode.getTextContent());
                    }
            	}
            }
            creator.finish_slide();
        }
        creator.finish();
    }
}
