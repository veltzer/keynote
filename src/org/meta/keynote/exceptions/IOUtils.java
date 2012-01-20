package org.meta.keynote.exceptions;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;

public class IOUtils {
    static public FileOutputStream open(String name) {
    	try {
			return new FileOutputStream(name);
		} catch (FileNotFoundException e) {
            throw new RuntimeException(e);
		}
    }
}
