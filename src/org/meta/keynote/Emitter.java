package org.meta.keynote;

import org.meta.keynote.exceptions.XMLUtils;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

public class Emitter {

	private String inputFile;
	//private Config config;
	private Creator creator;
	public Emitter(String iinputFile, Config config, Creator icreator) {
		inputFile = iinputFile;
		//config = iconfig;
		creator = icreator;
	}
	private String getOrDefault(Element e, String attr, String def) {
		if (e.hasAttribute(attr)) {
			return e.getAttribute(attr);
		} else {
			return def;
		}
	}

	public void parse() {
		Document doc = XMLUtils.parse(inputFile);
		doc.getDocumentElement().normalize();
		creator.start();
		NodeList nList = doc.getElementsByTagName(ElementNames.slide.name());
		for (int temp = 0; temp < nList.getLength(); temp++) {
			Element nNode = (Element) nList.item(temp);
			String align = getOrDefault(nNode, "align", "center");
			String rund = getOrDefault(nNode, "rund", "default");
			creator.startSlide();
			NodeList children = nNode.getChildNodes();
			for (int c = 0; c < children.getLength(); c++) {
				Node n = children.item(c);
				if (n.getNodeType() == Node.ELEMENT_NODE) {
					Element cNode = (Element) n;
					if (cNode.getNodeName().equals(ElementNames.title.name())) {
						creator.makeHeader(cNode.getTextContent(), align, rund);
					}
					if (cNode.getNodeName().equals(ElementNames.bullet.name())) {
						align = getOrDefault(cNode, "align", "left");
						rund = getOrDefault(cNode, "rund", "default");
						creator.makeBullet(cNode.getTextContent(), align, rund);
					}
				}
			}
			creator.finishSlide();
		}
		creator.finish();
	}
}
