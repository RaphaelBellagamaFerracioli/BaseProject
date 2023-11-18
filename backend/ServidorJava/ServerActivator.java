package Java;

import com.sun.net.httpserver.HttpServer;
import java.net.*;
import java.io.*;

public class ServerActivator {
    public static void startServer(HttpServer server) {
        server.start();
        System.out.println("Servidor ativado na porta " + server.getAddress().getPort());
    }
}