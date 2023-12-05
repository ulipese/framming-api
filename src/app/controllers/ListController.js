const ListRepository = require("../repositories/ListRepository");

class ListController {
  async index(request, response) {
    const { idUser } = request.params;
    const lists = await ListRepository.findAll(idUser);
    if (!lists) {
      return response.status(404).json({ Error: "lists not found" });
    }
    return response.status(200).json(lists);
  }
  async show(request, response) {
    const { idUser, idList } = request.params;

    const list = await ListRepository.findById(idUser, idList);

    if (!list) {
      return response.status(404).json({ Error: "list not exists." });
    }

    return response.status(200).json(list);
  }
  async store(request, response) {
    const { idUser, idList, idCreator } = request.params;
    const { listDescription, idMovie } = request.body;

    if (idCreator) {
      // dar like
      await ListRepository.update(idUser, idCreator, idList);
      const list = await ListRepository.findById(idCreator, idList);

      return response.status(200).json("You interacted with the list");
    }

    if (idList && !idMovie) {
      await ListRepository.update(idUser, "", idList, listDescription);

      const list = await ListRepository.findById(idUser, idList);

      return response.status(200).json(list);
    }

    if (idList && idMovie) {
      await ListRepository.create(idUser, "", idList, idMovie); // save movies

      const list = await ListRepository.findById(idUser, idList);

      return response.status(200).json(list);
    }

    const createdList = await ListRepository.create(idUser, listDescription);

    if (createdList) {
      return response.status(201).json({ idLista: createdList.insertId });
    }
    return response
      .status(502)
      .json({ Error: "list not created, try again later" });
  }
  // async delete(request, response) {
  //   const { idUser, idList } = request.params;

  //   const [list] = await ListRepository.findById(idUser, idList);

  //   if (list) {
  //     const deletedlist = await ListRepository.delete(idUser, idList);

  //     return response.status(204).json("The list was deleted");
  //   }

  //   return response.status(404).json("list not found");
  // }
}

module.exports = new ListController();
