package com.example;

import org.junit.Test;
import static org.junit.Assert.*;

public class AppTest {

    @Test
    public void testAdd() {
        App app = new App();
        assertEquals(5, app.add(2, 3));
        assertEquals(0, app.add(-1, 1));
    }

    @Test
    public void testGreet() {
        App app = new App();
        assertEquals("Hello, Java", app.greet("Java"));
        assertEquals("Hello, Stranger", app.greet(null));
        assertEquals("Hello, Stranger", app.greet(""));
    }
}
