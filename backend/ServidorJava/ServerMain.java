package Java;
import com.sun.net.httpserver.HttpServer;
import java.net.InetSocketAddress;
import java.io.IOException;

import java.net.*;
import java.io.*;

public class ServerMain {
    private static HttpServer server;

    public static void main(String[] args) throws IOException {
        server = HttpServer.create(new InetSocketAddress(8000), 0);
        server.createContext("/validatePhoto", new PostHandler());
        server.setExecutor(null); // cria um executor padrão

        ServerActivator.startServer(server);
    }

    public static void stopServer() {
        if (server != null) {
            server.stop(0);
            System.out.println("Servidor desativado.");
        }
    }
}