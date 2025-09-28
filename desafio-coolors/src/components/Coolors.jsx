/*todas as arrow functions foram substituídas por funções tradicionais (function(...) { ... }).

Cada passo dentro das funções foi explicitado, com variáveis intermediárias para facilitar a leitura.

O comportamento continua exatamente o mesmo, só que agora está mais didático.

----------------------------------------
APENAS O ESQUELETO DO CODIGO SEM ESTILO: 
----------------------------------------
*/

import { useState, useEffect } from "react";

// Função que gera uma cor aleatória em hexadecimal

function randomHexColor() {
    const numeroAleatorio = Math.floor(Math.random() * 16777215);
    const hexadecimal = numeroAleatorio.toString(16);
    const corFormatada = "#" + hexadecimal.padStart(6, "0");
    return corFormatada;
}


export default function Bytes4Coolors() {

    // Estado inicial com 5 cores aleatórias, todas desbloqueadas

    const [paleta, setPaleta] = useState([
        { hex: randomHexColor(), locked: false },
        { hex: randomHexColor(), locked: false },
        { hex: randomHexColor(), locked: false },
        { hex: randomHexColor(), locked: false },
        { hex: randomHexColor(), locked: false }
    ]);

    // Função que gera uma nova paleta, respeitando as cores bloqueadas

    function gerarNovaPaleta() {
        setPaleta(function(coresAtuais) {
            const novaPaleta = coresAtuais.map(function(cor) {
                if (cor.locked) {
                    return cor; // mantém a cor bloqueada
                } else {
                    return { hex: randomHexColor(), locked: false }; // gera nova cor
                }
            });
            return novaPaleta;
        });
    }

    // Função que alterna o estado "locked" de uma cor específica

    function toggleLock(index) {
        setPaleta(function(coresAtuais) {
            const novaPaleta = coresAtuais.map(function(cor, i) {
                if (i === index) {
                    return {
                        hex: cor.hex,
                        locked: !cor.locked // inverte o estado
                    };
                } else {
                    return cor; // mantém as outras cores como estão
                }
            });
            return novaPaleta;
        });
    }

    // Função que copia o valor hexadecimal da cor para a área de transferência

    function copiarHex(hex) {
        navigator.clipboard.writeText(hex);
        alert("Cor " + hex + " copiada!");
    }

    // Efeito que escuta a tecla espaço e gera nova paleta ao pressionar

    useEffect(function() {
        function handleKeyDown(e) {
            if (e.code === "Space") {
                e.preventDefault(); // evita scroll
                gerarNovaPaleta();
            }
        }

        window.addEventListener("keydown", handleKeyDown);

        // Limpeza do efeito ao desmontar o componente

        return function() {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    // Renderização do componente

    return (
        <div>
            <h1>Bytes4Coolors</h1>
            <div>
                {paleta.map(function(cor, index) {
                    return (
                        <div key={index}>
                            <p>{cor.hex.toUpperCase()}</p>
                            <button onClick={function() { copiarHex(cor.hex); }}>
                                Copiar
                            </button>
                            <button onClick={function() { toggleLock(index); }}>
                                {cor.locked ? "Desbloquear" : "Bloquear"}
                            </button>
                        </div>
                    );
                })}
            </div>
            <button onClick={gerarNovaPaleta}>Gerar Nova Paleta</button>
        </div>
    );
}
