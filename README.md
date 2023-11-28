# framming-api

## URL de acesso da API
https://https://framming-api.onrender.com/

## Endpoints

| Endpoints (principais)  | Parâmetros do Body (json)                                         | Método      | Explicação      
| ------------------------| ------------------------------------------------------------------|-------------|-----------------
|/users                   | Nenhum                                                            | GET         |Mostra todos os users            
|/users/idUser ou nickUser| Nenhum                                                            | GET         |Mostra um user específico, usando o id ou o nickname dele
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
|/feedback/idUser/idFeedback | idCreator                                                      | POST        |Curte/Descurte alguma crítica de outro usuário (criador)
|/feedback/idUser/idFeedback | idMovie, feedbackText, feedbackRate, feedbackDate              | POST        |Atualiza um feedback existente
|/deleteFeedback/idUser/idFeedback| Nenhum                                                    | POST        |Deleta um feedback existente, retorno do delete é um response 204 vazio
|/feedback/idUser/idFeedback| Nenhum                                                          | GET         |Mostra uma crítica específica do usuário
|/feedback/idUser (ou idMovie)| Nenhum                                                        | GET         |Mostra todas as crítica daquele usuário, ou, daquele filme
|/feedback/best-rated | Nenhum                                                                | GET         |Mostra as crítica mais curtidas do app
|/feedbackMovie/idUser/idMovie | Nenhum                                                       | GET         |Mostra todas as crítica que o usuário fez daquele filme
|/already-watched/idUser | Nenhum                                                             | GET         |Mostra todos os filmes já vistos pelo o usuário
|/following/idUser | idFollowed                                                               | POST        |Segue/Dessegue algum usuário (o usuário é seguido automaticamente no banco)
|/following/idUser | Nenhum                                                                   | GET         |Mostra todos que aquele usuário segue
|/following/idUser/idFollower ou nickFollower | Nenhum                                        | GET         |Mostra uma pessoa específica que aquele usuário segue
|/followers/idUser | Nenhum                                                                   | GET         |Mostra todos os seguidores do usuário
|/followers/idUser/idFollower ou nickFollower | Nenhum                                        | GET         |Mostra um seguidor específico do usuário
|/watch-later/idUser | Nenhum                                                                 | GET         |Mostra todos os filmes salvos no quero ver do usuário
|/watch-later/idUser | idMovie                                                                | POST        |Salva/remove um filme do quero ver
|/watch-later/idUser/idMovie | Nenhum                                                         | GET         |Mostra um filme específico salvo no quero ver do usuário
|/favoriteMovies/idUser | Nenhum                                                              | GET         |Pega todos (4) filmes favoritos do usuário
|/favoriteMovies/idUser/idMovie | Nenhum                                                      | GET         |Pega um filme favorito específico do usuário
|/favoriteMovies/idUser | idMovie                                                             | POST        |Favorita/desfavorita um filme do usuário (máx. 4 filmes favoritados)
|/payment/cpfUser | Nenhum                                                                    | GET         |Mostra todos os métodos de pagamento do usuário
|/payment/cpfUser/numCard | Nenhum                                                            | GET         |Mostra um método de pagamento específico do usuário
|/payment/idUser | numCard, nameCard, cpfUser, valCard, cvvCard                               | POST        |Salva um método de pagamento do usuário
|/reward | Nenhum                                                                             | GET         |Mostra todas as recompensas (use 'ticketRecompensa' para diferenciar tipos)
|/func/codCinema | Nenhum                                                                     | GET         |Mostra todos os funcionários daquele cinema
|/updateUsers/idUser | name, username, email, password                                        | POST        |Atualiza dados de usuários, sejam funcionários ou não
|/deleteUsers/idUser| Nenhum                                                                  | POST        |Deleta um usuário 
|/cinema| Nenhum                                                                              | GET         |Lista todos os cinemas
|/cinema| nameCinema, addressCinema, codCinema, numRooms                                      | POST        |Cria um cinema, caso o codCinema já exista, os dados do cinema atualizam
|/cinema/codCinema| Nenhum                                                                    | GET         |Mostra um cinema específico
|/deleteCinema/codCinema| Nenhum                                                              | POST        |Deleta um cinema
|/session/codCinema| idMovie, dateSession, timeSession, tickets, sessionRoom                  | POST        |Cria uma sessão
|/session/codCinema| Nenhum                                                                   | GET         |Mostra todas as sessões daquele cinema, de todos os filmes
|/session/codCinema/idMovie| Nenhum                                                           | GET         |Mostra todas as sessões daquele cinema, de um filme específico
|/deleteSession/codCinema/idSession| Nenhum                                                   | GET         |Deleta uma sessão de um cinema específico




