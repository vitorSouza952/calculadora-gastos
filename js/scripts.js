const form = document.querySelector("#form");
const aluguel = document.querySelector("#aluguel");
const alimentacao = document.querySelector("#alimentacao");
const transporte = document.querySelector("#transporte");
const outrosGastos = document.querySelector("#outros-gastos");
const areaModal = document.querySelector("#area-modal");
const modal = document.querySelector("#modal");
const msgModal = document.querySelector("#msg-modal");
const botaoFecharModal = document.querySelector("#botao-fechar-modal");

const validarValor = (valor) => valor && !isNaN(valor) && valor >= 0;

const alternarExibModal = (msg) => {
    [areaModal, modal].forEach((el) => el.classList.toggle("ocultado"));

    if (msg) {
        msgModal.innerText = msg;
    } else {
        setTimeout(() => {
            msgModal.innerText = "";
        }, 300);
    }
};

const limparCampo = (campo) => {
    campo.value = "";

    if (window.screen.width >= 992) campo.focus();
    else campo.blur();
};

const calcular = (valores) => {
    const total = valores.reduce((elAnterior, elAtual) => Number(elAnterior) + Number(elAtual));
    const campos = [aluguel, alimentacao, transporte, outrosGastos].reverse();

    alternarExibModal(`Total gasto: ${total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}.`);

    campos.forEach((el) => limparCampo(el));
};

document.addEventListener("click", (e) => {
    if (e.target === areaModal) alternarExibModal(null);
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !areaModal.classList.contains("ocultado")) alternarExibModal(null);
});

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const valorAluguel = aluguel.value.trim();
    const valorAlimentacao = alimentacao.value.trim();
    const valorTransporte = transporte.value.trim();
    const valorOutrosGastos = outrosGastos.value.trim();

    if (!validarValor(valorAluguel)) {
        alternarExibModal("Erro: O campo de aluguel deve ser preenchido com um número maior ou igual a a zero. Tente novamente!");

        limparCampo(aluguel);

        return;
    }

    if (!validarValor(valorAlimentacao)) {
        alternarExibModal("Erro: O campo de alimentação deve ser preenchido com um número maior ou igual a a zero. Tente novamente!");

        limparCampo(alimentacao);

        return;
    }

    if (!validarValor(valorTransporte)) {
        alternarExibModal("Erro: O campo de transporte deve ser preenchido com um número maior ou igual a a zero. Tente novamente!");

        limparCampo(transporte);

        return;
    }

    if (!validarValor(valorOutrosGastos)) {
        alternarExibModal("Erro: O campo de outros gastos deve ser preenchido com um número maior ou igual a a zero. Tente novamente!");

        limparCampo(outrosGastos);

        return;
    }

    calcular([valorAluguel, valorAlimentacao, valorTransporte, valorOutrosGastos]);
});

botaoFecharModal.addEventListener("click", () => alternarExibModal(null));