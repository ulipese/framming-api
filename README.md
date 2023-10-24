# framming-api

## URL de acesso da API
https://https://framming-api.onrender.com/

## Endpoints

| Endpoints (principais)  | Parâmetros do Body (json)                                         | Método      | Explicação      
| ------------------------| ------------------------------------------------------------------|-------------|-----------------
|/users                   | Nenhum                                                            | GET         |Mostra todos os users            
|/users/id                | Nenhum                                                            | GET         |Mostra um user específico                         
|/users/register          | name, username, email, password, userType                         | POST        |Cadastra um user                   
|/users/login             | email ou username, password                                       | POST        |Loga um user                   
|/movies                  | Nenhum                                                            | GET         |Mostra "todos" os filmes   
|/movies/id               | Nenhum                                                            | GET         |Mostra um filme específico
|/nationalMovies          | Nenhum                                                            | GET         |Mostra "todos" os filmes nacionais    
|/nationalMovies/id       | Nenhum                                                            | GET         |Mostra um filme nacional específico
|/posters/idUser          | Nenhum                                                            | GET         |Mostra todos os posters do usuário
|/posters/idUser/idMovie  | Nenhum                                                            | GET         |Mostra um poster específico do usuário
|/posters/idUser          | idMovie, posterPath                                               | POST        |Cria/Atualiza um poster do usuário
