export default async function handler(req, res) {

  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_SECRET_KEY = process.env.SUPABASE_SECRET_KEY;

  // RECEBE OS DADOS E SALVA NO SUPABASE
  if (req.method === "POST") {

    const { turbidez, condutividade } = req.body;

    try {

      const resposta = await fetch(
        `${SUPABASE_URL}/rest/v1/leituras`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "apikey": SUPABASE_SECRET_KEY,
            "Prefer": "return=representation"
          },
          body: JSON.stringify({
            turbidez,
            condutividade
          })
        }
      );

      const dados = await resposta.json();

      if (!resposta.ok) {
        return res.status(500).json({
          sucesso: false,
          erro: dados
        });
      }

      return res.status(200).json({
        sucesso: true,
        mensagem: "Dados salvos no Supabase",
        dados: dados
      });

    } catch (erro) {

      return res.status(500).json({
        sucesso: false,
        mensagem: "Erro ao conectar com o Supabase",
        erro: erro.message
      });
    }
  }

  // BUSCA A MEDIÇÃO MAIS RECENTE
  if (req.method === "GET") {

    try {

      const resposta = await fetch(
        `${SUPABASE_URL}/rest/v1/leituras?select=*&order=created_at.desc&limit=1`,
        {
          headers: {
            "apikey": SUPABASE_SECRET_KEY
          }
        }
      );

      const dados = await resposta.json();

      if (!resposta.ok) {
        return res.status(500).json({
          sucesso: false,
          erro: dados
        });
      }

      return res.status(200).json(dados[0] || {});

    } catch (erro) {

      return res.status(500).json({
        sucesso: false,
        mensagem: "Erro ao conectar com o Supabase",
        erro: erro.message
      });
    }
  }

  return res.status(405).json({
    sucesso: false,
    mensagem: "Método não permitido"
  });
}
