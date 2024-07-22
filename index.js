/*Vamos separar a criação dos elementos DOM por função! Vai ficar mais fácil para entender e vai ficar mais organizado! */

/*Vamos começar criando uma função que cria um container para colocarmos as informações de cada transação. Define uma função em JavaScript que cria e retorna um contêiner <div> com um ID e uma classe específicos*/
/*O parâmetro id é passado para a função createTransactionContainer para que cada contêiner <div> criado possa ter um identificador (id) único e específico.  */
function createTransactionContainer(id) {
  /*Vamos criar o elemento div que é o nosso container */
  const container = document.createElement("div");
  /*Vamos acrescentar uma classe para o elemento criado */
  container.classList.add("transaction");
  /*Vamos criar um id para o container criado. */
  container.id = `transaction-${id}`;
  /*O id passado como parametro é o id das informações de cada transação. O id criado por último é o id do container que vai receber as informações de cada transação. */
  return container;
}
/*Agora vamos criar um função para criarmos o title da nossa aplicação, que é o nome da transação financeira */
/*vamos colocar como parametro o name, que representa o nome de cada transação, que é o que vamos receber como resposta dessa função. */
function createTransactionTitle(name) {
  /*o <span> é um elemento inline genérico do HTML que permite agrupar ou encapsular uma parte do conteúdo para aplicar estilos CSS ou manipular via JavaScript sem quebrar a estrutura do texto ao redor.  */
  const title = document.createElement("span");
  /*Vamos criar uma classe para o elemento criado, title. */
  title.classList.add("transaction-title");
  /*Vamos colocar um conteúdo para o elemento criado, que é o title, que vai ser o name, o parametro. */
  title.textContent = name;
  /*Vamos retornar o elemento criado. */
  return title;
}

/*Vamos agora criar uma função para a criação do valor da transação. */
function createTransactionAmount(amount) {
  /*A criação de um elemento <span> dentro da função createTransactionAmount permite encapsular e estilizar a quantidade (amount) de uma transação de forma específica e controlada.  */
  const span = document.createElement("span");
  span.classList.add("transaction-amount");
  /*Agora vamos fazer a configuração da moeda real, ou seja, vamos fazer a configuração para que o valor fique no formato do real. Intl.NumberFormat é um objeto em JavaScript. Ele faz parte da API Intl (Internationalization API), que é usada para facilitar a internacionalização de aplicações JavaScript. O objeto Intl.NumberFormat é utilizado para formatar números de acordo com as convenções de uma localidade específica (por exemplo, formatação de moeda, percentuais, etc.). */
  /*Explicando: 'pt-BR' = Este é o parâmetro de localidade. "pt-BR" se refere ao português do Brasil. Configurar a localidade garante que a formatação siga as convenções usadas no Brasil. */
  const formater = Intl.NumberFormat("pt-BR", {
    /*significa que, se usado, ele mostraria a forma completa (por exemplo, "mil" em vez de "K" para mil). */
    compactDisplay: "long",
    /*Define o tipo de moeda a ser usado na formatação. "BRL" se refere ao Real Brasileiro. Este parâmetro é necessário quando o estilo é configurado como currency. */
    currency: "BRL",
    /*Define o estilo de formatação. currency indica que o número será formatado como uma moeda. */
    style: "currency",
  });
  /*formatedAmount = Vai armazenar o valor formatado  */
  const formatedAmount = formater.format(amount);
  /*Vamos agora fazer a verificação se o valor que o parametro amount vai receber é positivo ou negativo. */
  //Se o valor (amount) for maior que zero(0)
  if (amount > 0) {
    //Vamos definir o conteúdo do span (conteiner) com o valor formatado e o texto de crédito, significando que o valor é uma entrada, é positivo.
    span.textContent = `${formatedAmount} (Crédito)`;
    //Vamos setar a classe do amount(valor) como credit(credito)
    span.classList.add("credit");
    //Se o amount não for maior que zero(0) e for menor que zero(0)
  } else {
    //Vamos definir o conteúdo do span (container) do valor com o valor formatado e o texto de debito, informando que o valor é uma saída, ou um valor negativo.
    span.textContent = `${formatedAmount} (Débito)`;
    //Vamos definir a classe do elemento span(container) que representa o espaço onde o valor (amount) vai ficar.
    span.classList.add("debit");
  }
  //Vamos retornar o span que representa o amount(valor) formatado.
  return span;
}

