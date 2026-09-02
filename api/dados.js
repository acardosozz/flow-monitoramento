let ultimaLeitura = {
  turbidez: "--",
  condutividade: "--",
  atualizadoEm: null
};

export default function handler(req, res) {

  if (req.method === "POST") {

    const { turbidez, condutividade } = req.body;

    ultimaLeitura = {
      turbidez,
      condutividade,
      atualizadoEm: new Date().toISOString()
    };

    return res.status(200).json({
      sucesso: true,
      mensagem: "Dados recebidos",
      dados: ultimaLeitura
    });
  }

  if (req.method === "GET") {

    return res.status(200).json(ultimaLeitura);
  }

  return res.status(405).json({
    sucesso: false,
    mensagem: "Método não permitido"
  });
}
