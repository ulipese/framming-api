// add movie repository
const PaymentRepository = require("../repositories/PaymentRepository");

class PaymentController {
  async index(request, response) {
    const { cpfUser } = request.params;
    const paymentMethods = await PaymentRepository.findAll(cpfUser);

    if (paymentMethods.length === 0) {
      return response.status(404).json("Payment methods not found");
    }
    return response.status(200).json(paymentMethods);
  }
  async show(request, response) {
    const { cpfUser, numCard } = request.params;

    const paymentMethod = await PaymentRepository.findByNumCard(numCard);

    if (!paymentMethod) {
      return response.status(404).json("Payment method not found");
    }

    return response.status(200).json(paymentMethod);
  }
  async store(request, response) {
    const { idUser } = request.params;
    const { numCard, nameCard, cpfUser, valCard, cvvCard } = request.body;

    const paymentMethod = await PaymentRepository.findByNumCard(numCard);

    if (paymentMethod) {
      return response.status(400).json("This payment method already saved");
    }

    const createdPaymentMethod = await PaymentRepository.create(
      idUser,
      numCard,
      nameCard,
      cpfUser,
      valCard,
      cvvCard
    );

    const newPaymentMethod = await PaymentRepository.findByNumCard(numCard);

    if (newPaymentMethod) {
      return response.status(200).json(newPaymentMethod);
    }

    return response
      .status(502)
      .json("The payment method was not saved, try again later");
  }
}

module.exports = new PaymentController();