/*Vamos agora criar uma função para renderizar todas os elementos criados anteriormente, que são os elementos de uma transação. */
function renderTransaction(transaction) {
  /*Vamos criar uma variável(container) que vai receber a função criada para criar o container com o parametro da transação(transaction) e o seu id.*/
  const container = createTransactionContainer(transaction.id);
  const title = createTransactionTitle(transaction.name);
  const amount = createTransactionAmount(transaction.amount);
  const deleteBtn = createDeleteTransactionButton(transaction.id);
  const editBtn = createEditTransactionBtn(transaction);
  document.querySelector("#transactions").append(container);
  container.append(title, amount, deleteBtn, editBtn);
}
/*Agora Vamos criar uma função para fazer a requisição GET para o banco de dados, ou seja, criamos a forma como as  informações que vamos pegar do banco de dados vai ficar na tela, agora vamos pegar as informações do banco de dados propriamente dito. */
async function fetchTransactions() {
  /*Vamos retornar um await que vai esperar a requisição fetch retornar a resposta do banco de dados e quando retornar a resposta vamos tratar essa resposta e transforma-la em um arquivo json. */
  return await fetch("http://localhost:3000/transactions").then((res) =>
    res.json()
  );
}

/*Agora vamos tratar do campo saldo da aplicação */
/*vamos começar criando um array para salvarmos todas as alterações e acrescimo das transações */
/*Repare que usando essa estratégia não precisaremos re-requisitar as transações atualizadas do backend a cada mundança, podemos ir manipulando esse array a medida que elas são criadas/atualizadas/excluídas e assim economizar uso de banda e melhorar a performance da aplicação. */
let = transactions = [];
/*Agora vamos criar uma função para atualizar o saldo toda vez que alguma transação é modificada.  */
function updateBalance() {
  /*Vamos começar pegando o id do campo saldo localizado no arquivo HTML */
  const balanceSpan = document.querySelector("#balance");
  /*Este código está calculando o saldo total (balance) a partir de uma lista de transações (array transactions). Para isso, ele usa o método reduce do array, que é uma maneira poderosa e concisa de acumular valores em um array.  */
  const balance = transactions.reduce(
    (sum, transaction) => sum + transaction.amount,
    0
  );
  /*Vamos agora formatar o valor do saldo com a configuração do Brasil. */
  const formater = Intl.NumberFormat("pt-BR", {
    compactDisplay: "long",
    currency: "BRL",
    style: "currency",
  });
  balanceSpan.textContent = formater.format(balance);
}

/*Vamos agora criar uma função para quando o cliente carregar a página aparecer todas as informações na interface. Vai ser uma função async  */
async function setup() {
  //Vamos chamar a requisição get que criamos anteriormente//
  const results = await fetchTransactions();
  //Vamos incluir cada resultado, cada requisição feita dentro do array da transação
  transaction.push(...results);
  //Para cada transação vamos chamar a função renderTransaction, que renderiza os elementos na interface da página.
  transaction.forEach(renderTransaction);
  //Vamos aqui chamar a função que criamos atualizar o saldo da aplicação.
  updateBalance();
}
document.addEventListener("DOMContentLoaded", setup());

/*VAMOS AGORA TRATAR DA REQUISIÇÃO POST, QUANDO O CLIENTE COLOCA AS INFORMAÇÕES NO FORMULÁRIO PARA SEREM ENVIADAS E SALVAS DENTRO DO BANCO DE DADOS.  */

