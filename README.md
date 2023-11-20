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
|/feedback/idUser         | idMovie, feedbackText, feedbackRate, feedbackDate                 | POST        |Cria/Atualiza uma crítica do usuário
|/feedback/idUser/idCritica| idCreator                                                        | POST        |Curte/Descurte alguma crítica de outro usuário (criador)
|/feedback/idUser/idCritica| Nenhum                                                           | GET         |Mostra uma crítica específica do usuário
|/feedback/idUser (ou idMovie)| Nenhum                                                        | GET         |Mostra todas as crítica daquele usuário, ou, daquele filme
|/feedback/best-rated | Nenhum                                                                | GET         |Mostra as crítica mais curtidas do app
|/feedbackMovie/idUser/idMovie | Nenhum                                                       | GET         |Mostra todas as crítica que o usuário fez daquele filme
|/already-watched/idUser | Nenhum                                                             | GET         |Mostra todos os filmes já vistos pelo o usuário
|/following/idUser | idFollowed                                                              | POST         |Segue algum usuário (o usuário é seguido automaticamente no banco)
|/following/idUser | Nenhum                                                                  | GET         |Mostra todos os usuários que aquele usuário segue
|/followers/idUser | Nenhum                                                                  | GET         |Mostra todos os seguidores do usuário
