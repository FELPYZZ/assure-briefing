import { useState, useRef } from "react";

const C = {
  navy: "#1C2B4A", purple: "#3D35D4", neon: "#E3FF00",
  white: "#FFFFFF", offwhite: "#F8F8F2", gray: "#8A8A9A",
  light: "#F0F0FA", border: "#E4E4F0",
};

const ETAPAS = ["Pessoa", "Projeto", "Referências", "Resumo"];

const initial = {
  nome: "", email: "", telefone: "", cidade: "",
  curso: "", instituicao: "", anoFormatura: "", tipoFormatura: "",
  descricao: "", objetivos: "", prazo: "", servicos: [],
  publicoIdade: "", estiloEvento: "",
  referencias: "", estiloVisual: "", coresPreferidas: "", coresEvitar: "",
  observacoes: "",
};

function Field({ label, value, onChange, placeholder, required, type = "text" }) {
  const [focus, setFocus] = useState(false);
  return (
    <div style={{ marginBottom: 18 }}>
      <label style={{ display: "block", fontSize: 11, fontWeight: 800, color: C.navy, marginBottom: 6, letterSpacing: 1.2, textTransform: "uppercase" }}>
        {label}{required && <span style={{ color: C.purple, marginLeft: 2 }}>*</span>}
      </label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
        style={{ width: "100%", padding: "12px 16px", borderRadius: 10, border: `2px solid ${focus ? C.purple : C.border}`, fontSize: 14, color: C.navy, background: focus ? "#fff" : C.offwhite, outline: "none", boxSizing: "border-box", transition: "all 0.2s", fontFamily: "inherit" }}
      />
    </div>
  );
}

function Area({ label, value, onChange, placeholder, required, rows = 3 }) {
  const [focus, setFocus] = useState(false);
  return (
    <div style={{ marginBottom: 18 }}>
      <label style={{ display: "block", fontSize: 11, fontWeight: 800, color: C.navy, marginBottom: 6, letterSpacing: 1.2, textTransform: "uppercase" }}>
        {label}{required && <span style={{ color: C.purple, marginLeft: 2 }}>*</span>}
      </label>
      <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={rows}
        onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
        style={{ width: "100%", padding: "12px 16px", borderRadius: 10, border: `2px solid ${focus ? C.purple : C.border}`, fontSize: 14, color: C.navy, background: focus ? "#fff" : C.offwhite, outline: "none", resize: "vertical", boxSizing: "border-box", fontFamily: "inherit", transition: "all 0.2s" }}
      />
    </div>
  );
}