/*Vamos agora passar para a criação de uma nova transação. Para isso vamos criar mais uma função, que ficará responsável por obter os valores do formulário, fazer a requisição POST e renderizar a transação devolvida na resposta: */
async function saveTransaction(ev) {
  ev.preventDefault();
  /*Vamos pegar o valor do id do atributo name  que criamos no html */
  const name = document.querySelector("#name").value;
  /*Vamos pegar o valor da id do atributo amount que criamos no html. OBS: Se pegarmos o valor do amount dessa forma, o retorno do valor vai ser uma string, o que vai dar erro. Para isso não acontecer, temos que transformar essa string em um number, com o uso do metodo parseFloat.*/
  const amount = parseFloat(document.querySelector("#amount").value);
  /*Vamos agora fazer a requisição POST para salvar as informações fornecidas pelos clientes através do formulário no banco de dados. */
  const response = await fetch("http://localhost:3000/transactions", {
    //vamos agora fazer a configuração da requisição Post.
    method: "POST",
    //Vamos colocar o nome e o valor no body porque são eles que vão ficar no corpo da requisição.
    body: JSON.stringify({ name, amount }),
    //Vamos setar o tipo de conteúdo da requisiçõa no header da configuração.
    headers: {
      "content-Type": "application/json",
    },
  });
  //vamos criar uma variável para colocar o resultado da requisição POST feita e vamos transformar esse resultado em um arquivo json.
  const transaction = await response.json();
  //vamos colocar essa resposta dentro do array criado no escopo global.
  transactions.push(transaction);
  //vamos colocar a resposta da requisição post dentro da função de renderizar os elementos criados anteriormente.
  renderTransaction(transaction);
  //Metodo para resetar, limpar o formulário depois que o cliente envia suas informações.
  ev.target.reset();
  //Vamos acrecentar a função de atualização do saldo para quando o cliente enviar as informações pelo formulário o saldo seja atualizado.
  updateBalance();
}
//Vamos adicionar um evento(addEventListener) chamado DOMContentLoaded assim que a página for carregada e, assim que a página for carregada vamos chamar a função setup que mostra todas as informações na tela quando a página for carregada.
document.addEventListener("DOMContentLoaded", setup);
//Vamos pegar o elemento form, do arquivo html e adicionar um evento (addEventListener) a ele chamado submit e depois vamos chamar a função saveTransaction que faz uma nova requisição. Isso faz com que ao clicar no botão de salvar, todas as informações que o cliente colocar no formulário vai ser salva no banco de dados.
document.querySelector("form").addEventListener("submit", saveTransaction);

