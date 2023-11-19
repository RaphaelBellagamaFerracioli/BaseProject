package Java;
import java.net.*;
import java.io.*;

import com.sun.net.httpserver.HttpExchange; 
import com.sun.net.httpserver.HttpHandler;
import java.io.IOException;
import java.io.OutputStream;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;


public class PostHandler implements HttpHandler {
    @Override
    public void handle(HttpExchange exchange) throws IOException {
        if ("POST".equals(exchange.getRequestMethod())) {
            handlePostRequest(exchange);
        } else {
            exchange.sendResponseHeaders(405, -1); // Método não permitido
        }
    }

    private void handlePostRequest(HttpExchange exchange) throws IOException {
        // Lê os dados da requisição
        InputStream inputStream = exchange.getRequestBody();
        String body = new String(inputStream.readAllBytes(), StandardCharsets.UTF_8);

        // Envia a resposta
        OutputStream os = exchange.getResponseBody();
       
        os.close();
    }
}