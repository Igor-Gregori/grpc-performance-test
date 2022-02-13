<h1 align="center"> 📊 grpc-performance-test 🚀 </h1>
<p align="center">Application to test the performance difference between rest and grpc</p>

<br/><br/>
## 📉 Diagrama do processo de requisições
<p align="center">
  <img src=".github/diagram01.png" style="border-radius: 10px;" alt="Diagrama da aplicação" />
</p>

<br/><br/>
## 🤯 Desafios
✅ Construir as aplicações <br/>
⬜️ Planejar um bom relatório de análise de diferença de performance <br/>
⬜️ Como é realizado o tratamento de erros ? <br/>

<br/><br/>
## 📄 Relatório
O relatório deve fornecer informações de diferenças de performance e números de requisições entre os protocolos REST e gRPC

O relatório consistirá nos seguintes testes:

<p>
Caso 1: <br/>
100 requisições de leitura feitas por apenas um usuário,
com payload baixo, quem conseguir realizar as requisições em menos tempo ganha.
</p>

<p>
Caso 2:<br/>
100 requisições de leitura feitas por apenas um usuário,
com payload alto, quem conseguir realizar as requisições em menos tempo ganha.
</p>

<p>Caso 3:<br/>
10 usuários simultâneos, com o tempo máximo de 30 segundos, com payload médio
quem conseguir responder o maior número de requisições ganha.
</p>

<p>Caso 4:<br/>
10 usuários simultâneos, com um tempo máximo de 1 minuto, com payload alto
quem conseguir responder o maior número de requisições ganha.
</p>

<br/><br/><br/>
<b>*Pensar nos casos de requisição de escrita</b><br/>
<b>*Http com compressão</b><br/>
<b>*REST com http2.0</b><br/>