/*Vamos agora fazer uma função para conseguirmos editar as informações que já estão salvas no banco de dados. Para isso vamos criar um botão que, ao ser clicado, a transação já salva irá para o formulário e o cliente poderá editar as informações dessa transação. */
/*Para realizar a edição de uma transação vamos ter um botão na lista de transações que carregará os dados dela para o formulário onde poderão ser editadas e enviadas. Vamos criar uma função para criar o elemento do botão e então renderizar um botão para cada transação na tela: */
//Botão de editar a transação//
function createEditTransactionBtn(transaction) {
  //criamos o elemento button
  const editBtn = document.createElement("button");
  //adicionamos uma classe para esse butão
  editBtn.classList.add("edit-btn");
  //Adicionamos um conteúdo para esse botão, o que vai ficar dentro do botão e os cliente vão poder ver.
  editBtn.textContent = "Editar";
  //Agora temos que adicionar um evento nesse botão, ou seja, um acontecimento que vai acontecer quando o cliente clicar nesse botão. Quando o botão é clicado, ele executa a função fornecida no segundo argumento do método addEventListener
  editBtn.addEventListener("click", () => {
    //Define o valor do campo de input com id 'id' para o id da transação  atual
    document.querySelector("#id").value = transaction.id;
    //Define o valor do campo de input com id 'name' para o nome da transação atual
    document.querySelector("#name").value = transaction.name;
    //Define o valor do campo de input com id 'amount' para o valor da transação atual
    document.querySelector("#amount").value = transaction.amount;
    updateBalance();
  });
  //Vamos chamar o botão criado.
  return editBtn;
}
/*Agora precisamos atualizar a função saveTransaction() para que faça uma requisição PUT se o input id estiver presente, ou seja, for uma transação já existente no backend, ou uma requisição POST se o input id não estiver presente: Ou seja, vamos atualizar a função saveTransaction para editar uma transação já existente(PUT)  ou uma criar uma transação nova(POST).*/
async function saveTransaction(ev) {
  //Esta linha evita que o formulário seja enviado da maneira tradicional, o que impediria um recarregamento da página.
  ev.preventDefault();
  const id = document.querySelector("#id").value;
  const name = document.querySelector("#name").value;
  const amount = parseFloat(document.querySelector("#amount").value);
  //Agora vamos verificar se o id já está salvo no banco de dados(editar) = vai usar o metodo put para requisição. Se o id não existir, não estiver salvo no banco de dados, vamos usar a requisição POST.
  if (id) {
    const response = await fetch(`http://localhost:3000/transactions/${id}`, {
      method: "PUT",
      body: JSON.stringify({ name, amount }),
      headers: { "content-type": "application/json" },
    });
    //Converte a resposta da requisição PUT em um objeto JAVASCRIPT (JSON)
    const transaction = await response.json();
    //Encontra o índice da transação a ser removida da lista local(array transactions).
    // t => t.id === id (compara o id da transação t com uma variável id que foi definida anteriormente no código. A função retorna true se t.id for igual a id, caso contrário, retorna false.)
    //(t representa cada elemento do array)
    // t.id => representa o id de cada elemento do array
    // === id => variável id que foi definida anteriormente no código.
    const indexToRemove = transactions.findIndex((t) => t.id === id);
    //splice: Remove a transação antiga e insere a transação atualizada na lista local.
    //indexToRemove: O índice do elemento a ser removido. Este valor foi determinado anteriormente usando findIndex.
    //1: O número de elementos a serem removidos a partir do índice indexToRemove.
    //transaction: O novo elemento que será adicionado no lugar do elemento removido.
    transactions.splice(indexToRemove, 1, transaction);
    //Vai pegar o id do elemento transaction e removelo. remove: Remove a transação antiga do DOM.
    document.querySelector(`#transaction-${id}`).remove();
    //Renderiza a transação atualizada no DOM.
    renderTransaction(transaction);
    //Se não tiver id salvo no banco de dados...
  } else {
    //Vamos fazer a requisição POST
    const response = await fetch("http://localhost:3000/transactions", {
      method: "POST",
      body: JSON.stringify({ name, amount }),
      headers: { "content-type": "application/json" },
    });
    //vamos criar uma variável para armazenar a resposta da requisição POST
    const transaction = await response.json();
    //Vamos acrescentar a resposta da requisição POST (transaction) dentro do array transactions
    transactions.push(transaction);
    //Vamos acrescentar a resposta da requisição POST dentro da função de renderizar os elementos.
    renderTransaction(transaction);
  }
  //Vamos resetar, limpar o formulário que o cliente vai enviar as transações
  ev.target.reset();
  //vamos chamar a função de atualização do saldo da aplicação.
  updateBalance();
}
//Por fim, só resta implementar a exclusão das transações. Para isso também criaremos um botão na tela para cada transação que ficará responsável pela exclusão da mesma. Depois de criado só precisamos renderizá-lo junto com as transações:
/*Vamos criar o botão de exclusão da transação e vamos renderiza-la na interface da aplicação. */
function createDeleteTransactionButton(id) {
  //vamos criar um botão de exclusão da transação
  const deleteBtn = document.createElement("button");
  //vamos colocar uma classe para esse botão para estiliza-lo depois
  deleteBtn.classList.add("delete-btn");
  //vamos colocar texto no botão de delete.
  deleteBtn.textContent = "Excluir";
  //Agora vamos adicionar um evento no botão de delete.
  deleteBtn.addEventListener("click", async () => {
    //Consultar, fazer a requisição ao Banco de dados para deletar a transação que vai ser identificada pelo seu id.
    await fetch(`http://localhost:3000/transactions/${id}`, {
      method: "DELETE",
    });
    //Vai deletar o elemento pai do botão de excluir. Nesse caso o elemento pai é a lista de informação da transação. 'Este trecho remove o elemento pai do deleteBtn do DOM, o que geralmente seria o contêiner da transação inteira'.
    deleteBtn.parentElement.remove();
    //transactions: Array que contém todas as transações.
    //findIndex: Método de array que retorna o índice do primeiro elemento que satisfaz a condição fornecida pela função callback.
    //(t) => t.id === id: Função arrow que verifica se o id da transação t é igual ao id fornecido.
    const indexToRemove = transactions.findIndex((t) => t.id === id);
    //splice: Método de array que altera o conteúdo de um array removendo, substituindo ou adicionando elementos.
    //indexToRemove: Índice do elemento a ser removido.
    // '1': Número de elementos a serem removidos a partir do índice indexToRemove.
    transactions.splice(indexToRemove, 1);
    //vamos chamar a função que atualiza o saldo da aplicação.
    updateBalance();
  });
  //vamos retornar o elemento criado.
  return deleteBtn;
}
