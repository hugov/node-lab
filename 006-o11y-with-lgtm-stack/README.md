# o11y com LGTM Stack

## O que é o11y

o11y é uma abreviação (ou numerônimo) de "observability", onde:

> o + 11 letras + y → o11y

👉 Observabilidade é a prática de entender o que está acontecendo dentro de um sistema complexo (como uma aplicação distribuída) a partir dos dados que ele expõe — normalmente logs, métricas e traces.

Ela é uma evolução do simples “monitoramento”.

# Executando o projeto

Cria todas as imagens do projeto

```bash
docker-compose build --no-cache
```

Sobe todos os serviços

```bash
docker-compose up -d
```

Baixa todos os projetos e seus respectivos volumes

```bash
docker-compose down -v
```

Exibe o log de um determinado serviço

```bash
docker-compose logs <nome-do container>
```
