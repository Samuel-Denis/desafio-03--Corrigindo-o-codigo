const express = require("express");

const { v4: uuid } = require("uuid");

const app = express();

app.use(express.json());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  };

  repositories.push(repository);

  return response.status(201).json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repositoryNew = repositories.find(repository => repository.id === id);

  console.log(repositoryNew)

  if (!repositoryNew) {
    return response.status(404).json({ error: "Repository not found" });
  }

  repositories.map(r => {
    if(r.id === id){
      r.title = title? title : r.title,
      r.url = url? url : r.url,
      r.techs = techs? techs : r.techs
    }
  });

  return response.status(201).json(repositoryNew);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositoryNew = repositories.find(repository => repository.id === id);

  if (!repositoryNew) {
    return response.status(404).json({ error: "Repository not found" });
  }

  repositories.splice(repositoryNew);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repositoryNew = repositories.find(repository => repository.id === id);

  if (!repositoryNew) {
    return response.status(404).json({ error: "Repository not found" });
  }

  console.log(repositoryNew)

  repositoryNew.likes++;

  return response.status(200).json({likes: repositoryNew.likes});
});

module.exports = app;
