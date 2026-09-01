export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ sucesso: false });
  }

  const { senha } = req.body;

  if (senha === process.env.FLOW_ACESSO) {
    return res.status(200).json({ sucesso: true });
  }

  return res.status(401).json({
    sucesso: false,
    mensagem: "Senha incorreta"
  });
}
