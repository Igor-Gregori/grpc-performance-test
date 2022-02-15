<h1 align="center"> 📊 grpc-performance-test 🚀 </h1>
<p align="center">Application to test the performance difference between rest and grpc</p>

<br/><br/>
## 📉 Diagrama do processo de requisições
<br/><br/>
<p align="center">
  <img src=".github/diagram01.png" style="border-radius: 10px;" alt="Diagrama da aplicação" />
</p>

<br/><br/>
## 🤯 Desafios
✅ Construir as aplicações <br/>
⬜️ Planejar um bom relatório de análise de diferença de performance <br/>
&nbsp;&nbsp;&nbsp;&nbsp;⬜️ Pensar nos casos de requisição de escrita <br/>
⬜️ Como é realizado o tratamento de erros ? <br/>
⬜️ Como substuiríamos os middlewares ? <br/>
⬜️ Http1.1 com compressão <br/>
⬜️ REST com http2.0 (Hapi, fastify) <br/>


<br/><br/>
## 📄 Relatório
O relatório deve fornecer informações de diferenças de performance e números de requisições entre os protocolos REST e gRPC

<p>O relatório consistirá nos seguintes testes:</p>

<p>
Caso 1:<br/>
1000 requisições de leitura feitas por apenas um usuário, com payload baixo,
quem conseguir realizar as requisições em menos tempo ganha.
</p>

<p>
Caso 2:<br/>
1000 requisições de leitura feitas por apenas um usuário, com payload médio,
quem conseguir realizar as requisições em menos tempo ganha.
</p>

<p>
Caso 3:<br/>
1000 requisições de leitura feitas por apenas um usuário, com payload alto,
quem conseguir realizar as requisições em menos tempo ganha.
</p>

<p>
Caso 4:<br/>
10 usuários simultâneos fazendo requisições de leitura, com o tempo máximo de 30 segundos, com payload baixo
quem conseguir responder o maior número de requisições ganha.
</p>

<p>
Caso 5:<br/>
10 usuários simultâneos fazendo requisições de leitura, com o tempo máximo de 30 segundos, com payload médio
quem conseguir responder o maior número de requisições ganha.
</p>

<p>
Caso 6:<br/>
10 usuários simultâneos fazendo requisições de leitura, com o tempo máximo de 30 segundos, com payload alto
quem conseguir responder o maior número de requisições ganha.
</p>

<p>
Caso 7:<br/>
1000 requisições de escrita feitas por apenas um usuário, com payload baixo,
quem conseguir realizar as requisições em menos tempo ganha.
</p>

<p>
Caso 8:<br/>
1000 requisições de escrita feitas por apenas um usuário, com payload médio,
quem conseguir realizar as requisições em menos tempo ganha.
</p>

<p>
Caso 9:<br/>
1000 requisições de escrita feitas por apenas um usuário, com payload alto,
quem conseguir realizar as requisições em menos tempo ganha.
</p>

<p>
Caso 10:<br/>
10 usuários simultâneos fazendo requisições de escrita, com o tempo máximo de 30 segundos, com payload baixo
quem conseguir responder o maior número de requisições ganha.
</p>

<p>
Caso 11:<br/>
10 usuários simultâneos fazendo requisições de escrita, com o tempo máximo de 30 segundos, com payload médio
quem conseguir responder o maior número de requisições ganha.
</p>

<p>
Caso 12:<br/>
10 usuários simultâneos fazendo requisições de escrita, com o tempo máximo de 30 segundos, com payload alto
quem conseguir responder o maior número de requisições ganha.
</p>