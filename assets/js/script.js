getProducts();

const inCodigo = document.getElementById('inCodigo');
const inDescricao = document.getElementById('inDescricao');
const inClasse = document.getElementById('inClasse');
const inTipo = document.getElementById('inTipo');
const inUnidade = document.getElementById('inUnidade');
const inValor = document.getElementById('inValor');
const btnCadastrar = document.getElementById('btnCadastrar');

if (document.querySelector('input[name="rdEmpresa"]')) {
  document.querySelectorAll('input[name="rdEmpresa"]').forEach((elem) => {
    elem.addEventListener("change", function (event) {
      var item = event.target.value;
      if (inCodigo.value == "") {
        inCodigo.value = item;
      } else {
        sku = inCodigo.value.substring(1);
        inCodigo.value = item + sku;
      }
      checkFileds()
    });
  });
}


inClasse.addEventListener('change', () => {
  if (inCodigo.value == "") {
    inCodigo.value = "E" + inClasse.value;
  } else {
    beg = inCodigo.value.substring(0, 1);
    end = inCodigo.value.substring(3);
    inCodigo.value = beg + inClasse.value + end;
  }
  checkFileds()
})


inTipo.addEventListener('change', () => {
  if (inCodigo.value == "") {
    inCodigo.value = "E00" + inClasse.value;
  } else {
    beg = inCodigo.value.substring(0, 3);
    end = inCodigo.value.substring(5);
    inCodigo.value = beg + inTipo.value + end;
    if (inCodigo.value.length >= 5) {
      getSku();
    }
  }
  checkFileds();
})


inDescricao.addEventListener('change', () => {
  checkFileds();
})

inUnidade.addEventListener('change', () => {
  checkFileds();
})

inValor.addEventListener('keypress', (e) => {
  if (e.keyCode == 13) {
    const val = parseFloat(inValor.value.replace(",","."));
    inValor.value = val.toFixed(4);
    checkFileds();
  }
})
inValor.addEventListener('change', () => {
    const val = parseFloat(inValor.value.replace(",","."));
    inValor.value = val.toFixed(4);
    checkFileds();
})
inValor.addEventListener('focus',() => {
  inValor.value = "";
})

btnCadastrar.addEventListener('click', () => {
  loadData();
})

async function getSku() {
  console.log(inCodigo.value);
  const iniSku = inCodigo.value.substring(0, 5);
  const urlGetSku = "http://essenzadfiori.com.br/sistema/api/getsku.php?s=" + iniSku;
  let maxSku = await fetch(urlGetSku);
  const data = await maxSku.json();
  let seq = 1 + data;
  inCodigo.value = inCodigo.value.substring(0, 5) + formatSeq(seq);

}

function formatSeq(n) {
  if (n > 1000) return n;
  if (n > 100) return "0" + n;
  if (n > 10) return "00" + n;
  if (n > 0) return "000" + n;
}

function checkFileds() {
  if (inCodigo.value != "" && inDescricao.value != "" &&
    inClasse.value != "" && inTipo.value != "" &&
    inUnidade.value != "" && inValor.value != "" &&
    !isNaN(inValor.value)) {
    btnCadastrar.disabled = false;
  } else {
    btnCadastrar.disabled = true;
  }
}

function loadData() {

  const urlCreate = "http://essenzadfiori.com.br/sistema/api/create.php";

  let data = new Object();
  data.txSKU = inCodigo.value;
  data.txDescricao = inDescricao.value;
  data.FKProdutoEmpresa = "E";
  data.FKProdutoItem = inClasse.value;
  data.FKProdutoTipo = inTipo.value;
  data.FKProdutoUnidade = inUnidade.value;
  data.nmValorUnitario = inValor.value;
    
  const dataToSend = JSON.stringify(data);

  console.log(dataToSend);

  fetch(urlCreate, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=UTF-8" },
      body: dataToSend
  })
      .then(resp => {
          if (resp.status === 200) {
            cleanFields();
            getProducts();
          } else {
              console.log("Status: " + resp.status);
          }
      })
}

function cleanFields() {
    inCodigo.value = "";
    inDescricao.value = "";
    inTipo.value = "";
    inClasse.value = "";
    inUnidade.value = "";
    inValor.value = "0.0000";
    btnCadastrar.disabled = true;
    document.querySelectorAll('input[name="rdEmpresa"]').forEach((elem) => { elem.checked = false });
}


async function getProducts() {
  const urlRead = "http://essenzadfiori.com.br/sistema/api/read.php"
  const response = await fetch(urlRead);
  const data = await response.json();
  const prodDiv = document.querySelector(".tabela");
  console.log(data);

  prodDiv.innerHTML = "";

  data.map((prod) => {
      const pDiv = document.createElement("div");
      const pCodigo = document.createElement("span");
      const pEmpresa = document.createElement("span");
      const pDescricao = document.createElement("span");
      const pClasse = document.createElement("span");
      const pTipo = document.createElement("span");
      const pUnidade = document.createElement("span");
      const pValor = document.createElement("span");

      pCodigo.classList.add("cCod");
      pEmpresa.classList.add("cEmpresa");
      pDescricao.classList.add("cDescricao");
      pClasse.classList.add("cClasse");
      pTipo.classList.add("cTipo");
      pUnidade.classList.add("cUnidade");
      pValor.classList.add("cValor");


      pCodigo.innerText = prod.txSKU;
      pEmpresa.innerText = prod.FKProdutoEmpresa;
      pDescricao.innerText = prod.txDescricao;
      pClasse.innerText = prod.FKProdutoItem;
      pTipo.innerText = prod.FKProdutoTipo;
      pUnidade.innerText = prod.FKProdutoUnidade;
      pValor.innerText = prod.nmValorUnitario;

      pDiv.appendChild(pCodigo);
      pDiv.appendChild(pEmpresa);
      pDiv.appendChild(pDescricao);
      pDiv.appendChild(pClasse);
      pDiv.appendChild(pTipo);
      pDiv.appendChild(pUnidade);
      pDiv.appendChild(pValor);

      prodDiv.appendChild(pDiv);
  })

}

const cp01 = document.getElementById("cp-01")
const cp02 = document.getElementById("cp-02")
const cp03 = document.getElementById("cp-03")
const cp04 = document.getElementById("cp-04")
const edit = document.getElementById("edit")
const ok = document.getElementById("ok")

edit.addEventListener('click', () => {
  cp01.type = "text";
  cp02.type = "text";
  cp03.type = "text";
  cp04.type = "text";
  edit.style.display = "none";
  ok.style.display = "inline";
})

ok.addEventListener('click', () => {
  cp01.type = "button";
  cp02.type = "button";
  cp03.type = "button";
  cp04.type = "button";
  edit.style.display = "inline";
  ok.style.display = "none";
})

cp01.addEventListener("dblclick", ()=> {
  cp01.type = "text";
  cp02.type = "text";
  cp03.type = "text";
  cp04.type = "text";
  edit.style.display = "none";
  ok.style.display = "inline";
})