function Sel({ label, value, onChange, options, required }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <label style={{ display: "block", fontSize: 11, fontWeight: 800, color: C.navy, marginBottom: 6, letterSpacing: 1.2, textTransform: "uppercase" }}>
        {label}{required && <span style={{ color: C.purple, marginLeft: 2 }}>*</span>}
      </label>
      <select value={value} onChange={e => onChange(e.target.value)}
        style={{ width: "100%", padding: "12px 16px", borderRadius: 10, border: `2px solid ${C.border}`, fontSize: 14, color: value ? C.navy : C.gray, background: C.offwhite, outline: "none", boxSizing: "border-box", fontFamily: "inherit" }}>
        <option value="">Selecionar...</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

function Tags({ label, options, value, onChange }) {
  const toggle = o => onChange(value.includes(o) ? value.filter(v => v !== o) : [...value, o]);
  return (
    <div style={{ marginBottom: 18 }}>
      <label style={{ display: "block", fontSize: 11, fontWeight: 800, color: C.navy, marginBottom: 8, letterSpacing: 1.2, textTransform: "uppercase" }}>{label}</label>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {options.map(o => {
          const on = value.includes(o);
          return (
            <button key={o} onClick={() => toggle(o)} style={{ padding: "8px 16px", borderRadius: 20, fontSize: 13, border: `2px solid ${on ? C.purple : C.border}`, background: on ? C.purple : C.offwhite, color: on ? C.white : C.navy, cursor: "pointer", fontWeight: on ? 700 : 500, transition: "all 0.2s", fontFamily: "inherit" }}>
              {o}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ProgressBar({ step }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
        {ETAPAS.map((e, i) => (
          <div key={i} style={{ flex: 1, textAlign: "center" }}>
            <div style={{ height: 4, borderRadius: 2, background: i <= step ? C.purple : C.border, transition: "background 0.3s" }} />
            <span style={{ fontSize: 10, fontWeight: i === step ? 800 : 500, color: i <= step ? C.purple : C.gray, marginTop: 4, display: "block" }}>{e}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function StepTitle({ icon, title, sub }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <p style={{ fontSize: 22, margin: "0 0 4px" }}>{icon}</p>
      <h2 style={{ fontSize: 20, fontWeight: 900, color: C.navy, margin: "0 0 4px", letterSpacing: -0.3 }}>{title}</h2>
      <p style={{ fontSize: 13, color: C.gray, margin: 0 }}>{sub}</p>
    </div>
  );
}

async function gerarResumo(form) {
  const promptLines = [
    "Você é assistente da Assure, agência criativa de design e marketing.",
    "Com base no briefing abaixo, crie um resumo executivo do projeto em HTML para uso interno do designer (Fábio Felipe).",
    "NÃO é para enviar ao cliente ainda.",
    "",
    "BRIEFING:",
    "- Cliente: " + form.nome,
    "- Contato: " + form.email + " | " + form.telefone + " | " + form.cidade,
    "- Curso: " + form.curso + " — " + form.instituicao + " (" + form.anoFormatura + ")",
    "- Tipo de formatura: " + form.tipoFormatura,
    "- Descrição do projeto: " + form.descricao,
    "- Objetivos: " + form.objetivos,
    "- Prazo: " + form.prazo,
    "- Serviços solicitados: " + form.servicos.join(", "),
    "- Público do evento: " + form.publicoIdade + " — Estilo: " + form.estiloEvento,
    "- Referências: " + form.referencias,
    "- Estilo visual: " + form.estiloVisual,
    "- Cores preferidas: " + form.coresPreferidas,
    "- Cores a evitar: " + form.coresEvitar,
    "- Observações: " + form.observacoes,
    "",
    "Crie o resumo com estas seções usando tags HTML (h2, h3, p, ul, li, strong):",
    "1. Visão Geral do Projeto",
    "2. O que o cliente quer transmitir (personalidade, estilo, tom)",
    "3. Direção Criativa Sugerida",
    "4. Entregas esperadas",
    "5. Pontos de atenção para o designer",
    "6. Próximos passos internos",
    "",
    "Seja direto e profissional. Não use markdown com cerquilha.",
  ];

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 1000,
      messages: [{ role: "user", content: promptLines.join("\n") }],
    }),
  });
  const data = await res.json();
  return data.content?.[0]?.text || "Erro ao gerar resumo.";
}

export default function App() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(initial);
  const [loading, setLoading] = useState(false);
  const [resumo, setResumo] = useState(null);
  const topRef = useRef(null);

  const set = k => v => setForm(f => ({ ...f, [k]: v }));

  const next = async () => {
    if (step < ETAPAS.length - 2) {
      setStep(s => s + 1);
      topRef.current?.scrollIntoView({ behavior: "smooth" });
    } else if (step === ETAPAS.length - 2) {
      setLoading(true);
      setStep(ETAPAS.length - 1);
      const r = await gerarResumo(form);
      setResumo(r);
      setLoading(false);
      topRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const back = () => { setStep(s => Math.max(0, s - 1)); topRef.current?.scrollIntoView({ behavior: "smooth" }); };
  const reset = () => { setForm(initial); setStep(0); setResumo(null); };

  const btnP = { padding: "12px 24px", background: C.purple, color: C.white, border: "none", borderRadius: 10, fontSize: 14, fontWeight: 800, cursor: "pointer", fontFamily: "inherit" };
  const btnS = { padding: "12px 24px", background: C.offwhite, color: C.navy, border: `2px solid ${C.border}`, borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <>
            <StepTitle icon="🎓" title="Dados do Formando" sub="Vamos conhecer quem está por trás desse projeto." />
            <Field label="Nome completo" value={form.nome} onChange={set("nome")} placeholder="Ex: Maria Souza" required />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <Field label="E-mail" value={form.email} onChange={set("email")} placeholder="maria@email.com" type="email" />
              <Field label="WhatsApp" value={form.telefone} onChange={set("telefone")} placeholder="(11) 99999-9999" />
            </div>
            <Field label="Cidade" value={form.cidade} onChange={set("cidade")} placeholder="São Paulo – SP" />
            <Field label="Curso" value={form.curso} onChange={set("curso")} placeholder="Ex: Medicina, Direito, Engenharia..." required />
            <Field label="Instituição de ensino" value={form.instituicao} onChange={set("instituicao")} placeholder="Ex: USP, UFRJ, PUC..." />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <Sel label="Ano de formatura" value={form.anoFormatura} onChange={set("anoFormatura")} options={["2025", "2026", "2027"]} />
              <Sel label="Tipo de formatura" value={form.tipoFormatura} onChange={set("tipoFormatura")} options={["Colação de grau", "Festa de formatura", "Ambos", "Outro"]} />
            </div>
          </>
        );
      case 1:
        return (
          <>
            <StepTitle icon="✦" title="O Projeto" sub="Conta tudo sobre o que você precisa — quanto mais detalhes, melhor." />
            <Area label="Descreva o projeto" value={form.descricao} onChange={set("descricao")} placeholder="O que você precisa? Ex: logo, identidade completa, convites, lembranças..." required rows={4} />
            <Area label="O que você quer transmitir com essa identidade?" value={form.objetivos} onChange={set("objetivos")} placeholder="Ex: elegância e sofisticação, alegria e celebração, modernidade..." required rows={3} />
            <Tags
              label="O que você precisa? (selecione um ou mais)"
              options={["Convite personalizado", "Convite automatizado", "Convite básico", "Identidade visual com aplicações (taça, guardanapo, copo etc.)", "Identidade visual sem aplicações"]}
              value={form.servicos}
              onChange={set("servicos")}
            />
            <Field label="Prazo desejado" value={form.prazo} onChange={set("prazo")} placeholder="Ex: 3 semanas" />
            <Field label="Faixa etária dos convidados" value={form.publicoIdade} onChange={set("publicoIdade")} placeholder="Ex: maioria entre 20 e 30 anos" />
            <Sel label="Como você definiria o clima do evento?" value={form.estiloEvento} onChange={set("estiloEvento")} options={["Luxuoso e sofisticado", "Moderno e contemporâneo", "Alegre e festivo", "Rústico e intimista", "Minimalista e clean", "Outro"]} />
          </>
        );
      case 2:
        return (
          <>
            <StepTitle icon="🎨" title="Referências & Estilo" sub="Isso é o que vai guiar toda a direção criativa do projeto." />
            <Area label="Referências visuais que você admira" value={form.referencias} onChange={set("referencias")} placeholder="Links, marcas, projetos, convites, logos que você gosta..." rows={3} />
            <Area label="Como você descreveria o estilo que deseja?" value={form.estiloVisual} onChange={set("estiloVisual")} placeholder="Ex: moderno e minimalista, romântico e delicado, bold e impactante..." required rows={3} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <Field label="Cores que você gosta" value={form.coresPreferidas} onChange={set("coresPreferidas")} placeholder="Ex: dourado, off-white, vinho" />
              <Field label="Cores que você não quer" value={form.coresEvitar} onChange={set("coresEvitar")} placeholder="Ex: verde-limão, laranja" />
            </div>
            <Area label="Algo mais que precisamos saber?" value={form.observacoes} onChange={set("observacoes")} placeholder="Informações adicionais, pedidos especiais, restrições..." rows={3} />
          </>
        );
      case 3:
        return (
          <div>
            <StepTitle icon="📋" title="Resumo do Projeto" sub="Análise interna para orientar a criação." />
            {loading ? (
              <div style={{ textAlign: "center", padding: "56px 0" }}>
                <style>{"@keyframes spin { to { transform: rotate(360deg) } }"}</style>
                <div style={{ width: 48, height: 48, border: `4px solid ${C.border}`, borderTop: `4px solid ${C.purple}`, borderRadius: "50%", margin: "0 auto 20px", animation: "spin 0.8s linear infinite" }} />
                <p style={{ color: C.navy, fontWeight: 700, fontSize: 15 }}>Analisando briefing...</p>
                <p style={{ color: C.gray, fontSize: 13 }}>Preparando o resumo criativo do projeto.</p>
              </div>
            ) : resumo ? (
              <>
                <div style={{ background: C.neon, borderRadius: 12, padding: "12px 18px", marginBottom: 20, display: "flex", gap: 10, alignItems: "center" }}>
                  <span style={{ fontSize: 18 }}>✅</span>
                  <div>
                    <p style={{ margin: 0, fontSize: 13, fontWeight: 800, color: C.navy }}>Briefing recebido: {form.nome}</p>
                    <p style={{ margin: 0, fontSize: 12, color: C.navy, opacity: 0.7 }}>{form.curso} · {form.instituicao} · {form.tipoFormatura}</p>
                  </div>
                </div>
                <div style={{ background: "#fff", border: `2px solid ${C.border}`, borderRadius: 12, padding: "28px 32px", fontSize: 14, lineHeight: 1.85, color: C.navy }}
                  dangerouslySetInnerHTML={{ __html: resumo }} />
                <div style={{ display: "flex", gap: 12, marginTop: 24, flexWrap: "wrap" }}>
                  <button onClick={() => window.print()} style={btnP}>🖨️ Imprimir / Salvar PDF</button>
                  <button onClick={reset} style={btnS}>↩ Novo briefing</button>
                </div>
              </>
            ) : null}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div ref={topRef} style={{ minHeight: "100vh", background: C.navy, padding: "0 0 48px", fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>
      <div style={{ background: C.navy, padding: "28px 24px 0", textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
          <div style={{ background: C.neon, borderRadius: 8, padding: "6px 16px" }}>
            <span style={{ fontSize: 18, fontWeight: 900, color: C.navy, letterSpacing: -1, fontStyle: "italic" }}>assure</span>
          </div>
          <div style={{ width: 1, height: 24, background: "rgba(255,255,255,0.2)" }} />
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase" }}>Briefing</span>
        </div>
        <h1 style={{ fontSize: 26, fontWeight: 900, color: C.white, margin: "0 0 8px", letterSpacing: -0.5, lineHeight: 1.1 }}>
          Projeto <span style={{ color: C.neon }}>para Formatura</span>
        </h1>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, margin: "0 0 28px" }}>Preencha com calma. Cada detalhe faz diferença na criação.</p>
      </div>

      <div style={{ maxWidth: 640, margin: "0 auto", padding: "0 16px" }}>
        <div style={{ background: C.white, borderRadius: 20, padding: "32px 32px 28px", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
          <ProgressBar step={step} />
          {renderStep()}
          {step < ETAPAS.length - 1 && (
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
              {step > 0 ? <button onClick={back} style={btnS}>← Voltar</button> : <div />}
              <button onClick={next} style={btnP}>
                {step === ETAPAS.length - 2 ? "✦ Gerar Resumo" : "Continuar →"}
              </button>
            </div>
          )}
        </div>
        <p style={{ textAlign: "center", fontSize: 11, color: "rgba(255,255,255,0.25)", marginTop: 20 }}>
          Assure Agência · Uso Interno · {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}
