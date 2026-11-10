import express from 'express';

const app = express()
const porta = 3000

app.get('/', (req, res) => {
    res.send('Servidor Node.js com Express funcionando!');
});

//sprint2:mensagems em memoria: ao reiniciar o servidor voltam aos valores inicias
const mensagens = [
    {id:1,usuario:"Ana",texto:"Bom dia!"},
    {id:2,usuario:"Pedro",texto:"Olá turma!"},
    {id:3,usuario:"Maria",texto:"Nosso servidor está funcionando"}
]


//sprint 2: função que devolve todas as mensagens
function listarMensagens() {return mensagens}
//sprint 2:pesquisa uma mensagem pelo identificador
function buscarMesagens(id){
    return mensagens.find(m => m.id === id)
}
//sprint 3: consulta assincrona com promise, settimeout simula espera
function consultaMensagens(simularErro = false){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            if (simularErro) return reject(new Error("falha simulada na consulta"))
                resolve(listarMensagens())
        },1000)
    })
}
// sprint 01 
//Rotas da Sprint 01 - continuam disponíveis

app.get("/",(req,res) => res.send("Servidor rodando! "));
app.get("/status",(req,res) => res.json({ status: "online", sprint:3}));

app.get("/sobre",(req,res) => res.send("Mensageiro Local com Node.js, Express e ES Modules "));

// Sprint 02 -rotas herdadas

app.get("/mensagens", (req, res) => res.json(listarMensagens()));
app.get("/mensagens/:id", (req, res) => {
  const id = Number(req.params.id);
  const mensagem = buscarMensagem(id);
  if (!mensagem)
  return res.status(404).json({ erro: "Mensagem não encontrada." });
  res.json(mensagem);
});
app.get("/total-mensagens", (req, res) => res.json({ total: mensagens.length }));


// Sprint 03 - Novas Rotas : then/catch e async/await
app.get("/mensagens-then", (req, res) =>{
    consultarMensagens()
    .then(dados => res.json (dados))
    .catch(erro =>{
        console.error(erro);
        res.status(500).json({erro: "Falha ao consultar mensagens"});
    });
});


app.listen(porta, () => {
    console.log(` Servidor rodando em:http://localhost:${porta}`);
});