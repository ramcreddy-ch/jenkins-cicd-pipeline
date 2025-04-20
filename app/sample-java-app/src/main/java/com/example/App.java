package com.example;

public class App {
    public static void main(String[] args) {
        System.out.println("Hello World!");
    }

    public int add(int a, int b) {
        return a + b;
    }

    public String greet(String name) {
        if (name == null || name.trim().isEmpty()) {
            return "Hello, Stranger";
        }
        return "Hello, " + name;
    }
}
