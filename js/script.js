const totalQuestions = 7;
    let currentQuestion = 1;

    const nextBtn = document.getElementById("nextBtn");
    const progressBar = document.getElementById("progress-bar");

    nextBtn.addEventListener("click", () => {
      const current = document.getElementById(`q${currentQuestion}`);
      const selected = document.querySelector(`input[name="q${currentQuestion}"]:checked`);

      if (!selected) {
        alert("Selecione uma resposta antes de prosseguir!");
        return;
      }

      if (currentQuestion < totalQuestions) {
        current.classList.add("d-none");
        currentQuestion++;
        document.getElementById(`q${currentQuestion}`).classList.remove("d-none");

        let progress = (currentQuestion - 1) / totalQuestions * 100;
        progressBar.style.width = `${progress}%`;
        progressBar.textContent = `${Math.round(progress)}%`;

        if (currentQuestion === totalQuestions) {
          nextBtn.textContent = "Ver Resultado";
        }
      } else {
        mostrarResultado();
      }
    });

    function mostrarResultado() {
      const answers = [...new FormData(document.getElementById('quizForm')).values()];
      let countA = answers.filter(a => a === "A").length;
      let countB = answers.filter(a => a === "B").length;
      let countC = answers.filter(a => a === "C").length;

      let resultText = "";

      if (countA > countB && countA > countC) {
        resultText = `
          💼 <strong>Perfil Conservador</strong><br>
          Prioriza segurança e preservação do capital, aceitando baixa rentabilidade em troca de estabilidade.
          <br><em>Recomendações:</em> Tesouro Selic, CDBs de grandes bancos, fundos de renda fixa.
        `;
      } else if (countB > countA && countB > countC) {
        resultText = `
          ⚖️ <strong>Perfil Moderado</strong><br>
          Busca equilíbrio entre segurança e retorno, aceita riscos médios e valoriza a proteção do capital.
          <br><em>Recomendações:</em> Títulos públicos IPCA, CDBs médios, fundos multimercado.
        `;
      } else {
        resultText = `
          🚀 <strong>Perfil Arrojado</strong><br>
          Assume riscos elevados em busca de maior rentabilidade e tem visão de longo prazo.
          <br><em>Recomendações:</em> Ações, ETFs, fundos multimercado agressivos.
        `;
      }

      document.querySelector(".quiz-card form").classList.add("d-none");
      const resultDiv = document.getElementById("result");
      resultDiv.style.display = "block";
      resultDiv.classList.add("alert-success");
      resultDiv.innerHTML = resultText;

      progressBar.style.width = "100%";
      progressBar.textContent = "100%";
    }